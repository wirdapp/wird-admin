import styled from "@emotion/styled";
import { colors } from "styles";

export const Fieldset = styled.fieldset`
  border: 1px solid ${colors.yellow};
  border-radius: 6px;
  padding: 12px;

  legend {
    font-size: 14px;
    color: ${colors.black};
    display: inline-block;
    width: auto;
    padding: 0 8px;
    margin: 0 4px 8px;
    border: none;
  }
`;
