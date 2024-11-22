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

const GuideWrapper = styled.div`
    width: 100%;
    height: 880px;
    border-radius: 10px 10px 0 0;
    margin-top: 58px;
    background-color: #FFFFFF;
    box-shadow: 0 5px 50px rgba(0, 0, 0, 0.5)
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

function DiagnosisGuidePage() {
    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText>&lt;</TopBarText>
                <TopBarText>피부진단</TopBarText>
                <TopBarText>&nbsp; </TopBarText>
            </TopBarContainer>
            <GuideWrapper>
                이미지 업로드에 대한 가이드
            </GuideWrapper>
            <BottomBtn>확인</BottomBtn>
        </HomeContainer>
    );
}

export default DiagnosisGuidePage