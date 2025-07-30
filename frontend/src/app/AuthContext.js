import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${decoded.user_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data);
                    // console.log(response.data);
                    
                } catch (err) {
                    console.error("User fetch failed", err);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        setUser(userData.user || userData); // Handle different API response structures
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    // if (loading) {
    //     return <div>Loading authentication...</div>;
    // }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);