import React from "react";
import styled from "styled-components";
import ExperienceContainer from "./components/ExperienceContainer";
import ProfileIntro from "./components/ProfileIntro";

const MainContainer = styled.div`
  background-color: #f3f2ef;
  min-height: 100vh;
  justify-content: center;
`;

function App() {
  return (
    <MainContainer>
      <ProfileIntro />
      <ExperienceContainer />
    </MainContainer>
  );
}

export default App;
