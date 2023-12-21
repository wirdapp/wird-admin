import React, {useEffect, useState} from "react";
import {retrieveCurrentContestInfo} from "../../services/competitionsServices";
import EditCompetitionForm from "./EditCompetitionForm";
import Loader from "../Loader";
import ContestMembers from "./ContestMembers";
import ContestModeratorDefault from "../ContestModerator/ContestModerator.styles";
import {PageTitle} from "../shared/page-title";
import {useTranslation} from "react-i18next";
import {css} from "@emotion/css";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {CreateContestPopup} from "./create-contest-popup";
import {JoinContestPopup} from "./join-contest-popup";
import {Button} from "../../ui/button";
import {PlusCircleIcon} from "@heroicons/react/20/solid";

export default function Competition() {
  const [currentContest, setCurrentContest] = useState(null);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const [createContestOpen, setCreateContestOpen] = useState(false);
  const [joinContestOpen, setJoinContestOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    retrieveCurrentContestInfo().then((result) => {
      setCurrentContest(result);
      setLoading(false);
    }).catch((err) => {
      console.log(
        "Failed to retrieve current contest: ",
        err?.response?.data
      );
      setLoading(false);
    });
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
          <h3>{t('no-contest-yet-msg')}</h3>
          <div className={css`
              display: flex;
              gap: 24px;
              align-items: center;
              justify-content: center;
              padding: 24px;
          `}>
            <Button variant="primary" onClick={() => setCreateContestOpen(true)}>
              {t('create-contest')}
              <PlusCircleIcon/>
            </Button>
            <Button onClick={() => setJoinContestOpen(true)}>
              {t('join-contest')}
            </Button>
            <CreateContestPopup visible={createContestOpen} onClose={() => setCreateContestOpen(false)}/>
            <JoinContestPopup visible={joinContestOpen} onClose={() => setJoinContestOpen(false)}/>
          </div>

        </div>
      )}
    </ContestModeratorDefault>
  );
}
