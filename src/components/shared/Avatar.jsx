import React from "react";
import { getInitials } from "../../util/user-utils";
import { UserIcon } from "@heroicons/react/20/solid";
import styled from "@emotion/styled";
import { blankUserBackgroundColors, colors } from "../../styles";
import { Tooltip } from "../../ui/tooltip";
import { cx } from "@emotion/css";
import { shadeColor } from "../../util/colors";

const getBlankUserBackgroundColor = (colorIndex) => {
  return (
    blankUserBackgroundColors[colorIndex % blankUserBackgroundColors.length] ??
    blankUserBackgroundColors[0]
  );
};

const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ colorIndex = 0 }) =>
    getBlankUserBackgroundColor(colorIndex)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ colorIndex = 0 }) =>
      shadeColor(getBlankUserBackgroundColor(colorIndex), -20)};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Avatar = ({ user, colorIndex, className, ...props }) => {
  return (
    <Tooltip overlay={`${user?.first_name} ${user?.last_name}`}>
      <StyledAvatar
        className={cx("user-avatar", className)}
        colorIndex={colorIndex}
        {...props}
      >
        {getInitials(user) ?? <UserIcon />}
      </StyledAvatar>
    </Tooltip>
  );
};
