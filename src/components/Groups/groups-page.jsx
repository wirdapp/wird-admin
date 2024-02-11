import { AnimatedPage } from "../../ui/animated-page";
import React from "react";
import { Button, Empty, Flex, Space, Spin, Typography } from "antd";
import { GroupsApi } from "../../services/groups/api";
import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useParams,
  useRevalidator,
} from "react-router-dom";
import Loader from "../Loader";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/24/outline";
import { css } from "@emotion/css";
import { CreateGroupPopup } from "./create-group-popup";
import { GroupsList } from "./groups-list";
import { colors } from "../../styles";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { useDashboardData } from "../../util/routes-data";
import { isAtLeastSuperAdmin } from "../../util/ContestPeople_Role";

export function groupsPageLoader() {
  const groups = GroupsApi.getGroups();

  return defer({
    groups,
    title: "groups",
  });
}

export function Group() {
  const { t } = useTranslation();
  const data = useLoaderData();
  const { groupId } = useParams();
  const [createGroupPopupOpen, setCreateGroupPopupOpen] = React.useState(false);
  const screens = useBreakpoint();
  const revalidator = useRevalidator();
  const { currentUser } = useDashboardData();

  const isSuperAdmin = isAtLeastSuperAdmin(currentUser.role);

  return (
    <AnimatedPage
      className={css`
        height: 100%;
      `}
    >
      <React.Suspense fallback={<Loader />}>
        <Await resolve={data.groups}>
          {(groups) =>
            groups.length > 0 ? (
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
                  <Spin spinning={revalidator.state !== "idle"}>
                    <Flex
                      align="center"
                      justify="space-between"
                      gap={16}
                      style={{ marginBottom: 24 }}
                    >
                      <Typography.Title level={4} style={{ marginBottom: 0 }}>
                        {t("select")}:
                      </Typography.Title>
                      {isSuperAdmin && (
                        <Button
                          onClick={() => setCreateGroupPopupOpen(true)}
                          icon={<PlusIcon />}
                        >
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
                  <Typography.Text type="secondary">
                    {t("groups-description")}
                  </Typography.Text>
                  {isSuperAdmin && (
                    <Button
                      icon={<PlusIcon />}
                      onClick={() => setCreateGroupPopupOpen(true)}
                    >
                      {t("create-group")}
                    </Button>
                  )}
                </Space>
              </Empty>
            )
          }
        </Await>
      </React.Suspense>
      <CreateGroupPopup
        open={createGroupPopupOpen}
        onClose={() => setCreateGroupPopupOpen(false)}
      />
    </AnimatedPage>
  );
}
