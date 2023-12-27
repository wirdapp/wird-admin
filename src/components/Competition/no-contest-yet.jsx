import React, {useState} from 'react';
import {css} from "@emotion/css";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "../../ui/button";
import {PlusCircleIcon} from "@heroicons/react/20/solid";
import {CreateContestPopup} from "./create-contest-popup";
import {JoinContestPopup} from "./join-contest-popup";
import {useTranslation} from "react-i18next";

export const NoContestYet = () => {
  const {t} = useTranslation();
  const [createContestOpen, setCreateContestOpen] = useState(false);
  const [joinContestOpen, setJoinContestOpen] = useState(false);

  return (
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
  );
};
