import React, { useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  Button,
  Divider,
  Flex,
  List,
  message,
  Popconfirm,
  Tooltip,
} from "antd";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import {
  EyeSlashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useContestCriteriaContext } from "../contest-criteria-context";
import { CriteriaFormPopup } from "./criteria-form-popup";
import { colors } from "../../../styles";
import {
  FieldTypes,
  FieldTypesIcons,
} from "../../../services/contest-criteria/consts";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Bars2Icon } from "@heroicons/react/24/solid";

export const SectionCriteriaList = ({ section }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const { criteria } = useContestCriteriaContext();
  const [addCriteriaVisible, setAddCriteriaVisible] = useState(false);
  const [activeCriterion, setActiveCriterion] = useState(null);

  const criteriaItems = useMemo(
    () =>
      criteria.items
        .filter((s) => s.section === section.id)
        .sort((a, b) => {
          if (a.order_in_section < b.order_in_section) {
            return -1;
          }
          if (a.order_in_section > b.order_in_section) {
            return 1;
          }
          return 0;
        }) ?? [],
    [criteria.items, section.id],
  );

  const handleDelete = async (id) => {
    try {
      await criteria.delete(id);
      messageApi.success(t("criteria-deleted"));
    } catch (e) {
      console.error(e);
      messageApi.error(t("criteria-delete-failed"));
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) {
      return;
    }

    const sourceItem = criteriaItems[sourceIndex];
    const destinationItem = criteriaItems[destinationIndex];

    await Promise.all([
      criteria.update(sourceItem.id, {
        order_in_section: destinationIndex,
      }),
      criteria.update(destinationItem.id, {
        order_in_section: sourceIndex,
      }),
    ]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex vertical gap={16}>
        {contextHolder}
        <Droppable droppableId="criteria-droparea">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={css`
                background-color: #fff;
                ${snapshot.isDraggingOver &&
                `background-color: ${colors.lightGrey};`}
              `}
            >
              <List
                dataSource={criteriaItems}
                renderItem={(item, index) => {
                  const Icon =
                    FieldTypesIcons[item.resourcetype] ??
                    FieldTypesIcons[FieldTypes.Text];
                  return (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      droppableId="criteria-droparea"
                    >
                      {(provided, snapshot) => (
                        <List.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          key={item.id}
                          className={css`
                            ${item.archived ? `opacity: 0.5;` : ""}
                          `}
                          actions={[
                            <Button
                              size="small"
                              type="text"
                              {...provided.dragHandleProps}
                              className={css`
                                cursor: grab;
                              `}
                              icon={<Bars2Icon />}
                            />,
                            <Button
                              size="small"
                              type="text"
                              icon={<PencilSquareIcon />}
                              onClick={() => {
                                setActiveCriterion(item);
                                setAddCriteriaVisible(true);
                              }}
                            />,
                            <Popconfirm
                              title={t("delete-confirm")}
                              onConfirm={() => handleDelete(item.id)}
                              okText={t("delete")}
                              cancelText={t("cancel")}
                            >
                              <Button
                                size="small"
                                type="text"
                                danger
                                icon={<TrashIcon />}
                              />
                            </Popconfirm>,
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <Flex
                                align="center"
                                gap="small"
                                className={css`
                                  svg {
                                    width: 16px;
                                  }
                                `}
                              >
                                {item.label}
                                {!item.visible && (
                                  <Tooltip title={t("criteria-not-visible")}>
                                    <EyeSlashIcon />
                                  </Tooltip>
                                )}
                              </Flex>
                            }
                            description={
                              <Flex align="center">
                                <div
                                  className={css`
                                    white-space: nowrap;
                                  `}
                                >
                                  {t("points")}: {item.points}
                                </div>
                                <Divider type="vertical" />
                                <div
                                  className={css`
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    flex-grow: 0;
                                  `}
                                >
                                  {item.description}
                                </div>
                              </Flex>
                            }
                            avatar={
                              <Icon
                                className={css`
                                  width: 24px;
                                  height: 24px;
                                `}
                              />
                            }
                          />
                          {provided.placeholder}
                        </List.Item>
                      )}
                    </Draggable>
                  );
                }}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button
          size="small"
          icon={<PlusIcon />}
          type="dashed"
          onClick={() => {
            setActiveCriterion(null);
            setAddCriteriaVisible(true);
          }}
        >
          {t("add-criteria")}
        </Button>
        <CriteriaFormPopup
          criterion={activeCriterion}
          section={section}
          index={criteriaItems.length}
          open={addCriteriaVisible}
          onClose={() => setAddCriteriaVisible(false)}
        />
      </Flex>
    </DragDropContext>
  );
};
