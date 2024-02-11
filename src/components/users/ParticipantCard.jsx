import { useTranslation } from "react-i18next";
import DropDownMenu from "./DropDown";
import ParticipantCards, {
  BoldText,
  ColumnContainer,
  LightText,
  ParticipantsNumbers,
  ShortedName,
} from "./ParticipantCard.styles";
import { getFullName, getInitials } from "../../util/user-utils";
import { isAtLeastSuperAdmin, isMember } from "../../util/ContestPeople_Role";
import { useDashboardData } from "../../util/routes-data";
import { App, Button, Popconfirm, Space } from "antd";
import { ReactComponent as ResultsIcon } from "assets/icons/results.svg";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MembersApi } from "../../services/members/api";
import { useState } from "react";

const ParticipantCard = ({ student, onChange }) => {
  const { message } = App.useApp();
  const { currentUser } = useDashboardData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const canEdit = isAtLeastSuperAdmin(currentUser.role);

  const removeUserFromContest = async (username) => {
    setDeleting(true);
    try {
      await MembersApi.removeUserFromContest({ username });
      message.success(t("user-removed"));
      onChange?.();
    } catch (error) {
      console.error(error);
      message.error(t("something-went-wrong"));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ParticipantCards data-person-id={student.id}>
      <ParticipantsNumbers>
        <ShortedName>{getInitials(student?.person_info)}</ShortedName>
        <ColumnContainer>
          <BoldText>{student?.person_info.username}</BoldText>
          <LightText>{getFullName(student?.person_info)}</LightText>
          <LightText>
            {t("mainRole")}:{" "}
            <span
              style={{
                color:
                  student?.contest_role == 5 || student?.contest_role == 6
                    ? "red"
                    : "green",
              }}
            >
              {t(`role.${student?.contest_role}`)}{" "}
            </span>{" "}
          </LightText>

          <Space style={{ marginTop: 8 }}>
            {canEdit && <DropDownMenu student={student} onChange={onChange} />}
            {isMember(student.contest_role) && (
              <Button
                size="small"
                icon={<ResultsIcon />}
                onClick={() =>
                  navigate(
                    `/dashboard/results/members?userId=${student?.person_info.username}`,
                  )
                }
              >
                {t("show-results")}
              </Button>
            )}
            {student?.person_info.username !== currentUser.username && (
              <Popconfirm
                title={t("are-you-sure")}
                onConfirm={() =>
                  removeUserFromContest(student?.person_info.username)
                }
              >
                <Button
                  size="small"
                  type="text"
                  danger
                  icon={<XMarkIcon />}
                  loading={deleting}
                >
                  {t("remove")}
                </Button>
              </Popconfirm>
            )}
          </Space>
        </ColumnContainer>
      </ParticipantsNumbers>
    </ParticipantCards>
  );
};

export default ParticipantCard;
