import React, { useEffect, useState } from "react";
import { App, Button, Collapse, Input, Popconfirm, Space } from "antd";
import { css } from "@emotion/css";
import { Bars2Icon } from "@heroicons/react/24/solid";
// @ts-expect-error - react-beautiful-dnd types not installed
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { SectionCriteriaList } from "../criteria/section-criteria-list";
import { colors } from "../../../styles";
import { useContestSections } from "./use-contest-sections";
import { motion } from "framer-motion";
import type { Section } from "../../../types";

const expandIconClassName = (isActive: boolean, isRtl: boolean): string => css`
  transform: rotate(${isActive ? (isRtl ? -90 : 90) : 0}deg);
  width: 16px;
  transition: transform 0.3s ease-in-out;
`;

interface ExpandIconProps {
  isActive?: boolean;
}

const ExpandIcon: React.FC<ExpandIconProps> = ({ isActive }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return isRtl ? (
    <ChevronLeftIcon className={expandIconClassName(isActive ?? false, isRtl)} />
  ) : (
    <ChevronRightIcon className={expandIconClassName(isActive ?? false, isRtl)} />
  );
};

interface SectionListItemProps {
  section: Section;
  index: number;
}

export const SectionListItem: React.FC<SectionListItemProps> = ({ section, index }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const [sectionLabel, setSectionLabel] = useState(section.label);
  const [updating, setUpdating] = useState(false);
  const { actions } = useContestSections();

  useEffect(() => {
    setSectionLabel(section.label);
  }, [section.label]);

  const handleSectionUpdate = async ({ label, position }: { label?: string; position?: number }): Promise<void> => {
    setUpdating(true);
    try {
      await actions.update(section.id, {
        label: label ?? section.label,
        position: position ?? section.order_in_contest,
      });
      message.success(t("section-updated"));
    } catch (e) {
      console.error(e);
      message.error(t("section-update-failed"));
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async (): Promise<void> => {
    try {
      await actions.remove(section.id);
      message.success(t("section-deleted"));
    } catch (e: any) {
      console.error(e);
      message.error(e?.response?.data?.detail ?? t("section-delete-failed"));
    }
  };

  const onNameUpdate = (): Promise<void> => handleSectionUpdate({ label: sectionLabel });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Draggable draggableId={section.id} index={index}>
        {(provided: any, snapshot: any) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            key={section.id}
          >
            <Collapse
              activeKey={
                !snapshot.isDragging && expanded ? section.id : undefined
              }
              onChange={() => setExpanded(!expanded)}
              expandIcon={({ isActive }) => <ExpandIcon isActive={isActive} />}
              collapsible="icon"
              className={css`
                background: ${colors.lightYellow};
                border: 1px solid ${colors.yellow};

                .ant-collapse-header {
                  align-items: center !important;
                }
              `}
              items={[
                {
                  key: section.id,
                  label: (
                    <Space
                      size="small"
                      className={css`
                        margin-inline-end: 16px;
                      `}
                    >
                      <Input
                        placeholder={t("section-name")}
                        value={sectionLabel}
                        onChange={(e) => setSectionLabel(e.target.value)}
                        className={css`
                          max-width: 200px;
                        `}
                      />
                      {sectionLabel !== section.label && (
                        <>
                          <Button
                            size="small"
                            onClick={onNameUpdate}
                            type="primary"
                            icon={<CheckIcon />}
                            loading={updating}
                          />
                          <Button
                            size="small"
                            onClick={() => setSectionLabel(section.label)}
                            icon={<XMarkIcon />}
                            disabled={updating}
                          />
                        </>
                      )}
                    </Space>
                  ),
                  extra: (
                    <Space>
                      <Button
                        size="small"
                        type="text"
                        key={section.id}
                        {...provided.dragHandleProps}
                        className={css`
                          cursor: grab;
                        `}
                        icon={<Bars2Icon />}
                      />
                      <Popconfirm
                        title={t("delete-section-confirm")}
                        description={t("delete-section-confirm-description")}
                        onConfirm={onDelete}
                        okText={t("yes")}
                        cancelText={t("no")}
                      >
                        <Button
                          size="small"
                          type="text"
                          danger
                          icon={<TrashIcon />}
                        />
                      </Popconfirm>
                    </Space>
                  ),
                  children: <SectionCriteriaList section={section} />,
                },
              ]}
            />
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </motion.div>
  );
};
