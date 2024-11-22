import styled from "@emotion/styled";
import InfoPage from "./page/Info/InfoPage"
import HomePage from "./page/Home/HomePage"
import LoginPage from "./page/Login/LoginPage";
import SignUpPage from "./page/SignUp/SignUpPage";
import Info from "./page/SignUp/SignUpPage.Info";
import Info2 from "./page/SignUp/SignUpPage.Info2";
import Success from "./page/SignUp/SignUpPage.Success";
import FindMainPage from "./page/FindIDnPW/FindMainPage";
import DiagnosisUproadPage from "./page/Diagnosis/DiagnosisUproadPage";
import DiagnosisDetailPage from "./page/Diagnosis/DiagnosisDetailPage";
import NearestHospital from "./page/Map/NearestHospitalPage";
import MyPage from "./page/MyPage/MyPage";

function App() {

  const Wrapper = styled.div`
  background-color: #f5f5f5; /* 배경색 */
`;


  return (
    <Wrapper>
      {/* <InfoPage /> */}
      {/* <HomePage /> */}
      {/* <LoginPage /> */}
      {/* <SignUpPage/> */}
      {/* <Info/> */}
      {/* <Info2/> */}
      {/* <Success/> */}
      {/* <FindMainPage/> */}
      {/* <DiagnosisUproadPage/> */}
      {/* <DiagnosisDetailPage /> */}
      {/* <NearestHospital/> */}
      <MyPage />
    </Wrapper>
  )
}

export default App
