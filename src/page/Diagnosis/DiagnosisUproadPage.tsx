import styled from "@emotion/styled";
import camera from "../../assets/Camera.png";
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import client from "@/client";

const DiagnosisUproadPage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null); // 파일 상태 관리
    const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 상태 관리
    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 input을 참조

    // 파일 선택 처리 함수
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile); // 파일 URL 생성
            setImagePreview(previewUrl); // 미리보기 URL 상태에 저장
        }
    };

    // 카메라 이미지를 클릭했을 때 파일 선택 창을 여는 함수
    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // input[type="file"] 클릭
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert('파일을 선택해 주세요.');
            return;
        }
    
        const diagnosisType = 'CANCER'; // 'CANCER' 또는 'DISEASE'
        const formData = new FormData();
        formData.append('file', file); // 이미지 파일 추가
    
        const apiClient = client();
        if (!apiClient) {
            throw new Error('API 클라이언트를 생성할 수 없습니다.');
        }
    
        try {
            const headers: Record<string, string> = { 'Content-Type': 'multipart/form-data' };
    
            const accessToken = sessionStorage.getItem('accessToken'); // 세션에서 토큰 가져오기
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }
    
            const response = await apiClient.post(
                `api/diagnosis?type=${diagnosisType}`,
                formData,
                { headers }
            );
    
            console.log('파일 업로드 성공:', response.data);
            alert('파일 업로드가 완료되었습니다.');
            
            navigate(`/diagnosis/result/${response.data.id}`, { state: response.data.id });
                
        } catch (error) {
            console.error('파일 업로드 실패:', error);
            alert('파일 업로드에 실패했습니다. 다시 진행해 주세요.');
        }
    };
    

    return (
        <HomeContainer>
            <TopBarContainer>
                <TopBarText onClick={()=> {navigate(-1)}}>&lt;</TopBarText>
                <TopBarText>피부진단</TopBarText>
                <TopBarText>&nbsp;</TopBarText>
            </TopBarContainer>
            {/* 이미지 미리보기 */}
            <CameraImg
                src={imagePreview || camera} // 이미지 미리보기 없으면 카메라 이미지
                alt="Camera"
                onClick={handleCameraClick}
            />

            {/* hidden input to trigger file selection */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // 파일 input을 숨김
                onChange={handleFileChange}
            />  

            <BottomBtn onClick={handleSubmit}>이미지 선택</BottomBtn>
        </HomeContainer>
    );
};

export default DiagnosisUproadPage;

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
`;

const TopBarText = styled.span`
    font-weight: bold;
    font-size: 38px;
`;

const CameraImg = styled.img`
    width: 277px;
    height: 277px;
    margin-top: 187px;
    cursor: pointer; /* 클릭 가능하게 스타일링 */
`;

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