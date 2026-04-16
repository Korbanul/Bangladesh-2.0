"use client";
import { userProfile } from "@/Components/Auth/userService";
import { createContext, use, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null); //Creating a Context API
export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userProfile();
                setUser(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const isAdmin = () => user?.roles?.includes("ROLE_ADMIN");
    const isUser = () => user?.roles?.includes("ROLE_USER");

    //     user?.roles→ safely access roles array, if user is null → returns undefined(no crash)
    //         .includes("ROLE_ADMIN") → checks if "ROLE_ADMIN" exists in the array
    // returns true or false

    //After userDetails edit need to call this.
    const refreshUser = async () => {
        const data = await userProfile();
        setUser(data);
        return data;
    };

    // call this after logout — clears user from context
    const clearUser=()=>setUser(null);


    return (
        <AuthContext.Provider value={{user,isAdmin,isUser,isLoading,refreshUser,clearUser}}>
            {children}
        </AuthContext.Provider>
    );

    
}
export const useAuth = () => useContext(AuthContext); //Accessing a Context API by useContext
