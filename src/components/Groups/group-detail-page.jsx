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

export async function groupDetailPageLoader({ params }) {
  const group = GroupsApi.getGroup({ id: params.groupId });
  const groupMembers = GroupsApi.getGroupMembers({ groupId: params.groupId });

  return defer({
    group,
    groupMembers,
    title: "groups",
  });
}

export const GroupDetailPage = () => {
  const { group, groupMembers } = useLoaderData();
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
        <React.Suspense>
          <Await resolve={group}>
            {(group) => (
              <>
                <Typography.Title level={3}>{group.name}</Typography.Title>
                <Tabs
                  defaultActiveKey="info"
                  items={[
                    {
                      key: "info",
                      label: t("group-info"),
                      children: <GroupInfo group={group} />,
                    },
                    {
                      key: "announcements",
                      label: t("announcements"),
                      children: <GroupAnnouncement group={group} />,
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
                  ]}
                />
              </>
            )}
          </Await>
        </React.Suspense>
      </AnimatedPage>
    </AnimatePresence>
  );
};
