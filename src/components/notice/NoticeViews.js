import React, { useEffect, useState } from "react";
import '../main/Main.js';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

function NoticeViews() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/post');
            console.log('글 불러오기', response.data);

            setData(response.data);
        }
    
        fetchData();
    }, []);

    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);
        return formattedDate.slice(0, -1);
    };

    return (
        <>
            <div className="mainBox">
                <h1>목록이지렁</h1>
                <button onClick={() => navigate('/')}>메인</button>
                <button onClick={() => navigate('/createPost')}>글쓰기</button>

                <div>
                    {data.map((item, index) => (
                        <div key={item.id} className="post-item">
                            <div className="item-left">
                                <span>{index + 1}. </span>
                                <span>{item.title}</span>
                            </div>
                            <span className="date">{formatDate(item.createdAt)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NoticeViews;