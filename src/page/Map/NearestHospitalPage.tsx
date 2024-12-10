import Maps from "./Maps";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import client from "@/client";

function NearestHospital() {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([]); // 상태 정의
  const [selectedMarker, setSelectedMarker] = useState(null);
  const accessToken = sessionStorage.getItem('accessToken');
  const apiClient = client();

  const handleData = (data) => {
    setMarkers(data);
  };

  const handleMarkerSelect = (marker) => {
    setSelectedMarker(marker); // 선택된 마커 정보 저장
  };

  const handleAddToFavorites = async () => {
    if (!selectedMarker) return;
  
    try {
      // 요청 데이터 구성
      const HospitalDto = {
        "id": 1,
        hospitalName: selectedMarker.content,
        address: selectedMarker.address,
        latitude: selectedMarker.position.lat || 0, // latitude 기본값 처리
        longitude: selectedMarker.position.lng || 0, // longitude 기본값 처리
        phoneNumber: selectedMarker.phone,
      };
  
      // POST 요청
      const response = await apiClient.post("/api/favorites/hospital", HospitalDto, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  
      if (response.status === 200) {
        alert("즐겨찾기에 추가되었습니다!");
      } else {
        alert("추가 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("즐겨찾기 추가 오류:", error);
      alert("추가 실패: 서버와 통신하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <HomeContainer>
      <TopBarContainer>
        <TopBarText onClick={() => navigate(-1)}>&lt;</TopBarText>
        <TopBarText>가까운 병원 목록</TopBarText>
        <TopBarText>&nbsp;</TopBarText>
      </TopBarContainer>
      <Maps onMarkersChange={handleData} onMarkerSelect={handleMarkerSelect} /> {/* Props로 전달 */}
      <ResultWrapper>
        {selectedMarker ? ( // 선택된 마커만 표시
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
            <Button onClick={handleAddToFavorites}>즐겨찾기로 추가</Button>
          </ResultItem>
        ) : (
          markers.map((marker, index) => {
            const isSpecialist = marker.content.includes('피부과'); // 조건 확인
            return (
              <ResultItem key={index}>
                <CategoryContainer>
                  <CategoryImg isSpecialist={isSpecialist} />
                  <CategoryText>
                    {isSpecialist ? '전문의' : '의원'}
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

export default NearestHospital;





const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh; /* 화면 전체 높이 */
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

const CategoryImg = styled.div`
  width: 48px;
  height: 38px;
  background-color: ${(props) => (props.isSpecialist ? 'red' : 'green')};
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

const DeleteWrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

const DeleteImg = styled.div`
  width: 50px;
  height: 55px;
  background-color: #a7a1ae;
  border-radius: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;