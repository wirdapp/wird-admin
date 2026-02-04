import React from "react";
import { useParams } from "react-router-dom";
import { Spin, Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/css";
import { AnimatedPage } from "../../ui/animated-page";
import { AnimatePresence } from "framer-motion";
import { GroupAnnouncement } from "./group-announcement";
import { GroupMembers } from "./group-members";
import { GroupInfo } from "./group-info";
import { colors } from "../../styles";
import { LeaderboardList } from "../leaderboard/leaderboard-list";
import {
  useGroup,
  useGroupMembers,
  useGroupLeaderboard,
} from "../../services/groups/queries";
import Loader from "../Loader";
import type { GroupAnnouncement as GroupAnnouncementType } from "../../types";

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
                <GroupMembers
                  group={group}
                  members={groupMembers ?? []}
                />
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
