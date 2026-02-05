import { Draggable, type DraggableProvided, type DraggableStateSnapshot } from "@hello-pangea/dnd";
import { TrashIcon } from "@heroicons/react/20/solid";
import { CheckIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { colors } from "../../../styles";
import type { Section } from "../../../types";
import { SectionCriteriaList } from "../criteria/section-criteria-list";
import { useContestSections } from "./use-contest-sections";

interface SectionListItemProps {
	section: Section;
	index: number;
}

export const SectionListItem: React.FC<SectionListItemProps> = ({ section, index }) => {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState<string | undefined>(section.id);
	const [sectionLabel, setSectionLabel] = useState(section.label);
	const [updating, setUpdating] = useState(false);
	const { actions } = useContestSections();

	useEffect(() => {
		setSectionLabel(section.label);
	}, [section.label]);

	const handleSectionUpdate = async ({
		label,
		position,
	}: {
		label?: string;
		position?: number;
	}): Promise<void> => {
		setUpdating(true);
		try {
			await actions.update(section.id, {
				label: label ?? section.label,
				position: position ?? section.order_in_contest,
			});
			toast.success(t("section-updated"));
		} catch (e) {
			console.error(e);
			toast.error(t("section-update-failed"));
		} finally {
			setUpdating(false);
		}
	};

	const onDelete = async (): Promise<void> => {
		try {
			await actions.remove(section.id);
			toast.success(t("section-deleted"));
		} catch (e: any) {
			console.error(e);
			toast.error(e?.response?.data?.detail ?? t("section-delete-failed"));
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
				{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
					<div ref={provided.innerRef} {...provided.draggableProps} key={section.id}>
						<div
							className="rounded-lg border"
							style={{
								backgroundColor: colors.lightYellow,
								borderColor: colors.yellow,
							}}
						>
							<Accordion
								type="single"
								collapsible
								value={!snapshot.isDragging ? expanded : undefined}
								onValueChange={(val) => setExpanded(Array.isArray(val) ? val[0] : val || undefined)}
							>
								<AccordionItem value={section.id} className="border-0">
									<div className="flex items-center gap-2 p-3">
										<AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
											<ChevronDownIcon
												className={cn(
													"h-4 w-4 transition-transform duration-200",
													expanded === section.id && "rotate-180",
												)}
											/>
										</AccordionTrigger>
										<div className="flex items-center gap-2 flex-1 min-w-0">
											<Input
												placeholder={t("section-name")}
												value={sectionLabel}
												onChange={(e) => setSectionLabel(e.target.value)}
												className="max-w-[200px] h-8 bg-white"
												onClick={(e) => e.stopPropagation()}
											/>
											{sectionLabel !== section.label && (
												<>
													<Button
														size="icon"
														className="h-8 w-8"
														onClick={(e) => {
															e.stopPropagation();
															onNameUpdate();
														}}
														disabled={updating}
													>
														<CheckIcon className="h-4 w-4" />
													</Button>
													<Button
														size="icon"
														variant="outline"
														className="h-8 w-8"
														onClick={(e) => {
															e.stopPropagation();
															setSectionLabel(section.label);
														}}
														disabled={updating}
													>
														<XMarkIcon className="h-4 w-4" />
													</Button>
												</>
											)}
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
												title={t("delete-section-confirm")}
												description={t("delete-section-confirm-description")}
												confirmText={t("yes")}
												cancelText={t("no")}
												onConfirm={onDelete}
												variant="destructive"
											/>
										</div>
									</div>
									<AccordionContent className="px-3 pb-3">
										<SectionCriteriaList section={section} />
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				)}
			</Draggable>
		</motion.div>
	);
};
