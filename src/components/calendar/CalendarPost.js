import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

const ClaendarPost = (date) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [notData, setNotData] = useState(false);

    const postDate = date.props;
    console.log('date넘어오는 거 확인', postDate);

    useEffect(() => {
        setNotData(undefined);
        axios.get(`/calendar/${postDate}`)
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
                if (response.data.length === 0) {
                    setNotData(true);
                }
            })
            .catch((error) => {
                console.error('error', error);
            });
    }, [postDate]);

    return (
        <>
        <div className="mainBox">
            <h2>이게 그거다 그거. 일자별 게시글</h2>

            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : notData ? (
                    <p>아직 작성된 게시글이 없습니다.</p>
                ) : (
                    data.map((item, index) => (
                        <div key={item.id} className="post-item">
                            <div className="item-left">
                                <p onClick={() => navigate(`/detailPost/${item.id}`)}>{index + 1}. {item.title}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    );
}

export default ClaendarPost;