import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import { App as AntdApp, ConfigProvider } from 'antd';
import { lightTheme } from '../styles/antd-theme';
import arLocale from 'antd/locale/ar_EG';
import enLocale from 'antd/locale/en_US';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  return (
    <ConfigProvider
      theme={lightTheme}
      locale={i18n.language === 'ar' ? arLocale : enLocale}
      direction={i18n.dir()}
    >
      <AntdApp>
        <Helmet>
          <html lang={i18n.language || 'en'} dir={i18n.dir()} />
          <meta charSet="utf-8" />
        </Helmet>
        <Outlet />
      </AntdApp>
    </ConfigProvider>
  );
};
