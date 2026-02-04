import React, { useState } from "react";
import StudentBannerimg1 from "../../../assets/icons/studentImgAtBanner/studentBanner3.svg";
import StudentBannerimg2 from "../../../assets/icons/studentImgAtBanner/studentBanner2.svg";
import { useTranslation } from "react-i18next";

import Banner, {
  CirclesStyle,
  ContentAndImgs,
  ContentBanner,
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
import { CreateContestPopup } from "../../Competition/create-contest-popup";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { css } from "@emotion/css";
import { Button } from "antd";

interface HomeBannerProps {
  name: string | null;
}

function HomeBanner(props: HomeBannerProps): React.ReactElement {
  const { currentContest } = useDashboardData();
  const { t } = useTranslation();
  const [createContestOpen, setCreateContestOpen] = useState<boolean>(false);
  const [joinContestOpen, setJoinContestOpen] = useState<boolean>(false);

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
          </TitleContent>

          {currentContest ? (
            <Button href="/dashboard/results/overview">
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
              <Button onClick={() => setCreateContestOpen(true)}>
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
          <StudentBanner2 src={StudentBannerimg2} alt="" />
          <StudentBanner1 src={StudentBannerimg1} alt="" />
        </StudentBanner>
      </ContentAndImgs>
    </Banner>
  );
}

export default HomeBanner;
