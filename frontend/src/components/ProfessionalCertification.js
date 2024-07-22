import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessionalCertification.css';

const ProfessionalCertification = () => {
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
        <div className="Professional-Certification-container">
            <button className="Professional-Certification-back-button" onClick={handleBack}>←</button>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" placeholder="이름을 입력하세요" required />
                </div>
                <div className="input-group">
                    <label htmlFor="certification-number">전문의번호</label>
                    <input type="text" id="certification-number" placeholder="전문의번호를 입력하세요" required />
                </div>
                <button type="submit" className="submit-button">등록</button>
            </form>
        </div>
    );
};

export default ProfessionalCertification;
