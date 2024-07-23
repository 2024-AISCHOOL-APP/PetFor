import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessRegistration.css';
// import { useContext } from 'react';
// import { UserInfo } from '../UserInfo';
import axios from '../axios';

const BusinessRegistration = () => {
    //const { userId } = useContext(UserInfo);
    const userId = '은영' // 로그인 완료되면 userId 받아오기
    const [storeName, setStoreName] = useState('');
    const [doctorNumber] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');
    const [registerType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
       try{ e.preventDefault();
        // 등록 로직 처리
        const response = await axios.post('/list/business',{
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
}

    const handleBack = () => {
        navigate('/register-method');
    };

    return (
        <div className="business-registration-container">
            <button className="business-registration-back-button" onClick={handleBack}>←</button>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">사업장 이름</label>
                    <input type="text" id="name" placeholder="이름을 입력하세요" required 
                    onChange={e=>setStoreName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label htmlFor="business-number">사업자번호</label>
                    <input type="text" id="business-number" placeholder="사업자번호를 입력하세요" required 
                    onChange={e=>setBusinessNumber(e.target.value)}/>
                </div>
                <button type="submit" className="submit-button">등록</button>
            </form>
        </div>
    );
};

export default BusinessRegistration;
