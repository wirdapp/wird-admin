import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { changeLanguage } from '../../util/roles';

const StyledAuthFooter = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  .divider {
    width: 1px;
    height: 16px;
    background-color: #aeaeae;
  }
`;

export const AuthPageFooter = () => {
  const { t, i18n } = useTranslation();

  return (
    <StyledAuthFooter>
      <span>{t('copyrightFooterMsg', { year: new Date().getFullYear() })}</span>
      <span className="divider" />
      {i18n.language === 'en' ? (
        <Button type="link" onClick={() => changeLanguage('ar')}>
          العربية
        </Button>
      ) : (
        <Button type="link" onClick={() => changeLanguage('en')}>
          English
        </Button>
      )}
    </StyledAuthFooter>
  );
};
