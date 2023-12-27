import React, {useState} from "react";
import {ReactComponent as OpenDropDown} from "../assets/icons/Shared/OpenDropDown.svg";
import styled from "@emotion/styled";
import {colors} from "../styles";
import {AnimatePresence, domAnimation, LazyMotion, m} from "framer-motion"
import {css} from "@emotion/css";

const StyledCollapseWrapper = styled.div`
    background: ${colors.warmWheat};
    border-radius: 24px;
`;

const StyledCollapseToggle = styled.div`
    display: flex;
    align-items: center;
    padding: 24px;
    cursor: pointer;

    > svg {
        width: 32px;
        height: 32px;
        padding: 8px;
        border-radius: 50%;
        margin-inline-start: auto;
        transition: all 0.2s ease-in-out;
    }

    &:hover {
        > svg {
            background: ${colors.yellow};
        }
    }

     &[aria-expanded="true"] > svg {
        transform: rotate(180deg);
    }
`;

export const Collapse = ({children, title, ...props}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <LazyMotion features={domAnimation}>
      <StyledCollapseWrapper {...props}>
        <StyledCollapseToggle onClick={toggle} aria-expanded={isOpen}>
          {title}
          <OpenDropDown/>
        </StyledCollapseToggle>
        <AnimatePresence>
          {isOpen && <m.div
            className={css`overflow: clip`}
            initial={{height: 0}}
            animate={{height: "auto"}}
            exit={{height: 0}}
            transition={{duration: 0.2}}
          >{children}</m.div>}
        </AnimatePresence>
      </StyledCollapseWrapper>
    </LazyMotion>
  );
}