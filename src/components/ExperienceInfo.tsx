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
      <CompanyLogo src="https://www.pngfind.com/pngs/m/665-6659827_enterprise-comments-default-company-logo-png-transparent-png.png" />
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
