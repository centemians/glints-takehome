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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addExperienceOffline, syncData } from "../redux/actions/app";

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
  const dispatch = useDispatch();

  const data = useSelector((state: any) => {
    return {
      allExperience: state.app.allExperience,
      user: state.user.user,
    };
  }, shallowEqual);

  useEffect(() => {
    if (data?.allExperience?.length) {
      let allData = data.allExperience.filter((item: any) => {
        return item !== null && item !== undefined;
      });

      allData = allData.sort((item1: any, item2: any) => {
        if (
          new Date(item1?.startDate).getTime() >
          new Date(item2?.startDate).getTime()
        )
          return -1;
        else if (
          new Date(item1?.startDate).getTime() <
          new Date(item2?.startDate).getTime()
        )
          return 1;

        return 0;
      });
      setExperiences(allData);
    }
  }, [data]);

  useEffect(() => {
    db.collection("experience")
      .where("userId", "==", data.user.uid)
      .orderBy("startDate", "desc")
      .get()
      .then((snapshot: any) => {
        const exps = snapshot.docs.map((doc: any) => doc.data());
        console.log("==>>", exps);
        dispatch(syncData(exps));
      });
  }, []);

  const { register, control, handleSubmit, reset } = useForm({
    reValidateMode: "onBlur",
  });

  const editButtonClickHandler = (e: any) => {
    e.preventDefault();
  };

  const addExperienceButtonClickHandler = (e: any) => {
    e.preventDefault();
    setIsModalActive(true);
  };

  const deactivateModal = () => {
    setIsModalActive(false);
  };

  const submitFormHandler = (formData: any) => {
    reset();
    const newData = {
      ...formData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      startDate: new Date(
        formData.startDateYear,
        months.indexOf(formData.startDateMonth)
      ),
      userId: data.user.uid,
    };

    dispatch(addExperienceOffline(newData));
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
          {/* <Button src={editIcon} onClick={editButtonClickHandler} /> */}
        </div>
      </TopRow>
      {experiences &&
        experiences.map((experience: any) => {
          return (
            <ExperienceInfo
              key={Math.random().toString(36).substring(2, 7)}
              experienceData={experience}
            />
          );
        })}
      {modal}
    </MainContainer>
  );
};

export default ExperienceContainer;
