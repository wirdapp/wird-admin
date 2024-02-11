import { Button, Empty, Flex, Skeleton, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MembersApi } from "../../services/members/api";
import ParticipantCard from "./ParticipantCard";
import StudentsContainer, { ContentContainer } from "./Students.styles";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { css } from "@emotion/css";
import { RolesSelect } from "./roles-select";
import { AddUserPopup } from "./add-user-popup";
import { isAtLeastSuperAdmin } from "../../util/ContestPeople_Role";
import { useDashboardData } from "../../util/routes-data";

export default function Students() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(-1);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const { currentUser } = useDashboardData();

  const callMembersData = async (role) => {
    setLoading(true);

    try {
      const data = await MembersApi.getUsers({
        role: role > -1 ? role : undefined,
      });
      setStudents(data);
    } catch (e) {
      console.log("student error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStudents([]);
    callMembersData(role);
  }, [role]);

  const onStudentChange = async (res) => {
    await callMembersData(role);
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
            {isAtLeastSuperAdmin(currentUser.role) && (
              <Button
                type="primary"
                onClick={() => setShowAddUserPopup(role)}
                icon={<PlusIcon />}
              >
                {t("add-user")}
              </Button>
            )}
          </Flex>
          <Flex gap={8} align="center">
            <Typography.Text type="secondary">{t("show")}:</Typography.Text>
            <RolesSelect
              showAll
              value={role}
              onChange={setRole}
              style={{ width: "100%", maxWidth: 300 }}
            />
          </Flex>
          <AnimatePresence mode="wait">
            {students.length === 0 ? (
              <>
                {loading ? (
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
                className={css`
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                  width: 100%;
                `}
              >
                {students?.map?.((student, idx) => {
                  return (
                    <ParticipantCard
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
