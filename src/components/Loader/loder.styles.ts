import styled from "@emotion/styled";
import { colors } from "../../styles";

export default styled.main`
  display: flex;
  width: 100%;
  background-color: #fff;
  height: calc(100vh - 300px);
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-direction: column;

  > span {
    font-size: 18px;
  }
`;

export const LoaderAnimation = styled.div`
  display: flex;

  ::after {
    content: "";
    width: 32px;
    height: 32px;
    border: 5px solid #ddd;
    border-right-color: ${colors.red};

    border-radius: 50%;
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const H1 = styled.h1`
  color: #213c64;
  font-size: 3rem;
  align-items: center;
  margin-left: 2rem;

  @media (max-width: 500px) {
    margin-top: 2rem;
    font-size: 2rem;
    margin-right: 1rem;
    color: #213c64;
  }
`;
