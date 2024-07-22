import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from '../axios'

const Register = () => {
    // const businesses = [
    //     '서울 전문 동물병원',
    //     '재환 동물병원',
    //     '은영 동물병원',
    //     '현지 동물병원',
    //     '효주 동물병원',
    //     '민규 동물병원 폐업',
    //     '배고파',
    //     'ㅁㄴㅇㄴㅁㅇ',
    //     'ㄴㅁㅇㄴㅁㅇㄴㅁ',
    //     'ㄴㅁㅇㄴㅁ'
    // ];

    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        axios.post('/list/store')
            .then((response) => setBusinesses(response.data))
            .catch((error) => console.error('Error fetching businesses:', error));
    }, []);

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
                        {business.store_name}
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Register;
