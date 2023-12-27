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
            padding: ${styles.padding || "12px 14px"};
            background-color: ${styles.bgColor};
            color: ${styles.color};
            border-radius: 22px;
            text-align: center;
            cursor: pointer;
            font-weight: 600;
            font-style: normal;
            text-transform: uppercase;
            transition: background-color 0.2s ease-in-out;
            height: ${styles.height || "48px"};
            min-width: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            font-size: 12px;

            &:hover {
                background-color: ${styles.hoverBgColor};
            }

            svg {
                width: 16px;
                height: 16px;
            }
        `
    }}`;