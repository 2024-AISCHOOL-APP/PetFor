const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log('main');
    res.sendFile(path.join(__dirname,'..' , '..', 'frontend', 'build', 'index.html'))
})

module.exports = router;