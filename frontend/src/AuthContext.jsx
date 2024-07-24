import React, { createContext, useState, useEffect } from 'react';
import axios from './axios'; // API 호출을 위한 axios 인스턴스

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // 초기 렌더링 시 로그인 상태 확인
        axios.get('/user/checkSession')
            .then(response => {
                if (response.data.loggedIn) {
                    const storedUserId = localStorage.getItem('user_id');
                    if (storedUserId) {
                        setIsLoggedIn(true);
                        setUserId(storedUserId);
                    }
                }
            })
            .catch(error => console.error('Error checking session:', error));
    }, []);

    const login = (userId) => {
        setIsLoggedIn(true);
        setUserId(userId);
        localStorage.setItem('user_id', userId);
    };

    const logout = () => {
        axios.post('/user/handleLogout')
            .then(response => {
                if (response.data.success) {
                    setIsLoggedIn(false);
                    setUserId(null);
                    localStorage.removeItem('user_id');
                }
            })
            .catch(error => console.error('Logout error:', error));
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
