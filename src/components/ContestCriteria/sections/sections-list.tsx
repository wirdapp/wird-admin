import {
	DragDropContext,
	Droppable,
	type DroppableProvided,
	type DroppableStateSnapshot,
	type DropResult,
} from "@hello-pangea/dnd";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "motion/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<AddSectionFormValues>();

	const newSectionName = watch("label");

	const handleAddSection = async (values: AddSectionFormValues): Promise<void> => {
		setAdding(true);
		try {
			await actions.add({
				label: values.label,
				position: sections.length,
			});
			reset();
		} finally {
			setAdding(false);
		}
	};

	const onDragEnd = async (result: DropResult): Promise<void> => {
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
		<div className="flex flex-col gap-4">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={cn(
								"p-1 flex flex-col gap-4 transition-colors",
								snapshot.isDraggingOver && "bg-muted/50",
							)}
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
			<Card className="border-dashed">
				<CardContent className="pt-6">
					<form onSubmit={handleSubmit(handleAddSection)} className="space-y-4">
						<div className="space-y-2">
							<Label className="flex items-center gap-2">
								<PlusCircleIcon className="h-5 w-5" />
								{t("add-section")}
							</Label>
							<Input
								placeholder={t("section-name")}
								{...register("label", { required: t("requiredField") })}
							/>
							{errors.label && <p className="text-sm text-destructive">{errors.label.message}</p>}
						</div>
						<Button type="submit" size="sm" disabled={!newSectionName || adding}>
							<PlusIcon className="h-4 w-4" />
							{t("addSection")}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
