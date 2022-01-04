import React from "react";
import { Provider, shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import ExperienceContainer from "./components/ExperienceContainer";
import Login from "./components/Login";
import ProfileIntro from "./components/ProfileIntro";
import store from "./redux/store";

const MainContainer = styled.div`
  background-color: #f3f2ef;
  min-height: 100vh;
  justify-content: center;
`;

function App() {
  const data = useSelector((state: any) => {
    console.log("state is: ", state);
    return {
      user: state.user.user,
    };
  }, shallowEqual);

  return (
    <>
      {!data.user ? (
        <Login />
      ) : (
        <MainContainer>
          <ProfileIntro />
          <ExperienceContainer />
        </MainContainer>
      )}
    </>
  );
}

export default App;
