import React, {useEffect, useState} from "react";
import {MenuContainer, MenuItem, MenuLink, SideBarContainer, WirdLogoContainer,} from "./sidebar.styles";
import {ReactComponent as WirdLogo} from "assets/icons/Shared/wirdLogo.svg";
import {ReactComponent as HomeIcon} from "assets/icons/home.svg";
import {ReactComponent as CompInfoIcon} from "assets/icons/competition-information.svg";
import {ReactComponent as ContestModeratorsIcon} from "assets/icons/admin.svg";
import {ReactComponent as CriteriaIcon} from "assets/icons/criterias.svg";
import {ReactComponent as ParticipantsIcon} from "assets/icons/students.svg";
import {ReactComponent as FileTxtIcon} from "assets/icons/file-text.svg";
import {ReactComponent as ResultsIcon} from "assets/icons/results.svg";
import {ReactComponent as LeaderBoard} from "assets/icons/leaderBoard.svg";
import {ReactComponent as FileDownload} from "assets/icons/fileDownload.svg";
import {ReactComponent as GroupsIcon} from "assets/icons/group.svg";
import {isSuperAdmin} from "../../../util/ContestPeople_Role";
import {useTranslation} from "react-i18next";
import {useDashboardData} from "../../../util/routes-data";

function Sidebar() {
  const {currentUser} = useDashboardData();
  const {t} = useTranslation();
  const [hasPermission, setPermission] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setPermission(isSuperAdmin(currentUser));
    }
  }, [currentUser]);

  return (
    <SideBarContainer>
      <div>
        <WirdLogoContainer>
          <WirdLogo/>
        </WirdLogoContainer>

        <MenuContainer>
          <MenuLink end to="/dashboard/" title={t("home-page")}>
            <HomeIcon/>
            <MenuItem>{t("home-page")}</MenuItem>
          </MenuLink>
          {/* { hasPermission && */}
          <MenuLink to="/dashboard/competition" title={t("contest-information")}>
            <CompInfoIcon/>
            <MenuItem>{t("contest-information")}</MenuItem>
          </MenuLink>
          {/* } */}
          <MenuLink
            to="/dashboard/top-students"
            title={t("leaders-board")}
          >
            <LeaderBoard/>
            <MenuItem>{t("leaders-board")}</MenuItem>
          </MenuLink>
          <MenuLink to="/dashboard/admins" title={t("admins")}>
            <ContestModeratorsIcon/>
            <MenuItem>{t("admins")}</MenuItem>
          </MenuLink>
          <MenuLink to="/dashboard/students" title={t("students")}>
            <ParticipantsIcon/>
            <MenuItem>{t("students")}</MenuItem>
          </MenuLink>
          <MenuLink
            to="/dashboard/contest-criteria"
            title={t("criterias")}
          >
            <CriteriaIcon/>
            <MenuItem>{t("criterias")}</MenuItem>
          </MenuLink>
          <MenuLink
            to="/dashboard/review-other-points"
            title={t("text-inputs")}
          >
            <FileTxtIcon/>
            <MenuItem>{t("text-inputs")}</MenuItem>
          </MenuLink>
          <MenuLink
            to="/dashboard/students-points"
            title={t("results-page")}
          >
            <ResultsIcon/>
            <MenuItem>{t("results-page")}</MenuItem>
          </MenuLink>
          {hasPermission && (
            <MenuLink
              to="/dashboard/export-points"
              title={t("extract-results")}
            >
              <FileDownload/>
              <MenuItem>{t("extract-results")}</MenuItem>
            </MenuLink>
          )}
          <MenuLink to="/dashboard/groups" title={t("groups-page")}>
            <GroupsIcon/>
            <MenuItem>{t("groups-page")}</MenuItem>
          </MenuLink>
        </MenuContainer>
      </div>
    </SideBarContainer>
  );
}

export default Sidebar;
