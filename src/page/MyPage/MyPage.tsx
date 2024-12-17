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
    imageUrl: string;
    result: string;
    confidenceScore: string;
    diagnosisType: string;
}

interface Hospital {
    hospitalName: string;
    phoneNumber: string;
    id: string;
    address: string;
}

function MyPage(): JSX.Element {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [diagnosisList, setDiagnosisList] = useState<Diagnosis[] | null>(null);
    const [favoriteHospitals, setFavoriteHospitals] = useState<Hospital[] | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('recent'); // 현재 선택된 카테고리 상태

    const accessToken = sessionStorage.getItem('accessToken');
    const apiClient = client();

    // 카테고리 변경 함수
    const handleCategoryChange = (category: string): void => {
        setActiveCategory(category);
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
            setDiagnosisList(diagnosisResponse.data);

            const hospitalResponse = await apiClient.get('/api/favorites/hospital', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            setFavoriteHospitals(hospitalResponse.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
            alert("로그인을 해 주세요");
            navigate('/login');
        }
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

    const handleLogout = async (): Promise<void> => {
        if (!apiClient) {
            throw new Error('API 클라이언트를 생성할 수 없습니다.');
        }

        const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    
        try {
            // 로그아웃 API 호출
            await apiClient.post('/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'refresh': refreshToken // 리프레시 토큰을 헤더로 보냄
                }
            });
    
            // 쿠키에서 리프레시 토큰 삭제
            document.cookie = 'refreshToken=; Max-Age=0; Secure; HttpOnly; SameSite=Strict';
    
            // 세션에서 액세스 토큰 삭제
            sessionStorage.removeItem('accessToken');  // sessionStorage에서 토큰 삭제
            // 또는 localStorage 사용 시 localStorage.removeItem('accessToken');
    
            alert("로그아웃되었습니다");
            navigate('/');  // 홈으로 리디렉션
        } catch (error) {
            console.error("Error Logout user:", error);
            alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
    };
    
    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText onClick={() => { navigate(-1) }}>&lt;</TopBarText>
                <TopBarText>내 정보</TopBarText>
                <TopBarText>&nbsp;</TopBarText>
            </TopBarContainer>
            <MyInfoContainer>
                <ProfileContainer>
                    <ProfileImg src={profile} />
                    <TopBarText>{userInfo?.username || "정보 없음"}</TopBarText>
                </ProfileContainer>
                <ProfileBtn onClick={() => navigate('/mypage/info')}>개인정보 조회</ProfileBtn>
                <DeleteUserWrapper>
                    <DeleteUserBtn onClick={handleLogout}>로그아웃</DeleteUserBtn>
                    <DeleteUserBtn onClick={handleDelete}>탈퇴하기</DeleteUserBtn>
                </DeleteUserWrapper>
            </MyInfoContainer>
            <MyPageCategoryContainer>
                <MyPageCategoryListContainer>
                    <MyPageCategoryItem
                        active={activeCategory === 'recent'}
                        onClick={() => handleCategoryChange('recent')}
                    >
                        최근 진단기록
                    </MyPageCategoryItem>
                    <MyPageCategoryItem
                        active={activeCategory === 'favorites'}
                        onClick={() => handleCategoryChange('favorites')}
                    >
                        즐겨찾는 병원
                    </MyPageCategoryItem>
                </MyPageCategoryListContainer>
                <ListTextWrapper>
                    <TopBarText>
                        {activeCategory === 'recent' ? '최근 진단기록' : '즐겨찾는 병원'}
                    </TopBarText>
                </ListTextWrapper>
                <ItemsContainer>
                    {activeCategory === 'recent' && (
                        diagnosisList && diagnosisList.length > 0 ? (
                            diagnosisList.map((diagnosis) => (
                                <ItemWrapper key={diagnosis.id} imageUrl={diagnosis.imageUrl} >
                                    <div>
                                        <p><strong>진단 결과:</strong> {diagnosis.result}</p>
                                        <p><strong>신뢰도: </strong>{diagnosis.confidenceScore.split('.')[0]}</p>
                                        <p><strong>유형:</strong> {diagnosis.diagnosisType}</p>
                                    </div>
                                </ItemWrapper>
                            ))
                        ) : (
                            <p>결과가 없습니다</p>
                        )
                    )}
                    {activeCategory === 'favorites' && (
                        favoriteHospitals && favoriteHospitals.length > 0 ? (
                            favoriteHospitals.map((hospital) => (
                                <ItemWrapper key={hospital.id}>
                                    <div>
                                        <p><strong>병원명:</strong> {hospital.hospitalName}</p>
                                        <p><strong>주소:</strong> {hospital.address}</p>
                                        <p><strong>연락처:</strong> {hospital.phoneNumber}</p>
                                    </div>
                                </ItemWrapper>
                            ))
                        ) : (
                            <p>결과가 없습니다</p>
                        )
                    )}
                </ItemsContainer>
                {activeCategory === 'recent' && (
                    <ListBtnWrapper>
                        <ProfileBtn onClick={() => navigate('/mypage/diagnostic')}>진단 목록 조회</ProfileBtn>
                    </ListBtnWrapper>
                )}

                {activeCategory === 'favorites' && (
                    <ListBtnWrapper>
                        <ProfileBtn onClick={() => navigate('/mypage/favoriteHP')}>즐겨찾는 병원 조회</ProfileBtn>
                    </ListBtnWrapper>
                )}
            </MyPageCategoryContainer>
        </HomeContainer>
    );
}

export default MyPage;

const MyPageCategoryItem = styled.div<{ active?: boolean }>`
    width: 113px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: ${({ active }) => (active ? '#074AFF' : '#A7A1AE')};
    border-bottom: ${({ active }) => (active ? '3px solid #074AFF' : '3px solid transparent')};
    padding-bottom: 20px;
    cursor: pointer;
`;

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
    padding: 0 10px 0 10px;
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

const ItemsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    width: 450px;
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
    border: 1px solid #074AFF;
    margin: 0 9px 0 9px;
    background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    justify-content: space-between;
    margin-bottom: 10px;
`;

const DeleteUserBtn = styled.span`
    border-bottom: 1px solid;
    margin-top: 10px;
    padding-bottom: 5px;
`;
