import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { colors } from "../../styles";
import { ContestStatus } from "../../types";

interface ContestBadgeProps {
  status: ContestStatus;
}

interface StyledBadgeProps {
  status: ContestStatus;
}

const statusColors: Record<ContestStatus, string> = {
  [ContestStatus.NOT_STARTED]: "#f3a100",
  [ContestStatus.STARTED]: "#009af5",
  [ContestStatus.FINISHED]: "#00bf76",
};

const StyledBadge = styled.div<StyledBadgeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => statusColors[props.status]};
  color: ${colors.white};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const ContestBadge: React.FC<ContestBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <StyledBadge status={status}>{t(`contestStatus.${status}`)}</StyledBadge>
  );
};
