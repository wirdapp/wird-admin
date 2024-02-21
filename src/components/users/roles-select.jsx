import React, { useMemo } from "react";
import { Role } from "../../util/ContestPeople_Role";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

export const RolesSelect = ({
  value,
  onChange,
  showAll,
  style,
  minRole = -1,
}) => {
  const { t } = useTranslation();

  const options = useMemo(() => {
    const ops = [];
    if (showAll) {
      ops.push({ label: t("all"), value: -1 });
    }
    Object.values(Role).forEach((value) => {
      if (value > minRole) {
        ops.push({ label: t(`role.${value}`), value });
      }
    });
    return ops;
  }, [minRole, showAll, t]);

  return (
    <Select value={value} onChange={onChange} style={style} options={options} />
  );
};
