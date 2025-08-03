import { createContext, useContext, useEffect, useState } from "react";


//create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

//use the context
export const AuthProvider = ({ children }) =>{

    const [name, setName] = useState(null);

    const login = (accessToken, refreshToken) => {
        console.log("Setting tokens:", { accessToken, refreshToken });
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        // Verify tokens are set
        const storedAccess = localStorage.getItem("accessToken");
        const storedRefresh = localStorage.getItem("refreshToken");
        console.log("Stored tokens:", { storedAccess, storedRefresh });

    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setName(null);
        window.location.href = "/login";
    }


    return (
        <AuthContext.Provider value={{name, setName, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

};