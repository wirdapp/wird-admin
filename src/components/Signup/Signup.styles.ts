import styled from "@emotion/styled";
import { DivCenter as DefaultDivCenter } from "../Login/login.styles";
import { colors } from "../../styles";

export default styled.div`
  background: #fdfdfb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 0;
  padding: 32px 8px;
  background: ${colors.lightWheat};
  min-height: 100vh;
`;

export const DivCenter = styled(DefaultDivCenter)`
  margin: 32px auto;
  width: 100%;
  max-width: 500px;

  background: #ffffff;
  border-radius: 1.5rem;
  height: auto;
`;
