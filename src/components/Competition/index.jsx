import React, {useEffect, useState} from "react";
import {retrieveCurrentContestInfo} from "../../services/competitionsServices";
import EditCompetitionForm from "./EditCompetitionForm";
import Loader from "../Loader";

import MyOngoingContestTab from "../shared/MyOngoingContestTab";
import ContestMembers from "./ContestMembers";
import ContestModeratorDefault from "../ContestModerator/ContestModerator.styles";
import {PageTitle} from "../shared/page-title";
import {useTranslation} from "react-i18next";
import {css} from "@emotion/css";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {CreateContestPopup} from "./create-contest-popup";
import {JoinContestPopup} from "./join-contest-popup";

export default function Competition() {
  const [currentContest, setCurrentContest] = useState(null);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    setLoading(true);
    retrieveCurrentContestInfo(
      (res) => {
        if (res && res.status === 200) {
          setCurrentContest(res.data);
          setLoading(false);
        }
      },
      (err) => {
        console.log(
          "Failed to retrieve current contest: ",
          err?.response?.data
        );
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <main>
        <Loader/>
      </main>
    );
  }

  return (
    <ContestModeratorDefault>
      <PageTitle>{t('contest-information')}</PageTitle>
      {currentContest ? (
        <>
          <MyOngoingContestTab competition={true}/>
          <ContestMembers contest={currentContest}/>
          <EditCompetitionForm
            contest={currentContest}
            setContest={setCurrentContest}
          />
        </>) : (
        <div className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            height: 100%;
            width: 100%;
            margin-top: 48px;
        `}>
          <ExclamationCircleIcon className={css`width: 64px;
              height: 64px;`}/>
          <h2>{t('no-contest-yet-msg')}</h2>
          <div className={css`
              display: flex;
              gap: 24px;
              align-items: center;
              justify-content: center;
              padding: 24px;
          `}>
            <CreateContestPopup/>
            <JoinContestPopup/>
          </div>

        </div>
      )}
    </ContestModeratorDefault>
  );
}
