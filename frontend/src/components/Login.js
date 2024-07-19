import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 로직 처리
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <main className="login-container">
            <form onSubmit={handleSubmit}>
                <fieldset className="input-group">
                    <label htmlFor="email">아이디:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </fieldset>
                <fieldset className="input-group">
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </fieldset>
                <button type="submit" className="submit-button">Log in</button>
            </form>
        </main>
    );
}

export default Login;
