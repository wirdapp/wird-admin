import styled from "@emotion/styled";
import { colors } from "../../styles";

export const StyledOverviewWrapper = styled.div`
  padding: 16px;
  background: ${colors.lightGrey};
  border-radius: 8px;

  h3 {
    font-size: 20px;
    font-weight: 200;
    color: ${colors.black};
    margin-bottom: 16px;
  }
`;

export const StyledResultsOverviewHeader = styled.div`
  display: none;
  gap: 16px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: rgba(150, 150, 150, 0.05);
  border-radius: 8px 8px 0 0;

  @media (min-width: 900px) {
    display: flex;
  }
`;

export const StyledResultsOverviewListWrapper = styled.div`
  position: relative;
  background: rgba(150, 150, 150, 0.05);
  border-radius: 0 0 8px 8px;
  overflow: clip;

  .overflow-indicator {
    position: absolute;
    left: 0;
    width: 100%;
    height: 40px;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;

    &.top {
      top: 0;
      background: linear-gradient(
        0deg,
        rgba(246, 244, 242, 0) 0%,
        #f6f4f2 100%
      );
    }

    &.bottom {
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(246, 244, 242, 0) 0%,
        #f6f4f2 100%
      );
    }

    &.visible {
      opacity: 1;
      visibility: visible;
    }
  }

  .results-overview-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 500px;
    overflow-y: auto;
    padding: 8px;

    .results-overview-list-item {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      background: ${colors.white};
      border-radius: 8px;

      @media (min-width: 900px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      &.today {
        .icon {
          background: ${colors.yellow};
          box-shadow: 0 0 0 3px ${colors.yellowHover};
        }
      }

      &.after-today {
        opacity: 0.3;
      }

      .icon {
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;

        background: ${colors.lightRed};
        border-radius: 12px;

        svg {
          width: 24px;
          height: 24px;
          color: ${colors.black};
        }
      }

      .today-indicator {
        font-style: italic;
      }

      .day-index {
        font-size: 14px;
        font-weight: 700;
        color: ${colors.black};
      }

      .day-date {
        font-size: 12px;
        font-weight: 400;
        color: ${colors.darkGrey};
      }
    }

    .mobile-label {
      display: block;

      @media (min-width: 900px) {
        display: none;
      }
    }
  }
`;

export const StyledSubmissionCountCell = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (min-width: 900px) {
    min-width: 200px;
  }
`;

export const StyledDayCell = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (min-width: 900px) {
    min-width: 200px;
  }

  .icon {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: ${colors.lightRed};
    border-radius: 12px;

    svg {
      width: 24px;
      height: 24px;
      color: ${colors.black};
    }
  }

  .today-indicator {
    font-style: italic;
  }

  .day-index {
    font-size: 14px;
    font-weight: 700;
    color: ${colors.black};
  }

  .day-date {
    font-size: 12px;
    font-weight: 400;
    color: ${colors.darkGrey};
  }
`;

export const StyledTop3Cell = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (min-width: 900px) {
    min-width: 200px;
  }

  .top-3-wrapper {
    > div {
      margin-inline-start: 4px;
      transition: margin-inline-start 0.2s ease-in-out;

      &:first-of-type {
        margin-inline-start: 0 !important;
      }
    }
  }

  &:hover {
    .top-3-wrapper > div {
      margin-inline-start: 4px;
    }
  }

  @media (min-width: 700px) {
    .top-3-wrapper {
      > div {
        margin-inline-start: -10px;
      }
    }
  }

  .user-avatar {
    box-shadow: 0 0 0 3px ${colors.white};
    transition: box-shadow 0.2s ease-in-out;
  }
`;

export const StyledChartTooltip = styled.div`
  padding: 16px;
  background: ${colors.white};
  border-radius: 12px;
  border: 1px solid ${colors.lightGrey};

  .line-key-color {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-inline-end: 8px;
  }
`;
