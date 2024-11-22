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

const SignNFindContainer = styled.div`
    margin: 80px 0 0 36px;
    width: 261px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
s`
const SingNFindBtn = styled.div`
    width: 100%;
    height: 51px;
    background-color: #A7A1AE;
    border-radius: 25px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 25px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
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

function LoginPage() {
  return (
    <HomeContainer>
        <Logo src={logo} alt="skini-Logo" />
        <Input placeholder="아이디"></Input>
        <Input placeholder="비밀번호"></Input>
        <SignNFindContainer>
            <SingNFindBtn>회원가입</SingNFindBtn>
            <SingNFindBtn>아이디/비밀번호찾기</SingNFindBtn>
        </SignNFindContainer>
        <BottomBtn>로그인</BottomBtn> 
    </HomeContainer>
  );
}

export default LoginPage;
