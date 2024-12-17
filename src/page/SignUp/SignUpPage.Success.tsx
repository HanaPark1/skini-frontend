/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import kining from "../../assets/kining3.png"
import logo from "../../assets/logo_b.png";
import { useLocation, useNavigate } from "react-router-dom";

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
    margin-top: 100px;
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

function Success() {
    const location = useLocation();
    const username = location.state; // 전달된 데이터

    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }
  return (
    <HomeContainer>
        <Logo src={logo} alt="skini-Logo" />
        <ImgWrapper src={kining}/>
        <TextContainer>
            <Title>회원가입 완료</Title>
            <Description>{username} 님 환영합니다!</Description>
        </TextContainer>
        <BottomBtn onClick={handleHome}>시작하기</BottomBtn> 
    </HomeContainer>
  );
}

export default Success;
