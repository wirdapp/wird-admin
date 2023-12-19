import React, {useState} from "react";
import {Modal} from "../../ui/modal";
import {Button} from "../../ui/button";
import {useTranslation} from "react-i18next";
import {Input} from "../../ui/input";
import styled from "@emotion/styled";
import {PlusCircleIcon} from "@heroicons/react/20/solid";
import {css} from "@emotion/css";
import {createContest} from "../../services/competitionsServices";

const StyledFormItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    gap: 8px;
`;

export const CreateContestPopup = () => {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    try {
      const result = await createContest(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        {t('create-contest')}
        <PlusCircleIcon/>
      </Button>
      <Modal title={t('create-contest')} onClose={() => setOpen(false)} visible={open}>
        <form onSubmit={handleSubmit}>
          <StyledFormItem>
            <label htmlFor="name">{t('name-label')}</label>
            <Input type="text" id="name" name="name" placeholder={t('name-label')}/>
          </StyledFormItem>

          <div className={css`display: flex;
              gap: 16px;
              flex-direction: row-reverse;`}>
            <Button variant="primary" type="submit">
              {t('create-contest')}
              <PlusCircleIcon/>
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