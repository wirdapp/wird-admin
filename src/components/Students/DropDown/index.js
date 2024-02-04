import { MembersApi } from "services/members/api";

import { App, Button, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  isDeactivated,
  isOwner,
  isPending,
  Role,
} from "util/ContestPeople_Role";
import { ReactComponent as ResultsIcon } from "../../../assets/icons/results.svg";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { colors } from "../../../styles";

const DropDownMenu = ({ student, onChange }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { message } = App.useApp();

  const dropDownItems = {
    approve: {
      label: t("approve"),
      key: "approve",
      icon: (
        <CheckIcon
          style={{ width: "20px", height: "20px", color: colors.orange }}
        />
      ),
    },
    reject: {
      label: t("reject"),
      key: "reject",
      icon: (
        <XMarkIcon
          style={{ width: "20px", height: "20px", color: colors.orange }}
        />
      ),
    },

    showResult: {
      label: t("result"),
      key: "result",
      icon: <ResultsIcon style={{ width: "20px", height: "20px" }} />,
    },
  };

  const items = [
    dropDownItems.showResult,
    !isDeactivated(student?.contest_role) &&
      !isPending(student?.contest_role) &&
      dropDownItems.reject,
    (isPending(student?.contest_role) ||
      isDeactivated(student?.contest_role)) &&
      dropDownItems.approve,
  ].filter(Boolean);

  const approveOrReject = async (pressData) => {
    let role = pressData.key === "approve" ? Role.MEMBER : Role.DEACTIVATED;
    try {
      const res = await MembersApi.approveOrRejectUserToContest({
        role,
        username: student.person_info.username,
      });
      message.success(t("notification.success"));
      onChange?.(res);
    } catch (error) {
      message.error(t("notification.error"));
    }
  };
  const checkButton = (pressData) => {
    if (pressData.key === "result") {
      navigate(`/dashboard/results/members?userId=${student.id}`);
    } else {
      approveOrReject(pressData);
    }
  };
  const menuProps = {
    items,
    onClick: checkButton,
  };

  return !isOwner(student?.contest_role) ? (
    <Dropdown
      menu={menuProps}
      trigger={["click"]}
      placement={i18n.dir() === "rtl" ? "bottomLeft" : "bottomRight"}
    >
      <Button type="text" icon={<EllipsisVerticalIcon />} size="small" />
    </Dropdown>
  ) : null;
};

export default DropDownMenu;
