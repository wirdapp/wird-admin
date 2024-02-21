import React from "react";
import { css } from "@emotion/css";
import { colors } from "../../../styles";
import { ProfileInfo, ProfileName, UserInfoWrapper } from "./navbar.styles";
import {
  ArrowLeftOnRectangleIcon,
  LanguageIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { changeLanguage } from "../../../util/ContestPeople_Role";
import { destroySession } from "../../../services/auth/session";
import { Avatar, Dropdown } from "antd";
import { getFullName, getInitials } from "../../../util/user-utils";
import { useDashboardData } from "../../../util/routes-data";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const UserInfoMenu = () => {
  const { currentUser } = useDashboardData();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Dropdown
      arrow
      trigger={["click"]}
      overlayClassName={css`
        width: 200px;

        svg {
          width: 20px;
          height: 20px;
          color: ${colors.orange};
        }
      `}
      menu={{
        items: [
          {
            label: (
              <UserInfoWrapper>
                <ProfileInfo>
                  <Avatar
                    src={currentUser?.profile_photo}
                    style={{ backgroundColor: colors.orange }}
                  >
                    {getInitials(currentUser)}
                  </Avatar>
                  {/* Show user name if no first name */}
                  <ProfileName>{getFullName(currentUser)}</ProfileName>
                </ProfileInfo>
              </UserInfoWrapper>
            ),
            onClick: () => {
              navigate("/dashboard/profile");
            },
          },
          { type: "divider" },
          {
            label: t("help"),
            icon: <QuestionMarkCircleIcon />,
            onClick: () => {
              window.open(
                `${process.env.REACT_APP_MAIN_URL}/${i18n.language}/help`,
                "_blank",
              );
            },
          },
          {
            label: t("language"),
            icon: <LanguageIcon />,
            onClick: () => {
              changeLanguage(i18n.language === "ar" ? "en" : "ar");
            },
          },
          {
            label: t("logout"),
            icon: <ArrowLeftOnRectangleIcon />,
            onClick: () => {
              destroySession();
              navigate("/login");
            },
          },
        ],
      }}
    >
      <Avatar
        src={currentUser?.profile_photo}
        className={css`
          background-color: ${colors.orange};
          cursor: pointer;
          user-select: none;
          transition: all 0.2s;

          &:active,
          &.ant-dropdown-open {
            box-shadow: 0 0 0 2px ${colors.orangeHover};
          }

          &:hover {
            background-color: ${colors.orangeHover};
          }
        `}
      >
        {getInitials(currentUser)}
      </Avatar>
    </Dropdown>
  );
};
