/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import logo from "../../assets/logo_b.png";

const HomeContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
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
`

const DiagnosisContainer = styled.div`
    display: flex;
    flex-direction: column;
    // background-color: red;
    margin-top: 33px;
`

const DiagnosisBtnContainer = styled.div`
    display: flex;
    margin-top: 100px;
    justify-content: space-between;
    // background-color: yellow;
`

const DiagnosisBtn = styled.div`
    width: 153px;
    height: 153px;
    background-color: #074AFF;
    border-radius: 25%;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`

const DiagnosisBtnText = styled.span`
    font-size: 38px;
    color: #ffffff;
    margin: 25px 0 0 15px;
    display: flex;
    font-weight: 700;
`

function HomePage() {
  return (
    <HomeContainer>
        <Logo src={logo} alt="skini-Logo" />
        <DiagnosisContainer>
            <Text>피부 진단을 통해<br />대비하세요</Text>
            <DiagnosisBtnContainer>
                <DiagnosisBtn>
                    <DiagnosisBtnText>피부암</DiagnosisBtnText>
                </DiagnosisBtn>
                <DiagnosisBtn>
                    <DiagnosisBtnText>피부<br />질환</DiagnosisBtnText>
                </DiagnosisBtn>
            </DiagnosisBtnContainer>
        </DiagnosisContainer>
    </HomeContainer>
  );
}

export default HomePage;
