import React, { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { format } from 'date-fns';

const CalendarMadal = () => {
    
    const [value, onChange] = useState(new Date());
    let date = value;
        date.setHours(date.getHours() + 9);
    const dateParts = date.toISOString().split('T')[0];
    
    const [dateValue, setDateValue] = useState(dateParts);

    useEffect(() => {
        setDateValue(dateParts);
        console.log('value 확인:', value);
        console.log('dateValue 확인:', dateValue);
    }, [value, dateValue]);

    return (
        <>
        <div className='mainBox'>
            <h1>캘린더 페이지지렁</h1>
            <div>
                <Calendar
                    onChange={onChange}
                    formatDay={(local, date) => format(date, 'd')}
                    calendarType="gregory"
                    value={value}
                />
            </div>
        </div>
        </>
    );
}

export default CalendarMadal;