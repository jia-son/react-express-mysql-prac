import React from "react";
import { useNavigate } from "react-router-dom";
import './main.css';

import axios from 'axios';

function Main() {
    const navigate = useNavigate();

    return (
        <>
        <div className="mainBox">
            <h1>메인이지렁</h1>
            <button onClick={() => navigate('/notice')}>게시글 목록</button>
            <button onClick={() => navigate('/map')}>지도 연습</button>
        </div>
        </>
    )
}

export default Main;