import React from 'react';
import './SearchResults.css';

const SearchResults = () => {
    const results = [
        { title: '검색 결과 1', description: '검색 결과 1의 설명입니다.' },
        { title: '검색 결과 2', description: '검색 결과 2의 설명입니다.' },
        { title: '검색 결과 3', description: '검색 결과 3의 설명입니다.' },
        { title: '검색 결과 4', description: '검색 결과 4의 설명입니다.' },
        { title: '검색 결과 5', description: '검색 결과 5의 설명입니다.' },
        { title: '검색 결과 6', description: '검색 결과 6의 설명입니다.' },
        { title: '검색 결과 7', description: '검색 결과 7의 설명입니다.' },
        { title: '검색 결과 8', description: '검색 결과 8의 설명입니다.' },
        { title: '검색 결과 9', description: '검색 결과 9의 설명입니다.' },
        { title: '검색 결과 10', description: '검색 결과 10의 설명입니다.' },
        { title: '검색 결과 11', description: '검색 결과 11의 설명입니다.' },
        { title: '검색 결과 12', description: '검색 결과 12의 설명입니다.' },
    ];

    return (
        <main className="search-results-container">
            <h2>검색 결과</h2>
            <section className="results-list">
                {results.map((result, index) => (
                    <article key={index} className="result-item">
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default SearchResults;
