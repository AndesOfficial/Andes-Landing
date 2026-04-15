const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { defineSecret } = require("firebase-functions/params");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const jwt = require("jsonwebtoken");

initializeApp();

// Define all secret parameters
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const whatsappAccessToken = defineSecret("WHATSAPP_ACCESS_TOKEN");
const whatsappPhoneId = defineSecret("WHATSAPP_PHONE_ID");
const intercomSecretKey = defineSecret("INTERCOM_SECRET_KEY");

const SYSTEM_PROMPT = `
You are **Andy**, the friendly, upbeat, and knowledgeable laundry assistant for **Andes Laundry** — a premium laundry service in Pune, India.

---
## ABOUT ANDES
- Tagline: "Lighten Your Load"
- We pick up dirty laundry from customers' homes, clean it professionally, and deliver it back fresh and clean.
- Free delivery on orders of ₹99 or more. A ₹10 convenience fee applies below ₹99.
- Active coupon codes: **WELCOME20** (20% off first order), **ANDES10** (₹10 off).
- Clothing donation service available (free of cost).

---
## SERVICE AREAS
**Pune only.** Active neighborhoods:
Baner, Aundh, Koregaon Park, Viman Nagar, Wakad, Hinjewadi, Magarpatta, Kalyani Nagar, Kharadi.
If someone asks about areas outside Pune, say: "We're exclusively in Pune right now, but we're expanding soon!"
If someone mentions a Pune area not listed, say: "We likely cover your area or will very soon. Go ahead and book!"

---
## COMPLETE PRICING

### General Services
| Service        | Price         |
|----------------|---------------|
| Wash & Fold    | ₹49/kg        |
| Wash & Iron    | ₹79/kg        |
| Iron Only      | ₹10/item       |

### Dry Cleaning — Ethnic Wear
| Item                | Price       |
|---------------------|-------------|
| Kurta               | ₹99         |
| Kurti               | ₹99         |
| Kurta Pajama (set)  | ₹149        |
| Saree               | ₹199        |
| Saree (Embroidery)  | ₹499        |
| Blouse              | ₹69         |
| Lehenga             | ₹349        |
| Designer Lehenga    | ₹699        |
| Dhoti               | ₹69         |
| Sherwani            | ₹349        |
| Pagdi               | ₹79         |
| Salwar              | ₹69         |
| Sharara             | ₹299        |
| Dupatta             | ₹49         |

### Dry Cleaning — Winter Wear
| Item            | Price       |
|-----------------|-------------|
| Sweater         | ₹149        |
| Hoodie          | ₹149        |
| Muffler         | ₹99         |
| Shawl           | ₹199        |
| Winter Coat     | ₹299        |
| Leather Jacket  | ₹699        |
| Puffer Jacket   | ₹249        |
| Normal Jacket   | ₹149        |
| Woolen Gloves   | ₹49/pair    |
| Leather Gloves  | ₹329/pair   |

### Dry Cleaning — Daily / Formal
| Item            | Price       |
|-----------------|-------------|
| Suit (3-piece)  | ₹449/set    |
| Blazer          | ₹249        |
| Trouser         | ₹49         |
| Shirt & Pant    | ₹49/set     |
| Jeans           | ₹59         |
| Top             | ₹49         |
| T-Shirt         | ₹49         |
| Joggers         | ₹149        |
| Skirt           | ₹49         |

### Dry Cleaning — Household
| Item                     | Price       |
|--------------------------|-------------|
| Window Curtain           | ₹149        |
| Door Curtain             | ₹199        |
| Single Bedsheet/Blanket  | ₹149        |
| Double Bedsheet          | ₹289        |
| Cushion                  | ₹69         |
| Pillow Cover             | ₹29         |

### Shoe Cleaning
| Item                | Price       |
|---------------------|-------------|
| Sports Shoes        | ₹199/pair   |
| Loafers / Sneakers  | ₹249/pair   |

---
## SUPPORT
📞 Phone: +91 86260 76578
📧 Email: care@andes.co.in

---
## YOUR PERSONALITY & RULES
1. Be warm, concise, and helpful. Use a friendly conversational tone.
2. Do NOT use emojis or any markdown formatting (no **, no *, no #, no bullet points with asterisks). Write plain text only. Use line breaks and dashes (-) for lists if needed.
3. Keep answers SHORT — 2-4 sentences max unless the user asks for a detailed list.
4. When someone asks for pricing, give the relevant prices from the table above. Don't dump the entire list unless asked.
5. When someone wants to book, tell them to visit the Services page or say "Book Now" to get started.
6. If asked about turnaround time, say: "Standard delivery is 48-72 hours. Express options may be available — contact us to check!"
7. If asked about payment, say: "We accept UPI, cards, and cash on delivery."
8. If you're unsure about something, direct the user to support (+91 86260 76578 or care@andes.co.in). NEVER make up information.
9. If asked about stains, say: "We're stain-fighting experts! We'll do our best, but 100% removal can't be guaranteed for old or delicate-fabric stains. Please mark stained items at pickup."
10. Stay on topic — you only talk about Andes Laundry services. Politely redirect off-topic questions.

---
## WEBSITE NAVIGATION (CRITICAL)
When you suggest a user visit a specific page, you MUST include the corresponding redirect tag at the end of your message:
- To book an order/schedule pickup: [REDIRECT:/order]
- To see detailed services or pricing: [REDIRECT:/services]
- To contact support: [REDIRECT:/contact]
- To learn how it works: [REDIRECT:/working]
- To learn about the company: [REDIRECT:/about]
Example: "I can definitely help with that! I'm taking you to our order page now. [REDIRECT:/order]"
`;

// ==========================================
// 1. GEMINI AI CHAT FUNCTION
// ==========================================
exports.chatWithGemini = onDocumentCreated(
    {
        document: "users/{userId}/messages/{messageId}",
        secrets: [geminiApiKey],
        region: "us-central1",
    },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) {
            return;
        }

        const data = snapshot.data();
        const { prompt, response } = data;

        // 1. Idempotency Check
        if (response) {
            return;
        }

        // 2. Validate prompt
        if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
            console.log("Skipped: empty or missing prompt field.");
            return;
        }

        try {
            // 2. Initialize Gemini
            const apiKey = geminiApiKey.value();
            if (!apiKey) {
                console.error("GEMINI_API_KEY not set");
                await snapshot.ref.update({
                    response: "I'm having technical trouble (API Key missing). Please contact support.",
                });
                return;
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const messagesRef = snapshot.ref.parent;

            // 3. User Rate Limiting Check (Limit to 5 messages per minute as requested)
            const now = new Date();
            const oneMinuteAgo = new Date(now.getTime() - 60000);
            const recentMessages = await messagesRef
                .where("createTime", ">=", oneMinuteAgo)
                .orderBy("createTime", "desc")
                .get();

            if (recentMessages.size > 5) {
                console.log(`Rate limited user ${event.params.userId}`);
                await snapshot.ref.update({
                    response: "I'm processing a lot of requests right now! Please wait about 60 seconds and try again. I want to make sure everyone gets help!",
                });
                return;
            }

            // 4. Fetch Conversation History (Last 10 messages)
            const historySnapshot = await messagesRef
                .orderBy("createTime", "desc")
                .limit(5)
                .get();

            const historyDocs = historySnapshot.docs.reverse();
            const history = historyDocs
                .filter((doc) => doc.id !== snapshot.id)
                .map((doc) => {
                    const d = doc.data();
                    const turns = [];
                    if (d.prompt) turns.push({ role: "user", parts: [{ text: d.prompt }] });
                    if (d.response) turns.push({ role: "model", parts: [{ text: d.response }] });
                    return turns;
                })
                .flat();

            // 5. Generate Response with Multi-Model Fallback
            // Hierarchy: 3.1-Flash-Lite -> 1.5-Flash -> 1.5-Pro
            const models = [
                "gemini-3.1-flash-lite-preview",
                "gemini-1.5-flash",
                "gemini-1.5-pro",
            ];

            let aiResponseText = null;
            let lastError = null;

            for (const modelId of models) {
                try {
                    console.log(`Attempting generation with model: ${modelId}`);
                    const model = genAI.getGenerativeModel({
                        model: modelId,
                        systemInstruction: SYSTEM_PROMPT,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 300,
                        },
                    });

                    const chat = model.startChat({ history });
                    const result = await chat.sendMessage(prompt);
                    aiResponseText = result.response.text();

                    if (aiResponseText) {
                        console.log(`Successfully generated with: ${modelId}`);
                        break;
                    }
                } catch (err) {
                    lastError = err;
                    console.error(`Model ${modelId} failed: ${err.message}`);
                    // Continue to next backup model in the chain
                }
            }

            if (!aiResponseText && lastError) {
                throw lastError; // Rethrow if all models failed
            }

            // 6. Update Firestore Document with Response
            await snapshot.ref.update({
                response: aiResponseText,
                responseTimestamp: new Date(),
            });
        } catch (error) {
            console.error("Critical error in AI generation:", error);

            let userMessage = "I'm having a bit of trouble thinking right now. Please try again later.";

            // Specific 429 Quota handling (only shown if ALL fallbacks fail)
            if (error.status === 429 || error.message?.includes("429") || error.message?.includes("Quota")) {
                userMessage = "I'm taking a quick 60-second breather after helping many people! Please try again in a moment.";
            }

            await snapshot.ref.update({
                response: userMessage,
            });
        }
    },
);


// ==========================================
// 2. WHATSAPP ORDER CONFIRMATION FUNCTION
// ==========================================
// ==========================================
// 2. WHATSAPP ORDER CONFIRMATION FUNCTION
// ==========================================
exports.sendOrderConfirmationWhatsApp = onDocumentCreated(
    {
        // Listens ONLY to the 'orders' collection to prevent duplicate messages
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
        // Checks for userPhone first, falls back to userMobile just in case
        let phoneNumber = orderData.userPhone || orderData.userMobile;

        if (!phoneNumber) {
            console.error(`No phone number found for order ${event.params.orderId}`);
            return;
        }

        // 1. Clean the phone number (Convert to string FIRST, then strip everything except digits)
        phoneNumber = String(phoneNumber).replace(/\D/g, "");

        // 2. Strict Indian Number Validation
        if (phoneNumber.length === 10) {
            phoneNumber = "91" + phoneNumber;
        } else if (phoneNumber.length !== 12 || !phoneNumber.startsWith("91")) {
            console.log(`WhatsApp Skipped: Non-Indian phone number detected (${phoneNumber}) for order ${orderId}`);
            return;
        }

        const token = whatsappAccessToken.value();
        const phoneId = whatsappPhoneId.value();

        // --- EXTRACT ADDITIONAL VARIABLES FOR THE TEMPLATE ---
        // Variable 2: Services
        let servicesString = "Laundry Services";
        // Adapts based on how you store items. If it's an array of item objects:
        if (orderData.items && Array.isArray(orderData.items) && orderData.items.length > 0) {
            servicesString = orderData.items.map((item) => item.name || item.category || "Item").join(", ");
        } else if (orderData.serviceType) { // Or if it's a single string field
            servicesString = orderData.serviceType;
        }

        // Variable 3: Additional Details
        const orderDetailsString = `Order ID: ${orderId}`;
        // -----------------------------------------------------

        const META_API_VERSION = "v22.0";
        const url = `https://graph.facebook.com/${META_API_VERSION}/${phoneId}/messages`;

        const payload = {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "template",
            template: {
                name: "order_confirmation", // Exact Meta Template Name
                language: { code: "en" },
                components: [
                    {
                        type: "body",
                        parameters: [
                            { type: "text", text: customerName }, // {{1}} = Customer Name
                            { type: "text", text: servicesString }, // {{2}} = Services List
                            { type: "text", text: orderDetailsString }, // {{3}} = Order ID
                        ],
                    },
                ],
            },
        };

        console.log(`WhatsApp: Sending to ${phoneNumber} for order ${orderId}. Payload:`, JSON.stringify(payload));

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
                console.error(`WhatsApp API Error (HTTP ${response.status}):`, JSON.stringify(result));
                await snapshot.ref.update({
                    whatsappConfirmationSent: false,
                    whatsappError: JSON.stringify(result),
                });
            } else {
                console.log(`WhatsApp confirmation sent successfully to ${phoneNumber} for order ${orderId}. Response:`, JSON.stringify(result));
                await snapshot.ref.update({ whatsappConfirmationSent: true });
            }
        } catch (error) {
            console.error("Network error sending WhatsApp message:", error);
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
        // Ensure the user is authenticated with Firebase
        if (!request.auth || !request.auth.uid) {
            throw new HttpsError(
                "unauthenticated",
                "The function must be called while authenticated."
            );
        }

        const uid = request.auth.uid;
        const secret = intercomSecretKey.value();

        if (!secret) {
            console.error("INTERCOM_SECRET_KEY is not configured.");
            throw new HttpsError("internal", "Server misconfiguration.");
        }

        // Generate JWT token
        const payload = {
            user_id: uid,
            email: request.auth.token ? request.auth.token.email : "", 
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        return { intercom_user_jwt: token };
    }
);
