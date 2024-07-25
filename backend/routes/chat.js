const express = require('express');
const router = express.Router();


router.post('/chatting', (req, res)=>{
    console.log(req.body);
    console.log('chatting');
})

module.exports = router;