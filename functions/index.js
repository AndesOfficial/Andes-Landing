const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { defineSecret } = require("firebase-functions/params");

initializeApp();

// Define the secret parameter
const geminiApiKey = defineSecret("GEMINI_API_KEY");

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
| Iron Only      | ₹12/item      |

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
`;

exports.chatWithGemini = onDocumentCreated(
    {
        document: "users/{userId}/messages/{messageId}",
        secrets: [geminiApiKey],
        region: "us-central1" // Optional: Specify region if needed, defaults to us-central1
    },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) {
            return; // No data found
        }

        const data = snapshot.data();
        const { prompt, response } = data;

        // 1. Idempotency Check: If response already exists, skip
        if (response) {
            return;
        }

        try {
            // 2. Initialize Gemini
            const apiKey = geminiApiKey.value();
            if (!apiKey) {
                console.error("GEMINI_API_KEY not set");
                await snapshot.ref.update({
                    response: "I'm having technical trouble (API Key missing). Please contact support."
                });
                return;
            }
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-lite",
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 300,
                },
            });

            // 3. Fetch Conversation History (Last 10 messages)
            // We need to query the parent collection 'messages' of this document
            const messagesRef = snapshot.ref.parent;
            const historySnapshot = await messagesRef
                .orderBy("createTime", "desc") // Get newest first
                .limit(10)
                .get();

            // Re-order to oldest first for the AI context
            const historyDocs = historySnapshot.docs.reverse();

            // Transform to Gemini format
            const history = historyDocs
                .filter((doc) => doc.id !== snapshot.id) // Exclude current message from history to avoid confusion
                .map((doc) => {
                    const d = doc.data();
                    const parts = [];
                    if (d.prompt) parts.push({ role: "user", parts: [{ text: d.prompt }] });
                    if (d.response) parts.push({ role: "model", parts: [{ text: d.response }] });
                    return parts;
                })
                .flat();

            // 4. Start Chat
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Understood. I am Andy. Ready to help!" }],
                    },
                    ...history
                ],
            });

            // 5. Generate Content
            const result = await chat.sendMessage(prompt);
            const aiResponseText = result.response.text();

            // 6. Update Firestore Document with Response
            await snapshot.ref.update({
                response: aiResponseText,
                responseTimestamp: new Date()
            });
        } catch (error) {
            console.error("Error generating AI response:", error);
            await snapshot.ref.update({
                response: "I'm having a bit of trouble thinking right now. Please try again later."
            });
        }
    }
);
