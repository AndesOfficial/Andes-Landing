const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore"); // <-- ADDED for Custom Actions

const { defineSecret } = require("firebase-functions/params");
const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https"); // <-- ADDED onRequest
const jwt = require("jsonwebtoken");

initializeApp();

// Define all secret parameters

const whatsappAccessToken = defineSecret("WHATSAPP_ACCESS_TOKEN");
const whatsappPhoneId = defineSecret("WHATSAPP_PHONE_ID");
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

        let servicesString = "Laundry Services";
        if (orderData.items && Array.isArray(orderData.items) && orderData.items.length > 0) {
            servicesString = orderData.items.map((item) => item.name || item.category || "Item").join(", ");
        } else if (orderData.serviceType) {
            servicesString = orderData.serviceType;
        }

        const orderDetailsString = `Order ID: ${orderId}`;
        const META_API_VERSION = "v22.0";
        const url = `https://graph.facebook.com/${META_API_VERSION}/${phoneId}/messages`;

        const payload = {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "template",
            template: {
                name: "order_confirmation",
                language: { code: "en" },
                components: [
                    {
                        type: "body",
                        parameters: [
                            { type: "text", text: customerName },
                            { type: "text", text: servicesString },
                            { type: "text", text: orderDetailsString },
                        ],
                    },
                ],
            },
        };

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