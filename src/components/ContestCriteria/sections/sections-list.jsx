import React from "react";
import { css } from "@emotion/css";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { SectionListItem } from "./section-list-item";
import { useContestCriteriaContext } from "../contest-criteria-context";
import { Button, Card, Flex, Form, Input, Space } from "antd";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline"; // a little function to help us with reordering the result

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const SectionsList = () => {
  const { t } = useTranslation();
  const { sections } = useContestCriteriaContext();
  const [adding, setAdding] = React.useState(false);

  const handleAddSection = async (values) => {
    setAdding(true);
    try {
      await sections.add({
        label: values.label,
        position: sections.items.length,
      });
    } finally {
      setAdding(false);
    }
  };

  const onSectionChange = (sectionId, value) => {
    const newSections = [...sections.items];
    const sectionIndex = newSections.findIndex((s) => s.id === sectionId);
    newSections[sectionIndex].label = value;
    sections.setItems(newSections);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      sections.items,
      result.source.index,
      result.destination.index,
    );

    sections.setItems(items);
  };

  return (
    <Flex vertical gap={16}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={css`
                padding: 4px;
                background-color: ${snapshot.isDraggingOver
                  ? "rgba(150, 150, 150, 0.05)"
                  : "transparent"};
                display: flex;
                flex-direction: column;
                gap: 16px;
              `}
            >
              {sections.items.map((section, index) => (
                <SectionListItem
                  key={section.id}
                  section={section}
                  index={index}
                  onSectionChange={onSectionChange}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Card
        className={css`
          border-style: dashed;
        `}
      >
        <Form
          layout="vertical"
          onFinish={handleAddSection}
          requiredMark={false}
        >
          <Form.Item
            rules={[{ required: true, message: t("requiredField") }]}
            label={
              <Space align="center">
                <PlusCircleIcon
                  style={{ display: "block", width: 20, height: 20 }}
                />
                {t("add-section")}
              </Space>
            }
            name="label"
          >
            <Input placeholder={t("section-name")} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={adding}
            icon={<PlusIcon />}
            size="small"
          >
            {t("addSection")}
          </Button>
        </Form>
      </Card>
    </Flex>
  );
};
