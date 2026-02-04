import { css } from "@emotion/css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Empty, Flex, Space, Spin, Typography } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import { useGroups } from "../../services/groups/queries";
import { colors } from "../../styles";
import { AnimatedPage } from "../../ui/animated-page";
import { isAtLeastSuperAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import Loader from "../Loader";
import { CreateGroupPopup } from "./create-group-popup";
import { GroupsList } from "./groups-list";

export function Group(): React.ReactElement | null {
	const { t } = useTranslation();
	const { groupId } = useParams<{ groupId: string }>();
	const [createGroupPopupOpen, setCreateGroupPopupOpen] = React.useState(false);
	const screens = useBreakpoint();
	const { currentUser } = useDashboardData();
	const { data: groups = [], isLoading, isFetching } = useGroups();

	const isSuperAdmin = currentUser?.role !== undefined && isAtLeastSuperAdmin(currentUser.role);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<AnimatedPage
			className={css`
        height: 100%;
      `}
		>
			{groups.length > 0 ? (
				<Flex
					gap={24}
					vertical={!screens.lg}
					className={css`
            height: 100%;
          `}
				>
					<div
						className={css`
              ${screens.lg && `max-width: ${screens.xl ? 350 : 250}px;`}
              width: 100%;
            `}
					>
						<Spin spinning={isFetching}>
							<Flex align="center" justify="space-between" gap={16} style={{ marginBottom: 24 }}>
								<Typography.Title level={4} style={{ marginBottom: 0 }}>
									{t("select")}:
								</Typography.Title>
								{isSuperAdmin && (
									<Button onClick={() => setCreateGroupPopupOpen(true)} icon={<PlusIcon />}>
										{t("create-group")}
									</Button>
								)}
							</Flex>
							<GroupsList groups={groups} selected={groupId} />
						</Spin>
					</div>
					<div
						className={css`
              flex: 1;
            `}
					>
						{groupId ? (
							<Outlet />
						) : (
							<Empty
								description={t("select-group")}
								className={css`
                  padding: 50px 24px;
                  background: ${colors.lightGrey};
                  border-radius: 8px;
                  height: 100%;
                `}
							/>
						)}
					</div>
				</Flex>
			) : (
				<Empty
					description={t("no-groups-found")}
					style={{ marginTop: 50, maxWidth: 500, marginInline: "auto" }}
				>
					<Space size="large" direction="vertical">
						<Typography.Text type="secondary">{t("groups-description")}</Typography.Text>
						{isSuperAdmin && (
							<Button icon={<PlusIcon />} onClick={() => setCreateGroupPopupOpen(true)}>
								{t("create-group")}
							</Button>
						)}
					</Space>
				</Empty>
			)}
			<CreateGroupPopup
				open={createGroupPopupOpen}
				onClose={() => setCreateGroupPopupOpen(false)}
			/>
		</AnimatedPage>
	);
}
