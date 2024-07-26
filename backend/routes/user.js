const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const md5 = require('md5');

router.post('/handleSignIn', (req, res)=>{
    const {userId, userPw} = req.body;
    const hashPw = md5(userPw);
    /*
    conn.query(sql, values, callback)
    */
    const sql = `SELECT user_id, nickname FROM user WHERE user_id=? AND pw=?`;

    conn.query(sql, [userId, hashPw], (err, rows)=>{
        if(rows.length>0){
            req.session.user = {
                id: rows[0].user_id,
                nickname: rows[0].nickname
            };
            res.json({ success : true, nickname: rows[0].nickname  });
        } else {
            console.log('로그인 실패');
            res.json({ success : false });
        }
    })
})

router.post('/handleSignUp', (req, res)=>{
    const {userId, userPw, userNickname, userProfile, userType} = req.body;
    const hashPw = md5(userPw);

    const sql = `INSERT INTO user VALUES (?, ?, ?, ?, current_timestamp(), ?)`;

    conn.query(sql, [userId, hashPw, userNickname, userType, userProfile], (err, rows)=>{
        if(rows){
            res.json({success : true})
        } else {
            console.error(err);
            res.json({success : false})
        }
    })
})

// 세션확인 : 로그인 상태 확인
router.get('/checkSession', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, nickname: req.session.user.nickname });
    } else {
        res.json({ loggedIn: false });
    }
});

// 로그아웃 요청 처리 라우터
router.post('/handleLogout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

module.exports = router;