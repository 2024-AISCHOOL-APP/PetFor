const express = require('express');
const router = express.Router();
const conn = require('../config/database');

router.post('/store',(req,res)=>{
    console.log('store data',req.body);

    let sql = 'SELECT store_name FROM register where business_number IS NOT NULL';
    conn.query(sql,(err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
})

router.post('/business', (req, res)=>{
    console.log('business Data', req.body);
    const {userId, storeName, doctorNumber, businessNumber, registerType} = req.body;

    const sql = `SELECT * FROM register WHERE user_id = ?`
    conn.query(sql, [userId], (err, rows)=>{
        console.log('rows : ', rows);
        if (rows.length>0) {
            const sql = `UPDATE register SET register_type = 'C' , business_number = ? WHERE user_id = ?`
            conn.query(sql,[businessNumber,userId],(err,rows)=>{
                if (rows) {
                    res.json({ success: true })
                } else {
                    console.error(err);
                    res.json({ success: false })
                }
            })
        } else {
            const sql = `INSERT INTO register(user_id,store_name,business_number,register_type,register_date) VALUES (?, ?, ?, 'B' ,current_timestamp())`;

            conn.query(sql, [userId, storeName, businessNumber], (err, rows) => {
                if (rows) {
                    res.json({ success: true })
                } else {
                    console.error(err);
                    res.json({ success: false })
                }
            })
        }
    })
    
})

router.post('/professional', (req, res)=>{
    console.log('professional Data', req.body);
    const {userId, storeName, doctorNumber, businessNumber, registerType} = req.body;

    const sql = `SELECT * FROM register WHERE user_id = ?`
    conn.query(sql, [userId], (err, rows)=>{
        console.log('rows : ', rows);
        if (rows.length>0) {
            const sql = `UPDATE register SET register_type = 'C' , doctor_number = ? WHERE user_id = ?`
            conn.query(sql,[doctorNumber,userId],(err,rows)=>{
                if (rows) {
                    res.json({ success: true })
                } else {
                    console.error(err);
                    res.json({ success: false })
                }
            })
        } else {
            const sql = `INSERT INTO register(user_id,store_name,doctor_number,register_type,register_date) VALUES (?, ?, ?, 'D' ,current_timestamp())`;

            conn.query(sql, [userId, storeName, doctorNumber], (err, rows) => {
                if (rows) {
                    res.json({ success: true })
                } else {
                    console.error(err);
                    res.json({ success: false })
                }
            })
        }
    })
    

    
})

module.exports = router;