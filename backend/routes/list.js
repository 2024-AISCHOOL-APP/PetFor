const express = require('express');
const router = express.Router();
const conn = require('../config/database');

router.post('/store', (req, res) => {
    let sql = 'SELECT store_name FROM register WHERE business_number IS NOT NULL';
    conn.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
});

router.post('/business', (req, res) => {
    const { userId, storeName, doctorNumber, businessNumber, registerType } = req.body;

    const sql = `SELECT * FROM register WHERE user_id = ?`;
    conn.query(sql, [userId], (err, rows) => {
        if (rows.length > 0) {
            const sql = `SELECT register_type FROM register WHERE user_id = ?`;
            conn.query(sql, [userId], (err, rows) => {
                const register_type = rows[0].register_type;
                if (register_type === 'B') {
                    const sql = `UPDATE register SET business_number = ?, store_name = ? WHERE user_id = ?`;
                    conn.query(sql, [businessNumber, storeName, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                } else {
                    const sql = `UPDATE register SET register_type = 'C', business_number = ? WHERE user_id = ?`;
                    conn.query(sql, [businessNumber, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                }
            });
        } else {
            const sql = `INSERT INTO register(user_id, store_name, business_number, register_type, register_date) VALUES (?, ?, ?, 'B', current_timestamp())`;

            conn.query(sql, [userId, storeName, businessNumber], (err, rows) => {
                if (rows) {
                    res.json({ success: true });
                } else {
                    console.error(err);
                    res.json({ success: false });
                }
            });
        }
    });
});

router.post('/professional', (req, res) => {
    const { userId, storeName, doctorNumber, businessNumber, registerType } = req.body;

    const sql = `SELECT * FROM register WHERE user_id = ?`;
    conn.query(sql, [userId], (err, rows) => {
        if (rows.length > 0) {
            const sql = `SELECT register_type FROM register WHERE user_id = ?`;
            conn.query(sql, [userId], (err, rows) => {
                const register_type = rows[0].register_type;
                if (register_type === 'D') {
                    const sql = `UPDATE register SET doctor_number = ?, store_name = ? WHERE user_id = ?`;
                    conn.query(sql, [doctorNumber, storeName, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                } else {
                    const sql = `UPDATE register SET register_type = 'C', doctor_number = ? WHERE user_id = ?`;
                    conn.query(sql, [doctorNumber, userId], (err, rows) => {
                        if (rows) {
                            res.json({ success: true });
                        } else {
                            console.error(err);
                            res.json({ success: false });
                        }
                    });
                }
            });
        } else {
            const sql = `INSERT INTO register(user_id, store_name, doctor_number, register_type, register_date) VALUES (?, ?, ?, 'D', current_timestamp())`;

            conn.query(sql, [userId, storeName, doctorNumber], (err, rows) => {
                if (rows) {
                    res.json({ success: true });
                } else {
                    console.error(err);
                    res.json({ success: false });
                }
            });
        }
    });
});

//글 목록 가져오기 (페이지네이션 적용) 및 닉네임 나오게하기
// 총 게시글 수를 반환
router.post('/post', async (req, res) => {
    const { page = 1, limit = 6 } = req.body;
    const offset = (page - 1) * limit;

    try {
        // 총 게시글 수를 가져오는 쿼리
        const countSql = 'SELECT COUNT(*) as total FROM community';
        const countResult = await new Promise((resolve, reject) => {
            conn.query(countSql, (err, results) => {
                if (err) return reject(err);
                resolve(results[0].total);
            });
        });

        // 게시글 목록을 가져오는 쿼리
        const sql = `
            SELECT c.community_idx, c.title, c.user_id, c.posting_date, u.nickname 
            FROM community c
            JOIN user u ON c.user_id = u.user_id
            ORDER BY c.posting_date DESC 
            LIMIT ? OFFSET ?
        `;
        const posts = await new Promise((resolve, reject) => {
            conn.query(sql, [parseInt(limit), parseInt(offset)], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        res.json({
            posts,
            totalPosts: countResult
        });
    } catch (error) {
        console.error('SQL 쿼리 오류:', error);
        res.status(500).send('서버 내부 오류');
    }
});



router.post('/writepost', (req, res) => {
    let sql = `INSERT INTO community (user_id, title, content, posting_date) VALUES (?, ?, ?, current_timestamp())`;
    conn.query(sql, [req.body.userId, req.body.title, req.body.content], (err, rows) => {
        if (err) {
            res.json({ success: false });
            return res.status(500).send(err);
        }
        res.json({ success: true });
    });
});

// 포스트 세부 정보 가져오기
router.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const sql = `
        SELECT c.community_idx, c.title, c.content, c.user_id, u.nickname
        FROM community c
        JOIN user u ON c.user_id = u.user_id
        WHERE c.community_idx = ?
    `;

    conn.query(sql, [postId], (error, rows) => {
        if (error) {
            console.error('Error fetching post details: ', error);
            return res.status(500).json({ error: 'An error occurred' });
        }
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    });
});

// 게시글 삭제 처리 라우터
router.delete('/post/:id', (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId; // 클라이언트에서 전송된 로그인된 사용자 ID

    // 게시글 작성자와 로그인된 사용자 ID를 확인하는 쿼리
    const checkSql = 'SELECT user_id FROM community WHERE community_idx = ?';
    conn.query(checkSql, [postId], (error, rows) => {
        if (error) {
            console.error('Error fetching post details:', error);
            return res.status(500).json({ success: false, message: 'Failed to fetch post details' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const postAuthorId = rows[0].user_id;

        // 게시글 작성자와 로그인된 사용자 ID를 비교
        if (postAuthorId !== userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized to delete this post' });
        }

        // 게시글 삭제
        const deleteSql = 'DELETE FROM community WHERE community_idx = ?';
        conn.query(deleteSql, [postId], (deleteError, results) => {
            if (deleteError) {
                console.error('Error deleting post:', deleteError);
                return res.status(500).json({ success: false, message: 'Failed to delete post' });
            }
            if (results.affectedRows > 0) {
                res.json({ success: true });
            } else {
                res.status(404).json({ success: false, message: 'Post not found' });
            }
        });
    });
});

router.put('/post/:id', (req, res) => {
    const postId = req.params.id;
    const { userId, title, content } = req.body;

    // 게시글 작성자와 로그인된 사용자 ID를 확인하는 쿼리
    const checkSql = 'SELECT user_id FROM community WHERE community_idx = ?';
    conn.query(checkSql, [postId], (error, rows) => {
        if (error) {
            console.error('Error fetching post details:', error);
            return res.status(500).json({ success: false, message: 'Failed to fetch post details' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const postAuthorId = rows[0].user_id;

        // 게시글 작성자와 로그인된 사용자 ID를 비교
        if (postAuthorId !== userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized to update this post' });
        }

        // 게시글 수정
        const updateSql = 'UPDATE community SET title = ?, content = ? WHERE community_idx = ?';
        conn.query(updateSql, [title, content, postId], (updateError, results) => {
            if (updateError) {
                console.error('Error updating post:', updateError);
                return res.status(500).json({ success: false, message: 'Failed to update post' });
            }
            if (results.affectedRows > 0) {
                res.json({ success: true });
            } else {
                res.status(404).json({ success: false, message: 'Post not found' });
            }
        });
    });
});

module.exports = router;
