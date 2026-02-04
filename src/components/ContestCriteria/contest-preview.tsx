import { css } from "@emotion/css";
import { Empty, Flex, Form } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useContestCriteria } from "./criteria/use-contest-criteria";
import { CriterionField } from "./criterion-field";
import { useContestSections } from "./sections/use-contest-sections";

export const ContestPreview: React.FC = () => {
	const { t } = useTranslation();
	const { sections } = useContestSections();
	const { criteriaItems } = useContestCriteria();

	return (
		<Flex
			vertical
			gap="small"
			className={css`
        max-width: 350px;
        width: 100%;
        background: #fff;
        border-radius: 4px;
        margin: 0 auto;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
        @media (min-width: 992px) {
          height: 600px;
          overflow-y: auto;
        }
      `}
		>
			{sections.length === 0 && (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("no-sections")} />
			)}
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
							<Form
								layout="vertical"
								className={css`
                  padding: 16px;
                  border-bottom: 3px solid #eee;
                `}
							>
								<div
									className={css`
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 24px;
                    margin-bottom: 16px;
                  `}
								>
									{section.label}
								</div>
								{sectionCriteria.length === 0 && (
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description={t("no-criterias-added")}
									/>
								)}
								{sectionCriteria.map((c) => (
									<Form.Item
										className={css`
                      margin: 4px -6px;
                      padding: 16px 6px;
                      border-radius: 4px;
                      border-bottom: 1px solid #f5f5f5;

                      &:last-child {
                        border-bottom: none;
                      }

                      .ant-form-item-label label {
                        width: 100%;
                        justify-content: space-between;
                        font-weight: 600;

                        &:after {
                          content: none;
                        }
                      }
                    `}
										label={
											<>
												<span>{c.label}</span>
												<i
													className={css`
                            color: #aaa;
                          `}
												>
													({t("points", { count: (c as any).points })})
												</i>
											</>
										}
										key={c.id}
										extra={c.description}
									>
										<CriterionField criterion={c as any} />
									</Form.Item>
								))}
							</Form>
						</motion.div>
					);
				})}
			</AnimatePresence>
		</Flex>
	);
};
