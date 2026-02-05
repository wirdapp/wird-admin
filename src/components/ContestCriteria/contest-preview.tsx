import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Empty } from "@/components/ui/empty";
import { useContestCriteria } from "./criteria/use-contest-criteria";
import { CriterionField } from "./criterion-field";
import { useContestSections } from "./sections/use-contest-sections";

export const ContestPreview: React.FC = () => {
	const { t } = useTranslation();
	const { sections } = useContestSections();
	const { criteriaItems } = useContestCriteria();

	return (
		<div className="flex flex-col gap-2 max-w-[350px] w-full bg-white rounded mx-auto shadow-sm lg:h-[600px] lg:overflow-y-auto">
			{sections.length === 0 && <Empty description={t("no-sections")} />}
			<AnimatePresence>
				{sections.map((section) => {
					const sectionCriteria = criteriaItems.filter(
						(c) => c.section_info?.id === section.id && (c as any).visible,
					);

					return (
						<motion.div
							key={section.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							<div className="p-4 border-b-[3px] border-muted">
								<div className="font-bold text-lg leading-6 mb-4">{section.label}</div>
								{sectionCriteria.length === 0 && <Empty description={t("no-criterias-added")} />}
								{sectionCriteria.map((c) => (
									<div
										key={c.id}
										className="mx-[-6px] p-4 px-1.5 rounded border-b border-muted last:border-b-0"
									>
										<div className="flex justify-between items-center mb-2">
											<span className="font-semibold">{c.label}</span>
											<span className="text-muted-foreground italic text-sm">
												({t("points", { count: (c as any).points })})
											</span>
										</div>
										{c.description && (
											<p className="text-sm text-muted-foreground mb-2">{c.description}</p>
										)}
										<CriterionField criterion={c as any} />
									</div>
								))}
							</div>
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
};
