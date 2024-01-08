import React from "react";
import { cx } from "@emotion/css";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export const Tooltip = ({ children, overlay, ...props }) => {
  const [show, setShow] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setShow(true);
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.x + rect.width / 2,
      y: rect.y,
    });
  };

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  return (
    <>
      <div
        {...props}
        className={cx("tooltip-wrapper", props.className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {show &&
        createPortal(
          <AnimatePresence initial>
            <motion.div
              className="tooltip show"
              initial={{
                opacity: 0,
                scale: 0.8,
                translateX: "-50%",
                translateY: "-100%",
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                top: position.y,
                left: position.x,
                transform: "translate(-50%, -100%)",
              }}
            >
              {overlay}
            </motion.div>
          </AnimatePresence>,
          document.getElementById("portal"),
        )}
    </>
  );
};
