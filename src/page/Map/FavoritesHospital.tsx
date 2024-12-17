import Maps2 from "./Maps2";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import client from "@/client";
import deleteIcon from "../../assets/Delete.png";

interface Marker {
    position: { lat: number; lng: number };
    content: string;
    address: string;
    phone: string;
}

function FavoritesHospital() {
    const navigate = useNavigate();
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const accessToken = sessionStorage.getItem("accessToken");
    const apiClient = client();

    const handleData = (data: Marker[]) => setMarkers(data);
    const handleMarkerSelect = (marker: Marker) => setSelectedMarker(marker);

    const handleAddToFavorites = async () => {
        if (!selectedMarker) return;
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            // 요청 데이터 구성
            const HospitalDto = {
                hospitalName: selectedMarker.content,
                address: selectedMarker.address,
                latitude: selectedMarker.position.lat, // 기본값 처리 제거
                longitude: selectedMarker.position.lng,
                phoneNumber: selectedMarker.phone,
            };

            if (!apiClient) {
                throw new Error('API 클라이언트를 생성할 수 없습니다.');
            } else {
                // POST 요청
                const response = await apiClient.post("/api/favorites/hospital", HospitalDto, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (response.status === 200) {
                    alert("즐겨찾기에 추가되었습니다!");
                } else {
                    alert("추가 중 문제가 발생했습니다.");
                }
            }
        } catch (error) {
            console.error("즐겨찾기 추가 오류:", error);
            alert("추가 실패: 오류가 발생했습니다.");
        }
    };


    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText onClick={() => navigate(-1)}>&lt;</TopBarText>
                <TopBarText>즐겨찾는 병원 목록</TopBarText>
                <TopBarText>&nbsp;</TopBarText>
            </TopBarContainer>
            <Maps2 onMarkersChange={handleData} onMarkerSelect={handleMarkerSelect} />
            <ResultWrapper>
                {selectedMarker ? (
                    <ResultItem>
                        <CategoryContainer>
                            <CategoryImg isSpecialist={selectedMarker.content.includes("피부과")} />
                            <CategoryText>
                                {selectedMarker.content.includes("피부과") ? "전문의" : "의원"}
                            </CategoryText>
                        </CategoryContainer>
                        <TitleWrapper>
                            <TitleText>{selectedMarker.content}</TitleText>
                        </TitleWrapper>
                        <div>
                            <p>주소: {selectedMarker.address}</p>
                            <p>전화번호: {selectedMarker.phone}</p>
                        </div>
                        <Button src={deleteIcon} onClick={handleAddToFavorites} />
                    </ResultItem>
                ) : markers.length === 0 ? (
                    <div>등록된 즐겨찾기 병원이 없습니다.</div>
                ) : (
                    markers.map((marker, index) => {
                        const isSpecialist = marker.content.includes("피부과");
                        return (
                            <ResultItem key={index}>
                                <CategoryContainer>
                                    <CategoryImg isSpecialist={isSpecialist} />
                                    <CategoryText>
                                        {isSpecialist ? "전문의" : "의원"}
                                    </CategoryText>
                                </CategoryContainer>
                                <TitleWrapper>
                                    <TitleText>{marker.content}</TitleText>
                                </TitleWrapper>
                                <div>
                                    <p>주소: {marker.address}</p>
                                    <p>전화번호: {marker.phone}</p>
                                </div>
                            </ResultItem>
                        );
                    })
                )}
            </ResultWrapper>
        </HomeContainer>
    );
}

export default FavoritesHospital;


const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const TopBarContainer = styled.div`
  margin: 85px 0 65px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TopBarText = styled.span`
  font-weight: bold;
  font-size: 38px;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 281px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
`;

const ResultItem = styled.div`
  width: 90%;
  height: 88px;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #a7a1ae;
  margin-top: 35px;
`;

const CategoryContainer = styled.div`
  width: 48px;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface CategoryImgProps {
    isSpecialist: boolean;
}

const CategoryImg = styled.div<CategoryImgProps>`
  width: 48px;
  height: 38px;
  background-color: ${(props) => (props.isSpecialist ? "red" : "green")};
  border-radius: 10px;
`;

const CategoryText = styled.span`
  font-weight: 400;
  font-size: 18px;
`;

const TitleWrapper = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const Button = styled.img`
width: 40px;
height: 40px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

