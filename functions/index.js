const { onDocumentCreated, onDocumentUpdated, onDocumentWritten } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore"); // <-- ADDED for Custom Actions

const { defineSecret } = require("firebase-functions/params");
const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https"); // <-- ADDED onRequest
const jwt = require("jsonwebtoken");

initializeApp();

// Define all secret parameters

const whatsappAccessToken = defineSecret("WHATSAPP_ACCESS_TOKEN");
const whatsappPhoneId = defineSecret("WHATSAPP_PHONE_ID");
const whatsappBusinessAccountId = defineSecret("WHATSAPP_BUSINESS_ACCOUNT_ID");
const intercomSecretKey = defineSecret("INTERCOM_SECRET_KEY");

// ==========================================
// 2. WHATSAPP ORDER CONFIRMATION FUNCTION
// ==========================================
exports.sendOrderConfirmationWhatsApp = onDocumentCreated(
    {
        document: "orders/{orderId}",
        secrets: [whatsappAccessToken, whatsappPhoneId],
        region: "us-central1",
    },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return;

        const orderData = snapshot.data();
        const orderId = orderData.orderId || event.params.orderId;

        const customerName = orderData.userName || "Customer";
        let phoneNumber = orderData.userPhone || orderData.userMobile;

        if (!phoneNumber) return;

        phoneNumber = String(phoneNumber).replace(/\D/g, "");

        if (phoneNumber.length === 10) {
            phoneNumber = "91" + phoneNumber;
        } else if (phoneNumber.length !== 12 || !phoneNumber.startsWith("91")) {
            return;
        }

        const token = whatsappAccessToken.value();
        const phoneId = whatsappPhoneId.value();

        // Extract Pickup Date and Slot
        const createdAt = orderData.createdAt ? orderData.createdAt.toDate() : new Date();
        const pickupDate = createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        const pickupSlot = orderData.deliverySlot || "6:00 PM - 9:00 PM"; // Default fallback

        const META_API_VERSION = "v19.0";
        const url = `https://graph.facebook.com/${META_API_VERSION}/${phoneId}/messages`;

        const payload = {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "template",
            template: {
                name: "order_placed",
                language: { code: "en" },
                components: [
                    {
                        type: "body",
                        parameters: [
                            { type: "text", text: customerName },
                            { type: "text", text: pickupDate },
                        ],
                    },
                ],
            },
        };

        console.log(`Sending WhatsApp to ${phoneNumber} using PhoneID ${phoneId} and Version ${META_API_VERSION}`);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("WhatsApp API Response:", JSON.stringify(result));

            if (!response.ok) {
                await snapshot.ref.update({
                    whatsappConfirmationSent: false,
                    whatsappError: JSON.stringify(result),
                });
            } else {
                await snapshot.ref.update({ whatsappConfirmationSent: true });
            }
        } catch (error) {
            await snapshot.ref.update({
                whatsappConfirmationSent: false,
                whatsappError: error.message,
            });
        }
    },
);

// ==========================================
// 3. INTERCOM IDENTITY VERIFICATION
// ==========================================
exports.generateIntercomHash = onCall(
    { secrets: [intercomSecretKey] },
    (request) => {
        if (!request.auth || !request.auth.uid) {
            throw new HttpsError("unauthenticated", "The function must be called while authenticated.");
        }

        const uid = request.auth.uid;
        const secret = intercomSecretKey.value();

        if (!secret) {
            throw new HttpsError("internal", "Server misconfiguration.");
        }

        const payload = {
            user_id: uid,
            email: request.auth.token ? request.auth.token.email : "",
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        return { intercom_user_jwt: token };
    }
);

// ==========================================
// 3.5 SEND CUSTOM WHATSAPP MESSAGE (ON CALL)
// ==========================================
exports.sendWhatsAppMessage = onCall(
    { secrets: [whatsappAccessToken, whatsappPhoneId] },
    async (request) => {
        // Auth check (Admin only recommended)
        if (!request.auth) {
            throw new HttpsError("unauthenticated", "The function must be called while authenticated.");
        }

        const { to, type, body, templateName, languageCode, parameters } = request.data;

        if (!to || !type) {
            throw new HttpsError("invalid-argument", "Missing recipient (to) or message type.");
        }

        const phoneId = whatsappPhoneId.value();
        const token = whatsappAccessToken.value();
        const META_API_VERSION = "v19.0";
        const url = `https://graph.facebook.com/${META_API_VERSION}/${phoneId}/messages`;

        let payload = {
            messaging_product: "whatsapp",
            to: to.replace(/\D/g, ""), // Sanitize number
        };

        if (type === "template") {
            if (!templateName) {
                throw new HttpsError("invalid-argument", "Missing templateName for template message.");
            }
            payload.type = "template";
            payload.template = {
                name: templateName,
                language: { code: languageCode || "en" },
                components: parameters ? [{
                    type: "body",
                    parameters: parameters.map(p => ({ type: "text", text: String(p) }))
                }] : []
            };
        } else {
            // Default to text message (Custom)
            if (!body) {
                throw new HttpsError("invalid-argument", "Missing body for text message.");
            }
            payload.type = "text";
            payload.text = { body: body };
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("WhatsApp API Error:", result);
                return { success: false, error: result };
            }

            return { success: true, messageId: result.messages?.[0]?.id };
        } catch (error) {
            console.error("WhatsApp Function Error:", error);
            throw new HttpsError("internal", error.message);
        }
    }
);

// ==========================================
// 4. INTERCOM CUSTOM ACTION: SCHEDULE ORDER
// ==========================================
exports.scheduleAndesOrder = onRequest(
    { region: "us-central1" }, // Optional: keeps it in the same region
    async (req, res) => {
        // Intercom Custom Actions send POST requests
        if (req.method !== "POST") {
            res.status(405).send({ error: "Method Not Allowed" });
            return;
        }

        try {
            const { email, phone, pickup_date, pickup_time, address, service_type } = req.body
            // 1. Check if all required fields are present
            if (!email || !pickup_date || !pickup_time || !address) {
                res.status(400).send({
                    error: "Missing details.",
                    message: "Please provide email, pickup date, pickup time, and address."
                });
                return;
            }

            // 2. Validate Pune Address
            const addressLower = address.toLowerCase();
            // Checks for the word "pune" or PIN codes starting with 411
            const isPune = addressLower.includes("pune") || addressLower.match(/\b411\d{3}\b/);

            if (!isPune) {
                res.status(400).send({
                    error: "Out of service area.",
                    message: "We currently only offer laundry services within Pune, Maharashtra. We cannot schedule an order for this location."
                });
                return;
            }

            // 3. Save the order to Firestore
            const db = getFirestore();
            const orderRef = db.collection("orders").doc();
            const timestamp = FieldValue.serverTimestamp();

            await orderRef.set({
                orderId: orderRef.id,
                customerEmail: email,
                userName: email ? email.split('@')[0] : "Customer",
                userPhone: phone,
                pickupDate: pickup_date,
                pickupTime: pickup_time,
                address: address,
                serviceType: service_type || "Standard Laundry",
                status: "Scheduled",
                createdAt: timestamp,
                source: "Fin AI Assistant"
            });

            // 4. Save to cartdetails for the Rider App
            const serviceKey = `${service_type || "Standard Laundry"}_regular`;
            const cartDetailsData = {
                address: address,
                convenienceFee: 0,
                createdAt: timestamp,
                deliveryCharge: 0,
                dropTime: "Not specified",
                freeDeliveryApplied: false,
                hasFreeCadbury: false,
                location: {
                    accuracyMeters: null,
                    address: address,
                    isManual: true,
                    latitude: 0.0,
                    longitude: 0.0,
                    pincode: "",
                    selectionSource: "fin_ai",
                    timestamp: new Date().toISOString(),
                    userEnteredAddress: address
                },
                orderNumber: Math.floor(100000 + Math.random() * 900000),
                orderTimestamp: Date.now(),
                originalTotalCost: 0,
                otherCharges: 0,
                paperBag: false,
                paymentData: {
                    convenienceFee: 0,
                    originalAmount: 0,
                    totalWithFee: 0
                },
                paymentId: null,
                paymentMethod: "cod",
                paymentStatus: "pending",
                pickupTime: pickup_time,
                serviceUnits: { [serviceKey]: "regular" },
                services: { [serviceKey]: 1 },
                status: "Pending",
                totalCost: 0,
                totalItems: 1,
                ultraFastDelivery: false,
                updatedAt: timestamp,
                userId: "fin_ai_assistant",
                userMobile: phone || "",
                userName: email ? email.split('@')[0] : "Customer",
                walletAmountUsed: 0
            };

            await db.collection("cartdetails").doc(orderRef.id).set(cartDetailsData);

            // 5. Send success response back to Intercom
            res.status(200).send({
                success: true,
                message: `Order successfully scheduled for ${pickup_date} at ${pickup_time} in Pune.`,
                order_id: orderRef.id
            });

        } catch (error) {
            console.error("Error scheduling order:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

// ==========================================
// 5. ORDER STATUS UPDATES WHATSAPP MESSAGES
// ==========================================
exports.notifyWhatsAppOrderStatus = onDocumentWritten(
    {
        document: "cartdetails/{orderId}",
        secrets: [whatsappAccessToken, whatsappPhoneId],
        region: "us-central1",
    },
    async (event) => {
        const beforeData = event.data.before.data();
        const afterData = event.data.after.data();

        if (!beforeData || !afterData) return;

        const beforeStatus = (beforeData.status || "").toLowerCase();
        const afterStatus = (afterData.status || "").toLowerCase();

        // Only proceed if status actually changed
        if (beforeStatus === afterStatus) return;

        const orderId = event.params.orderId;
        const customerName = afterData.userName || "Customer";
        let phoneNumber = afterData.userMobile || afterData.userPhone || "";

        if (!phoneNumber) return;

        phoneNumber = String(phoneNumber).replace(/\D/g, "");
        if (phoneNumber.length === 10) {
            phoneNumber = "91" + phoneNumber;
        } else if (phoneNumber.length !== 12 || !phoneNumber.startsWith("91")) {
            return;
        }

        const token = whatsappAccessToken.value();
        const phoneId = whatsappPhoneId.value();
        const META_API_VERSION = "v19.0";
        const url = `https://graph.facebook.com/${META_API_VERSION}/${phoneId}/messages`;

        let templateName = "";
        let parameters = [];

        // Check for specific status transitions
        if (["on the way", "partner"].some(kw => afterStatus.includes(kw)) && !["on the way", "partner"].some(kw => beforeStatus.includes(kw))) {
            templateName = "pickup_partner_on_way_v1";
            parameters = [{ type: "text", text: customerName }];
        } 
        else if (["picked up", "pickup completed", "reached laundry facility"].some(kw => afterStatus.includes(kw)) && !["picked up", "pickup completed", "reached laundry facility"].some(kw => beforeStatus.includes(kw))) {
            templateName = "pickup_completed_v1";
            
            // Try to fetch order data for more details (like weight if exists)
            const db = getFirestore();
            let totalWeight = "N/A";
            let deliveryDate = afterData.dropTime || "within 48 hours";
            
            try {
                const orderDoc = await db.collection("orders").doc(orderId).get();
                if (orderDoc.exists) {
                    const oData = orderDoc.data();
                    if (oData.totalWeight) totalWeight = String(oData.totalWeight);
                    if (oData.deliverySlot) deliveryDate = String(oData.deliverySlot);
                    if (oData.deliveryDate) deliveryDate = String(oData.deliveryDate);
                }
            } catch (e) {
                console.warn("Failed to fetch order doc for additional details:", e);
            }

            const totalItems = String(afterData.totalItems || "0");
            const estimatedTotal = String(afterData.totalCost || "0");
            
            // Build services breakdown
            let breakdown = "Standard Laundry Service";
            if (afterData.services && Object.keys(afterData.services).length > 0) {
                breakdown = Object.entries(afterData.services)
                    .map(([serviceName, count]) => `- ${serviceName.replace("_regular", "")}: ${count}`)
                    .join("\n");
            }

            parameters = [
                { type: "text", text: customerName },
                { type: "text", text: totalWeight },
                { type: "text", text: totalItems },
                { type: "text", text: breakdown },
                { type: "text", text: estimatedTotal },
                { type: "text", text: deliveryDate }
            ];
        } 
        else if (["out for delivery"].some(kw => afterStatus.includes(kw)) && !["out for delivery"].some(kw => beforeStatus.includes(kw))) {
            templateName = "out_for_delivery";
            
            const db = getFirestore();
            let deliveryDate = afterData.dropTime || "today";
            try {
                const orderDoc = await db.collection("orders").doc(orderId).get();
                if (orderDoc.exists && orderDoc.data().deliverySlot) {
                    deliveryDate = orderDoc.data().deliverySlot;
                }
            } catch (e) {}

            parameters = [
                { type: "text", text: customerName },
                { type: "text", text: deliveryDate }
            ];
        } 
        else if (["deliver", "completed"].some(kw => afterStatus.includes(kw)) && !["deliver", "completed"].some(kw => beforeStatus.includes(kw))) {
            templateName = "order_delivered";
            parameters = [{ type: "text", text: customerName }];
        }

        // If no matching template for the status change, do nothing
        if (!templateName) return;

        const payload = {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "template",
            template: {
                name: templateName,
                language: { code: "en" },
                components: [
                    {
                        type: "body",
                        parameters: parameters,
                    },
                ],
            },
        };

        console.log(`Sending WhatsApp Template '${templateName}' to ${phoneNumber} for status update to '${afterStatus}'`);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            
            // Log outcome to the cartdetails document
            if (!response.ok) {
                console.error("WhatsApp API Error:", JSON.stringify(result));
                await event.data.after.ref.update({
                    whatsappStatusError: JSON.stringify(result),
                    whatsappStatusSent: false
                });
            } else {
                console.log("WhatsApp Status message sent successfully.");
                await event.data.after.ref.update({ whatsappStatusSent: true });
            }
        } catch (error) {
            console.error("WhatsApp Function Exception:", error);
            await event.data.after.ref.update({
                whatsappStatusError: error.message,
                whatsappStatusSent: false
            });
        }
    }
);