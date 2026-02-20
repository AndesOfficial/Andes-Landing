const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { defineSecret } = require("firebase-functions/params");

initializeApp();

// Define the secret parameter
const geminiApiKey = defineSecret("GEMINI_API_KEY");

const SYSTEM_PROMPT = `
You are Andy, the friendly and efficient laundry assistant for Andes Laundry.
Your goal is to help customers schedule pickups, check prices, and answer service questions.

**Key Information:**
- **Service Areas:** Pune only (Baner, Aundh, Koregaon Park, Viman Nagar, Wakad, Hinjewadi, Magarpatta, Kalyani Nagar, Kharadi).
- **Pricing:**
  - Wash & Fold: ₹59/kg
  - Wash & Iron: Starts @ ₹79/kg
  - Dry Cleaning: Starts @ ₹139/piece
  - Shoe Cleaning: Starts @ ₹259/pair
- **Support:** Call +91 86260 76578 or email care@andes.co.in.

**Guidelines:**
- Keep responses short, friendly, and helpful.
- If a user wants to book, guide them to the booking page.
- If asked about areas outside Pune, politely decline and say we hope to expand soon.
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
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
