/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import logo from "../../assets/logo_b.png";
import kining from "../../assets/kining.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (type: string) => {
    navigate("/diagnosis", { state: { diagnosisType: type } });
  };

  const handleMyInfo = () => {
    navigate('/mypage');
}

  return (
    <HomeContainer>
      <Logo src={logo} alt="skini-Logo" />
      <DiagnosisContainer>
        <KiningImgWrapper>
          <Text>피부 진단을 통해<br />대비하세요</Text>
          <KiningImg src={kining}/>
        </KiningImgWrapper>
        <DiagnosisBtnContainer>
          <DiagnosisBtn onClick={() => handleNavigation("CANCER")}>
            <DiagnosisBtnText>피부암</DiagnosisBtnText>
          </DiagnosisBtn>
          <DiagnosisBtn onClick={() => handleNavigation("DISEASE")}>
            <DiagnosisBtnText>피부<br />질환</DiagnosisBtnText>
          </DiagnosisBtn>
        </DiagnosisBtnContainer>
      </DiagnosisContainer>
      <MyInfoBtnWrapper>
        <MyInfoBtn onClick={handleMyInfo}>내 정보</MyInfoBtn>
      </MyInfoBtnWrapper>
    </HomeContainer>
  );
}

export default HomePage;

const HomeContainer = styled.div`
  height: 100vh; /* 화면 전체 높이 */
  padding: 87px 33px 0 33px;
`;

const Logo = styled.img`
  width: 139px;
  height: 38px;
`;

const Text = styled.span`
  font-size: 35px;
  color: #000000;
  line-height: 1.3;
`;

const DiagnosisContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 33px;
`;

const DiagnosisBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DiagnosisBtn = styled.div`
  width: 153px;
  height: 153px;
  background-color: #074aff;
  border-radius: 25%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DiagnosisBtnText = styled.span`
  font-size: 38px;
  color: #ffffff;
  text-align: center;
  font-weight: 700;
`;

const MyInfoBtnWrapper = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`

const MyInfoBtn = styled.div`
  width: 380px;
  height: 100px;
  border-radius: 25px;
  background: #A7A1AE;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 40% */
  letter-spacing: 0.5px;
`

const KiningImg = styled.img`
  position: absolute;
  width: 350px;
  left: 43%;
`;

const KiningImgWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 281px;
`;