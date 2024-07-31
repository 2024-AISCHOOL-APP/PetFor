import React, { createContext, useState, useEffect } from 'react';
import axios from './axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [nickname, setNickname] = useState(null);

    useEffect(() => {
        axios.get('/user/checkSession')
            .then(response => {
                if (response.data.loggedIn) {
                    const storedUserId = localStorage.getItem('user_id');
                    const storedNickname = localStorage.getItem('nickname');
                    if (storedUserId && storedNickname) {
                        setIsLoggedIn(true);
                        setUserId(storedUserId);
                        setNickname(storedNickname);
                    }
                }
            })
            .catch(error => console.error('Error checking session:', error));
    }, []);
    const login = (userId, nickname) => {
        setIsLoggedIn(true);
        setUserId(userId);
        setNickname(nickname);
        localStorage.setItem('user_id', userId);
        localStorage.setItem('nickname', nickname);
    };
    const logout = () => {
        axios.post('/user/handleLogout')
            .then(response => {
                if (response.data.success) {
                    setIsLoggedIn(false);
                    setUserId(null);
                    setNickname(null);
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('nickname');
                }
            })
            .catch(error => console.error('Logout error:', error));
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, nickname,  login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
