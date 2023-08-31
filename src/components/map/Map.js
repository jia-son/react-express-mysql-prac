import React , { useEffect , useRef, useState }  from "react";
import { useNavigate } from "react-router-dom";
import '../main/main.css';

const { kakao } = window;

const Map = () => {
    const navigate = useNavigate();
    const [searchInfo, setSearchInfo] = useState();
    const [map, setMap] = useState(null);

    const mapContainer = useRef(null);
    const mapOptions = {
        center : new kakao.maps.LatLng(33.450701, 126.570667),
        level : 3
    };

    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    useEffect(() => {
        const newMap = new kakao.maps.Map(mapContainer.current, mapOptions);
        setMap(newMap);
    }, []);

    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();
    
            for (let i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        } 
    }

    function displayMarker(place) {
    
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
    
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }

    const onChangeHandler = (e) => {
        setSearchInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchInfo.search, placesSearchCB);
    };
    
    return (
        <>
            <div className="mainBox">
                <h1>지도 페이지지렁</h1>
                <button onClick={() => navigate('/')}>메인</button>
                <button onClick={() => navigate('/notice')}>게시글 목록</button>
                
                <div>
                    <form onSubmit={onSubmitHandler}>
                        <input type="text" name="search" placeholder="search" onChange={onChangeHandler}/>
                        <button type="submit">검색</button>
                    </form>
                    <div
                        id="map"
                        ref={mapContainer}
                        style={{ width: '100%', height: '350px', display: 'block' }}
                    ></div>
                </div>
                
            </div>
        </>
    );
}

export default Map;