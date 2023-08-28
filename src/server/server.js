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
            res.send('작성 완료');
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