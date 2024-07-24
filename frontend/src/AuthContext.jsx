import React, { createContext, useState, useEffect } from 'react';
import axios from './axios'; // API 호출을 위한 axios 인스턴스

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [nickname, setNickname] = useState(null); // 닉네임 상태 추가

    useEffect(() => {
        // 초기 렌더링 시 로그인 상태 확인
        axios.get('/user/checkSession')
            .then(response => {
                if (response.data.loggedIn) {
                    const storedUserId = localStorage.getItem('user_id');
                    const storedNickname = localStorage.getItem('nickname');
                    if (storedUserId && storedNickname) {
                        setIsLoggedIn(true);
                        setUserId(storedUserId);
                        setNickname(storedNickname); // 닉네임 설정
                    }
                }
            })
            .catch(error => console.error('Error checking session:', error));
    }, []);

    const login = (userId, nickname) => {
        setIsLoggedIn(true);
        setUserId(userId);
        setNickname(nickname); // 닉네임 설정
        localStorage.setItem('user_id', userId);
        localStorage.setItem('nickname', nickname); // 닉네임 저장
    };

    const logout = () => {
        axios.post('/user/handleLogout')
            .then(response => {
                if (response.data.success) {
                    setIsLoggedIn(false);
                    setUserId(null);
                    setNickname(null); // 닉네임 초기화
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('nickname'); // 닉네임 제거
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
