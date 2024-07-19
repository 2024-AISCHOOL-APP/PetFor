import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterMethod.css';

const RegisterMethod = () => {
    const navigate = useNavigate();

    const handleBusinessRegistrationClick = () => {
        navigate('/business-registration');
    };

    const handleProfessionalCertificationClick = () => {
        navigate('/professional-certification');
    };

    const handleBackClick = () => {
        navigate('/register');
    };

    return (
        <div className="register-method-container">
            <button className="register-method-back-button" onClick={handleBackClick}>←</button>
            <button className="register-method-button" onClick={handleBusinessRegistrationClick}>사업자 등록증</button>
            <button className="register-method-button" onClick={handleProfessionalCertificationClick}>전문의 자격증</button>
        </div>
    );
};

export default RegisterMethod;
