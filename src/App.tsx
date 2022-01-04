import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import ExperienceContainer from "./components/ExperienceContainer";
import ProfileIntro from "./components/ProfileIntro";
import store from "./redux/store";

const MainContainer = styled.div`
  background-color: #f3f2ef;
  min-height: 100vh;
  justify-content: center;
`;

function App() {
  return (
    <Provider store={store}>
      <MainContainer>
        <ProfileIntro />
        <ExperienceContainer />
      </MainContainer>
    </Provider>
  );
}

export default App;
