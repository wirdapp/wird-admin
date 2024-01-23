import { useDashboardData } from "../../../util/routes-data";
import {
  ArrowsRightLeftIcon,
  PlusCircleIcon,
  Squares2X2Icon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import styled from "@emotion/styled";
import { colors } from "../../../styles";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CreateContestPopup } from "../../Competition/create-contest-popup";
import { JoinContestPopup } from "../../Competition/join-contest-popup";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  changeCurrentContest,
  getInviteLink,
} from "../../../services/contests/utils";
import { Button, Menu, Popover, Space, Typography } from "antd";
import { css } from "@emotion/css";

const StyledContestName = styled.span`
  @media (max-width: 500px) {
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledCurrentContestWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
  margin: 2px 4px;
  background-color: ${colors.lightGrey};
  border-radius: 10px;

  .contest-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background-color: ${colors.lightRed};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 24px;
      height: 24px;
      color: ${colors.black};
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
  }

  .contest-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    width: 100%;

    button {
      font-size: 12px;

      svg {
        width: 14px;
      }
    }
  }

  .invite-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${colors.darkGrey};
    padding: 8px;
    background-color: ${colors.white};
    border-radius: 4px;
    width: 100%;
  }
`;

export const ContestInfoMenu = () => {
  const { currentContest, contests } = useDashboardData();
  const [createContestOpen, setCreateContestOpen] = useState(false);
  const [joinContestOpen, setJoinContestOpen] = useState(false);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const otherContests = contests.filter(
    (contest) => contest.id !== currentContest?.id,
  );

  const switchContest = async (contest) => {
    try {
      await changeCurrentContest(contest.id);
      window.location.reload();
    } catch (err) {
      console.error(err);
      console.log(`Failed to switch contest: ${err}`);
    }
  };

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={["click"]}
        overlayClassName={css`
          width: 290px;
        `}
        content={
          <>
            {currentContest && (
              <StyledCurrentContestWrapper>
                <div className="contest-details">
                  <Typography.Title level={5}>
                    {currentContest?.name}
                  </Typography.Title>
                  <Space>
                    {t("join-code")}:
                    <Typography.Text code copyable>
                      {currentContest?.contest_id}
                    </Typography.Text>
                  </Space>
                  <Typography.Text
                    copyable={{
                      text: getInviteLink(currentContest.contest_id),
                    }}
                  >
                    {t("copy-link")}:
                  </Typography.Text>
                </div>
              </StyledCurrentContestWrapper>
            )}
            <Menu
              selectable={false}
              mode="inline"
              inlineIndent={12}
              className={css`
                border: none !important;

                .ant-menu-item,
                .ant-menu-submenu-title {
                  height: auto !important;
                  line-height: 1.5 !important;
                  padding: 9px 12px;
                }

                svg {
                  width: 20px;
                  height: 20px;
                  color: ${colors.orange} !important;
                }
              `}
              items={[
                otherContests.length > 0
                  ? {
                      label: t("switch-contest"),
                      icon: <ArrowsRightLeftIcon />,
                      children: otherContests?.map?.((contest) => ({
                        key: contest?.id,
                        label: contest?.name,
                        onClick: () => switchContest(contest),
                      })),
                    }
                  : null,
                {
                  label: t("create-contest"),
                  icon: <PlusCircleIcon />,
                  onClick: () => {
                    setOpen(false);
                    setCreateContestOpen(true);
                  },
                },
                {
                  label: t("join-contest"),
                  icon: <UserPlusIcon />,
                  onClick: () => {
                    setOpen(false);
                    setJoinContestOpen(true);
                  },
                },
              ].filter(Boolean)}
            />
          </>
        }
      >
        <Button shape="round">
          <Space size={8} align="center">
            {currentContest ? (
              <>
                <Squares2X2Icon style={{ width: 16, display: "block" }} />
                <StyledContestName>{currentContest?.name}</StyledContestName>
              </>
            ) : (
              t("no-contest-yet")
            )}
            <ChevronDownIcon style={{ width: 16, display: "block" }} />
          </Space>
        </Button>
      </Popover>
      <CreateContestPopup
        visible={createContestOpen}
        onClose={() => setCreateContestOpen(false)}
      />
      <JoinContestPopup
        visible={joinContestOpen}
        onClose={() => setJoinContestOpen(false)}
      />
    </>
  );
};
