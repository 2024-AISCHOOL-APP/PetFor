const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const util = require("util");
const axios = require('axios');

const query = util.promisify(conn.query).bind(conn);

// 채팅 리스트 불러오기
router.post("/list", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const sqlChatList = `SELECT chat_idx, user_id, receiver FROM chat_list WHERE user_id=? OR receiver=?`;
    const chatListRows = await query(sqlChatList, [userId, userId]);

    // 채팅하고 있는 사용자 정보와 채팅하지 않는 사용자 정보 분리
    const userChatMap = chatListRows.map(row => {
        const otherUserId = row.receiver === userId ? row.user_id : row.receiver;
        return {
            userId: otherUserId,
            chat_idx: row.chat_idx
        };
    });

    // 중복 제거된 채팅 사용자 ID 목록 추출
    const chatUserIds = [...new Set(userChatMap.map(item => item.userId))];

    // 모든 사용자 정보를 가져오기
    const sqlAllUsers = `SELECT user_id, nickname, user_profile FROM user`;
    const allUsers = await query(sqlAllUsers);
    
    // 채팅하고 있는 사용자 정보와 채팅하지 않는 사용자 정보를 분리
    const chatUsers = [];
    const nonChatUsers = [];

    allUsers.forEach(user => {
      if (chatUserIds.includes(user.user_id)) {
        const userChats = userChatMap.filter(item => item.userId === user.user_id);
        chatUsers.push({
          user,
          chat_idx: userChats.map(item => item.chat_idx)
        });
      } else {
        nonChatUsers.push({
          user,
          chat_idx: []
        });
      }
    });
    
    res.json({
        chatUsers,
        nonChatUsers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 이전 대화 불러오기
router.post('/history', async (req, res) => {
  const { chatIdx, userId } = req.body;

  if (!chatIdx || !userId) {
      return res.status(400).json({ error: 'Chat index and user ID are required' });
  }
  try {
      const sql = `SELECT * FROM chatting WHERE chat_idx = ? ORDER BY message_date`;
      const messages = await query(sql, [chatIdx]);

      const formattedMessages = messages.map(msg => ({
        ...msg,
        isSender: msg.sender_id === userId
      }));
      res.json(formattedMessages);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// 메시지 저장
router.post('/send', async (req, res) => {
  const { chatIdx, senderId, receiverId, message } = req.body;

  if (!chatIdx || !senderId || !receiverId || !message) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const sql = `INSERT INTO chatting (chat_idx, sender_id, receiver_id, message, message_date) VALUES (?, ?, ?, ?, NOW())`;
      await query(sql, [chatIdx, senderId, receiverId, message]);
      res.json({ success: true });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 새 채팅방 추가
router.post("/newChatting", async (req, res) => {
  const { userId, receiver } = req.body;

  if (!userId || !receiver) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `INSERT INTO chat_list (user_id, chatting_date, receiver) VALUES (?, now(), ?)`;
    await query(sql, [userId, receiver]);

    try {
      const sql = `SELECT chat_idx FROM chat_list WHERE user_id = ? AND receiver = ?`;
      const chatIdxResult = await query(sql, [userId, receiver]);
      const chatIdx = chatIdxResult[0].chat_idx;

      try {
        const sql = `INSERT INTO chatting (chat_idx, sender_id, receiver_id, message, message_date) 
            VALUES (?, ?, ?, '${userId}님이 채팅방을 생성하셨습니다.', NOW())`;
        await query(sql, [chatIdx, userId, receiver]);

        res.json({ success: true, chatIdx: chatIdx });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// FastAPI 서버의 주소
const FASTAPI_URL = 'http://127.0.0.1:8500';


// 추천 시스템 엔드포인트
router.post('/recommendations', async (req, res) => {
  try {
      const { userId } = req.body;

      // FastAPI 서버에 요청 보내기
      const response = await axios.post(`${FASTAPI_URL}/recommendations`, { user_id: userId });

      // FastAPI 서버의 응답을 프론트엔드로 전달
      res.json(response.data);
  } catch (error) {
      console.error('Error fetching recommendations from FastAPI:', error);
      res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;
