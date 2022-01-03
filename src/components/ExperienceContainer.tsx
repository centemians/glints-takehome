import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ExperienceInfo from "./ExperienceInfo";
import editIcon from "../edit.svg";
import AddIcon from "../add.svg";
import "./style.css";
import { useForm } from "react-hook-form";
import ExperienceModal from "./ExperienceModal";
import db from "../config";
import firebase from "firebase/compat/app";
import { months } from "../constants/constant";

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

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  top: 24px;
  width: 800px;
  background-color: white;
  border-radius: 10px;
  padding: 16px 24px;
`;

const ExperienceContainer = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [experiences, setExperiences] = useState([] as any);

  useEffect(() => {
    db.collection("experience")
      .where("userId", "==", "123")
      .orderBy("startDate", "desc")
      .onSnapshot((snapshot) => {
        setExperiences(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  console.log("experience is: ", experiences);

  const { register, control, handleSubmit, reset } = useForm({
    reValidateMode: "onBlur",
  });

  const editButtonClickHandler = (e: any) => {
    e.preventDefault();
    console.log("hi");
  };

  const addExperienceButtonClickHandler = (e: any) => {
    e.preventDefault();
    setIsModalActive(true);
    console.log("hi");
  };

  const deactivateModal = () => {
    // setState({ modalActive: false });
    setIsModalActive(false);
  };

  const submitFormHandler = (data: any) => {
    // reset();
    console.log("data is: ", data);
    db.collection("experience").add({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      startDate: new Date(
        data.startDateYear,
        months.indexOf(data.startDateYear)
      ),
      userId: "123",
    });
  };

  const modal = isModalActive ? (
    <ExperienceModal
      deactivateModal={deactivateModal}
      submitFormHandler={submitFormHandler}
    />
  ) : (
    false
  );

  return (
    <MainContainer id="application">
      <TopRow>
        <Title>Experience</Title>
        <div>
          <Button src={AddIcon} onClick={addExperienceButtonClickHandler} />
          <Button src={editIcon} onClick={editButtonClickHandler} />
        </div>
      </TopRow>
      {experiences &&
        experiences.map((experience: any) => {
          return (
            <ExperienceInfo
              key={experience.id}
              experienceData={experience.data}
            />
          );
        })}
      {modal}
    </MainContainer>
  );
};

export default ExperienceContainer;
