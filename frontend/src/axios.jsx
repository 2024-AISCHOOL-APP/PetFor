import axios from 'axios';

// 8-1. axios 설정
const instance = axios.create({
    baseURL : 'http://localhost:8000'
})

export default instance;