import React from 'react';
import Sidebar from "../shared/Sidebar";
import {Container, MainContent} from "./layout.styles";
import Navbar from "../shared/Navbar";
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
