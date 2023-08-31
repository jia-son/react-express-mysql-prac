// const path = require('path');
// const dotenvPath = path.resolve(__dirname, '../../key.env'); // .env 파일의 절대 경로

// require('dotenv').config({ path: dotenvPath });
// console.log('Loaded environment variables:', process.env);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = require('./config/db.js');

app.listen(8080, () => {
    console.log('Server on : http://localhost:8080');
});

// const KAKAO_MAPS_API_KEY = process.env.KAKAO_MAPS_API_KEY;
// app.get('/getKakaoKey', (req, res) => {
//     res.send({ apiKey : KAKAO_MAPS_API_KEY });
// });

app.post('/post', (req, res) => {
    console.log('글 작성');
    const { title, content, placeY, placeX } = req.body;
    console.log(`title : ${title}`);
    console.log(`content : ${content}`);
    console.log(`placeY : ${placeY}`);
    console.log(`placeX : ${placeX}`);

    if(title === '') {
        return res.status(400).send('제목이 누락될 수 없습니다.');
    } else if(content === '') {
        return res.status(400).send('내용이 누락될 수 없습니다.');
    }

    const sql = 'insert into notice_table(title, content, placeY, placeX) values(?, ?, ?, ?)';
    db.query(sql, [title, content, placeY, placeX], (err, data) => {
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
                "createdAt": data[0].createdAt,
                "placeY": data[0].placeY,
                "placeX": data[0].placeX
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

app.delete('/post/:postId', (req, res) => {
    console.log('게시글 삭제');
    const postId = req.params.postId;
    const sql = 'delete from notice_table where id = ?';

    db.query(sql, postId, (err, data) => {
        if(err) {
            console.log('err', err);
            return;
        } else {
            res.send('삭제 완료');
        }
    });
});