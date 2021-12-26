import React from "react";
import styled from "styled-components";
import ExperienceInfo from "./ExperienceInfo";
import editIcon from "../edit.svg";
import AddIcon from "../add.svg";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: auto;
  max-width: 800px;
  background-color: white;
  position: relative;
  border-radius: 10px;
  padding: 24px;
  margin-top: 12px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Button = styled.img`
  padding: 10px;
  border-radius: 50%;
  margin-right: 5px;
  :hover {
    cursor: pointer;
    background-color: #f3f2ef;
  }
`;

const ExperienceContainer = () => {
  const editButtonClickHandler = (e: any) => {
    e.preventDefault();
    console.log("hi");
  };

  const addExperienceButtonClickHandler = (e: any) => {
    e.preventDefault();
    console.log("hi");
  };

  return (
    <MainContainer>
      <TopRow>
        <Title>Experience</Title>
        <div>
          <Button src={AddIcon} onClick={addExperienceButtonClickHandler} />
          <Button src={editIcon} onClick={editButtonClickHandler} />
        </div>
      </TopRow>
      <ExperienceInfo />
      <ExperienceInfo />
      <ExperienceInfo />
    </MainContainer>
  );
};

export default ExperienceContainer;
