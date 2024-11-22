/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import logo from "../../assets/logo_b.png";

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh; /* 화면 전체 높이 */
`;

const Logo = styled.img`
    margin-top: 208px;
    width: 220px;
    height: 60px;
`;

const DiagnosisBtnContainer = styled.div`
    display: flex;
    width: 340px;
    margin-top: 100px;
    justify-content: space-between;
    // background-color: yellow;
`

const DiagnosisBtn = styled.div`
    width: 153px;
    height: 153px;
    background-color: #074AFF;
    border-radius: 25%;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
`

const DiagnosisBtnText = styled.span`
    font-size: 38px;
    color: #ffffff;
    font-weight: 700;
`

function FindMainPage() {
    return (
        <HomeContainer>
            <Logo src={logo}/>
            <DiagnosisBtnContainer>
                <DiagnosisBtn>
                    <DiagnosisBtnText>아이디<br/>찾기</DiagnosisBtnText>
                </DiagnosisBtn>
                <DiagnosisBtn>
                    <DiagnosisBtnText>비밀번호<br />찾기</DiagnosisBtnText>
                </DiagnosisBtn>
            </DiagnosisBtnContainer>
        </HomeContainer>
    );
}

export default FindMainPage;
