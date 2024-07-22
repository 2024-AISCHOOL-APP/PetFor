const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const fileStore = require('session-file-store')(session);

const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const listRouter = require('./routes/list')

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use(express.json());

app.use(cors());

app.use(session({
    store : new fileStore(),
    secret : "암호화키 추후 추가",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24,
        httpOnly : true,
        secure : false
    }
}))

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/list',listRouter);

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), ()=>{
    'Server is running on 8000'
});