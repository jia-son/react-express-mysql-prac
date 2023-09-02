import React, { useState, useEffect, useRef } from "react";
import '../main/main.css';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

const { kakao } = window;

function CreatePost() {
    const navigate = useNavigate();
    const [searchInfo, setSearchInfo] = useState();
    const [map, setMap] = useState(null);

    const [postInfo, setPostInfo] = useState({
        title: "",
        content: "",
        placeY: 0,
        placeX: 0
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

    const mapContainer = useRef(null);
    const mapOptions = {
        center : new kakao.maps.LatLng(33.450701, 126.570667),
        level : 2
    };

    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    useEffect(() => {
        const newMap = new kakao.maps.Map(mapContainer.current, mapOptions);
        setMap(newMap);
    }, []);

    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            let placeX = 0;
            let placeY = 0;
    
            for (let i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                placeX = data[i].x;
                placeY = data[i].y;
            }
            setPostInfo((info) => ({ ...info, placeY : placeY, placeX: placeX }));
            map.setBounds(bounds);
        } 
    }

    function displayMarker(place) {
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
    
        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }

    const onChangeMapHandler = (e) => {
        setSearchInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
    };

    const onSubmitMapHandler = (e) => {
        e.preventDefault();
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchInfo.search, placesSearchCB);
    };

    return (
        <>
            <div className="mainBox">
                <h1>글쓰기 페이지</h1>
                <button onClick={() => navigate('/notice')}>게시글 목록</button>

                <div>
                    <form onSubmit={onSubmitMapHandler}>
                        <input type="text" name="search" placeholder="search" onChange={onChangeMapHandler}/>
                        <button type="submit">검색</button>
                    </form>
                    <div
                        id="map"
                        ref={mapContainer}
                        style={{ width: '100%', height: '350px', display: 'block' }}
                    ></div>
                </div>

                <div>
                    <form onSubmit={onSubmitHandler}>
                        <div>
                            <hr />
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