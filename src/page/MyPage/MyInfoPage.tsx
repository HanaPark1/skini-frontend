/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import profile from "../../assets/profile.webp";
import { useEffect, useState, ChangeEvent } from "react";
import client from "@/client";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100px 0 100px 0;
`;

const Input = styled.input`
    margin: 0 0 113px 12px;
    width: 314px;
    height: 51px;
    border: none;
    border-bottom: 1px solid #A7A1AE;
    outline: none;
    background: #f5f5f5;
    font-size: 25px;
    font-weight: bold;
`;

const TopBarContainer = styled.div`
    width: 100%;
    background-color: #074AFF;
    border-radius: 0 0 25px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopBarTextContainer = styled.div`
    width: 100%;
    margin-top: 85px;
    display: flex;
    justify-content: space-between;
`;

const TopBarText = styled.span`
    font-weight: bold;
    font-size: 38px;
    color: white;
`;

const MyInfoContainer = styled.div`
    width: 261px;
    height: 248px;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 34px;
`;

const ProfileImg = styled.img`
    width: 121px;
    height: 121px;
    border-radius: 100%;
    margin-bottom: 18px;
`;

const BottomBtn = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
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

const InputTextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const InputTypeText = styled.span`
    color: #000;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.25px;
    margin-bottom: 35px;
`;

const InputText = styled.span`
    margin: 0 0 113px 12px;
    width: 314px;
    height: 51px;
    border: none;
    border-bottom: 1px solid #A7A1AE;
    outline: none;
    background: #f5f5f5;
    font-size: 25px;
    font-weight: bold;
`;

interface UserInfo {
    username: string;
    loginId: string;
    email: string;
    age: number;
    gender: string;
}

function MyInfoPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedInfo, setUpdatedInfo] = useState<UserInfo | null>(null);

    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        const accessToken = sessionStorage.getItem('accessToken');
        const apiClient = client();
        if (!apiClient) {
            throw new Error('API 클라이언트를 생성할 수 없습니다.');
        }

        try {
            const response = await apiClient.get('/api/user', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            setUserInfo(response.data);
            setUpdatedInfo(response.data);  // 수정된 정보를 저장할 초기 상태 설정
        } catch (error) {
            console.error("Error fetching user info:", error);
            alert("로그인을 해 주세요");
            navigate('/login');
        }
    };

    // 사용자 정보 수정 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (updatedInfo) {
            setUpdatedInfo({ ...updatedInfo, [name]: value });
        }
    };

    // 정보 저장 함수
    const saveUserInfo = async () => {
        const accessToken = sessionStorage.getItem('accessToken');
        const apiClient = client();
        if (!apiClient) {
            throw new Error('API 클라이언트를 생성할 수 없습니다.');
        }

        try {
            const response = await apiClient.patch('/api/user', updatedInfo, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                setIsEditing(false);
                setUserInfo(updatedInfo);  // 업데이트된 정보를 사용자 정보로 설정
                alert("개인정보가 수정되었습니다.");
            }
        } catch (error) {
            console.error("Error saving user info:", error);
        }
    };

    // 컴포넌트가 마운트될 때 호출
    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarTextContainer>
                    <TopBarText onClick={()=> {navigate(-1)}}>&lt;</TopBarText>
                    <TopBarText>개인정보 조회</TopBarText>
                    <TopBarText>&nbsp;</TopBarText>
                </TopBarTextContainer>
                <MyInfoContainer>
                    <ProfileContainer>
                        <ProfileImg src={profile} />
                        <TopBarText>{userInfo?.username || "정보 없음"}</TopBarText>
                    </ProfileContainer>
                </MyInfoContainer>
            </TopBarContainer>

            <InputContainer>
                {isEditing ? (
                    <InputTextContainer>
                        <InputTypeText>이름</InputTypeText>
                        <Input
                            name="username"
                            value={updatedInfo?.username || ""}
                            onChange={handleChange}
                        />
                    </InputTextContainer>

                ) : (
                    <></>
                )}

                {/* 아이디 */}
                <InputTextContainer>
                    <InputTypeText>아이디</InputTypeText>
                    {isEditing ? (
                        <Input
                            name="loginId"
                            value={updatedInfo?.loginId || ""}
                            onChange={handleChange}
                        />
                    ) : (
                        <InputText>{userInfo?.loginId || "정보 없음"}</InputText>
                    )}
                </InputTextContainer>

                {/* 이메일 */}
                <InputTextContainer>
                    <InputTypeText>이메일</InputTypeText>
                    {isEditing ? (
                        <Input
                            name="email"
                            value={updatedInfo?.email || ""}
                            onChange={handleChange}
                        />
                    ) : (
                        <InputText>{userInfo?.email || "정보 없음"}</InputText>
                    )}
                </InputTextContainer>

                {/* 나이 */}
                <InputTextContainer>
                    <InputTypeText>나이</InputTypeText>
                    {isEditing ? (
                        <Input
                            name="age"
                            type="number"
                            value={updatedInfo?.age || ""}
                            onChange={handleChange}
                        />
                    ) : (
                        <InputText>{userInfo?.age || "정보 없음"}</InputText>
                    )}
                </InputTextContainer>

                {/* 성별 */}
                <InputTextContainer>
                    <InputTypeText>성별</InputTypeText>
                    {isEditing ? (
                        <Input
                            name="gender"
                            value={updatedInfo?.gender || ""}
                            onChange={handleChange}
                        />
                    ) : (
                        <InputText>{userInfo?.gender || "정보 없음"}</InputText>
                    )}
                </InputTextContainer>
            </InputContainer>

            {isEditing ? (
                <BottomBtn onClick={saveUserInfo}>저장</BottomBtn>
            ) : (
                <BottomBtn onClick={() => setIsEditing(true)}>개인 정보 수정</BottomBtn>
            )}
        </HomeContainer>
    );
}

export default MyInfoPage;
