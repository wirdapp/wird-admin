import React from "react";
import { useTranslation } from "react-i18next";
import ChangeRoleDropdown from "./ChangeRoleDropdown";
import ParticipantCards, {
  BoldText,
  ColumnContainer,
  LightText,
  ParticipantsNumbers,
  StyledParticipantInfo,
} from "./ParticipantCard.styles";
import { getFullName, getInitials } from "../../util/user-utils";
import {
  isAtLeastSuperAdmin,
  isMember,
  isOwner,
  Role,
} from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { App, Avatar, Badge, Button, Popconfirm, Space } from "antd";
import { ReactComponent as ResultsIcon } from "assets/icons/results.svg";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRemoveUserFromContest } from "../../services/members/queries";
import { ContestPerson } from "../../types";

interface UserListItemProps {
  student: ContestPerson;
  onChange?: (result?: ContestPerson) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ student, onChange }) => {
  const { message } = App.useApp();
  const { currentUser } = useDashboardData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const removeUserFromContestMutation = useRemoveUserFromContest();

  const canEdit =
    student.contest_role > currentUser!.role! &&
    isAtLeastSuperAdmin(currentUser!.role!);

  const removeUserFromContest = async (userId: string): Promise<void> => {
    try {
      await removeUserFromContestMutation.mutateAsync(userId);
      message.success(t("user-removed"));
      onChange?.();
    } catch (error) {
      console.error(error);
      message.error(t("something-went-wrong"));
    }
  };

  return (
    <ParticipantCards data-person-id={student.id}>
      <ParticipantsNumbers>
        <Avatar
          style={{ background: "#FDD561", color: "black" }}
        >
          {getInitials(student?.person_info)}
        </Avatar>
        <StyledParticipantInfo>
          <ColumnContainer>
            <BoldText>{getFullName(student?.person_info)}</BoldText>
            <Space wrap>
              <LightText>{student?.person_info?.username}</LightText>
              <LightText>
                <Badge
                  count={t(`role.${student?.contest_role}`)}
                  color={
                    student?.contest_role === Role.DEACTIVATED
                      ? "red"
                      : student?.contest_role === Role.PENDING
                        ? "orange"
                        : "green"
                  }
                />
              </LightText>
            </Space>
          </ColumnContainer>

          <Space style={{ marginTop: 8 }}>
            {canEdit && (
              <ChangeRoleDropdown student={student} onChange={onChange} />
            )}
            {isMember(student.contest_role) && (
              <Button
                size="small"
                icon={<ResultsIcon />}
                onClick={() =>
                  navigate(`/dashboard/results/members?userId=${student?.id}`)
                }
              >
                {t("show-results")}
              </Button>
            )}
            {canEdit &&
              student?.person_info?.username !== currentUser?.username &&
              !isOwner(student.contest_role) && (
                <Popconfirm
                  title={t("are-you-sure")}
                  onConfirm={() => removeUserFromContest(student?.id)}
                >
                  <Button
                    size="small"
                    type="text"
                    danger
                    icon={<XMarkIcon />}
                    loading={removeUserFromContestMutation.isPending}
                  >
                    {t("remove")}
                  </Button>
                </Popconfirm>
              )}
          </Space>
        </StyledParticipantInfo>
      </ParticipantsNumbers>
    </ParticipantCards>
  );
};

export default UserListItem;
