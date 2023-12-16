import React from 'react';
import Sidebar from "../../components/shared/Sidebar";
import {Container, MainContent} from "./layout.styles";
import Navbar from "../../components/shared/Navbar";
import {Outlet} from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <Container>
      <Sidebar/>
      <MainContent>
        <Navbar/>
        <Outlet/>
      </MainContent>
    </Container>
  );
};
