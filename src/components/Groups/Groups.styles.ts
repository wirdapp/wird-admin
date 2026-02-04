import styled from "@emotion/styled";
import {
  DivForDropdownList as DefaultDropdownList,
  DropdownDivSelect as DefaultDropdownDivSelect,
} from "../shared/styles";
import { AnimatedPage } from "../../ui/animated-page"; // Old Content

// Old Content

export const DropdownDivSelect = styled(DefaultDropdownDivSelect)`
  margin: 0 0 1rem 0;
  display: block;
  border-radius: 1.25rem;
  padding: 0;
`;

export const DropdownList = styled(DefaultDropdownList)`
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const I = styled.i``;

export default styled(AnimatedPage)`
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  gap: 3rem;
  max-width: 59.375rem;
`;
