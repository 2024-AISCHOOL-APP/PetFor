import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?category1=${category1}&category2=${category2}`);
    };

    const category1Options = ['피부', '뼈, 관절', '눈', '귀', '이빨', '치매', '예방접종', '행동', '체중', '음식', '생식기관', '증상', '사고'];
    const category2Options = {
        '뼈, 관절': ['관절염', '슬개골 탈구', '골절','골 관절염'],
        '피부': ['가려움증', '발진','벗겨짐 및 비듬','탈모','상처','색소 침착','종양'],
        '눈': ['눈물 과다', '결막염','각막염','안구건조증','백내장','녹내장','이물질 침입'],
        '귀': ['가려움증', '냄새','붓기 및 염증','귀지 과다','귓속 통증','비정상적인 움직임','종양'],
        '이빨': ['치석 및 플라그', '치주염','입냄새','이빨 파손 또는 균열','잇몸 출혈','구강 감염','이빨의 움직임'],
        '치매': ['방향 감각 상실', '야행성 행동','기억력 저하','불안과 초조','식욕 변화','방광 및 장 문제'],
        '예방접종': ['생후 6~8주', '생후 12~16주','생후 6개월','1세 이후'],
        '행동': ['과도한 짖음', '분리불안','공격성','파괴적 ','식탐 및 음식 도둑질','불안감 및 두려움','실내 배변 문제'],
        '체중': ['체중 증가 (비만)', '체중 감소 (저체중)'],
        '음식': ['식욕 저하', '과식', '음식 알레르기 및 과민증','편식'],
        '생식기관': ['중성화', '생리', '임신','발정기','요로결석 '],
        '증상': ['헛기침', '코가 말랐어요', '복부 팽만','혈뇨','변비','설사','구토'],
        '사고': ['외상', '중독', '화상','찰과상','낙상 사고 ']
        
    };

    return (
        <main className="home">
            <nav className="buttons">
                <Link to="/register" className="button">등록 업체</Link>
                <Link to="/community" className="button">커뮤니티</Link>
                <Link to="/chat" className="button"> 채팅 </Link>
            </nav>
            
            <section className="category-container">
                <CategoryBox 
                    title="증상 선택" 
                    options={category1Options} 
                    selectedCategory={category1} 
                    onChange={(value) => {
                        setCategory1(value);
                        setCategory2(''); // 카테고리1 변경 시 카테고리2 초기화
                    }} 
                />
                <CategoryBox 
                    title="세부 선택" 
                    options={category1 && category2Options[category1] ? category2Options[category1] : []} 
                    selectedCategory={category2} 
                    onChange={setCategory2} 
                />
            </section>
            <section className="search-container">
                <button onClick={handleSearch}>카테고리 검색</button>
            </section>
        </main>
    );
}

function CategoryBox({ title, options, selectedCategory, onChange }) {
    return (
        <div className="category-box">
            <div className="category-box-header">
                <h3>{title}</h3>
            </div>
            <div className="category-box-content">
                <select 
                    value={selectedCategory} 
                    onChange={(e) => onChange(e.target.value)}
                    className="category-select"
                >
                    <option value="">-- 선택하세요 --</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Home;
