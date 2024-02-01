import { MembersApi } from "services/members/api";

import { App, Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  isAdmin,
  isDecativate,
  isMember,
  isMemberReadOnly,
  isOwner,
  isPending,
  isSuperAdmin,
  Role,
} from "util/ContestPeople_Role";
import { ReactComponent as ApproveIcon } from "../../../assets/icons/approve.svg";
import { ReactComponent as MoreButton } from "../../../assets/icons/more-button.svg";
import { ReactComponent as RejectIcon } from "../../../assets/icons/reject.svg";
import { ReactComponent as ResultsIcon } from "../../../assets/icons/results.svg";

const DropDownMenu = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { message } = App.useApp();

  const dropDownItems = {
    approve: {
      label: t("approve"),
      key: "approve",
      icon: <ApproveIcon style={{ width: "20px", height: "20px" }} />,
    },
    reject: {
      label: t("reject"),
      key: "reject",
      icon: <RejectIcon style={{ width: "20px", height: "20px" }} />,
    },

    showResult: {
      label: t("result"),
      key: "result",
      icon: <ResultsIcon style={{ width: "20px", height: "20px" }} />,
    },
  };

  const otherRoles =
    isSuperAdmin(props.student?.contest_role) ||
    isAdmin(props.student?.contest_role) ||
    isMember(props.student?.contest_role) ||
    isMemberReadOnly(props.student?.contest_role);

  const items = [
    otherRoles && dropDownItems.showResult,
    otherRoles && dropDownItems.reject,
    isPending(props.student?.contest_role) && dropDownItems.approve,
    isPending(props.student?.contest_role) && dropDownItems.reject,
    isDecativate(props.student?.contest_role) && dropDownItems.approve,
  ];

  const approveOrReject = async (pressData) => {
    let role = pressData.key === "approve" ? Role.MEMBER : Role.DEACTIVATED;
    try {
      const res = await MembersApi.approveOrRejectUserToContest({
        role,
        username: props.name,
      });
      message.success(t("notification.success"));
      let studentsFiltered = props.students.filter(
        (item) => item.person_info.username !== props.name && item,
      );

      props.setStudents(studentsFiltered);
    } catch (error) {
      message.error(t("notification.error"));
    }
  };
  const checkButton = (pressData) => {
    if (pressData.key === "result") {
      navigate(`/dashboard/results/overview`);
    } else {
      approveOrReject(pressData);
    }
  };
  const menuProps = {
    items,
    onClick: checkButton,
  };

  return !isOwner(props.student?.contest_role) ? (
    <Dropdown menu={menuProps}>
      <Space>
        <MoreButton className="more-button" onClick={() => {}} />
      </Space>
    </Dropdown>
  ) : null;
};

export default DropDownMenu;
