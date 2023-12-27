import {useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import {colors} from "../styles";
import {Button} from "./button";
import {css} from "@emotion/css";
import {AnimatePresence, domAnimation, LazyMotion, m} from "framer-motion"

const StyledDropdown = styled.div`
    position: relative;
`

const dropdownPanelClassName = css`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 10;
    background-color: ${colors.lightGrey};
    padding: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    width: 250px;
    border-radius: 16px;

    [dir="rtl"] & {
        right: auto;
        left: 0;
    }
`;

export const Dropdown = ({children, variant, title, ...rest}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const closeDropdown = (e) => {
      if (!ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    }
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <StyledDropdown className="dropdown-container" ref={ref}>
        <Button
          variant={variant}
          className="dropdown-header"
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
          {...rest}
        >
          {title}
        </Button>
        <AnimatePresence>
          {isOpen && <m.div className={dropdownPanelClassName}
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
          >{children}</m.div>}
        </AnimatePresence>
      </StyledDropdown>
    </LazyMotion>
  )
}