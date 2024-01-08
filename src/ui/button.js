import { colors } from "../styles";
import { css, cx } from "@emotion/css";

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
  },
};

function getButtonStyles(variant = "default") {
  return buttonStyles[variant] || buttonStyles.default;
}

export const buttonClassName = (variant) => {
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
    text-decoration: none;

    &:hover {
      background-color: ${styles.hoverBgColor};
    }

    svg {
      width: 16px;
      height: 16px;
    }

    &:disabled {
      background-color: ${colors.lightGrey};
      color: ${colors.darkGrey};
    }
  `;
};

export const Button = ({ children, variant, href, className, ...props }) => {
  return href ? (
    <a
      className={cx(buttonClassName(variant), className)}
      href={href}
      {...props}
    >
      {children}
    </a>
  ) : (
    <button className={cx(buttonClassName(variant), className)} {...props}>
      {children}
    </button>
  );
};
