import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";
import { colors } from "../styles";

const StyledTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .tabs-header {
    display: flex;
    gap: 16px;
    width: 100%;
    margin-bottom: 8px;
    border-bottom: 1px solid #eaeaea;
  }

  .tab-item {
    padding: 16px;
    cursor: pointer;
    color: ${colors.darkGrey};
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    position: relative;

    .indicator {
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${colors.yellow};
      z-index: 10;
      border-radius: 2px;
    }

    &:hover {
      color: #000;
    }

    &.active {
      color: #000;
    }
  }

  .tab-content {
    width: 100%;
    background: #fff;
  }
`;

export const Tabs = ({ items, activeKey, onChange }) => {
  const [activeTab, setActiveTab] = useState(activeKey || items[0].key);

  const handleClick = (key) => {
    setActiveTab(key);
    onChange?.(key);
  };

  useEffect(() => {
    if (activeKey) setActiveTab(activeKey);
  }, [activeKey]);

  const currentTab = items.find((item) => item.key === activeTab);

  return (
    <StyledTabsContainer>
      <div className="tabs-header">
        {items.map((item) => (
          <div
            key={item.key}
            className={`tab-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => handleClick(item.key)}
          >
            {item.title}
            {activeTab === item.key && (
              <motion.div className="indicator" layoutId="indicator" />
            )}
          </div>
        ))}
      </div>
      <AnimatePresence initial>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          key={currentTab.key}
          className="tab-content"
        >
          {currentTab.content}
        </motion.div>
      </AnimatePresence>
    </StyledTabsContainer>
  );
};
