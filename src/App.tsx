import styled from "@emotion/styled";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/Home/HomePage"
import LoginPage from "./page/Login/LoginPage";
import SignUpPage from "./page/SignUp/SignUpPage";
import Info2 from "./page/SignUp/SignUpPage.Info2";
import Success from "./page/SignUp/SignUpPage.Success";
import DiagnosisUproadPage from "./page/Diagnosis/DiagnosisUproadPage";
import DiagnosisDetailPage from "./page/Diagnosis/DiagnosisDetailPage";
import NearestHospital from "./page/Map/NearestHospitalPage";
import MyPage from "./page/MyPage/MyPage";
import DiagnosisGuidePage from "./page/Diagnosis/DiangosisGuidePage";
import MyInfoPage from "./page/MyPage/MyInfoPage";
import RecentDiagnostic from "./page/MyPage/RecentDiagnostic";

function App() {

  const Wrapper = styled.div`
  background-color: #f5f5f5; /* 배경색 */
`;

  return (
    <Wrapper>
      <Routes>
        {/* <Route path="/" element={<InfoPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/info" element={<Info2 />} />
        <Route path="/signup/success" element={<Success />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/info" element={<MyInfoPage />} />
        <Route path="/mypage/diagnostic" element={<RecentDiagnostic />} />
        <Route path="/diagnosis" element={<DiagnosisGuidePage />} />
        <Route path="/diagnosis/upload" element={<DiagnosisUproadPage />} />
        <Route path="/diagnosis/result/:id" element={<DiagnosisDetailPage />} />
        <Route path="/nearhospital" element={<NearestHospital />} />
      </Routes>
      {/* <FindMainPage/> */}
    </Wrapper>
  )
}

export default App
