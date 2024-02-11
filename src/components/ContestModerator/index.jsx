import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ContestModeratorDefault, {
  AddModeratorSpan,
  ContentContainer,
  SearchInputContainer,
} from "./ContestModerator.styles";

import ModeratorCard from "./ModeratorCard";
// import {retrieveContestInfo} from "../../services/competitionsServices";
import { useDashboardData } from "../../util/routes-data";
import { MembersApi } from "../../services/members/api";
import { AddParticipantContainer } from "../users/Students.styles";
import { App, Button, Empty, Flex, Form, Input, Skeleton, Tooltip } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { css } from "@emotion/css";
import { AnimatePresence, motion } from "framer-motion";

const ContestModerator = () => {
  const { currentUser, currentContest } = useDashboardData();
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [formError, setFormError] = useState();

  const fetchAdmins = async (search) => {
    setLoading(true);
    try {
      const data = await MembersApi.getAdmins({ search });
      setAdmins(data);
    } catch (err) {
      console.log("Failing", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!currentContest) return;
    fetchAdmins();
  }, []);

  const onAddFormFinish = async (values) => {
    if (values.username.length === 0) {
      return;
    }
    setFormError(undefined);
    try {
      await MembersApi.addAdminToContest({ username: values.username });
      message.success(t("notification.addModerator"));
      await fetchAdmins();
    } catch (err) {
      setFormError(err.response?.data?.detail);
      console.error(err);
      message.error(t("notification.errorModerator"));
    }
  };

  return (
    <ContestModeratorDefault>
      <ContentContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            {admins.length === 0 ? (
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
                {admins.map((person, idx) => {
                  return (
                    <ModeratorCard
                      key={idx}
                      person={person.person_info}
                      onChange={fetchAdmins}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AddParticipantContainer>
          <AddModeratorSpan>{t("add-moderator-manually")}</AddModeratorSpan>
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
    </ContestModeratorDefault>
  );
};

export default ContestModerator;
