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

      > span {
        font-family: monospace;
        color: #000;
      }
    }
  }
`;
