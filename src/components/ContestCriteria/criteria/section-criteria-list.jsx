import React, { useState } from "react";
import { css } from "@emotion/css";
import { App, Button, Divider, Flex, List, Popconfirm, Tooltip } from "antd";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import {
  EyeSlashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { CriteriaFormPopup } from "./criteria-form-popup";
import { colors } from "../../../styles";
import {
  FieldTypes,
  FieldTypesIcons,
} from "../../../services/contest-criteria/consts";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { useContestCriteria } from "./use-contest-criteria";
import { reorder } from "../../../util/contest-utils";

export const SectionCriteriaList = ({ section }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { criteriaItems, actions } = useContestCriteria({
    sectionId: section.id,
  });
  const [addCriteriaVisible, setAddCriteriaVisible] = useState(false);
  const [activeCriterion, setActiveCriterion] = useState(null);

  const handleDelete = async (id) => {
    try {
      await actions.remove(id);
      message.success(t("criteria-deleted"));
    } catch (e) {
      console.error(e);
      message.error(t("criteria-delete-failed"));
    }
  };

  const onDragEnd = async (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      criteriaItems,
      result.source.index,
      result.destination.index,
    );

    await actions.updateOrder(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex vertical gap={16}>
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
                                setActiveCriterion(item.id);
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
                                  {t("points", { count: item.points })}
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
          criterionId={activeCriterion}
          section={section}
          index={criteriaItems.length}
          open={addCriteriaVisible}
          onClose={() => {
            setAddCriteriaVisible(false);
            setActiveCriterion(null);
          }}
        />
      </Flex>
    </DragDropContext>
  );
};
