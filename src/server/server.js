const express = require('express');
const app = express();
const db = require('./config/db.js');

app.listen(8080, () => {
    console.log('Server on : http://localhost:8080');
});

app.get('/get', (req, res) => {
    console.log('서버단 get 작동 확인');

    const sql = 'select * from nations_table';
    db.query(sql, (err, data) => {
        if(err) {
            console.log('err', err);
            return;
        } else {
            res.send(data);
        }
    });
});