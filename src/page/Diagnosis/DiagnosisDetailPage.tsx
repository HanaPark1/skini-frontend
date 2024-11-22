import styled from "@emotion/styled";

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh; /* 화면 전체 높이 */
`;

const TopBarContainer = styled.div`
    margin-top: 85px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const TopBarText = styled.span`
    font-weight: bold;
    font-size: 38px;
`

const DetailContainer = styled.div`
    width: 334px;
    height: 65px;
    margin: 39px 34px 20px 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const CategoryContainer = styled.div`
    width: 48px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const CategoryImg = styled.div`
    width: 48px;
    height: 38px;
    background-color: green;
    border-radius: 10px;
`

const CategoryText = styled.span`
    font-weight: 400;
    font-size: 18px;
`

const TextContainer = styled.div`
    width: 144px;
    display: flex;
    justify-content: space-between;
`

const DateNTitleContainer = styled.div`
    width: 81px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const DateText = styled.span`
    font-weight: bold;
    font-size: 20px;
`

const TitleText = styled.span`
    font-weight: bold;  
    font-size: 30px;
`
const ScoreText = styled.span`
    font-weight: 400;
    font-size: 20px;
    display: flex;
    align-items: end;
`

const ResultImg = styled.div`
    width: 74px;
    border-radius: 10px;
    background-color: orange;
    visibility: hidden;
`

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 402px;
    height: 640px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.25);
`

const Line = styled.div`
    width: 93.021px;
    height: 2px;
    background-color: #A7A1AE;
    margin-top: 18px;
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

function DiagnosisDetailPage() {
    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText>&lt;</TopBarText>
                <TopBarText>상세 진단</TopBarText>
                <TopBarText>&nbsp; </TopBarText>
            </TopBarContainer>
            <DetailContainer>
                <CategoryContainer>
                    <CategoryImg/>
                    <CategoryText>피부암</CategoryText>
                </CategoryContainer>
                <TextContainer>
                    <DateNTitleContainer>
                        <DateText>24.11.05</DateText>
                        <TitleText>흑색종</TitleText>
                    </DateNTitleContainer>
                    <ScoreText>88점</ScoreText>
                </TextContainer>
                <ResultImg />
            </DetailContainer>
            <ResultWrapper>
                <Line />
            </ResultWrapper>
            <BottomBtn>가까운 병원</BottomBtn>
        </HomeContainer>
    )
}

export default DiagnosisDetailPage