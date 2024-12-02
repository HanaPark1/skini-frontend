import styled from "@emotion/styled";
import Maps from "./Maps";



const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh; /* 화면 전체 높이 */
`;

const TopBarContainer = styled.div`
  margin: 85px 0 65px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TopBarText = styled.span`
  font-weight: bold;
  font-size: 38px;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 281px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.25);
`;

const ResultItem = styled.div`
  width: 90%;
  height: 88px;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #a7a1ae;
  margin-top: 35px;
`;

const CategoryContainer = styled.div`
  width: 48px;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryImg = styled.div`
  width: 48px;
  height: 38px;
  background-color: green;
  border-radius: 10px;
`;

const CategoryText = styled.span`
  font-weight: 400;
  font-size: 18px;
`;

const TitleWrapper = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const DeleteWrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

const DeleteImg = styled.div`
  width: 50px;
  height: 55px;
  background-color: #a7a1ae;
  border-radius: 10px;
`;

function NearestHospital() {
  return (
    <HomeContainer>
      <TopBarContainer>
        <TopBarText>&lt;</TopBarText>
        <TopBarText>가까운 병원 목록</TopBarText>
        <TopBarText>&nbsp;</TopBarText>
      </TopBarContainer>
      <Maps></Maps>
      <ResultWrapper>
        <ResultItem>
          <CategoryContainer>
            <CategoryImg />
            <CategoryText>전문의</CategoryText>
          </CategoryContainer>
          <TitleWrapper>
            <TitleText>병원명</TitleText>
          </TitleWrapper>
          <DeleteWrapper>
            <DeleteImg />
          </DeleteWrapper>
        </ResultItem>
        <ResultItem>
          <CategoryContainer>
            <CategoryImg />
            <CategoryText>전문의</CategoryText>
          </CategoryContainer>
          <TitleWrapper>
            <TitleText>병원명</TitleText>
          </TitleWrapper>
          <DeleteWrapper>
            <DeleteImg />
          </DeleteWrapper>
        </ResultItem>
      </ResultWrapper>
    </HomeContainer>
  );
}

export default NearestHospital;
