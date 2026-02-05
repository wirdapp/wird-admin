import { AnimatePresence } from "motion/react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGroup, useGroupLeaderboard, useGroupMembers } from "../../services/groups/queries";
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
			<AnimatedPage key={groupId} className="h-full bg-wheat-warm p-6 rounded-e-lg">
				<h3 className="text-xl font-semibold mb-4">{group.name}</h3>
				<Tabs defaultValue="announcements">
					<TabsList className="mb-4">
						<TabsTrigger value="announcements">{t("announcements")}</TabsTrigger>
						<TabsTrigger value="leaderboard">{t("leaders-board")}</TabsTrigger>
						<TabsTrigger value="members">{t("members")}</TabsTrigger>
						<TabsTrigger value="info">{t("group-info")}</TabsTrigger>
					</TabsList>
					<TabsContent value="announcements">
						<GroupAnnouncement group={groupWithAnnouncements} />
					</TabsContent>
					<TabsContent value="leaderboard">
						{leaderboardLoading ? (
							<div className="flex justify-center py-8">
								<Spinner />
							</div>
						) : (
							<LeaderboardList topStudents={groupLeaderboard ?? []} />
						)}
					</TabsContent>
					<TabsContent value="members">
						{membersLoading ? (
							<div className="flex justify-center py-8">
								<Spinner />
							</div>
						) : (
							<GroupMembers group={group} members={groupMembers ?? []} />
						)}
					</TabsContent>
					<TabsContent value="info">
						<GroupInfo group={group} />
					</TabsContent>
				</Tabs>
			</AnimatedPage>
		</AnimatePresence>
	);
};
