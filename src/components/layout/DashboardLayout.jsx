import React from 'react';
import Sidebar from "../shared/Sidebar";
import {Container, MainContent} from "./layout.styles";
import Navbar from "../shared/Navbar";
import {Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

export const DashboardLayout = () => {
  const {i18n} = useTranslation();

  return (
    <Container>
      <Helmet>
        <html lang={i18n.language || "en"} dir={i18n.dir()}/>
        <meta charSet="utf-8"/>
      </Helmet>
      <Sidebar/>
      <MainContent>
        <Navbar/>
        <div className="page-content">
          <Outlet/>
        </div>
      </MainContent>
    </Container>
  );
};
