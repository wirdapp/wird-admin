import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavStyle.css";
import {FaLanguage, FaTimes} from "react-icons/fa";
import {
  CloseIcon,
  Container,
  LeftNavItems,
  LinkElement,
  List,
  ListItem,
  MenuIcon,
  MenuTitle,
  Navbar,
  NavItem,
  PageTitle,
  PopupListWrapper,
  ProfileInfo,
  ProfileName,
  ProfilePicture,
  RightNavItems,
  SidebarMenu,
  UserInfoWrapper,
} from "./navbar.styles";

import Loader from "../../Loader";
import {useLocation, useNavigate} from "react-router-dom";
import {changeLanguage, isSuperAdmin} from "../../../util/ContestPeople_Role";
import {useTranslation} from "react-i18next";
import mapRoutesToPagesNames from "../../../data/pageNames";
import {ReactComponent as SidebarIcon} from "assets/icons/sidebarIcon.svg";
import {ReactComponent as MyAccountIcon} from "assets/icons/myAccount.svg";
import {ReactComponent as HelpIcon} from "assets/icons/help.svg";
import {ReactComponent as LogoutIcon} from "assets/icons/logout.svg";
import Sidebar from "../Sidebar";
import {arabicTheme, englishTheme} from "styles";
import {useDashboardData} from "../../../util/routes-data";
import {logout} from "../../../services/auth/utils";

function Nav({changeTheme, theme}) {
  const {currentUser} = useDashboardData();
  const {t} = useTranslation();
  const [hasPermission, setPermission] = useState(false);
  const {pathname} = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const showNavbar = ![
    "/login",
    "/Signup",
    "/ResetPassword",
    "/ForgotPassword",
  ].includes(pathname);

  useEffect(() => {
    setPermission(
      currentUser && isSuperAdmin(currentUser)
    );
  }, [currentUser]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [theme]);

  if (loading) {
    return (
      <main>
        <Loader/>
      </main>
    );
  }
  return (
    <div>
      {showNavbar && (
        <header>
          <Container>
            <Navbar>
              <LeftNavItems>
                <MenuIcon onClick={handleToggle}>
                  <SidebarIcon/>
                </MenuIcon>
                <PageTitle>
                  {mapRoutesToPagesNames.hasOwnProperty(pathname)
                    ? t(mapRoutesToPagesNames[pathname])
                    : ""}
                </PageTitle>
              </LeftNavItems>
              <RightNavItems>
                <NavItem>
                  {" "}
                  <LinkElement
                    to="/competition/#create-contest"
                    title="Create Contest"
                  >
                    +
                  </LinkElement>
                </NavItem>
                <NavItem onClick={() => setShowUserInfo(!showUserInfo)}>
                  {currentUser?.username
                    ? currentUser?.username[0] +
                    currentUser?.username[1]
                    : ""}
                </NavItem>
                <>
                  {showUserInfo && (
                    <PopupListWrapper isArabicTheme={theme?.name === "ar"}>
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
                        <CloseIcon onClick={() => setShowUserInfo(false)}>
                          <FaTimes/>
                        </CloseIcon>
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
                            // set the theme to the opposite of the current theme
                            setShowUserInfo(false);
                            changeTheme(
                              theme.name === "ar" ? englishTheme : arabicTheme
                            );
                            changeLanguage(theme.name === "ar" ? "en" : "ar");
                            setLoading(true);
                          }}
                        >
                          <FaLanguage/>
                          <MenuTitle>{t("language")}</MenuTitle>
                        </ListItem>

                        <ListItem
                          onClick={() => {
                            setShowUserInfo(false);
                            logout();
                            navigate("/login");
                          }}
                        >
                          <LogoutIcon/>
                          <MenuTitle>{t("logout")}</MenuTitle>
                        </ListItem>
                      </List>
                    </PopupListWrapper>
                  )}
                </>
              </RightNavItems>
            </Navbar>
            <SidebarMenu
              className={isOpen ? "open" : ""}
              isArabicTheme={theme?.name === "ar"}
            >
              <MenuIcon onClick={handleToggle} style={{marginTop: "1rem"}}>
                <SidebarIcon/>
              </MenuIcon>
              <Sidebar setIsSideBarCollapsed={handleToggle}/>
            </SidebarMenu>
          </Container>
        </header>
      )}
    </div>
  );
}

export default Nav;
