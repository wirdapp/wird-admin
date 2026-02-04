import { css } from "@emotion/css";
import { Spin, Tabs, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGroup, useGroupLeaderboard, useGroupMembers } from "../../services/groups/queries";
import { colors } from "../../styles";
import type { GroupAnnouncement as GroupAnnouncementType } from "../../types";
import { AnimatedPage } from "../../ui/animated-page";
import Loader from "../Loader";
import { LeaderboardList } from "../leaderboard/leaderboard-list";
import { GroupAnnouncement } from "./group-announcement";
import { GroupInfo } from "./group-info";
import { GroupMembers } from "./group-members";

export const GroupDetailPage: React.FC = () => {
	const { t } = useTranslation();
	const { groupId } = useParams<{ groupId: string }>();

	const { data: group, isLoading: groupLoading } = useGroup(groupId);
	const { data: groupMembers, isLoading: membersLoading } = useGroupMembers(groupId);
	const { data: groupLeaderboard, isLoading: leaderboardLoading } = useGroupLeaderboard(groupId);

	if (groupLoading) {
		return <Loader />;
	}

	if (!group) {
		return null;
	}

	const groupWithAnnouncements = {
		...group,
		announcements: (group.announcements as GroupAnnouncementType[]) || [],
	};

	return (
		<AnimatePresence mode="wait">
			<AnimatedPage
				key={groupId}
				className={css`
          height: 100%;
          background-color: ${colors.lightGrey};
          padding: 24px;
          border-radius: 8px;
        `}
			>
				<Typography.Title level={3}>{group.name}</Typography.Title>
				<Tabs
					defaultActiveKey="announcements"
					items={[
						{
							key: "announcements",
							label: t("announcements"),
							children: <GroupAnnouncement group={groupWithAnnouncements} />,
						},
						{
							key: "leaderboard",
							label: t("leaders-board"),
							children: leaderboardLoading ? (
								<Spin />
							) : (
								<LeaderboardList topStudents={groupLeaderboard ?? []} />
							),
						},
						{
							key: "members",
							label: t("members"),
							children: membersLoading ? (
								<Spin />
							) : (
								<GroupMembers group={group} members={groupMembers ?? []} />
							),
						},
						{
							key: "info",
							label: t("group-info"),
							children: <GroupInfo group={group} />,
						},
					]}
				/>
			</AnimatedPage>
		</AnimatePresence>
	);
};
