// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from "../clientModels/user.model";
import { TokenResponse } from '../clientModels/tokenResponse.model';
import axiosInstance from '../network/axiosInstance';


interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User | null) => void;
    handleLogin: (tokenResponse: TokenResponse, source: string) => void;
    handleLogout: () => void;
    authSource: string;
    authLoading: boolean;
}

const AuthContextInitialValue: AuthContextType = {
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: () => { },
    setUser: () => { },
    handleLogin: () => { },
    handleLogout: () => { },
    authSource: "",
    authLoading: true,
};

const AuthContext = createContext<AuthContextType>(AuthContextInitialValue);

interface AuthProviderProps {
    children: ReactNode;
}

// provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [authSource, setAuthSource] = useState<string>("");
    const [authLoading, setAuthLoading] = useState<boolean>(true);

    useEffect(() => {
        setAuthLoading(true);
        const user = localStorage.getItem("user");
        const source = localStorage.getItem("source");
        if (user && source) {
            setUser(JSON.parse(user));
            setAuthSource(source);
            setIsAuthenticated(true);
        }
        else {
            setUser(null);
            setAuthSource("");
            setIsAuthenticated(false);
        }
        setAuthLoading(false);
    }, [])

    const handleLogin = async (tokenResponse: TokenResponse, source: string) => {
        setAuthSource(source);
        localStorage.setItem(`accessToken`, JSON.stringify(tokenResponse.access_token));
        try {
            const response = await axiosInstance.post(`/auth/${source}`, { token: tokenResponse.access_token });
            console.log(response)
            if (response.data) {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("source", JSON.stringify(source));
                setIsAuthenticated(true);
            }
            else {
                console.error("Unable to login");
            }
        }
        catch (err) {
            console.error(err);
        }

    }

    const handleLogout = () => {
        try {
            axiosInstance.post("/auth/logout");
        }
        catch (err) {
            console.log(err);
        }
        setUser(null);
        setAuthSource("");
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('source');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, handleLogin, authSource, handleLogout ,authLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
