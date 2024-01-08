import React, { useState } from "react";
import StudentBannerimg1 from "../../../assets/icons/studentImgAtBanner/studentBanner3.svg";
import StudentBannerimg2 from "../../../assets/icons/studentImgAtBanner/studentBanner2.svg";
import { useTranslation } from "react-i18next";

import Banner, {
  CirclesStyle,
  ContentAndImgs,
  ContentBanner,
  DayContent,
  FirstCircle,
  SecondCircle,
  StudentBanner,
  StudentBanner1,
  StudentBanner2,
  TitleContent,
  WelcomeName,
} from "./homeBanner.styles";
import { useDashboardData } from "../../../util/routes-data";
import { JoinContestPopup } from "../../Competition/join-contest-popup";
import { Button } from "../../../ui/button";
import { CreateContestPopup } from "../../Competition/create-contest-popup";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { css } from "@emotion/css";

function HomeBanner(props) {
  const { currentContest } = useDashboardData();
  const { t } = useTranslation();
  const [createContestOpen, setCreateContestOpen] = useState(false);
  const [joinContestOpen, setJoinContestOpen] = useState(false);

  return (
    <Banner>
      <CirclesStyle>
        <SecondCircle />
        <FirstCircle />
      </CirclesStyle>

      <ContentAndImgs>
        <ContentBanner>
          <TitleContent>
            <WelcomeName>
              {t("welcome")}, {props.name}!
            </WelcomeName>
            <DayContent>
              {t("today-is")} {props.dayNumber} {t("ramadan")}
            </DayContent>
          </TitleContent>

          {currentContest ? (
            <Button variant="primary" href="/dashboard/results">
              {t("see-contest-result")}
            </Button>
          ) : (
            <div
              className={css`
                display: flex;
                flex-direction: row;
                gap: 8px;
              `}
            >
              <Button
                variant="primary"
                onClick={() => setCreateContestOpen(true)}
              >
                {t("create-contest")}
                <PlusCircleIcon />
              </Button>
              <Button onClick={() => setJoinContestOpen(true)}>
                {t("join-contest")}
              </Button>
              <CreateContestPopup
                visible={createContestOpen}
                onClose={() => setCreateContestOpen(false)}
              />
              <JoinContestPopup
                visible={joinContestOpen}
                onClose={() => setJoinContestOpen(false)}
              />
            </div>
          )}
        </ContentBanner>

        <StudentBanner>
          <StudentBanner2 src={StudentBannerimg2} Alt="" />
          <StudentBanner1 src={StudentBannerimg1} Alt="" />
        </StudentBanner>
      </ContentAndImgs>
    </Banner>
  );
}

export default HomeBanner;
