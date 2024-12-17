/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import kining2 from "../../assets/kining2.png"
import logo from "../../assets/logo_b.png";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh; /* 화면 전체 높이 */
`;

const Logo = styled.img`
  width: 220px;
  height: 60px;
`;

const ImgWrapper = styled.img`
    margin-top: 30px;
    overflow: hidden;
`

const TextContainer = styled.div`
    width: 366px;
    height: 166px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.span`
    font-size: 30px;
    font-weight: 400;
`

const Description = styled.span`
    font-size: 18px;
    font-weight: 300;
    margin-top: 16px;
`

const BottomBtn = styled.div`
    position: fixed; /* 화면에 고정 */
    bottom: 0; /* 화면의 가장 아래로 이동 */
    left: 0; /* 왼쪽 끝에 맞춤 */
    width: 100%; /* 화면 너비를 꽉 채움 */
    height: 130px;
    background-color: #074AFF;
    border-radius: 25px 25px 0 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 50px;
    font-weight: 600;
`;

function SignUpPage() {
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate('/signup/info');
    }

  return (
    <HomeContainer>
        <Logo src={logo} alt="skini-Logo" />
        <ImgWrapper src={kining2}/>
        <TextContainer>
            <Title>피부 상담사 스키니</Title>
            <Description>저는 피부암/질환 자가진단 및 병원 안내 상담사예요
            원활한 검사를 위해 당신에 대해 알려 주세요!</Description>
        </TextContainer>
        <BottomBtn onClick={handleSignUp}>시작하기</BottomBtn> 
    </HomeContainer>
  );
}

export default SignUpPage;
