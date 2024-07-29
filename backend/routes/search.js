const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const url = require('url');
const axios = require('axios');


router.get('/searchpage', (req, res) => {
    const { keyword1, keyword2 } = url.parse(req.url, true).query;
    
    if (!keyword1 || !keyword2) {
        return res.status(400).json({ error: 'keyword1 and keyword2 are required' });
    }

    let sql = 'SELECT symptom, cause, solution FROM search WHERE keyword1 = ? AND keyword2 = ?';
    conn.query(sql, [keyword1, keyword2], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

const fastApiClient = axios.create({
    baseURL: 'http://127.0.0.1:8500', // FastAPI 서버 URL
  });
  
  router.post('/searching', async (req, res) => {
      const { prompt } = req.body;
      try {
          const response = await fastApiClient.post('/generate', { prompt });
          console.log('FastAPI 응답:', response.data); // 응답 데이터 로그
          res.json(response.data);
      } catch (error) {
          console.error('Error communicating with FastAPI server:', error); // 에러 로깅 추가
          res.status(500).send('Error communicating with FastAPI server');
      }
  });

module.exports = router;
