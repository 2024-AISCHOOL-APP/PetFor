const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const util = require("util");

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

    // 채팅하지 않는 사용자 정보 불러오기
    const sqlUserList = `SELECT user_id, nickname, user_profile FROM user WHERE user_id NOT IN (?)`;
    const allUsers = await query(sqlUserList, [chatUserIds]);

    // 채팅 사용자 정보 불러오기
    const sqlChatUserDetails = `SELECT user_id, nickname, user_profile FROM user WHERE user_id IN (?)`;
    const chatUsersDetails = await query(sqlChatUserDetails, [chatUserIds]);

    // 채팅 사용자와 채팅하지 않는 사용자 정보를 배열로 분리
    const chatUsers = chatUsersDetails.map(user => ({
        user,
        chat_idx: userChatMap
            .filter(item => item.userId === user.user_id)
            .map(item => item.chat_idx)
    }));

    const nonChatUsers = allUsers.map(user => ({
        user,
        chat_idx: []
    }));
    
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

module.exports = router;
