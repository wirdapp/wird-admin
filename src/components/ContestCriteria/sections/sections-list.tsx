import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const onDragEnd = async (event: DragEndEvent): Promise<void> => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = sections.findIndex((s) => s.id === active.id);
		const newIndex = sections.findIndex((s) => s.id === over.id);
		const items = arrayMove(sections, oldIndex, newIndex);

		await actions.updateSectionsOrder(items);
	};

	return (
		<div className="flex flex-col gap-4">
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
				<SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
					<div className="p-1 flex flex-col gap-4">
						{sections.map((section, index) => (
							<SectionListItem key={section.id} section={section} index={index} />
						))}
					</div>
				</SortableContext>
			</DndContext>
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
