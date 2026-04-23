import { Children, createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = async (formData) => {
        try {
            setLoading(true);
            setError(null);
            const res = await loginUser(formData);
            setUser(res.user);
            setToken(res.token);
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            return res;
        }catch(err){
            setError(err.response?.data?.message || "Login Failed");
            throw err;
        }finally{
            setLoading(false);
        }
    }

    const register = async (formData) => {
        try{
            setLoading(true);
            setError(null)
            const res = await registerUser(formData);
            return res;
        }catch(err){
            setError(err.response?.data?.message || "Register Failed");
            throw err;
        }finally{
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    return (
        <AuthContext.Provider
            value={{ user, token, login, register, logout, loading, error }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);