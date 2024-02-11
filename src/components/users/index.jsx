import {
  App,
  Button,
  Empty,
  Flex,
  Form,
  Input,
  Skeleton,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MembersApi } from "../../services/members/api";
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
import { RolesSelect } from "./roles-select";
import { Role } from "../../util/ContestPeople_Role";

export default function Students() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(-1);
  const [form] = Form.useForm();
  const [formError, setFormError] = useState();

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

  const onAddFormFinish = async (values) => {
    if (!values.username.length) return;

    try {
      const res = await MembersApi.addUserToContest({
        role: values.role,
        username: values.username,
      });
      message.success(t("notification.addStudent"));
      onStudentChange(res);
    } catch (error) {
      message.error(t("notification.errorStudent"));
      setFormError(error?.response?.data?.detail);
    }
  };

  return (
    <StudentsContainer>
      <ContentContainer>
        <Flex
          vertical
          gap={12}
          style={{
            width: "100%",
          }}
        >
          <Flex
            gap={8}
            align="center"
            style={{
              marginBottom: 16,
              padding: "0 24px",
            }}
          >
            <Typography.Text type="secondary">{t("show")}:</Typography.Text>
            <RolesSelect showAll value={role} onChange={setRole} />
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

        <AddParticipantContainer>
          <AddModeratorSpan>{t("addParticipantManually")}</AddModeratorSpan>
          <SearchInputContainer>
            <Form
              form={form}
              style={{ width: "100%" }}
              onFinish={onAddFormFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: t("requiredField") }]}
                validateStatus={formError ? "error" : undefined}
                help={formError}
              >
                <Input placeholder={t("username")} type="text" />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[{ required: true, message: t("requiredField") }]}
                initialValue={Role.MEMBER}
              >
                <RolesSelect />
              </Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusIcon />}>
                {t("add-user")}
              </Button>
            </Form>
          </SearchInputContainer>
        </AddParticipantContainer>
      </ContentContainer>
    </StudentsContainer>
  );
}
