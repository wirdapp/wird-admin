import { AnimatePresence, motion } from "framer-motion";
import { css } from "@emotion/css";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalOverlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay color */
  display: flex;
  justify-content: center;
  z-index: 1000; /* Ensure the modal is on top of other elements */
  overflow: auto;
  padding-bottom: 16px;
`;

const modalStyles = css`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 100px;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    .close-button {
      border: none;
      background: none;
      cursor: pointer;
      color: #aeaeae;
      font-size: 24px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const Modal = ({ visible, title, onClose, children }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, visible]);

  useEffect(() => {
    // remove scrollbar from body
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className={modalOverlayStyles}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
        >
          <motion.div
            className={modalStyles}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
          >
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <button className="close-button" onClick={onClose}>
                <XMarkIcon />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal"),
  );
};
