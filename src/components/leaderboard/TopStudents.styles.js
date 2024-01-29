import styled from "@emotion/styled";
import { colors } from "styles";
import {
  Top2Img as DefaultTop2Img,
  Top2Name as DefaultTop2Name,
  Top3RankDiv as DefaultTop3RankDiv,
} from "../Home/TopRanks/TopRanks.styles";
import { AnimatedPage } from "../../ui/animated-page";
import { Link } from "react-router-dom";

export const StyledLeaderboardList = styled.div`
  width: auto;
  display: flex;
  margin: auto;
  /* align-items: center; */
  gap: 12px;

  justify-content: center;
  flex-direction: column;
`;

export const StyledLeaderboardItem = styled.div`
  align-items: center;
  background-color: ${colors.warmWheat};
  display: flex;
  padding: 16px 24px;
  flex-direction: row;
  gap: 16px;
  position: relative;
  max-width: 800px;
  margin: auto;
  width: 100%;

  @media (max-width: 700px) {
    position: relative;
    justify-content: space-around;
    padding: 16px;
  }

  border-radius: 16px;

  .item-rank {
    font-weight: 700;
    font-size: 12px;
    line-height: 29px;
    color: #fff;
    background-color: ${colors.red};
    width: 30px;
    height: 30px;
    text-align: center;
    flex-shrink: 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    flex-grow: 1;
    gap: 8px;

    .item-details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .item-points {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .item-points-label {
      font-weight: 400;
      font-size: 12px;
      color: ${colors.darkGrey};
      white-space: nowrap;
    }

    .item-points-value {
      font-weight: 700;
      font-size: 16px;
      line-height: 29px;
      color: ${colors.red};
    }
  }

  .crown-icon {
    position: absolute;
    top: -10px;
    inset-inline-end: -10px;
  }

  &:first-of-type {
    .crown-icon {
      color: #ffd700;
    }
  }

  &:nth-of-type(2) {
    .crown-icon {
      color: #c0c0c0;
    }
  }

  &:nth-of-type(3) {
    .crown-icon {
      color: #cd7f32;
    }
  }
`;

export const StyledResultsLink = styled(Link)`
  color: ${colors.red};
  border: 0;
  padding: 8px 0;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    text-decoration: underline;
    color: ${colors.red};
  }
`;

// ameen edite html *************************

export const LeaderBoardMain = styled(AnimatedPage)`
  /* display: flex; */
  margin: auto;
  max-width: 961px;
`;
export const LeaderBoardMainTitel = styled.div`
  height: 19px;
  margin: auto;
  margin-left: 0;
  margin-bottom: 1rem;
  align-items: flex-start;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  color: #000000;
`;

export const Top3RankDiv = styled(DefaultTop3RankDiv)`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 700px) {
    gap: 10px;
  }
`;

export const Top2Name = styled(DefaultTop2Name)`
  @media (max-width: 700px) {
    font-size: 12px;
    width: 100px;
    width: 80px;
  }
  @media (max-width: 375px) {
  }
`;
export const Top2Img = styled(DefaultTop2Img)`
  width: 60px;
  height: 60px;

  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
  }
`;
export const DayInAverageWrapper = styled.div`
  width: 87px;
  height: 17px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  color: #a79f97;
`;
export const PAverageWrapper = styled.div`
  width: auto;
  height: 17px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  color: #a79f97;
`;
export const AverageParsents = styled.div`
  width: 55px;
  height: 19px;

  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;

  color: #000000;
`;
export const DivLine = styled.div`
  border-left: 1px solid #ffbac2;
  height: 60px;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const AverageWrapperButon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f9eaea;
  padding: 15px;
  border-radius: 12px;
  margin-inline-start: auto;
  gap: 8px;

  p:first-child {
    font-size: small;
  }

  p:nth-child(2) {
    font-size: medium;
  }

  @media (max-width: 700px) {
  }

  @media (max-width: 330px) {
    padding: 10px;
  }
`;
