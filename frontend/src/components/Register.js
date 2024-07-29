import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from '../axios'

const Register = () => {
    const [businesses, setBusinesses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6; // 페이지당 항목 수를 6으로 설정
    const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹을 관리할 상태 추가
    const buttonsPerGroup = 10; // 한 페이지 그룹당 버튼 수를 10으로 설정

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
        setPageGroup(Math.floor((pageNumber - 1) / buttonsPerGroup)); // 페이지 그룹을 업데이트
    };

    const handleNextGroup = () => {
        if ((pageGroup + 1) * buttonsPerGroup < totalPages) {
            setPageGroup(pageGroup + 1);
        }
    };

    const handlePrevGroup = () => {
        if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
        }
    };

    const renderPageButtons = () => {
        const startPage = pageGroup * buttonsPerGroup + 1;
        const endPage = Math.min(startPage + buttonsPerGroup - 1, totalPages);
        const pageButtons = [];
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-button2 ${i === currentPage ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

    return (
        <main className="register-container">
            <button className="register-button" onClick={handleRegisterClick}>업체 등록</button>
            <section className="business-list">
                {businesses.map((business, index) => (
                    <article key={index} className="business-item">
                        <p className='indexNumber'>{index + 1 + (currentPage - 1) * itemsPerPage}</p>
                        <h3 className="business-name">{business.store_name}</h3>
                    </article>
                ))}
            </section>
            <section className="pagination">
                <button
                    onClick={handlePrevGroup}
                    disabled={pageGroup === 0}
                    className='pre'
                >
                    이전
                </button>
                {renderPageButtons()}
                <button
                    onClick={handleNextGroup}
                    disabled={(pageGroup + 1 * buttonsPerGroup >= totalPages)}
                    className='next'
                >
                    
                    다음
                </button>
            </section>
            
        </main>
    );
};

export default Register;
