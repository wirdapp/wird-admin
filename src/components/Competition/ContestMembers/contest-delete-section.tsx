import { TrashIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Alert, App, Button, Flex, Form, Input, Modal, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { ContestsService } from "../../../services/contests/contests.service";
import { removeCurrentContest } from "../../../services/contests/utils";
import { colors } from "../../../styles";
import { useDashboardData } from "../../../util/routes-data";

export const ContestDeleteSection: React.FC = () => {
	const { message } = App.useApp();
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const { currentContest } = useDashboardData();
	const [confirmText, setConfirmText] = React.useState<string>("");
	const [deleting, setDeleting] = React.useState<boolean>(false);

	if (!currentContest) {
		return null;
	}

	const onDelete = async (): Promise<void> => {
		setDeleting(true);
		try {
			await ContestsService.drop(currentContest.id, true);
			message.success(t("contest-removed"));
			removeCurrentContest();
			window.location.reload();
		} catch (error) {
			console.error(error);
			message.error(t("something-went-wrong"));
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="danger-zone">
			<h3>{t("danger-zone")}</h3>
			<p>{t("deleting-contest-description")}</p>
			<Button danger type="primary" onClick={() => setIsOpen(true)}>
				{t("delete-contest")}
			</Button>
			<Modal
				title={
					<Space size="small">
						<ExclamationTriangleIcon
							style={{ color: colors.yellow, height: 24, display: "block" }}
						/>
						{t("are-you-sure")}
					</Space>
				}
				open={isOpen}
				onOk={onDelete}
				onCancel={() => setIsOpen(false)}
				okButtonProps={{
					danger: true,
					loading: deleting,
					disabled: confirmText !== currentContest.contest_id,
					icon: <TrashIcon />,
				}}
				okText={t("delete-contest")}
			>
				<Flex vertical gap={16}>
					<p style={{ margin: 0 }}>{t("deleting-contest-description")}:</p>
					<ul style={{ margin: 0 }}>
						<li>{t("users")}</li>
						<li>{t("groups")}</li>
						<li>{t("points")}</li>
						<li>{t("results")}</li>
					</ul>
					<Alert type="error" message={t("action-cannot-be-undone")} />
					<Form layout="vertical">
						<Form.Item label={t("write-contest-code-to-confirm")} name="sure">
							<Input
								onChange={(e) => setConfirmText(e.target.value)}
								value={confirmText}
								placeholder={t("write-contest-code", {
									code: currentContest.contest_id,
								})}
							/>
						</Form.Item>
					</Form>
				</Flex>
			</Modal>
		</div>
	);
};
