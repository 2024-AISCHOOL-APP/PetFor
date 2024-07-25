import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessionalCertification.css';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // AuthContext import
import axios from '../axios';

const ProfessionalCertification = () => {
    const { isLoggedIn, userId } = useContext(AuthContext); // AuthContext에서 로그인 상태와 userId 가져오기
    const [storeName, setStoreName] = useState('');
    const [doctorNumber, setDoctorNumber] = useState('');
    const [businessNumber] = useState('');
    const [registerType] = useState('');
    
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login'); // 로그인하지 않은 경우 로그인 페이지로 이동
        }
    }, [isLoggedIn, navigate]);

    
    const handleSubmit = async (e) => {
        try{ e.preventDefault();
            // 등록 로직 처리
            const response = await axios.post('/list/professional',{
                userId: userId,
                storeName : storeName,
                doctorNumber : doctorNumber,
                businessNumber : businessNumber,
                registerType : registerType
            })
            console.log('등록 완료');
            response.data.success
            ?navigate('/register')
            :navigate('/business-registration')
        } catch(error) {
            console.error(error);
        }
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
                    <input type="text" id="name" placeholder="이름을 입력하세요" required 
                    onChange={e=>setStoreName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label htmlFor="certification-number">전문의번호</label>
                    <input type="text" id="certification-number" placeholder="전문의번호를 입력하세요" required
                    onChange={e=>setDoctorNumber(e.target.value)} />
                </div>
                <button type="submit" className="pro-submit-button">등록</button>
            </form>
        </div>
    );
};

export default ProfessionalCertification;
