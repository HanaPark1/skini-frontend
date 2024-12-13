import client from "@/client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

interface Diagnosis {
    id: string,
    diagnosisType: string,
    imageUrl: string
    isPositive: boolean,
    confidenceScore: string,
    result: string,
    createdAt: string
    username: string
}

interface DiagnosisInfo {
    engName: string,
    korName: string,
    description: string,
    guideline: string
}

function DiagnosisDetailPage() {
    const apiClient = client();
    const location = useLocation();
    const diagnosisId = location.state;
    const navigate = useNavigate();
    const [diagnosisResult, setDiagnosisResult] = useState<Diagnosis | null>(null);
    const [diagnosisInfo, setDiagnosisInfo] = useState<DiagnosisInfo | null>(null);

    const fetchDiagnosisData = async () => {
        console.log(diagnosisId);
        try {
            if (!apiClient) {
                console.error("API 클라이언트가 생성되지 않았습니다.");
            } else {
                const headers: Record<string, string> = {};
    
                const accessToken = sessionStorage.getItem('accessToken');
                if (accessToken) {
                    headers['Authorization'] = `Bearer ${accessToken}`;
                }
    
                const response = await apiClient.get(`/api/diagnosis/${diagnosisId}`, {
                    headers: headers, // 헤더를 조건에 맞게 설정
                });
    
                const data = response.data;
                if (data.confidenceScore) {
                    data.confidenceScore = data.confidenceScore.split('.')[0];
                }
                setDiagnosisResult(data); // 'data'에 접근 가능
            }
        } catch (error) {
            console.error('Error fetching diagnosis data:', error);
        }
    };
    

    const fetchDiagnosisInfoData = async (result: Diagnosis) => {
        console.log(result.result);
        
        try {
            if (!apiClient) {
                console.error("API 클라이언트가 생성되지 않았습니다.");
            } else {
                const response = await apiClient.get(`/api/diagnosis_info?name=${result.result}`);
                setDiagnosisInfo(response.data); // 추가 데이터 저장
            }
            
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    const handleNear = (): void => {
        navigate('/nearhospital');
    };

    const handleList = (): void => {
        navigate('/mypage/diagnostic');
    };

    useEffect(() => {
        fetchDiagnosisData();
    }, []);

    useEffect(() => {
        if (diagnosisResult) {
            fetchDiagnosisInfoData(diagnosisResult);
        }
    }, [diagnosisResult]);

    if (!diagnosisResult) {
        return <div>로딩 중...</div>;
    }
        return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText onClick={() => navigate(-1)}>&lt;</TopBarText>
                <TopBarText>상세 진단</TopBarText>
                <TopBarText>&nbsp; </TopBarText>
            </TopBarContainer>
            <DetailContainer>
                <CategoryContainer>
                    <CategoryImg />
                    <CategoryText>{diagnosisResult.diagnosisType}</CategoryText>
                </CategoryContainer>
                <TextContainer>
                    <DateNTitleContainer>
                        <DateText>{diagnosisResult.createdAt}</DateText>
                        <TitleText>{diagnosisInfo ? diagnosisInfo.korName : '로딩 중...'}</TitleText>
                    </DateNTitleContainer>
                    <ScoreText>{diagnosisResult.confidenceScore}%</ScoreText>
                </TextContainer>
                <ResultImg src={diagnosisResult.imageUrl} />
            </DetailContainer>
            <ResultWrapper>
                <Line />
                <ResultDescriptorContainer>
                    <TitleText>진단 상세 설명</TitleText>
                    <ResultDescriptorText>{diagnosisInfo ? diagnosisInfo.description : '추가 정보 로딩 중...'}</ResultDescriptorText>
                </ResultDescriptorContainer>
                <ResultDescriptorContainer>
                    <TitleText>치료법 및 대처법</TitleText>
                    <ResultDescriptorText>{diagnosisInfo ? diagnosisInfo.guideline : '추가 정보 로딩 중...'}</ResultDescriptorText>
                </ResultDescriptorContainer>
            </ResultWrapper>
            <BottomBtnContainer>
                <HalfBtn onClick={handleNear}>가까운<br /> 병원</HalfBtn>
                <HalfBtn onClick={handleList}>진단 기록</HalfBtn>
            </BottomBtnContainer>
        </HomeContainer>
    );
}


export default DiagnosisDetailPage

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
    margin: 39px 0px 20px 34px;
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

const CategoryImg = styled.img`
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
    font-weight: bold;  
    font-size: 30px;
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
    // background-color: orange;
    // visibility: hidden;
`

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 402px;
    // height: 640px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.25);
    padding: 20px 20px 180px 20px;
`

const ResultDescriptorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ResultDescriptorText = styled.span`
    font-size: 28px;
    margin: 10px 0 10px 0;
`

const Line = styled.div`
    width: 93.021px;
    height: 2px;
    background-color: #A7A1AE;
    margin: 18px 0 20px 0;
`

const BottomBtnContainer = styled.div`
    position: fixed; /* 화면에 고정 */
    bottom: 0; /* 화면의 가장 아래로 이동 */
    left: 0; /* 왼쪽 끝에 맞춤 */
    width: 100%; /* 화면 너비를 꽉 채움 */
    height: 130px;
    background-color: #074AFF;
    border-radius: 25px 25px 0 0;
    display: flex; /* 버튼을 가로로 정렬 */
`;

const HalfBtn = styled.div`
    flex: 1; /* 버튼 너비를 반으로 나눔 */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 50px;
    font-weight: 600;
    cursor: pointer;

    &:first-of-type {
        border-right: 1px solid rgba(255, 255, 255, 0.5); /* 중앙 분리선 */
    }

    &:hover {
        background-color: #0536c4; /* 호버 효과 */
    }
`;
