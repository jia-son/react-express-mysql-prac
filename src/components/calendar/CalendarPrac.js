import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../main/main.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { format } from 'date-fns';

import ClaendarPost from './CalendarPost.js';

const CalendarPrac = () => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date());
    
    let date = value;
        date.setHours(date.getHours() + 9);
    const dateParts = date.toISOString().split('T')[0];
    
    const [dateValue, setDateValue] = useState(dateParts);

    useEffect(() => {
        setDateValue(dateParts);
    }, [value, dateValue]);
    
    return (
        <>
        <div className='mainBox'>
            <h1>캘린더 페이지지렁</h1>
            <button onClick={() => navigate('/')}>메인</button>
            <button onClick={() => navigate('/notice')}>게시글 목록</button>

            <hr />

            <div>
                <Calendar
                    onChange={onChange}
                    formatDay={(local, date) => format(date, 'd')}
                    calendarType="gregory"
                    value={value}
                />
            </div>

            <div>
                <ClaendarPost props={dateValue}/>
            </div>
        </div>
        </>
    );
}

export default CalendarPrac;