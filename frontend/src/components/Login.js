import React, { useContext } from 'react';
import './Login.css';
import { UserInfo } from '../UserInfo';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   
    const { userId, setUserId, userPw, setUserPw } = useContext(UserInfo);
    const nav = useNavigate(); 

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 기본 동작 방지
        try {
            const response = await axios.post('/user/handleSignin', {
                userId: userId,
                userPw: userPw
            });

            // 로그인 성공 시 홈 페이지로 리다이렉트
            response.data.success
                ? nav('/')
                : nav('/login'); 
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
        }
    };

    return (
        <main className="login-container">
            <form onSubmit={handleSubmit}>
                <fieldset className="input-group">
                    <label htmlFor="loginId">아이디:</label>
                    <input
                        type="text"
                        id="loginId"
                        placeholder="ID"
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </fieldset>
                <fieldset className="input-group">
                    <label htmlFor="loginPw">비밀번호:</label>
                    <input
                        type="password"
                        id="loginPw"
                        placeholder="Password"
                        onChange={(e) => setUserPw(e.target.value)}
                        required
                    />
                </fieldset>
                <button type="submit" className="submit-button">Log in</button> 
            </form>
        </main>
    );
}

export default Login;
