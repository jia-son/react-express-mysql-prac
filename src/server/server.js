const express = require('express');
const app = express();
app.use(express.json());

const db = require('./config/db.js');

app.listen(8080, () => {
    console.log('Server on : http://localhost:8080');
});

app.post('/post', (req, res) => {
    console.log('글 작성');
    const { title, content } = req.body;
    console.log(`title : ${title}`);
    console.log(`content : ${content}`);

    if(title === '') {
        return res.status(400).send('제목이 누락될 수 없습니다.');
    } else if(content === '') {
        return res.status(400).send('내용이 누락될 수 없습니다.');
    }

    const sql = 'insert into notice_table(title, content) values(?, ?)';
    db.query(sql, [title, content], (err, data) => {
        if(err) {
            console.log('err', err);
            return;
        } else {
            console.log('작성 후 데이터', data);
            const postId = data.insertId;
            res.send(postId.toString());
        }
    });
});

app.get('/post', (req, res) => {
    console.log('글 전체 목록');
    const sql = 'select * from notice_table';

    db.query(sql, (err, data) => {
        if(err) {
            console.log('err', err);
            return;
        } else if(data.length === 0) {
            return res.send('작성된 게시글이 없습니다.');
        } else {
            res.send(data);
        }
    });
});

app.get('/post/:postId', (req, res) => {
    console.log('글 상세 조회');
    const postId = req.params.postId;
    const sql = 'select * from notice_table where id = ?';
    

    db.query(sql, postId, (err, data) => {
        if (err) {
            console.log('err', err);
            return;
        } else if(data.length === 0) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
        } else {
            const postInfo = {
                "title": data[0].title,
                "content": data[0].content,
                "createdAt": data[0].createdAt
            };
            res.send(postInfo);
        }
    });
});

app.put('/post/:postId', (req, res) => {
    console.log('글 수정');
    const postId = req.params.postId;
    const { title, content } = req.body;
    const selectSql = 'select * from notice_table where id = ?';
    const sql = 'update notice_table set title = ?, content = ? where id = ?';

    if(title === '') {
        return res.status(400).send('제목이 누락될 수 없습니다.');
    } else if(content === '') {
        return res.status(400).send('내용이 누락될 수 없습니다.');
    }

    db.query(selectSql, postId, (err, data) => {
        if(err) {
            console.log('err', err);
            return;
        } else if(data.length === 0) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
        } else {

            db.query(sql, [title, content, postId], (error, payload) => {
                if (error) {
                    console.log('error', error);
                    return;
                } else {
                    res.send('수정 완료');
                }
            });

        }
    });
    

    
});