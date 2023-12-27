import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavStyle.css";
import {FaLanguage} from "react-icons/fa";
import {
  Container,
  LeftNavItems,
  List,
  ListItem,
  MenuTitle,
  Navbar,
  ProfileInfo,
  ProfileName,
  ProfilePicture,
  RightNavItems,
  SidebarMenu,
  StyledPageTitle,
  UserInfoWrapper,
} from "./navbar.styles";

import Loader from "../../Loader";
import {useLocation, useNavigate} from "react-router-dom";
import {changeLanguage, isSuperAdmin} from "../../../util/ContestPeople_Role";
import {useTranslation} from "react-i18next";
import {ReactComponent as SidebarIcon} from "assets/icons/sidebarIcon.svg";
import {ReactComponent as MyAccountIcon} from "assets/icons/myAccount.svg";
import {ReactComponent as HelpIcon} from "assets/icons/help.svg";
import {ReactComponent as LogoutIcon} from "assets/icons/logout.svg";
import Sidebar from "../Sidebar";
import {useDashboardData} from "../../../util/routes-data";
import {destroySession} from "../../../services/auth/session";
import {Dropdown} from "../../../ui/dropdown";
import {Button} from "../../../ui/button";
import {ContestInfoMenu} from "../../Competition/contest-info-menu";

function Nav() {
  const {i18n} = useTranslation();
  const {currentUser} = useDashboardData();
  const {t} = useTranslation();
  const [hasPermission, setPermission] = useState(false);
  const {pathname} = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setPermission(
      currentUser && isSuperAdmin(currentUser)
    );
  }, [currentUser]);

  if (loading) {
    return (
      <main>
        <Loader/>
      </main>
    );
  }
  return (
    <header>
      <Container>
        <Navbar>
          <LeftNavItems>
            <Button className="menu-button" onClick={handleToggle}>
              <SidebarIcon style={{width: "16px"}}/>
            </Button>
            <StyledPageTitle id="dashboard-page-title"/>
          </LeftNavItems>
          <RightNavItems>
            <ContestInfoMenu/>
            <Dropdown variant="primary" title={currentUser?.username
              ? currentUser?.username[0] +
              currentUser?.username[1]
              : ""}>
              <UserInfoWrapper>
                <ProfileInfo>
                  <ProfilePicture
                    src={currentUser?.profile_photo}
                  >
                    {currentUser?.profile_photo ??
                      currentUser?.username?.[0] +
                      currentUser?.username?.[1]}
                  </ProfilePicture>
                  {/* Show user name if no first name */}
                  <ProfileName>
                    {currentUser.first_name
                      ? currentUser.first_name +
                      " " +
                      currentUser.last_name
                      : currentUser.username}
                  </ProfileName>
                </ProfileInfo>
              </UserInfoWrapper>
              <List>
                <ListItem>
                  <MyAccountIcon/>
                  <MenuTitle>{t("my-account")}</MenuTitle>
                </ListItem>
                <ListItem>
                  <HelpIcon/>
                  <MenuTitle>
                    <a
                      href="https://www.facebook.com/Wird.Competition"
                      target="_blank" rel="noreferrer"
                    >
                      {t("help")}
                    </a>
                  </MenuTitle>
                </ListItem>

                <ListItem
                  onClick={() => {
                    setShowUserInfo(false);
                    changeLanguage(i18n.language === "ar" ? "en" : "ar");
                  }}
                >
                  <FaLanguage/>
                  <MenuTitle>{t("language")}</MenuTitle>
                </ListItem>

                <ListItem
                  onClick={() => {
                    setShowUserInfo(false);
                    destroySession();
                    navigate("/login");
                  }}
                >
                  <LogoutIcon/>
                  <MenuTitle>{t("logout")}</MenuTitle>
                </ListItem>
              </List>
            </Dropdown>
          </RightNavItems>
        </Navbar>
        <SidebarMenu
          className={sidebarOpen ? "open" : ""}
          onClick={() => setSidebarOpen(false)}
        >
          <Sidebar setIsSideBarCollapsed={handleToggle}/>
        </SidebarMenu>
      </Container>
    </header>
  );
}

export default Nav;
