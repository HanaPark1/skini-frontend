import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import client from "@/client";

interface Marker {
    position: { lat: number; lng: number };
    content: string;
    address: string;
    phone: string;
}

interface MapsProps {
    onMarkersChange: (markers: Marker[]) => void; // 부모로 마커 데이터 전달
    onMarkerSelect: (marker: Marker) => void; // 선택된 마커 전달
}

const Maps2: React.FC<MapsProps> = ({ onMarkersChange, onMarkerSelect }) => {
    const [currentPosition, setCurrentPosition] = useState({ lat: 37.55465, lng: 126.9706 }); // 기본 위치 설정
    const [markers, setMarkers] = useState<Marker[]>([]); // 마커 상태 관리
    const [info, setInfo] = useState<Marker | null>(null); // 선택된 마커 정보 저장
    const apiClient = client();

    if (!apiClient) {
        console.error("apiClient가 초기화되지 않았습니다.");
        alert("서버와 연결할 수 없습니다. 나중에 다시 시도하세요.");
        return null; // 컴포넌트를 렌더링하지 않음
    }


    // 현재 위치 가져오기 및 병원 즐겨찾기 불러오기
    useEffect(() => {
        // 현재 위치 가져오기
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

        // 병원 즐겨찾기 가져오기
        const fetchFavorites = async () => {
            const accessToken = sessionStorage.getItem("accessToken");

            try {
                const response = await apiClient.get("/api/favorites/hospital", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                // console.log(response.data);

                if (response.status === 200) {
                    // 서버에서 받은 데이터를 Marker 형식으로 변환
                    const favoriteHospitals = response.data.map((hospital: any) => ({
                        position: {
                            lat: hospital.latitude,
                            lng: hospital.longitude,
                        },
                        content: hospital.hospitalName,
                        address: hospital.address,
                        phone: hospital.phoneNumber || "전화번호 없음",
                    }));
                    setMarkers(favoriteHospitals); 
                    onMarkersChange(favoriteHospitals);

                    // console.log(favoriteHospitals);

                    // setMarkers(favoriteHospitals); // 마커 상태 업데이트
                    // onMarkersChange(favoriteHospitals); // 부모로 데이터 전달
                } else {
                    alert("즐겨찾기 병원 정보를 가져오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("병원 정보 가져오기 오류:", error);
                alert("서버와 통신하는 중 오류가 발생했습니다.");
            }
        };

        fetchFavorites();
    }, []);

    // 마커 클릭 시 처리
    const handleMarkerClick = (marker: Marker) => {
        setInfo(marker);
        onMarkerSelect(marker); // 부모로 선택된 마커 정보 전달
    };

    return (
        <Map
            center={currentPosition}
            style={{ width: "100%", height: "760px" }}
            level={3}
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
    );
};

export default Maps2;
