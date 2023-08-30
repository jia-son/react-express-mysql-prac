import React , { useEffect , useRef, useState }  from "react";
import { useNavigate } from "react-router-dom";
import '../main/main.css';

import axios from 'axios';

const { kakao } = window;

const Map = () => {
    const navigate = useNavigate();

    const container = useRef(null);
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5
      };

    useEffect(() => {
        new kakao.maps.Map(container.current, options)
        return () => {};
      }, []);

    return (
        <>
            <div className="mainBox">
                <h1>지도 페이지지렁</h1>
                <button onClick={() => navigate('/')}>메인</button>
                <button onClick={() => navigate('/notice')}>게시글 목록</button>
                
                <div id="map"  ref={container} style={{
                    width: '500px',
                    height: '500px'
                }}></div>
            </div>
        </>
    );
}

export default Map;