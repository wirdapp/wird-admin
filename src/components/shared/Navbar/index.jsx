import React, { useState } from "react";
import "./NavStyle.css";
import {
  Container,
  LeftNavItems,
  Navbar,
  RightNavItems,
  SidebarMenu,
  StyledPageTitle,
} from "./navbar.styles";
import { ReactComponent as SidebarIcon } from "assets/icons/sidebarIcon.svg";
import Sidebar from "../Sidebar";
import { usePageTitle } from "../../../util/routes-data";
import { ContestInfoMenu } from "./contest-info-menu";
import { Button } from "antd";
import { UserInfoMenu } from "./user-info-menu";
import { useTranslation } from "react-i18next";

function Nav() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = usePageTitle();

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header>
      <Container>
        <Navbar>
          <LeftNavItems>
            <Button
              shape="circle"
              className="menu-button"
              onClick={handleToggle}
            >
              <SidebarIcon style={{ width: "16px" }} />
            </Button>
            <StyledPageTitle>{t(title)}</StyledPageTitle>
          </LeftNavItems>
          <RightNavItems>
            <ContestInfoMenu />
            <UserInfoMenu />
          </RightNavItems>
        </Navbar>
        <SidebarMenu
          className={sidebarOpen ? "open" : ""}
          onClick={() => setSidebarOpen(false)}
        >
          <Sidebar setIsSideBarCollapsed={handleToggle} />
        </SidebarMenu>
      </Container>
    </header>
  );
}

export default Nav;
