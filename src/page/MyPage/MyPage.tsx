import styled from "@emotion/styled";

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
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

const MyInfoContainer = styled.div`
    margin: 0 70px 0 70px;
    height: 248px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: red;
`

// const ProfileContainer = styled.div`
//     width: 120px;
//     background-color: red;
// `

// const ProfileImg = styled.div`
//     width: 100%;
//     border-radius: 100%
//     background-color: yellow;
// `

function MyPage() {
    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText>&lt;</TopBarText>
                <TopBarText>내 정보</TopBarText>
                <TopBarText>&nbsp; </TopBarText>
            </TopBarContainer>
            <MyInfoContainer>
                di
                {/* <ProfileContainer>
                    <ProfileImg />
                </ProfileContainer> */}
            </MyInfoContainer>
        </HomeContainer>
    )
}

export default MyPage