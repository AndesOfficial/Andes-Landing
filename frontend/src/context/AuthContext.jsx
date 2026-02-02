import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate checking for a logged-in user on mount
    useEffect(() => {
        const user = localStorage.getItem('andes_user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    const signup = async (name, email, password) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = { name, email, id: Date.now() };
                localStorage.setItem('andes_user', JSON.stringify(user));
                setCurrentUser(user);
                resolve(user);
            }, 1000);
        });
    };

    const login = async (email, password) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock login - accept any email/password for demo
                const user = { name: "Demo User", email, id: Date.now() };
                localStorage.setItem('andes_user', JSON.stringify(user));
                setCurrentUser(user);
                resolve(user);
            }, 1000);
        });
    };

    const logout = () => {
        localStorage.removeItem('andes_user');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
