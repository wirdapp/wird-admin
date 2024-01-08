import React from "react";
import { css, cx } from "@emotion/css";
import { colors } from "../styles";

const defaultBadgeVariant = {
  color: colors.black,
  background: colors.darkGrey,
};

const badgeVariants = {
  primary: {
    ...defaultBadgeVariant,
    background: colors.yellow,
  },
  secondary: {
    ...defaultBadgeVariant,
    background: colors.lightRed,
  },
};

const badgeSizes = {
  small: {
    fontSize: "9px",
    padding: "2px 4px",
  },
  medium: {
    fontSize: "12px",
    padding: "4px 8px",
  },
  large: {
    fontSize: "16px",
    padding: "8px 16px",
  },
};

const getBadgeStyles = ({ variant, size }) => {
  const variantStyles = badgeVariants[variant] || defaultBadgeVariant;
  const sizeStyles = badgeSizes[size] || badgeSizes.medium;

  return { ...variantStyles, ...sizeStyles };
};

const badgeClassName = ({ variant, size }) => {
  const styles = getBadgeStyles({ variant, size });
  return css`
    display: inline-block;
    border-radius: 4px;
    vertical-align: middle;
    color: ${styles.color};
    background: ${styles.background};
    font-size: ${styles.fontSize};
    padding: ${styles.padding};
  `;
};

export const Badge = ({ children, className, variant, size }) => {
  return (
    <div className={cx(badgeClassName({ variant, size }), className)}>
      {children}
    </div>
  );
};
