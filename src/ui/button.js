import styled from "@emotion/styled";
import {colors} from "../styles";
import {css} from "@emotion/react";

const buttonStyles = {
  primary: {
    color: colors.black,
    bgColor: colors.yellow,
    hoverBgColor: colors.yellowHover,
  },
  default: {
    color: colors.black,
    bgColor: colors.lightRed,
    hoverBgColor: colors.lightRedHover,
  },
  link: {
    color: colors.red,
    bgColor: "transparent",
    hoverBgColor: "transparent",
    padding: "0",
    height: "auto",
  }
}

function getButtonStyles(variant = "default") {
  return buttonStyles[variant] || buttonStyles.default;
}

export const Button = styled.button`
    ${({variant}) => {
        const styles = getButtonStyles(variant);
        return css`
            padding: ${styles.padding || "12px 18px"};
            background-color: ${styles.bgColor};
            color: ${styles.color};
            border-radius: 22px;
            text-align: center;
            cursor: pointer;
            font-weight: 600;
            font-style: normal;
            text-transform: uppercase;
            transition: background-color 0.2s ease-in-out;
            height: ${styles.height || "52px"};
            min-width: 52px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;

            &:hover {
                background-color: ${styles.hoverBgColor};
            }

            svg {
                width: 20px;
                height: 20px;
            }
        `
    }}`;