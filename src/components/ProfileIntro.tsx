import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 800px;
  background-color: white;
  position: relative;
  border-radius: 10px;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
`;

const ProfileImage = styled.img`
  display: flex;
  position: absolute;
  width: 152px;
  height: 152px;
  border-radius: 50%;
  top: 100px;
  left: 24px;
  border: 5px solid white;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  padding: 0 24px;
  padding-bottom: 24px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Name = styled.span`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25;
`;

const CompanyLogo = styled.img`
  height: 32px;
  width: 32px;
  margin-right: 8px;
`;

const Designation = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25;
  margin-top: 3px;
`;

const Location = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.25;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 3px;
`;

const ProfileIntro = () => {
  return (
    <MainContainer>
      <CoverImage src="https://i.pinimg.com/originals/d9/11/96/d91196b3dc2628506dfca2e92ccbf22e.jpg" />
      <ProfileImage src="https://media-exp1.licdn.com/dms/image/C5103AQEuA4QzTv0T7g/profile-displayphoto-shrink_400_400/0/1558912687911?e=1645660800&v=beta&t=heCoE1kSnXzQhzT1IHjf5PC0V7DpoB3yQ49A7GyXtyI" />
      <Introduction>
        <TopRow>
          <Name>Abhishek Kumar Shakya</Name>
          <Company>
            <CompanyLogo src="https://media-exp1.licdn.com/dms/image/C4E0BAQG05VHCuyRKZg/company-logo_100_100/0/1600685678299?e=1648684800&v=beta&t=0pPWONi4CS0IFzcOMO3KLZ42xSQlro9z-C7VxFs77pU" />
            Yellow Class
          </Company>
        </TopRow>
        <Designation>SDE 3 at Yellow Class</Designation>
        <Location>Pune, Maharashtra, Karnataka</Location>
      </Introduction>
    </MainContainer>
  );
};

export default ProfileIntro;
