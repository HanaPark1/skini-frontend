/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import client from "@/client";
import deleteIcon from "../../assets/Delete.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecentDiagnostic() {
    const navigate = useNavigate();
    const [diagnosisList, setDiagnosisList] = useState<Diagnosis[] | null>(null);
    const accessToken = sessionStorage.getItem('accessToken');
    const apiClient = client();

    interface Diagnosis {
        id: string;
        result: string;
        confidenceScore: number;
        diagnosisType: string;
        imageUrl: string;
    }

    if (!apiClient) {
        throw new Error('API 클라이언트를 생성할 수 없습니다.');
    }

    const fetchDiagnosisData = async () => {
        try {
            const response = await apiClient.get('/api/diagnosis', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            setDiagnosisList(response.data); // 'data'에 접근 가능
        } catch (error) {
            console.error("Error fetching diagnosis data:", error);
        }
    };

    useEffect(() => {
        fetchDiagnosisData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/api/diagnosis/${id}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            // 삭제 후 목록을 갱신하려면 아래처럼 필터링하여 상태 업데이트
            setDiagnosisList((prev) => prev?.filter((item) => item.id !== id) || null);
            alert('삭제되었습니다.');
        } catch (error) {
            console.error("Error deleting diagnosis data:", error);
            alert('삭제에 실패했습니다.');
        }
    };


    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText onClick={() => navigate(-1)}>&lt;</TopBarText>
                <TopBarText>진단 목록 조회</TopBarText>
                <TopBarText>&nbsp; </TopBarText>
            </TopBarContainer>
            {diagnosisList?.map((diagnosis) => (
                <DetailContainer key={diagnosis.id}>
                    <CategoryContainer>
                        <CategoryImg />
                        <CategoryText>{diagnosis.diagnosisType}</CategoryText>
                    </CategoryContainer>
                    <ResultImg src={diagnosis.imageUrl} />
                    <TextContainer>
                        <DateNTitleContainer>
                            <DateText>24.11.05</DateText>
                            <TitleText>{diagnosis.result}</TitleText>
                        </DateNTitleContainer>
                        <ScoreText>{Math.floor(diagnosis.confidenceScore)}</ScoreText>
                    </TextContainer>
                    <DeleteBtn src={deleteIcon} onClick={() => handleDelete(diagnosis.id)} />
                </DetailContainer>
            ))}

        </HomeContainer>
    );
}

export default RecentDiagnostic;

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh; /* 화면 전체 높이 */
`;

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const DateText = styled.span`
    font-weight: bold;
    font-size: 20px;
`

const TitleText = styled.span`
    width: 81px;
    font-weight: bold;  
    font-size: 30px;
    white-space: nowrap; /* 줄바꿈 방지 */
    overflow: hidden; /* 넘치는 부분 숨김 */
    text-overflow: ellipsis; /* ... 처리 */
`
const ScoreText = styled.span`
    font-weight: 400;
    font-size: 20px;
    display: flex;
    align-items: end;
    
`

const ResultImg = styled.img`
    width: 74px;
    border-radius: 10px;
`

const DeleteBtn = styled.img`
    width: 40px;
    height: 45px;
`

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