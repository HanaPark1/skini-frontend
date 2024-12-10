import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// DiagnosisGuidePage Props 타입 선언
interface DiagnosisGuidePageProps {
    diagnosisType: "cancer" | "illness"; // diagnosis는 선택적이고 특정 문자열 값만 가짐
}

function DiagnosisGuidePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { diagnosisType } = location.state as DiagnosisGuidePageProps;  // state에서 받음

    let diagnosisTypeText = "";

    switch (diagnosisType) {
        case "cancer":
            diagnosisTypeText = "피부암 - 피부진단";
            break;
        case "illness":
            diagnosisTypeText = "피부질환 - 피부진단";
            break;
        default:
            diagnosisTypeText = "알 수 없음";
    }

    const handleUpload = async () => {
        navigate('/diagnosis/upload');
    };


    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText onClick={()=> {navigate(-1)}}>&lt;</TopBarText>
                <TopBarText>{diagnosisTypeText}</TopBarText>
                <TopBarText>&nbsp;</TopBarText>
            </TopBarContainer>
            <GuideWrapper>
              <GuideText>1. 밝은 곳과 플래시를 사용하여 선명하게 촬영해 주세요</GuideText>
              <GuideText>2. 확인이 필요한 부위를 가리지 않고 촬영해 주세요</GuideText>
              <GuideText>3. 이미지의 초점이 맞는지 확인해 주세요</GuideText>
            </GuideWrapper>
            <BottomBtn onClick={handleUpload}>확인</BottomBtn>
        </HomeContainer>
    );
}

export default DiagnosisGuidePage;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

const TopBarContainer = styled.div`
  margin-top: 85px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TopBarText = styled.span`
  font-weight: bold;
  font-size: 38px;
`;

const GuideWrapper = styled.div`
  width: 100%;
  height: 880px;
  border-radius: 10px 10px 0 0;
  margin-top: 58px;
  background-color: #ffffff;
  box-shadow: 0 5px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

const GuideText = styled.span`
  font-size: 30px;
  font-weight: 600;
  color: #000000;
  margin: 30px;
`;


const BottomBtn = styled.div`
  position: fixed; /* 화면에 고정 */
  bottom: 0; /* 화면의 가장 아래로 이동 */
  left: 0; /* 왼쪽 끝에 맞춤 */
  width: 100%; /* 화면 너비를 꽉 채움 */
  height: 130px;
  background-color: #074aff;
  border-radius: 25px 25px 0 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 50px;
  font-weight: 600;
`;