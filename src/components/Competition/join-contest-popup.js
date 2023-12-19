import React, {useState} from "react";
import {Modal} from "../../ui/modal";
import {Button} from "../../ui/button";
import {useTranslation} from "react-i18next";
import {Input} from "../../ui/input";
import styled from "@emotion/styled";
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import {css} from "@emotion/css";
import {joinContest} from "../../services/competitionsServices";

const StyledFormItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    gap: 8px;
`;

export const JoinContestPopup = () => {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    try {
      const result = await joinContest(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {t('join-contest')}
      </Button>
      <Modal title={t('create-contest')} onClose={() => setOpen(false)} visible={open}>
        <form onSubmit={handleSubmit}>
          <StyledFormItem>
            <label htmlFor="code">{t('code-label')}</label>
            <Input type="text" id="code" name="code" placeholder={t('code-label')}/>
          </StyledFormItem>

          <div className={css`display: flex;
              gap: 16px;
              flex-direction: row-reverse;`}>
            <Button variant="primary" type="submit">
              {t('join-contest')}
              <CheckCircleIcon/>
            </Button>
            <Button variant="default" onClick={() => setOpen(false)} type="button">
              {t('cancel')}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}