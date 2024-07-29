const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const http = require('http');

const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const listRouter = require('./routes/list');
const searchRouter = require('./routes/search');
const chatRouter = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const SocketIO = require('socket.io');
const io = SocketIO(server, {path: '/socket.io',
                            cors: {
                                origin: 'http://localhost:3000',
                                methods: ['GET', 'POST'],
                                allowedHeaders: ['my-custom-header'],
                                credential: true
                            }
})

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // 클라이언트의 URL을 설정합니다.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

app.use(cors(corsOptions));

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
app.use('/search',searchRouter);
app.use('/chat', chatRouter);

app.set('port', process.env.PORT || 8000);
server.listen(app.get('port'), ()=>{
    console.log(`Server is running on ${app.get('port')}`);
});

// Socket.IO 이벤트 처리
io.on('connection', (socket)=>{
    // console.log(socket.id, 'connected...');

    // io.emit('msg', `${socket.id} has entered the chatroom.`);

    socket.on('msg', (data)=>{
        const messageData = {
            chatIdx: data.chatIdx,
            senderId: data.senderId,
            receiverId: data.receiverId,
            message: data.message,
            isSender: false,
            message_date: new Date()
        };
        // socket.broadcast.emit('msg', `${socket.id}: ${data}`);
        io.emit('msg', messageData);
    });

    socket.on('disconnect', (data)=>{
        io.emit('msg', `${socket.id} has left the chatroom.`);
    });
});

