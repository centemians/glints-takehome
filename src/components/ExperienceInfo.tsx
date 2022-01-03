import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f2ef;
  margin-bottom: 12px;
`;

const CompanyLogo = styled.img`
  height: 48px;
  width: 48px;
  margin-right: 8px;
`;

const CompanyInformation = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.4;
`;

const Designation = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const CompanyName = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Duration = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`;

const Location = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`;

const JobDescription = styled.span`
  font-size: 14px;
  margin-top: 12px;
`;

const ExperienceInfo = ({ experienceData }: any) => {
  const {
    jobTitle,
    companyName,
    location,
    startDateMonth,
    startDateYear,
    endDateMonth,
    endDateYear,
    isCurrentJob,
    jobDescription,
  } = experienceData;
  return (
    <MainContainer>
      <CompanyLogo src="https://media-exp1.licdn.com/dms/image/C4E0BAQG05VHCuyRKZg/company-logo_100_100/0/1600685678299?e=1648684800&v=beta&t=0pPWONi4CS0IFzcOMO3KLZ42xSQlro9z-C7VxFs77pU" />
      <CompanyInformation>
        <Designation>{jobTitle}</Designation>
        <CompanyName>{companyName}</CompanyName>
        <Duration>
          {`${startDateMonth} ${startDateYear} - ${
            isCurrentJob ? "Present" : `${endDateMonth} ${endDateYear}`
          }`}
        </Duration>
        <Location>{location}</Location>
        <JobDescription>{jobDescription}</JobDescription>
      </CompanyInformation>
    </MainContainer>
  );
};

export default ExperienceInfo;
