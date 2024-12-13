import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

interface Marker {
    position: { lat: number; lng: number };
    content: string;
    address: string;
    phone: string;
}


interface MapsProps {
    onMarkersChange: (markers: Marker[]) => void;
    onMarkerSelect: (marker: Marker) => void;
}

const Maps: React.FC<MapsProps> = ({ onMarkersChange, onMarkerSelect }) => {
    const [currentPosition, setCurrentPosition] = useState({ lat: 37.55465, lng: 126.9706 }); // 기본 위치 설정
    const [map, setMap] = useState<any>(null); // 지도 객체 저장
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [info, setInfo] = useState<Marker | null>(null); // 선택된 마커 정보 저장

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("현재 위치를 불러올 수 없습니다:", error);
                }
            );
        } else {
            alert("Geolocation을 지원하지 않는 브라우저입니다.");
        }
    }, []);

    useEffect(() => {
        if (!map) return;

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch("피부과", (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                const newMarkers = data.map((place) => {
                    bounds.extend(new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)));
                    return {
                        position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
                        content: place.place_name,
                        address: place.address_name,
                        phone: place.phone || "전화번호 없음",
                    };
                });
                setMarkers(newMarkers);
                onMarkersChange(newMarkers);
                map.setBounds(bounds); // 검색된 장소에 맞게 지도 범위 조정
            }
        }, {
            location: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng), // 현재 위치 기준 검색
            radius: 3000, // 반경 5km 내 검색
        });
    }, [map, currentPosition]);

    const handleMarkerClick = (marker: Marker) => {
        setInfo(marker);
        if (onMarkerSelect) onMarkerSelect(marker); // 부모로 정보 전달
    };


    return (
        <>
            <Map
                center={currentPosition}
                style={{ width: "100%", height: "760px" }}
                level={3}
                onCreate={setMap} // 지도 생성 시 map 객체 저장
            >
                {markers.map((marker, index) => (
                    <MapMarker
                        key={index}
                        position={marker.position}
                        onClick={() => handleMarkerClick(marker)}
                    >
                        {info && info.content === marker.content && (
                            <div style={{ color: "#000" }}>{marker.content}</div>
                        )}
                    </MapMarker>
                ))}
            </Map>
        </>
    );
};

export default Maps;