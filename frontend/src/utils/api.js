import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { initializeApp, getApps, getApp } from "firebase/app";

// Ensure Firebase is initialized (usually done in distinct file like firebase.js, but adding check here)
// Assuming user has a firebase.js or similar where app is initialized, but if not:
// We need to know where `app` is exported from. 
// I'll check if there is a firebase config file in src.

// If not found, I'll Initialize it here for now using env vars.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Singleton pattern to reuse app instance if already initialized elsewhere
// But for now, let's just init.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const functions = getFunctions(app);



export const sendToGemini = async (message, history = []) => {
    try {
        const chatWithGemini = httpsCallable(functions, 'chatWithGemini');
        const result = await chatWithGemini({ message, history });
        return result.data;
    } catch (error) {
        console.error("Error calling Gemini function:", error);
        throw error;
    }
};
