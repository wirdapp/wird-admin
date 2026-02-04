import { css } from "@emotion/css";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Card, Flex, Form, Input, Space } from "antd";
import { AnimatePresence } from "framer-motion";
import React from "react";
// @ts-expect-error - react-beautiful-dnd types not installed
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { reorder } from "../../../util/contest-utils";
import { SectionListItem } from "./section-list-item";
import { useContestSections } from "./use-contest-sections";

interface AddSectionFormValues {
	label: string;
}

export const SectionsList: React.FC = () => {
	const { t } = useTranslation();
	const { sections, actions } = useContestSections();
	const [adding, setAdding] = React.useState(false);
	const [form] = Form.useForm<AddSectionFormValues>();

	const newSectionName = Form.useWatch("label", form);

	const handleAddSection = async (values: AddSectionFormValues): Promise<void> => {
		setAdding(true);
		try {
			await actions.add({
				label: values.label,
				position: sections.length,
			});
			form.resetFields();
		} finally {
			setAdding(false);
		}
	};

	const onDragEnd = async (result: any): Promise<void> => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const items = reorder(sections, result.source.index, result.destination.index);

		await actions.updateSectionsOrder(items);
	};

	return (
		<Flex vertical gap={16}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided: any, snapshot: any) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={css`
                padding: 4px;
                background-color: ${
									snapshot.isDraggingOver ? "rgba(150, 150, 150, 0.05)" : "transparent"
								};
                display: flex;
                flex-direction: column;
                gap: 16px;
              `}
						>
							<AnimatePresence>
								{sections.map((section, index) => (
									<SectionListItem key={section.id} section={section} index={index} />
								))}
							</AnimatePresence>
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
				<Form form={form} layout="vertical" onFinish={handleAddSection} requiredMark={false}>
					<Form.Item
						rules={[{ required: true, message: t("requiredField") }]}
						label={
							<Space align="center">
								<PlusCircleIcon style={{ display: "block", width: 20, height: 20 }} />
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
						disabled={!newSectionName}
					>
						{t("addSection")}
					</Button>
				</Form>
			</Card>
		</Flex>
	);
};
