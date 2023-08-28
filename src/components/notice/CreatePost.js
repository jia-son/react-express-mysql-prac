import React, { useState } from "react";
import '../main/Main.js';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({
        title: "",
        content: ""
    });

    const onChangeHandler = (e) => {
        setPostInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/post', postInfo);
            const postId = res.data;

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
                <h1>글쓰기 페이지</h1>
                <button onClick={() => navigate('/notice')}>게시글 목록</button>

                <div>
                    <form onSubmit={onSubmitHandler}>
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="title"
                                onChange={onChangeHandler}
                            />
                            <hr />
                                <textarea
                                name="content"
                                placeholder="content"
                                onChange={onChangeHandler}
                            ></textarea>
                        </div>
                        <button type="submit">작성</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreatePost;