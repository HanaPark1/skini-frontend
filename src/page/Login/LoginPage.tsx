/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import logo from "../../assets/logo_b.png";
import client from '../../client';  // client 파일 가져오기
import { useState } from "react";  // 상태 관리를 위해 useState 사용
import { useNavigate } from 'react-router-dom';

// 로그인 함수
export const login = async (loginId: string, password: string): Promise<boolean> => {
  try {
    const apiClient = client();
    if (!apiClient) {
      throw new Error('API 클라이언트를 생성할 수 없습니다.');
    }

    const response = await apiClient.post('/api/login', { loginId, password });

    const accessToken = response.headers['jwt'];
    const refreshToken = response.headers['refresh'];

    if (accessToken && refreshToken) {
      sessionStorage.setItem('accessToken', accessToken);
      document.cookie = `refreshToken=${refreshToken}; Secure; HttpOnly; SameSite=Strict`;

      console.log('로그인 성공!');
      return true; // 성공 시 true 반환
    } else {
      throw new Error('토큰이 없습니다.');
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('아이디 또는 비밀번호를 확인해 주세요.');
    return false; // 실패 시 false 반환
  }
};

function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    const isSuccess = await login(loginId, password); // 로그인 성공 여부 확인
    if (isSuccess) {
      navigate('/'); // 로그인 성공 시 이동
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <HomeContainer>
      <Logo src={logo} alt="skini-Logo" />
      <InputContainer>
        <Input
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}></Input>
        <Input type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}></Input>
      </InputContainer>
      <SignNFindContainer>
        <SingNFindBtn onClick={handleSignUp}>회원가입</SingNFindBtn>
        <SingNFindBtn>아이디/비밀번호찾기</SingNFindBtn>
      </SignNFindContainer>
      <BottomBtn onClick={handleLogin}>로그인</BottomBtn>
    </HomeContainer>
  );
}

export default LoginPage;



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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`
