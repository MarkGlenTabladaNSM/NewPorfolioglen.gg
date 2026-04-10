import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLogin = localStorage.getItem('portfolio_auth');
        if (storedLogin === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (email, password) => {
        if (email === 'markglentablada55@gmail.com' && password === 'M4rkgl3n#19') {
            setIsLoggedIn(true);
            localStorage.setItem('portfolio_auth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('portfolio_auth');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
