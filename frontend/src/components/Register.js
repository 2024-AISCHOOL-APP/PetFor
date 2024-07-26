import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from '../axios'

const Register = () => {
    const [businesses, setBusinesses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6; // 페이지당 항목 수를 6으로 설정

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.post('/list/store', {
                    page: currentPage,
                    limit: itemsPerPage
                });
                setBusinesses(response.data.rows);
                setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };

        fetchBusinesses();
    }, [currentPage]);

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register-method');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            <section className="pagination">
            <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='pre'
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button2 ${index + 1 === currentPage ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                    
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='next'
                >
                    Next
                </button>
            </section>
            
        </main>
    );
};

export default Register;
