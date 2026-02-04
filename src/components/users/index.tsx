import React, { useMemo, useState } from "react";
import { Button, Empty, Flex, Input, Skeleton, Typography } from "antd";
import { useTranslation } from "react-i18next";
import UserListItem from "./user-list-item";
import StudentsContainer, { ContentContainer } from "./Students.styles";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { css } from "@emotion/css";
import { RolesSelect } from "./roles-select";
import { AddUserPopup } from "./add-user-popup";
import { isAtLeastSuperAdmin, Role } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { debounce } from "../../util/utils";
import { useMembers } from "../../services/members/queries";
import { ContestPerson } from "../../types";

interface StudentChangeResult {
  id?: string;
}

export default function Students(): React.ReactElement {
  const { t } = useTranslation();
  const [role, setRole] = useState<Role | number>(-1);
  const [showAddUserPopup, setShowAddUserPopup] = useState<boolean>(false);
  const { currentUser } = useDashboardData();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const { data, isLoading, refetch } = useMembers({
    role: role > -1 ? (role as Role) : undefined,
    search: debouncedSearch,
  });
  const students = data?.results ?? [];

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 500),
    [],
  );

  const onStudentChange = async (res?: StudentChangeResult | ContestPerson): Promise<void> => {
    await refetch();
    setTimeout(() => {
      if (res?.id) {
        const studentElement = document.querySelector(
          `[data-person-id="${res.id}"]`,
        );
        if (studentElement) {
          studentElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 5);
  };

  return (
    <StudentsContainer>
      <ContentContainer>
        <Flex
          vertical
          gap={20}
          style={{
            width: "100%",
          }}
        >
          <Flex justify="space-between" align="center">
            <Typography.Title level={3}>{t("participants")}</Typography.Title>
            {isAtLeastSuperAdmin(currentUser!.role!) && (
              <Button
                type="primary"
                onClick={() => setShowAddUserPopup(true)}
                icon={<PlusIcon />}
              >
                {t("add-user")}
              </Button>
            )}
          </Flex>
          <Flex gap={16} align="center">
            <Typography.Text type="secondary">{t("show")}:</Typography.Text>
            <RolesSelect
              showAll
              value={role}
              onChange={setRole}
              style={{ width: "100%", maxWidth: 300 }}
            />
            <span>
              {(!isLoading &&
                students.length &&
                `${t("showing")} ${students.length}`) ||
                ""}
            </span>
          </Flex>
          <Input.Search
            onSearch={(value: string) => setDebouncedSearch(value)}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setSearch(value);
              debouncedSetSearch(value);
            }}
            placeholder={t("search")}
          />
          <AnimatePresence mode="wait">
            {students.length === 0 ? (
              <>
                {isLoading ? (
                  <Skeleton active />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={t("dailySubmissionsPopup.noData")}
                    style={{ width: "100%" }}
                  />
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  width: "100%",
                }}
              >
                {students?.map?.((student: ContestPerson, idx: number) => {
                  return (
                    <UserListItem
                      key={idx}
                      student={student}
                      onChange={onStudentChange}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
      </ContentContainer>
      <AddUserPopup
        open={showAddUserPopup}
        onClose={() => setShowAddUserPopup(false)}
        onAdded={onStudentChange}
      />
    </StudentsContainer>
  );
}
