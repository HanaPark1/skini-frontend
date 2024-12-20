/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import logo from "../../assets/logo_b.png";

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh; /* 화면 전체 높이 */
`;

const Logo = styled.img`

  width: 220px;
  height: 60px;
  margin-top: 84px;
`;

const Input = styled.input`
    margin: 113px 0 0 12px;

    width: 314px;
    height: 51px;
    border: none; /* 테두리 제거 */
    border-bottom: 1px solid #A7A1AE; /* 밑줄 추가 */
    outline: none; /* 포커스 시 외곽선 제거 */
    background: #f5f5f5;
    font-size: 25px;
    font-weight: bold;
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

function Info() {
  return (
    <HomeContainer>
        <Logo src={logo} alt="skini-Logo" />
        <Input placeholder="아이디"></Input>
        <Input placeholder="비밀번호"></Input>
        <BottomBtn>다음</BottomBtn> 
    </HomeContainer>
  );
}

export default Info;
