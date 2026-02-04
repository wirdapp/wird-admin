import React, { useMemo, CSSProperties } from "react";
import { Role } from "../../util/roles";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

interface RolesSelectProps {
  value?: Role | number;
  onChange?: (value: Role | number) => void;
  showAll?: boolean;
  style?: CSSProperties;
  minRole?: number;
}

interface RoleOption {
  label: string;
  value: Role | number;
}

export const RolesSelect: React.FC<RolesSelectProps> = ({
  value,
  onChange,
  showAll,
  style,
  minRole = -1,
}) => {
  const { t } = useTranslation();

  const options = useMemo<RoleOption[]>(() => {
    const ops: RoleOption[] = [];
    if (showAll) {
      ops.push({ label: t("all"), value: -1 });
    }
    Object.values(Role).forEach((roleValue) => {
      if (typeof roleValue === "number" && roleValue > minRole) {
        ops.push({ label: t(`role.${roleValue}`), value: roleValue });
      }
    });
    return ops;
  }, [minRole, showAll, t]);

  return (
    <Select value={value} onChange={onChange} style={style} options={options} />
  );
};
