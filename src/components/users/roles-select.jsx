import React from "react";
import { Role } from "../../util/ContestPeople_Role";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

export const RolesSelect = ({ value, onChange, showAll, style }) => {
  const { t } = useTranslation();

  return (
    <Select
      value={value}
      onChange={onChange}
      style={style}
      options={[
        showAll && { label: t("all"), value: -1 },
        { label: t("role.0"), value: Role.CONTEST_OWNER },
        { label: t("role.1"), value: Role.SUPER_ADMIN },
        { label: t("role.2"), value: Role.ADMIN },
        { label: t("role.3"), value: Role.MEMBER },
        { label: t("role.5"), value: Role.PENDING },
        { label: t("role.6"), value: Role.DEACTIVATED },
      ].filter(Boolean)}
    />
  );
};
