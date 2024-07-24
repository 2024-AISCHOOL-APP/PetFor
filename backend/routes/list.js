const express = require('express');
const router = express.Router();
const conn = require('../config/database');

router.post('/store', (req, res) => {
    console.log('store data', req.body);

    let sql = 'SELECT store_name FROM register WHERE business_number IS NOT NULL';
    conn.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
});

router.post('/business', (req, res) => {
    console.log('business Data', req.body);
    const { userId, storeName, doctorNumber, businessNumber, registerType } = req.body;

    const sql = `SELECT * FROM register WHERE user_id = ?`;
    conn.query(sql, [userId], (err, rows) => {
        console.log('rows : ', rows);
        if (rows.length > 0) {
            const sql = `SELECT register_type FROM register WHERE user_id = ?`;
            conn.query(sql, [userId], (err, rows) => {
                const register_type = rows[0].register_type;
                if (register_type === 'B') {
                    const sql = `UPDATE register SET business_number = ?, store_name = ? WHERE user_id = ?`;
                    conn.query(sql, [businessNumber, storeName, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                } else {
                    const sql = `UPDATE register SET register_type = 'C', business_number = ? WHERE user_id = ?`;
                    conn.query(sql, [businessNumber, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                }
            });
        } else {
            const sql = `INSERT INTO register(user_id, store_name, business_number, register_type, register_date) VALUES (?, ?, ?, 'B', current_timestamp())`;

            conn.query(sql, [userId, storeName, businessNumber], (err, rows) => {
                if (rows) {
                    res.json({ success: true });
                } else {
                    console.error(err);
                    res.json({ success: false });
                }
            });
        }
    });
});

router.post('/professional', (req, res) => {
    console.log('professional Data', req.body);
    const { userId, storeName, doctorNumber, businessNumber, registerType } = req.body;

    const sql = `SELECT * FROM register WHERE user_id = ?`;
    conn.query(sql, [userId], (err, rows) => {
        if (rows.length > 0) {
            const sql = `SELECT register_type FROM register WHERE user_id = ?`;
            conn.query(sql, [userId], (err, rows) => {
                const register_type = rows[0].register_type;
                if (register_type === 'D') {
                    const sql = `UPDATE register SET doctor_number = ?, store_name = ? WHERE user_id = ?`;
                    conn.query(sql, [doctorNumber, storeName, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                } else {
                    const sql = `UPDATE register SET register_type = 'C', doctor_number = ? WHERE user_id = ?`;
                    conn.query(sql, [doctorNumber, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                }
            });
        } else {
            const sql = `INSERT INTO register(user_id, store_name, doctor_number, register_type, register_date) VALUES (?, ?, ?, 'D', current_timestamp())`;

            conn.query(sql, [userId, storeName, doctorNumber], (err, rows) => {
                if (rows) {
                    res.json({ success: true });
                } else {
                    console.error(err);
                    res.json({ success: false });
                }
            });
        }
    });
});

router.post('/post', (req, res) => {
    let sql = 'SELECT * FROM community ORDER BY posting_date DESC';
    conn.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
});

router.post('/writepost', (req, res) => {
    let sql = `INSERT INTO community (user_id, title, content, posting_date) VALUES (?, ?, ?, current_timestamp())`;
    conn.query(sql, [req.body.userId, req.body.title, req.body.content], (err, rows) => {
        if (err) {
            res.json({ success: false });
            return res.status(500).send(err);
        }
        res.json({ success: true });
    });
});

// 포스트 세부 정보 가져오기
router.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const sql = 'SELECT * FROM community WHERE community_idx = ?';

    conn.query(sql, [postId], (error, rows) => {
        if (error) {
            console.error('Error fetching post details: ', error);
            return res.status(500).json({ error: 'An error occurred' });
        }
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    });
});

module.exports = router;
