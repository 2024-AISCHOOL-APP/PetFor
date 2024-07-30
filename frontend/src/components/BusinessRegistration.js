import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessRegistration.css';
import { AuthContext } from '../AuthContext'; // AuthContext import
import axios from '../axios';

const BusinessRegistration = () => {
    const { isLoggedIn, userId } = useContext(AuthContext); // Get login status and userId from AuthContext
    const [storeName, setStoreName] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');
    const [is24Hour, setIs24Hour] = useState(''); // 24시 운영 여부
    const [averageCost, setAverageCost] = useState(''); // 평균 비용
    const [location, setLocation] = useState(''); // 지역 정보
    const [doctorNumber] = useState(''); // Assuming this should be set from somewhere else
    const [registerType] = useState(''); // Assuming this should be set from somewhere else
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login'); // Navigate to login page if not logged in
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/list/business', {
                userId: userId,
                storeName: storeName,
                doctorNumber: doctorNumber,
                businessNumber: businessNumber,
                registerType: registerType,
                is24Hour: is24Hour,
                averageCost: averageCost,
                location: location
            });
            console.log('등록 완료');
            response.data.success
                ? navigate('/register')
                : navigate('/business-registration');
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        navigate('/register-method');
    };

    return (
        <div className="business-registration-container">
            <button className="business-registration-back-button" onClick={handleBack}>←</button>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">사업장 이름</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="이름을 입력하세요"
                        required
                        value={storeName}
                        onChange={e => setStoreName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="business-number">사업자번호</label>
                    <input
                        type="text"
                        id="business-number"
                        placeholder="사업자번호를 입력하세요"
                        required
                        value={businessNumber}
                        onChange={e => setBusinessNumber(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="is24Hour">24시 운영 여부</label>
                    <select
                        id="is24Hour"
                        required
                        value={is24Hour}
                        onChange={e => setIs24Hour(e.target.value)}
                    >
                        <option value="">선택하세요</option>
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="averageCost">진료 평균 비용</label>
                    <input
                        type="number"
                        id="averageCost"
                        placeholder="1 ~ 500 (만원 단위)"
                        required
                        min="1"
                        max="500"
                        value={averageCost}
                        onChange={e => setAverageCost(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="location">지역</label>
                    <select
                        id="location"
                        required
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    >
                        <option value="">선택하세요</option>
                        <option value="서울특별시">서울특별시</option>
                        <option value="인천광역시">인천광역시</option>
                        <option value="경기도">경기도</option>
                        <option value="대전광역시">대전광역시</option>
                        <option value="세종특별자치시">세종특별자치시</option>
                        <option value="충청북도">충청북도</option>
                        <option value="충청남도">충청남도</option>
                        <option value="광주광역시">광주광역시</option>
                        <option value="전라북도">전라북도</option>
                        <option value="전라남도">전라남도</option>
                        <option value="부산광역시">부산광역시</option>
                        <option value="대구광역시">대구광역시</option>
                        <option value="울산광역시">울산광역시</option>
                        <option value="경상북도">경상북도</option>
                        <option value="경상남도">경상남도</option>
                        <option value="강원도">강원도</option>
                        <option value="제주특별자치도">제주특별자치도</option>
                    </select>
                </div>
                <button type="submit" className="bus-submit-button">등록</button>
            </form>
        </div>
    );
};

export default BusinessRegistration;
