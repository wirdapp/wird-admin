import React from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import { GroupsApi } from "../../services/groups/api";
import { Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/css";
import { AnimatedPage } from "../../ui/animated-page";
import { AnimatePresence } from "framer-motion";
import { GroupAnnouncement } from "./group-announcement";
import { GroupMembers } from "./group-members";
import { GroupInfo } from "./group-info";
import { colors } from "../../styles";
import { isAxiosError } from "axios";
import { LeaderboardList } from "../leaderboard/leaderboard-list";

export async function groupDetailPageLoader({ params }) {
  try {
    const group = await GroupsApi.getGroup({ id: params.groupId });
    group.announcements = Array.isArray(group.announcements)
      ? group.announcements
      : [];

    const groupMembers = GroupsApi.getGroupMembers({ groupId: params.groupId });
    const groupLeaderboard = GroupsApi.leaderboard({ groupId: params.groupId });

    return defer({
      group,
      groupMembers,
      groupLeaderboard,
      title: "groups",
    });
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Response(e.response.data, { status: e.response.status });
    }
    throw e;
  }
}

export const GroupDetailPage = () => {
  const { group, groupMembers, groupLeaderboard } = useLoaderData();
  const { t } = useTranslation();
  const { groupId } = useParams();

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
              children: <GroupAnnouncement group={group} />,
            },
            {
              key: "leaderboard",
              label: t("leaders-board"),
              children: (
                <Await resolve={groupLeaderboard}>
                  {(groupLeaderboard) => (
                    <LeaderboardList topStudents={groupLeaderboard ?? []} />
                  )}
                </Await>
              ),
            },
            {
              key: "members",
              label: t("members"),
              children: (
                <Await resolve={groupMembers}>
                  {(groupMembers) => (
                    <GroupMembers
                      group={group}
                      members={groupMembers?.results ?? []}
                    />
                  )}
                </Await>
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
