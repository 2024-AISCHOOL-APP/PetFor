import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const businesses = [
        '서울 전문 동물병원',
        '재환 동물병원',
        '은영 동물병원',
        '현지 동물병원',
        '효주 동물병원',
        '민규 동물병원 폐업',
        '배고파',
        'ㅁㄴㅇㄴㅁㅇ',
        'ㄴㅁㅇㄴㅁㅇㄴㅁ',
        'ㄴㅁㅇㄴㅁ'
    ];

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register-method');
    };

    return (
        <main className="register-container">
            <button className="register-button" onClick={handleRegisterClick}>업체 등록</button>
            <section className="business-list">
                {businesses.map((business, index) => (
                    <article key={index} className="business-item">
                        {business}
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Register;
