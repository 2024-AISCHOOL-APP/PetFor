import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessRegistration.css';

const BusinessRegistration = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 등록 로직 처리
        console.log('등록 완료');
    };

    const handleBack = () => {
        navigate('/register-method');
    };

    return (
        <div className="business-registration-container">
            <button className="business-registration-back-button" onClick={handleBack}>←</button>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" placeholder="이름을 입력하세요" required />
                </div>
                <div className="input-group">
                    <label htmlFor="registration-number">주민등록번호</label>
                    <input type="text" id="registration-number" placeholder="주민등록번호를 입력하세요" required />
                </div>
                <div className="input-group">
                    <label htmlFor="business-number">사업자번호</label>
                    <input type="text" id="business-number" placeholder="사업자번호를 입력하세요" required />
                </div>
                <button type="submit" className="submit-button">등록</button>
            </form>
        </div>
    );
};

export default BusinessRegistration;
