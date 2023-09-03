// import React, { useEffect, useState } from "react";
// import '../main/main.css';
// import axios from 'axios';

// import { useNavigate, useParams, useLocation } from "react-router-dom";

// function UpdatePost() {

//     const navigate = useNavigate();

//     const [data, setData] = useState([]);
//     const [blankNotice, setBlankNotice] = useState();
//     const { postId } = useParams();

//     const location = useLocation();
//     const { title, content, createdAt } = location.state;

//     useEffect(() => {
//         setData({
//             postId : postId,
//             title : title,
//             content : content,
//             createdAt : createdAt
//         });
//     }, [postId, title, content, createdAt]);

//     const onChangeHandler = (e) => {
//         setData((info) => ({ ...info, [e.target.name]: e.target.value }));
//     };

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.put(`/post/${postId}`, data);
//             console.log('글 수정 res', res);

//             navigate(`/detailPost/${postId}`);
//         } catch(error) {
//             const err = error.response;

//             if(err.status === 400 && err.data === '제목이 누락될 수 없습니다.') {
//                 alert(err.data);
//             } else if(err.status === 400 && err.data === '내용이 누락될 수 없습니다.') {
//                 alert(err.data);
//             }
//         }
//     };

//     return (
//         <>
//             <div className="mainBox">
//                 <h1>수정 페이지지렁이</h1>

//                 <div>
//                     {blankNotice ? (
//                         <h2>{blankNotice}</h2>
//                     ) : (
//                         <>
//                             <div>
//                                 <form onSubmit={onSubmitHandler}>
//                                     <div>
//                                         <input
//                                             type="text"
//                                             name="title"
//                                             placeholder="title"
//                                             value={data.title}
//                                             onChange={onChangeHandler}
//                                         />
//                                         <hr />
//                                             <textarea
//                                             name="content"
//                                             placeholder="content"
//                                             value={data.content}
//                                             onChange={onChangeHandler}
//                                         ></textarea>
//                                     </div>
//                                     <button type="submit">수정 확인</button>
//                                 </form>
//                             </div>
//                         </>
//                     )}
//                 </div>

//                 <div>
//                     <button onClick={() => navigate('/notice')}>목록</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default UpdatePost;
import React, { useEffect, useState } from "react";
import '../main/main.css';
import axios from 'axios';

import { useNavigate, useParams, useLocation } from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

function UpdatePost() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [blankNotice, setBlankNotice] = useState();
    const { postId } = useParams();

    const location = useLocation();
    const { title, content, createdAt, postDate } = location.state;
    const [startDate, setStartDate] = useState(new Date(postDate));

    useEffect(() => {
        setData({
            postId : postId,
            title : title,
            content : content,
            createdAt : createdAt,
            postDate : startDate
        });
    }, [postId, title, content, createdAt, startDate]);

    const onChangeHandler = (e) => {
        setData((info) => ({ ...info, [e.target.name]: e.target.value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setData((info) => ({ ...info, postDate: startDate}));
            await axios.put(`/post/${postId}`, data);

            navigate(`/detailPost/${postId}`);
        } catch(error) {
            const err = error.response;

            if(err.status === 400 && err.data === '제목이 누락될 수 없습니다.') {
                alert(err.data);
            } else if(err.status === 400 && err.data === '내용이 누락될 수 없습니다.') {
                alert(err.data);
            }
        }
    };

    return (
        <>
            <div className="mainBox">
                <h1>수정 페이지지렁이</h1>

                <div>
                    {blankNotice ? (
                        <h2>{blankNotice}</h2>
                    ) : (
                        <>
                            <div>
                                <form onSubmit={onSubmitHandler}>
                                    <div>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="title"
                                            value={data.title}
                                            onChange={onChangeHandler}
                                        />
                                        <DatePicker
                                            showIcon
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                        />
                                        <hr />
                                            <textarea
                                            name="content"
                                            placeholder="content"
                                            value={data.content}
                                            onChange={onChangeHandler}
                                        ></textarea>
                                    </div>
                                    <button type="submit">수정 확인</button>
                                </form>
                            </div>
                        </>
                    )}
                </div>

                <div>
                    <button onClick={() => navigate('/notice')}>목록</button>
                </div>
            </div>
        </>
    );
}

export default UpdatePost;