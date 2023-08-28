import React from "react";
import '../main/Main.js';

import { useNavigate } from "react-router-dom";

function NoticeViews() {
    const navigate = useNavigate();

    return (
        <>
            <div className="mainBox">
                <h1>목록이지렁</h1>
                <button onClick={() => navigate('/')}>메인</button>
                <button onClick={() => navigate('/createPost')}>글쓰기</button>
            </div>
        </>
    )
}

export default NoticeViews;