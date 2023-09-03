import React, { useEffect, useState } from "react";
import '../main/main.css';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

function NoticeViews() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [notData, setNotData] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/post');

            if(response.data === '작성된 게시글이 없습니다.') {
                setNotData(response.data);
            } else {
                setData(response.data);
            }
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
                <button onClick={() => navigate('/map')}>지도</button>
                <button onClick={() => navigate('/calendarPrac')}>캘린더</button>
                <button onClick={() => navigate('/createPost')}>글쓰기</button>

                <div>
                    {notData ? null :
                        data.map((item, index) => (
                            <div key={item.id} className="post-item">
                                <div className="item-left">
                                    <p onClick={() => navigate(`/detailPost/${item.id}`)}>{index + 1}. {item.title}</p>
                                </div>
                                <span className="date">{formatDate(item.createdAt)}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default NoticeViews;