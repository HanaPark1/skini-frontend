/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import logo from "../../assets/logo_b.png";
import { useNavigate } from "react-router-dom";
import client from "@/client";
import { useState, ChangeEvent } from "react";

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Logo = styled.img`

  width: 220px;
  height: 60px;
  margin: 84px 0 113px 0;
`;

const Input = styled.input`
    margin: ${({ type }) => (type === "tel" ? "0 0 180px 12px" : "0 0 113px 12px")};

    width: 314px;
    height: 51px;
    border: none; /* 테두리 제거 */
    border-bottom: 1px solid #A7A1AE; /* 밑줄 추가 */
    outline: none; /* 포커스 시 외곽선 제거 */
    background: #f5f5f5;
    font-size: 25px;
    font-weight: bold;
    color: #777;
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

const Select = styled.select`
  margin: 0 0 180px 12px;
  width: 314px;
  height: 51px;
  border: none;
  border-bottom: 1px solid #a7a1ae;
  background: #f5f5f5;
  font-size: 25px;
  font-weight: bold;
  color: #777;
`;

function Info2() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    loginId: "",
    password: "",
    email: "",
    age: 0,
    gender: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSuccess = async () => {
    const apiClient = client();
    if (!apiClient) {
      throw new Error("API 클라이언트를 생성할 수 없습니다.");
    }

    try {
      const response = await apiClient.post("/api/join", {
        ...formData,
        age: Number(formData.age), // age는 숫자로 변환
      });
      if (response.status === 200) {
        navigate("/signup/success", {state: formData.username});
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
    }
  };
  return (
    <HomeContainer>
      <Logo src={logo} alt="skini-Logo" />
      <Input name="username" placeholder="사용자 이름" onChange={handleChange} />
      <Input name="loginId" placeholder="아이디" onChange={handleChange} />
      <Input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
      <Input name="email" type="email" placeholder="이메일" onChange={handleChange} />
      <Input name="age" type="number" placeholder="나이" onChange={handleChange} />
      <Select name="gender" onChange={handleChange}>
        <option value="">성별 선택</option>
        <option value="MALE">남성</option>
        <option value="FEMALE">여성</option>
      </Select>
      <BottomBtn onClick={handleSuccess}>입력 완료</BottomBtn>
    </HomeContainer>
  );
}

export default Info2;
