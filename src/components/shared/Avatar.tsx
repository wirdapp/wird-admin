import React, { HTMLAttributes } from 'react';
import { getInitials } from '../../util/user-utils';
import { UserIcon } from '@heroicons/react/20/solid';
import styled from '@emotion/styled';
import { blankUserBackgroundColors, colors } from '../../styles';
import { cx } from '@emotion/css';
import { shadeColor } from '../../util/colors';
import type { Person } from '../../types';

const getBlankUserBackgroundColor = (colorIndex: number): string => {
  return (
    blankUserBackgroundColors[colorIndex % blankUserBackgroundColors.length] ??
    blankUserBackgroundColors[0]
  );
};

interface StyledAvatarProps {
  colorIndex?: number;
}

const StyledAvatar = styled.div<StyledAvatarProps>`
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

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user?: Person | null;
  colorIndex?: number;
  className?: string;
}

export const Avatar = ({ user, colorIndex, className, ...props }: AvatarProps) => {
  return (
    <StyledAvatar
      className={cx('user-avatar', className)}
      colorIndex={colorIndex}
      {...props}
    >
      {getInitials(user) ?? <UserIcon />}
    </StyledAvatar>
  );
};
