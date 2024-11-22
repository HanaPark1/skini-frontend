/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import logo from "../../assets/logo_w.png";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 */
  background-color: #074aff; /* 배경색 */
`;

const Character = styled.img`
  width: 305px; /* 이미지 크기 조정 */
  height: auto;
  animation: bounce 1.5s infinite;
  margin: 0 48px 0 48px;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

function InfoPage() {
  return (
    <LoadingWrapper>
        <Character src={logo} alt="Character" />
    </LoadingWrapper>
  );
}

export default InfoPage;
