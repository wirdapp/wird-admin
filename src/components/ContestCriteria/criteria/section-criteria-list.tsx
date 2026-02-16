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
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "@heroicons/react/20/solid";
import { EyeSlashIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/solid";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FieldTypes, FieldTypesIcons } from "../../../services/contest-criteria/consts";
import type { Criterion, Section, UUID } from "../../../types";
import { CriteriaFormPopup } from "./criteria-form-popup";
import { useContestCriteria } from "./use-contest-criteria";

interface SectionCriteriaListProps {
	section: Section;
}

function SortableCriterionItem({
	item,
	onEdit,
	onDelete,
}: {
	item: Criterion;
	onEdit: () => void;
	onDelete: () => void;
}) {
	const { t } = useTranslation();
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: item.id,
	});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};
	const Icon = FieldTypesIcons[(item as any).resourcetype] ?? FieldTypesIcons[FieldTypes.Text];

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			className={cn(
				"flex items-center justify-between p-3 border-b last:border-b-0",
				(item as any).archived && "opacity-50",
			)}
		>
			<div className="flex items-center gap-3 flex-1 min-w-0">
				<Icon className="h-6 w-6 shrink-0" />
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<span className="font-medium truncate">{item.label}</span>
						{!(item as any).visible && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<EyeSlashIcon className="h-4 w-4 text-muted-foreground" />
									</TooltipTrigger>
									<TooltipContent>{t("criteria-not-visible")}</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</div>
					<div className="flex items-center text-sm text-muted-foreground">
						<span className="whitespace-nowrap">
							{t("points", { count: (item as any).points })}
						</span>
						<Separator orientation="vertical" className="mx-2 h-4" />
						<span className="truncate">{item.description}</span>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="icon" className="h-8 w-8 cursor-grab" {...listeners}>
					<Bars2Icon className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
					<PencilSquareIcon className="h-4 w-4" />
				</Button>
				<ConfirmDialog
					trigger={
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-destructive hover:text-destructive"
						>
							<TrashIcon className="h-4 w-4" />
						</Button>
					}
					title={t("delete-confirm")}
					confirmText={t("delete")}
					cancelText={t("cancel")}
					onConfirm={onDelete}
					variant="destructive"
				/>
			</div>
		</div>
	);
}

export const SectionCriteriaList: React.FC<SectionCriteriaListProps> = ({ section }) => {
	const { t } = useTranslation();
	const { criteriaItems, actions } = useContestCriteria({
		sectionId: section.id,
	});
	const [addCriteriaVisible, setAddCriteriaVisible] = useState(false);
	const [activeCriterion, setActiveCriterion] = useState<UUID | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleDelete = async (id: UUID): Promise<void> => {
		try {
			await actions.remove(id);
			toast.success(t("criteria-deleted"));
		} catch (e: any) {
			console.error(e);
			let errorMessage = t("criteria-delete-failed");
			if (e.response?.data?.detail) {
				if (e.response?.data?.detail.includes("cannot edit contest after its start date")) {
					errorMessage = t("cannot-edit-contest-after-start");
				} else {
					errorMessage = e.response?.data?.detail;
				}
			}
			toast.error(errorMessage);
		}
	};

	const onDragEnd = async (event: DragEndEvent): Promise<void> => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = criteriaItems.findIndex((c) => c.id === active.id);
		const newIndex = criteriaItems.findIndex((c) => c.id === over.id);
		const items = arrayMove(criteriaItems, oldIndex, newIndex);

		await actions.updateOrder(items);
	};

	return (
		<div className="flex flex-col gap-4">
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
				<SortableContext
					items={criteriaItems.map((c) => c.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="bg-white">
						{criteriaItems.map((item: Criterion) => (
							<SortableCriterionItem
								key={item.id}
								item={item}
								onEdit={() => {
									setActiveCriterion(item.id);
									setAddCriteriaVisible(true);
								}}
								onDelete={() => handleDelete(item.id)}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
			<Button
				variant="outline"
				size="sm"
				className="border-dashed"
				onClick={() => {
					setActiveCriterion(null);
					setAddCriteriaVisible(true);
				}}
			>
				<PlusIcon className="h-4 w-4" />
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
		</div>
	);
};
