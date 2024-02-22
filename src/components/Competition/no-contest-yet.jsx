import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { CreateContestPopup } from "./create-contest-popup";
import { JoinContestPopup } from "./join-contest-popup";
import { useTranslation } from "react-i18next";
import { Button, Result, Space } from "antd";

export const NoContestYet = () => {
  const { t } = useTranslation();
  const [createContestOpen, setCreateContestOpen] = useState(false);
  const [joinContestOpen, setJoinContestOpen] = useState(false);

  return (
    <Result
      status="info"
      subTitle={t("no-contest-yet-msg")}
      extra={
        <Space>
          <Button
            type="primary"
            onClick={() => setCreateContestOpen(true)}
            icon={<PlusCircleIcon />}
          >
            {t("create-contest")}
          </Button>
          <Button onClick={() => setJoinContestOpen(true)}>
            {t("join-contest")}
          </Button>
          <CreateContestPopup
            visible={createContestOpen}
            onClose={() => setCreateContestOpen(false)}
          />
          <JoinContestPopup
            visible={joinContestOpen}
            onClose={() => setJoinContestOpen(false)}
          />
        </Space>
      }
    />
  );
};
