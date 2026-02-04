import styled from "@emotion/styled";
import { colors } from "../../../styles";
import { Link } from "react-router-dom";

export default styled.div`
  display: flex;
  width: 100%;
  margin: auto;

  border-radius: 1.5rem;
`;

export const TopRanksAndParticipants = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 2.625rem;
  margin: 1.5rem;
  width: 100%;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const ParticipantsMember = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.75rem;

  height: auto;

  @media (min-width: 900px) {
    width: 18.375rem;
  }
`;

export const ParticipantsTitels = styled.div`
  justify-content: space-between;

  width: 100%;
  height: 1.25rem;
  display: flex;

  @media (max-width: 37.5625rem) {
  }
`;
export const TopRanksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 0.75rem;
  width: 100%;
  height: auto;
  flex: 1;
`;

export const ParticipantsNumbers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.5rem;
  gap: 1.5rem;
  width: 100%;
  background: #fbf9f7;
  border-radius: 1.5rem;
  justify-content: flex-start;
  flex: 1;

  @media (max-width: 31.25rem) {
    padding: 1rem 0.75rem;
    gap: 0.125rem;
    justify-content: center;
  }
`;

export const ParticipantsTitelsAtHome = styled.div`
  height: 1.1875rem;

  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25rem;
  text-align: center;

  color: #000000;
  @media (max-width: 37.5625rem) {
  }
`;

export const SeeAll = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.375rem;

  /* position: absolute; */
  width: 4.875rem;
  height: 1.25rem;

  @media (max-width: 37.5625rem) {
  }
`;

export const SeeAllP = styled.div`
  width: 3.25rem;
  height: 1.1875rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  text-align: right;

  color: #ff5367;

  @media (max-width: 37.5625rem) {
  }
`;

export const SeeAllIcon = styled.img`
  @media (max-width: 37.5625rem) {
  }
`;

export const TotalOfMembers = styled.div`
  width: 4.875rem;
  height: 3.625rem;

  font-style: normal;
  font-weight: 700;
  font-size: 3rem;
  line-height: 3.6875rem;

  color: #000000;
  @media (max-width: 31.25rem) {
    height: 2.1875rem;
    font-size: 2.1875rem;
    line-height: 2.1875rem;
  }
`;

export const MemberImgsAndNumNumbers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem;
  gap: 0;
  margin-inline-start: auto;
`;

export const MembersImgs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  position: relative;
  width: 6rem;
  height: 2.25rem;
  @media (max-width: 31.25rem) {
    align-items: center;
    width: 12rem;
  }
`;

export const MemberNumbers = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  /* identical to box height */
  text-align: center;
  color: #a79f97;

  @media (max-width: 37.5625rem) {
  }
`;

export const MembersImg = styled.div`
  position: absolute;
  /*  */
  background: #fdd561;
  border-radius: 0.75rem;
  width: 2.25rem;
  height: 2.25rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  /* identical to box height */
  text-align: center;

  color: #000000;

  @media (max-width: 500px) {
    border-radius: 0.5rem;
    width: 1.875rem;
    height: 1.875rem;
  }
`;

export const Top3Rank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.4375rem 1.5rem;

  width: 35.4375rem;
  height: 6.625rem;

  background: #f9eaea;
  border-radius: 1.5rem;

  @media (max-width: 37.5625rem) {
  }
`;

export const ParticipantsNumbersRanks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  padding: 0;
  justify-content: start;

  @media (max-width: 87.5rem) {
    flex-direction: column;
  }
`;

export const Top3RankDiv = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  gap: 8px; /* height: 3.75rem; */
  border-radius: 14px;
  background: transparent;
  transition: all 0.2s;
  color: #444;

  &:nth-child(1) .ant-avatar {
    background: #fb6d3b;
    color: #fff;
  }

  &:nth-child(2) .ant-avatar {
    background: rgba(251, 109, 59, 0.6);
  }

  &:nth-child(3) .ant-avatar {
    background: rgba(251, 109, 59, 0.25);
  }

  @media (max-width: 87.5rem) {
    margin-top: 0.3125rem;
  }

  &:hover {
    background: ${colors.white};
    color: #000 !important;
  }
`;

export const Top1Img = styled.div`
  background: #fdd561;
  border-radius: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.0625rem;
  text-align: center;

  color: #000000;
  width: 3.75rem;
  height: 3.75rem;
  @media (max-width: 87.5rem) {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 0.875rem;
  }
`;

export const Top1Name = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25rem;
`;

export const Top2Name = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  /* identical to box height */
  width: 7.3125rem;

  color: #000000;

  @media (max-width: 87.5rem) {
    /* width: auto; */
  }
`;

export const Top2Img = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  background: #fdd561;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  text-align: center;
  color: white;
  @media (max-width: 37.5625rem) {
  }
`;

export const Empty = styled.div`
  text-align: center;
  font-style: italic;
  font-weight: 400;
  color: #a79f97;
  width: 100%;
`;
