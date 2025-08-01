import { createContext, useContext, useEffect, useState } from "react";


//create the context
const AuthContext = createContext();
export const useAuth = useContext(AuthContext);
//use the context
export const AuthProvider = ({ children }) =>{

    const [name, setName] = useState(null);

    const login = (accessToken, refreshToken) => {
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

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