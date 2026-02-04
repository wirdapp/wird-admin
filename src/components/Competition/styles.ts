import styled from "@emotion/styled";
import { colors } from "../../styles";

export const ContestDetailBox = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid ${colors.warmWheat};
  width: 100%;

  > svg {
    width: 32px;
    height: 32px;
    color: ${colors.yellow};
  }

  .contest-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;

    .contest-detail-item {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      color: ${colors.darkGrey};

      &.preformatted > span {
        font-family: monospace;
        color: #000;
      }
    }
  }
`;

export const StyledAnnouncementWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > div {
    padding: 24px;
    background-color: ${colors.warmWheat};
    border-radius: 24px;
  }

  > div.danger-zone {
    border: 1px solid ${colors.lightRed};
    background-color: transparent;
    color: ${colors.darkGrey};

    h3 {
      color: ${colors.red};
    }
  }

  h2 {
    font-size: 16px;
    font-weight: 700;
  }

  .announcement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledAnnouncementsList = styled.ul`
  list-style: none;
  padding: 16px 0;
  margin: 0;
  display: flex;
  gap: 2px;
  flex-direction: column;

  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.white};
    padding: 12px;
    border-radius: 0;
    white-space: pre-wrap;

    button {
      min-width: 0;
    }

    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`;
