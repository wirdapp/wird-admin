import React from "react";
import StudentBannerimg1 from "../../../assets/icons/studentImgAtBanner/studentBanner3.svg";
import StudentBannerimg2 from "../../../assets/icons/studentImgAtBanner/studentBanner2.svg";
import {useTranslation} from "react-i18next";

import Banner, {
  ButtonTitle,
  CirclesStyle,
  ContentAndImgs,
  ContentBanner,
  DayContent,
  FirstCircle,
  ResultButton,
  SecondCircle,
  StudentBanner,
  StudentBanner1,
  StudentBanner2,
  TitleContent,
  WelcomeName,
} from "./homeBanner.styles";
import {useNavigate} from "react-router-dom";

function HomeBanner(props) {
  const {t} = useTranslation();
  let navigate = useNavigate();
  const resultButtonOnClick = () => {
    navigate("/dashboard/StudentsPoints");
  };

  return (
    <Banner>
      <CirclesStyle>
        <SecondCircle/>
        <FirstCircle/>
      </CirclesStyle>

      <ContentAndImgs>
        <ContentBanner>
          <TitleContent>
            <WelcomeName>
              {t("welcome")},{' '}
              {props.name}!
            </WelcomeName>
            <DayContent>
              {t("today-is")}
              {props.dayNumber} {t("ramadan")}
            </DayContent>
          </TitleContent>

          <ResultButton href="/StudentsPoints" onClick={resultButtonOnClick}>
            <ButtonTitle>{t("see-contest-result")}</ButtonTitle>
          </ResultButton>
        </ContentBanner>

        <StudentBanner>
          <StudentBanner2 src={StudentBannerimg2} Alt=""/>
          <StudentBanner1 src={StudentBannerimg1} Alt=""/>
        </StudentBanner>
      </ContentAndImgs>
    </Banner>
  );
}

export default HomeBanner;
