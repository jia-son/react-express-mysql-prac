import React from 'react';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import '../main/main.css';

const CalendarPrac = () => {
    const navigate = useNavigate();
    
    return (
        <>
        <div className='mainBox'>
            <h1>캘린더 페이지지렁</h1>
            <button onClick={() => navigate('/')}>메인</button>
            <button onClick={() => navigate('/notice')}>게시글 목록</button>
        </div>
        </>
    );
}

export default CalendarPrac;