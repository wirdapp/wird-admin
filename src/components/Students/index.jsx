import {
  App,
  Button,
  Empty,
  Flex,
  Form,
  Input,
  Segmented,
  Skeleton,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MembersApi } from "../../services/members/api";
import { Role } from "../../util/ContestPeople_Role";
import ParticipantCard from "./ParticipantCard";
import StudentsContainer, {
  AddModeratorSpan,
  AddParticipantContainer,
  ContentContainer,
  SearchInputContainer,
} from "./Students.styles";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { css } from "@emotion/css";

export default function Students() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(Role.MEMBER);
  const [formError, setFormError] = useState();

  const callMembersData = (role) => {
    setLoading(true);

    MembersApi.getUsers({ role })
      .then((data) => setStudents(data))
      .catch((e) => console.log("student error", e))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setStudents([]);
    callMembersData(role);
  }, [role]);

  const onStudentChange = () => {
    callMembersData(role);
  };

  const onAddFormFinish = async (values) => {
    if (!values.username.length) return;

    try {
      const res = await MembersApi.addUserToContest({
        role: 3,
        username: values.username,
      });
      message.success(t("notification.addStudent"));
      onStudentChange();
    } catch (error) {
      message.error(t("notification.errorStudent"));
      setFormError(error?.response?.data?.detail);
    }
  };

  return (
    <StudentsContainer>
      <ContentContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
            alignItems: "start",
          }}
        >
          <Segmented
            value={role}
            onChange={setRole}
            style={{
              marginBottom: 16,
            }}
            options={[
              { label: t("role.3"), value: Role.MEMBER },
              { label: t("role.5"), value: Role.PENDING },
              { label: t("role.6"), value: Role.DEACTIVATED },
            ]}
          />
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
        </div>

        <AddParticipantContainer>
          <AddModeratorSpan>{t("addParticipantManually")}</AddModeratorSpan>
          <SearchInputContainer>
            <Form style={{ width: "100%" }} onFinish={onAddFormFinish}>
              <Flex align="start" gap={9}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: t("requiredField") }]}
                  style={{ marginBottom: 0, flex: 1 }}
                  validateStatus={formError ? "error" : undefined}
                  help={formError}
                >
                  <Input placeholder={t("username")} type="text" />
                </Form.Item>
                <Tooltip title={t("add-admin")}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusIcon />}
                  />
                </Tooltip>
              </Flex>
            </Form>
          </SearchInputContainer>
        </AddParticipantContainer>
      </ContentContainer>
    </StudentsContainer>
  );
}
