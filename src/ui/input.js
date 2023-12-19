import styled from "@emotion/styled";
import {colors} from "../styles";

export const Input = styled.input`
    box-sizing: border-box;
    padding: 16px 24px;

    width: 100%;
    height: 48px;

    background: #ffffff;
    border: 2px solid ${colors.lightRed};
    border-radius: 10px;

    text-align: start;

    &:focus {
        outline: none;
        border-color: ${colors.yellow};
    }

`;