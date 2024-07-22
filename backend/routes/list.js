const express = require('express');
const router = express.Router();
const conn = require('../config/database');

router.post('/store',(req,res)=>{
    console.log('store data',req.body);

    let sql = 'SELECT store_name FROM register';
    conn.query(sql,(err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
})

module.exports = router;