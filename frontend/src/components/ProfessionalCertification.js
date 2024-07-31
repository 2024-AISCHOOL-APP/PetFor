import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessionalCertification.css';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from '../axios';

const ProfessionalCertification = () => {
    const nav = useNavigate();
    const { isLoggedIn, userId } = useContext(AuthContext);
    const [storeName, setStoreName] = useState('');
    const [doctorNumber, setDoctorNumber] = useState('');
    const [businessNumber] = useState('');
    const [registerType] = useState('');
    
    useEffect(() => { if (!isLoggedIn) { nav('/login'); } }, [isLoggedIn, nav]);
    const handleSubmit = async (e) => {
        try{ e.preventDefault();
            const response = await axios.post('/list/professional',{
                userId: userId,
                storeName : storeName,
                doctorNumber : doctorNumber,
                businessNumber : businessNumber,
                registerType : registerType
            })
            response.data.success
            ?nav('/register')
            :nav('/business-registration')
        } catch(error) {
            console.error(error);
        }
    };
    const handleBack = () => { nav('/register-method'); };

    return (
        <div className="Professional-Certification-container">
            <button className="Professional-Certification-back-button" onClick={handleBack}>←</button>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" placeholder="이름을 입력하세요" required onChange={e=>setStoreName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label htmlFor="certification-number">전문의번호</label>
                    <input type="text" id="certification-number" placeholder="전문의번호를 입력하세요" required onChange={e=>setDoctorNumber(e.target.value)} />
                </div>
                <button type="submit" className="pro-submit-button">등록</button>
            </form>
        </div>
    );
};

export default ProfessionalCertification;
