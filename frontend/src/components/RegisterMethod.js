import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterMethod.css';

const RegisterMethod = () => {
    const nav = useNavigate();
    const handleBusinessRegistrationClick = () => { nav('/business-registration'); };
    const handleProfessionalCertificationClick = () => { nav('/professional-certification'); };
    const handleBackClick = () => { nav('/register'); };

    return (
        <div className="register-method-container">
            <button className="register-method-back-button" onClick={handleBackClick}>←</button>
            <button className="register-method-button" onClick={handleBusinessRegistrationClick}>사업자 등록증</button>
            <button className="register-method-button" onClick={handleProfessionalCertificationClick}>전문의 자격증</button>
        </div>
    );
};

export default RegisterMethod;
