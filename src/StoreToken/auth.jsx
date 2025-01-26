import React, { useContext, useState } from 'react'
import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token , setToken ] = useState(localStorage.getItem("token"));


    const storeTokenLs = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    };


    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ storeTokenLs , LogoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error ("use Auth is used outside of the provider");
    }

    return authContextValue;
}

