import React, { useEffect, useState } from "react";
import { Button, Collapse, Input, message, Popconfirm, Space } from "antd";
import { css } from "@emotion/css";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useContestCriteriaContext } from "../contest-criteria-context";
import { SectionCriteriaList } from "../criteria/section-criteria-list";
import { colors } from "../../../styles";

const expandIconClassName = (isActive, isRtl) => css`
  transform: rotate(${isActive ? (isRtl ? -90 : 90) : 0}deg);
  width: 16px;
  transition: transform 0.3s ease-in-out;
`;

const ExpandIcon = ({ isActive }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return isRtl ? (
    <ChevronLeftIcon className={expandIconClassName(isActive, isRtl)} />
  ) : (
    <ChevronRightIcon className={expandIconClassName(isActive, isRtl)} />
  );
};

export const SectionListItem = ({ section, index, onSectionChange }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const [sectionLabel, setSectionLabel] = useState(section.label);
  const [updating, setUpdating] = useState(false);
  const { sections } = useContestCriteriaContext();

  useEffect(() => {
    setSectionLabel(section.label);
  }, [section.label]);

  const handleSectionUpdate = async ({ label, position }) => {
    setUpdating(true);
    try {
      await sections.update(section.id, {
        label: label ?? section.label,
        position: position ?? section.position,
      });
      messageApi.success(t("section-updated"));
    } catch (e) {
      console.error(e);
      messageApi.error(t("section-update-failed"));
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async () => {
    try {
      await sections.remove(section.id);
      messageApi.success(t("section-deleted"));
    } catch (e) {
      console.error(e);
      messageApi.error(t("section-delete-failed"));
    }
  };

  const onNameUpdate = () => handleSectionUpdate({ label: sectionLabel });

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          {contextHolder}
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
                          type="text"
                          icon={<CheckIcon />}
                          loading={updating}
                        />
                        <Button
                          size="small"
                          onClick={() => setSectionLabel(section.label)}
                          type="text"
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
  );
};
