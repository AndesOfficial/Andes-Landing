import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Check if user is logged in (Firebase does this automatically)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && !user.isAnonymous) {
                // If a real (non-anonymous) user is logged in, fetch their name from Firestore
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCurrentUser({
                        uid: user.uid,
                        email: user.email,
                        ...docSnap.data()
                    });
                } else {
                    setCurrentUser({
                        uid: user.uid,
                        email: user.email
                    });
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // 2. Sign Up 
    const signup = async (name, email, password) => {
        try {
            console.log("Attempting to sign up user with email:", email);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            console.log("User created successfully:", user.uid);

            // Save the extra "Name" field to Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName: name,
                email: email,
                createdAt: new Date(),
                uid: user.uid
            });
            console.log("User profile saved to Firestore");

            return user;
        } catch (error) {
            console.error("Signup Error Details:", {
                code: error.code,
                message: error.message,
                fullError: error
            });
            throw error;
        }
    };

    // 3. Login
    const login = async (email, password) => {
        try {
            console.log("Attempting to login user:", email);
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully:", result.user.uid);
            return result;
        } catch (error) {
            console.error("Login Error Details:", {
                code: error.code,
                message: error.message,
                fullError: error
            });
            throw error;
        }
    };

    // 4. Logout
    const logout = () => {
        return signOut(auth);
    };

    // 5. Reset Password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // 6. Google Sign In
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    fullName: user.displayName,
                    email: user.email,
                    createdAt: new Date(),
                    uid: user.uid,
                    authProvider: "google"
                });
            }
            return user;
        } catch (error) {
            console.error("Google Sign In Error:", error);
            throw error;
        }
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        googleSignIn,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};