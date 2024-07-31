import React, { useContext } from 'react';
import './Login.css';
import { UserInfo } from '../UserInfo';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Login = () => {
    const nav = useNavigate(); 
    const { userId, setUserId, userPw, setUserPw } = useContext(UserInfo);
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/handleSignin', { userId: userId, userPw: userPw });
            if (response.data.success) {
                login(userId, response.data.nickname);
                nav('/');
            } else {
                nav('/login');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
        }
    };

    return (
        <main className="login-container">
            <form onSubmit={handleSubmit}>
                <fieldset className="input-group">
                    <label htmlFor="loginId">아이디:</label>
                    <input className='login-input' type="text" id="loginId" placeholder="ID" onChange={(e) => setUserId(e.target.value)} required />
                </fieldset>
                <fieldset className="input-group">
                    <label htmlFor="loginPw">비밀번호:</label>
                    <input className='login-input' type="password" id="loginPw" placeholder="Password" onChange={(e) => setUserPw(e.target.value)} required />
                </fieldset>
                <button type="submit" className="login-submit-button">로그인</button> 
            </form>
        </main>
    );
}

export default Login;
