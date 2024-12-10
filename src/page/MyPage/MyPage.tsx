import styled from "@emotion/styled";
import profile from "../../assets/profile.webp";
import { useNavigate } from 'react-router-dom';
import client from "@/client";
import { useEffect, useState } from "react";

// 사용자 정보 타입 정의
interface UserInfo {
    username: string;
}

// 진단 기록 타입 정의
interface Diagnosis {
    id: string;
    result: string;
    confidenceScore: string;
    diagnosisType: string;
}

function MyPage(): JSX.Element {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [diagnosisList, setDiagnosisList] = useState<Diagnosis[] | null>(null);

    const accessToken = sessionStorage.getItem('accessToken');
    const apiClient = client();

    const handleMyInfo = (): void => {
        navigate('/mypage/info');
    };

    const handleDelete = async (): Promise<void> => {
        const confirmed = window.confirm("탈퇴하시겠습니까?");
        if (!confirmed) return;

        if (!apiClient) {
            throw new Error('API 클라이언트를 생성할 수 없습니다.');
        }

        try {
            await apiClient.delete('/api/user', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            alert("탈퇴가 완료되었습니다.");
            navigate('/login');
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleList = (): void => {
        navigate('/mypage/diagnostic');
    }; 

    const handleOpen = async (id: string) => {
        navigate(`/diagnosis/result/${id}` , {state: id});
    };

    const fetchUserInfo = async (): Promise<void> => {
        if (!apiClient) {
            throw new Error('API 클라이언트를 생성할 수 없습니다.');
        }

        try {
            const userResponse = await apiClient.get('/api/user', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            setUserInfo(userResponse.data);

            const diagnosisResponse = await apiClient.get('/api/diagnosis', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            console.log(diagnosisResponse.data);
            setDiagnosisList(diagnosisResponse.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
            alert("로그인을 해 주세요");
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText onClick={()=> {navigate(-1)}}>&lt;</TopBarText>
                <TopBarText>내 정보</TopBarText>
                <TopBarText>&nbsp;</TopBarText>
            </TopBarContainer>
            <MyInfoContainer>
                <ProfileContainer>
                    <ProfileImg src={profile} />
                    <TopBarText>{userInfo?.username || "정보 없음"}</TopBarText>
                </ProfileContainer>
                <ProfileBtn onClick={handleMyInfo}>개인정보 조회</ProfileBtn>
                <DeleteUserWrapper>
                    <DeleteUserBtn onClick={handleDelete}>탈퇴하기</DeleteUserBtn>
                </DeleteUserWrapper>
            </MyInfoContainer>
            <MyPageCategoryContainer>
                <MyPageCategoryListContainer>
                    <MyPageCategoryItem>최근 진단기록</MyPageCategoryItem>
                    <MyPageCategoryItem>즐겨찾는 병원</MyPageCategoryItem>
                </MyPageCategoryListContainer>
                <ListTextWrapper>
                    <TopBarText>최근 진단기록</TopBarText>
                </ListTextWrapper>
                <ItemsContainer>
                    {diagnosisList?.map((diagnosis) => (
                        <ItemWrapper key={diagnosis.id} imageUrl={diagnosis.imageUrl} onClick={() => {handleOpen(diagnosis.id)}}>
                            <div>
                                <p><strong>진단 결과:</strong> {diagnosis.result}</p>
                                <p><strong>확신도:</strong> {diagnosis.confidenceScore.split('.')[0]}</p>
                                <p><strong>유형:</strong> {diagnosis.diagnosisType}</p>
                            </div>
                        </ItemWrapper>
                    ))}
                </ItemsContainer>
                <ListBtnWrapper>
                    <ProfileBtn onClick={handleList}>진단 목록 조회</ProfileBtn>
                </ListBtnWrapper>
            </MyPageCategoryContainer>
        </HomeContainer>
    );
}

export default MyPage;

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`;

const TopBarContainer = styled.div`
    margin-top: 85px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const TopBarText = styled.span`
    font-weight: bold;
    font-size: 38px;
`;

const MyInfoContainer = styled.div`
    width: 261px;
    margin: 0 70px 0 70px;
    height: 248px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const ProfileImg = styled.img`
    width: 121px;
    height: 121px;
    border-radius: 100%;
    margin-bottom: 18px;
`;

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
`;

const MyPageCategoryContainer = styled.div`
    width: 100%;
    height: 377px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MyPageCategoryListContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    color: #A7A1AE;
    border-bottom: 1px solid;
`;

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
`;

const ItemsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    width: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ItemWrapper = styled.div<{ imageUrl?: string }>`
    width: 153px;
    height: 153px;
    min-width: 153px;  /* 최소 너비 고정 */
    min-height: 153px; /* 최소 높이 고정 */
    border-radius: 25px;
    background-color: #074AFF;
    margin: 0 9px 0 9px;
    background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
    background-size: cover;
    background-position: center;
`;

const ListTextWrapper = styled.div`
    padding: 20px 0 15px 0;
`;

const ListBtnWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeleteUserWrapper = styled.div`
    display: flex;
    justify-content: end;
`;

const DeleteUserBtn = styled.span`
    border-bottom: 1px solid;
    margin-top: 10px;
    padding-bottom: 5px;
`;