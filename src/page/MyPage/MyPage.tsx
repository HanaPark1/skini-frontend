import styled from "@emotion/styled";
import profile from "../../assets/profile.webp";

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
    width: 261px;
    margin: 0 70px 0 70px;
    height: 248px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const ProfileImg = styled.img`
    width: 121px;
    height: 121px;
    border-radius: 100%;
    margin-bottom: 18px;
`

const ProfileBtn = styled.div`
    width: 100%;
    height: 47px;
    border-radius: 25px;
    background-color: #074AFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: #FFFFFF;
`

const MyPageCategoryContainer = styled.div`
    width: 100%;
    height: 377px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MyPageCategoryListContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    color: #A7A1AE;
    border-bottom: 1px solid;
`

const MyPageCategoryItem = styled.div`
    width: 113px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #A7A1AE;
    border-bottom: 3px solid;
    padding-bottom: 20px;   
`

const ItemsContainer = styled.div`  
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: red;
    white-space: nowrap; /* 자식 요소들이 가로로 나열되도록 함 */
    }
    overflow-x: auto; /* 가로 스크롤을 가능하게 하는 속성 */
    &::-webkit-scrollbar {
        display: none;
}
`

const ItemWrapper = styled.div`
    width: 153px;
    height: 153px;
    border-radius: 25px;
    background-color: #074AFF;
    margin: 0 9px 0 9px;
`
    
function MyPage() {
    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText>&lt;</TopBarText>
                <TopBarText>내 정보</TopBarText>
                <TopBarText>&nbsp; </TopBarText>
            </TopBarContainer>
            <MyInfoContainer>
                <ProfileContainer>
                    <ProfileImg src={profile}/>
                    <TopBarText>스키니</TopBarText>
                </ProfileContainer>
                <ProfileBtn>개인정보 조회</ProfileBtn>
            </MyInfoContainer>
            <MyPageCategoryContainer>
                <MyPageCategoryListContainer>
                    <MyPageCategoryItem>
                        최근 진단기록
                    </MyPageCategoryItem>
                    <MyPageCategoryItem>
                        즐겨찾는 병원
                    </MyPageCategoryItem>
                </MyPageCategoryListContainer>
                <ItemsContainer>
                    <ItemWrapper/>
                    <ItemWrapper/>
                    <ItemWrapper/>
                    <ItemWrapper/>
                    <ItemWrapper/>
                    <ItemWrapper/>
                    <ItemWrapper/>
                </ItemsContainer>
            </MyPageCategoryContainer>

        </HomeContainer>
    )
}

export default MyPage