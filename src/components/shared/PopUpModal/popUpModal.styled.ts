import styled from "@emotion/styled";
import { colors } from "styles";
import { css } from "@emotion/react";

interface PopUpModalProps {
  position: {
    top: number;
    left: number;
  };
}

export default styled.div<PopUpModalProps>`
  position: absolute;
  padding: 2rem;
  ${({ position }) => css`
    top: ${position.top}px;
    left: ${position.left}px;
  `}
  border-radius:1.5rem;
  background-color: ${colors.white};

  /* flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap; */
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const FixedTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const InputsContainer = styled.div``;
