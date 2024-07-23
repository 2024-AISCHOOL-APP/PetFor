const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const url = require('url');

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

module.exports = router;
