import React, { useEffect, useState, useRef } from "react";
const { kakao } = window;

const StaticMaps = (props) => {
    const { placeX, placeY } = props;
    const [map, setMap] = useState(null);
    const staticMapContainer = useRef(null);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        if (placeX !== 0 && placeY !== 0) {
            const markerPosition = new kakao.maps.LatLng(placeY, placeX);
            const marker = {
                position: markerPosition
            };
        
            const staticMapOption = {
                center: new kakao.maps.LatLng(placeY, placeX),
                level: 1,
                marker: marker
            };
          
            const staticMap = new kakao.maps.StaticMap(
                staticMapContainer.current,
                staticMapOption
            );
        
            setMap(staticMap);
        } else {
            setMap('empty');
        }
        setIsMapReady(false);
    }, [placeX, placeY]);

    useEffect(() => {
        setIsMapReady(true);
    }, []);

    return (
        <>
        <div
            id="map"
            ref={staticMapContainer}
            style={{
                width: '300px',
                height: '300px',
                display: map !== 'empty' ? 'block' : 'none'
            }}
        ></div>
        </>
    );
}

export default StaticMaps;