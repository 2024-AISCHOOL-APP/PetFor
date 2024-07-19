const express = require('express');
const router = express.Router();
// const conn = require('../config/database');

router.post('/handleSignIn', (req, res)=>{
    console.log('SignIn Data', req.body);
    // const {userId, userPw} = req.body;

    /*
    conn.query(sql, values, callback)
    */
    // const sql = `
    // SELECT user_id FROM linkdb_member
    // WHERE user_id=? AND user_pw=?
    // `
    // conn.query(sql, [userId, userPw], (err, rows)=>{
    //     // console.log(rows);
    //     if(rows.length>0){
    //         console.log('로그인 성공');
    //         req.session.user = rows[0];
    //         res.json({ success : true });
    //     } else {
    //         console.log('로그인 실패');
    //         res.json({ success : false });
    //     }
    // })
})

router.post('/handleSignUp', (req, res)=>{
    console.log('SignUp Data', req.body);
    // const {userId, userPw, userName, userAdd} = req.body;

    const sql = `INSERT INTO user_TB VALUES (?, ?, ?, ?)`;

    // conn.query(sql, [userId, userPw, userName, userAdd], (err, rows)=>{
    //     // console.log(rows);
    //     if(rows){
    //         console.log('회원가입 성공');
    //         res.json({success : true})
    //     } else {
    //         console.log('회원가입 실패');
    //         res.json({success : false})
    //     }
    // })
})

module.exports = router;