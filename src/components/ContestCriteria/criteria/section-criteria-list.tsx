import {
	DragDropContext,
	Draggable,
	type DraggableProvided,
	Droppable,
	type DroppableProvided,
	type DroppableStateSnapshot,
	type DropResult,
} from "@hello-pangea/dnd";
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
import { reorder } from "../../../util/contest-utils";
import { CriteriaFormPopup } from "./criteria-form-popup";
import { useContestCriteria } from "./use-contest-criteria";

interface SectionCriteriaListProps {
	section: Section;
}

export const SectionCriteriaList: React.FC<SectionCriteriaListProps> = ({ section }) => {
	const { t } = useTranslation();
	const { criteriaItems, actions } = useContestCriteria({
		sectionId: section.id,
	});
	const [addCriteriaVisible, setAddCriteriaVisible] = useState(false);
	const [activeCriterion, setActiveCriterion] = useState<UUID | null>(null);

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

	const onDragEnd = async (result: DropResult): Promise<void> => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const items = reorder(criteriaItems, result.source.index, result.destination.index);

		await actions.updateOrder(items);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex flex-col gap-4">
				<Droppable droppableId="criteria-droparea">
					{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={cn("bg-white transition-colors", snapshot.isDraggingOver && "bg-muted")}
						>
							{criteriaItems.map((item: Criterion, index: number) => {
								const Icon =
									FieldTypesIcons[(item as any).resourcetype] ?? FieldTypesIcons[FieldTypes.Text];
								return (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided: DraggableProvided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
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
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 cursor-grab"
														{...provided.dragHandleProps}
													>
														<Bars2Icon className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
														onClick={() => {
															setActiveCriterion(item.id);
															setAddCriteriaVisible(true);
														}}
													>
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
														onConfirm={() => handleDelete(item.id)}
														variant="destructive"
													/>
												</div>
											</div>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
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
		</DragDropContext>
	);
};
