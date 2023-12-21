import React from "react";
import {Modal} from "../../ui/modal";
import {Button} from "../../ui/button";
import {useTranslation} from "react-i18next";
import {Input, TextArea} from "../../ui/input";
import styled from "@emotion/styled";
import {PlusCircleIcon} from "@heroicons/react/20/solid";
import {css} from "@emotion/css";
import {createContest} from "../../services/competitionsServices";
import {isAxiosError} from "axios";

const StyledFormItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    gap: 8px;
`;

export const CreateContestPopup = ({visible, onClose}) => {
  const {t} = useTranslation();
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  const validate = formData => {
    const nextErrors = {};
    if (!formData.get('contest_id')) {
      nextErrors.contest_id = t('contest-code-required-error');
    } else if (formData.get('contest_id').length < 6) {
      nextErrors.contest_id = t('contest-code-invalid-error');
    }
    if (!formData.get('name')) {
      nextErrors.name = t('name-required-error');
    }
    if (!formData.get('start_date')) {
      nextErrors.start_date = t('start-date-required-error');
    } else {
      if (new Date(formData.get('start_date')) < new Date()) {
        nextErrors.start_date = t('start-date-invalid-error');
      }
      if (!formData.get('end_date')) {
        nextErrors.end_date = t('end-date-required-error');
      } else if (new Date(formData.get('end_date')) < new Date(formData.get('start_date'))) {
        nextErrors.end_date = t('end-date-invalid-error');
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    if (!validate(data)) return;

    setSubmitting(true)
    try {
      const result = await createContest(data);
      console.log(result);
      onClose?.();
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        setErrors(error.response.data);
      }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal title={t('create-contest')} onClose={onClose} visible={visible}>
      <form onSubmit={handleSubmit}>
        <StyledFormItem>
          <label htmlFor="contest_id">{t('contest-code')}</label>
          <Input type="text" id="contest_id" name="contest_id" placeholder={t('contest-code')}
                 required minLength={6}/>
          {errors.contest_id && <span className={css`color: red;`}>{errors.contest_id}</span>}
        </StyledFormItem>
        <StyledFormItem>
          <label htmlFor="name">{t('name-label')}</label>
          <Input type="text" id="name" name="name" placeholder={t('name-label')} required/>
          {errors.name && <span className={css`color: red;`}>{errors.name}</span>}
        </StyledFormItem>
        <StyledFormItem>
          <label htmlFor="description">{t('contest-description')}</label>
          <TextArea id="description" name="description" placeholder={t('contest-description')} rows={2}/>
          {errors.description && <span className={css`color: red;`}>{errors.description}</span>}
        </StyledFormItem>
        <StyledFormItem>
          <label htmlFor="start_date">{t('start-date')}</label>
          <Input type="date" id="start_date" name="start_date" placeholder={t('start-date')}
                 required/>
          {errors.start_date && <span className={css`color: red;`}>{errors.start_date}</span>}
        </StyledFormItem>
        <StyledFormItem>
          <label htmlFor="end_date">{t('end-date')}</label>
          <Input type="date" id="end_date" name="end_date" placeholder={t('end-date')} required/>
          {errors.end_date && <span className={css`color: red;`}>{errors.end_date}</span>}
        </StyledFormItem>

        <div className={css`display: flex;
            gap: 16px;
            flex-direction: row-reverse;`}>
          <Button variant="primary" type="submit" disabled={submitting}>
            {t('create-contest')}
            <PlusCircleIcon/>
          </Button>
          <Button variant="default" onClick={onClose} type="button" disabled={submitting}>
            {t('cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}