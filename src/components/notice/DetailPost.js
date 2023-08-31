import React, { useEffect, useState, useRef } from "react";
import '../main/Main.js';
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";
import StaticMaps from "../map/StaticMap.js";

function DetailPost() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [blankNotice, setBlankNotice] = useState();
    const { postId } = useParams();
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/post/${postId}`);
                setData(response.data);
                // setIsLoading(false);
            } catch (error) {
                console.log('error', error);
                const err = error.response;

                if(err.status === 404 && err.data === '존재하지 않는 게시글입니다.') {
                    setBlankNotice(err.data);
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [postId]);

    const handleEditClick = () => {
        navigate(`/updatePost/${postId}`, { state: data });
    };

    const handleDeleteClick = async() => {
        await axios.delete(`/post/${postId}`);
        navigate('/notice');
    };

    return (
        <>
            <div className="mainBox">
                <h1>디테일 페이지지렁이</h1>

                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {blankNotice ? (
                                <h2>{blankNotice}</h2>
                            ) : (
                                <>
                                    <h3>{data.title}</h3>
                                    <p>{data.content}</p>
                                    <div>
                                        <StaticMaps placeX={data.placeX} placeY={data.placeY}/>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div>
                    <button onClick={() => navigate('/notice')}>목록</button>
                    <button onClick={handleEditClick}>수정</button>
                    <button onClick={handleDeleteClick}>삭제</button>
                </div>
            </div>
        </>
    );
}

export default DetailPost;