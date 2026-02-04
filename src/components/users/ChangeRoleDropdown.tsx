import React from "react";
import { App, Button, Dropdown, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import {
  isAdmin,
  isDeactivated,
  isMember,
  isMemberReadOnly,
  isOwner,
  isPending,
  isSuperAdmin,
  Role,
} from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { useUpdateUserContestRole } from "../../services/members/queries";
import { ContestPerson } from "../../types";

interface ChangeRoleDropdownProps {
  student: ContestPerson;
  onChange?: (result?: ContestPerson) => void;
}

const ChangeRoleDropdown: React.FC<ChangeRoleDropdownProps> = ({ student, onChange }) => {
  const { t, i18n } = useTranslation();
  const { message } = App.useApp();
  const { currentUser } = useDashboardData();
  const updateUserContestRole = useUpdateUserContestRole();

  const studentRole = student?.contest_role;

  const dropDownItems: MenuProps["items"] = [
    isOwner(currentUser!.role!) &&
      !isSuperAdmin(studentRole) && {
        label: t("role.1"),
        key: Role.SUPER_ADMIN,
      },
    !isAdmin(studentRole) && {
      label: t("role.2"),
      key: Role.ADMIN,
    },
    !isMember(studentRole) && {
      label: t("role.3"),
      key: Role.MEMBER,
    },
    !isMemberReadOnly(studentRole) && {
      label: t("role.4"),
      key: Role.READ_ONLY_MEMBER,
    },
    !isPending(studentRole) && {
      label: t("role.5"),
      key: Role.PENDING,
    },
    !isDeactivated(studentRole) && {
      label: t("role.6"),
      key: Role.DEACTIVATED,
    },
  ].filter(Boolean) as MenuProps["items"];

  const updateRole = async (role: string | number): Promise<void> => {
    try {
      const res = await updateUserContestRole.mutateAsync({
        role: Number(role) as Role,
        userId: student.id,
      });
      message.success(t("notification.success"));
      onChange?.(res);
    } catch (error) {
      message.error(t("notification.error"));
    }
  };

  const menuProps: MenuProps = {
    items: dropDownItems,
    onClick: ({ key }) => updateRole(key),
  };

  return !isOwner(student?.contest_role) ? (
    <Dropdown
      menu={menuProps}
      trigger={["click"]}
      placement={i18n.dir() === "rtl" ? "bottomLeft" : "bottomRight"}
    >
      <Button size="small" style={{ flexDirection: "row-reverse" }}>
        {t("change-role-to")}
      </Button>
    </Dropdown>
  ) : null;
};

export default ChangeRoleDropdown;
