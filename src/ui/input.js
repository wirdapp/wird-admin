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
    transition: all 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: ${colors.yellow};
    }

`;

export const TextArea = styled.textarea`
    box-sizing: border-box;
    padding: 16px 24px;
    width: 100%;
    background: #ffffff;
    border: 2px solid ${colors.lightRed};
    border-radius: 10px;
    text-align: start;
    transition: all 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: ${colors.yellow};
    }

`;