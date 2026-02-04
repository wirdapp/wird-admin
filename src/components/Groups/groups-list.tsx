import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { Group } from "../../types";

interface GroupsListProps {
  groups: Group[];
  selected?: string;
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups, selected }) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();

  const selectedGroup = groups.find((group) => group.id === selected);

  const navigate = useNavigate();

  const menuProps = {
    items: groups.map((group) => ({
      key: group.id,
      label: group.name,
      onClick: () => navigate(`/dashboard/groups/${group.id}`),
    })),
    selectedKeys: selected ? [selected] : [],
  };

  return (
    <div>
      {screens.lg ? (
        <Menu {...menuProps} style={{ border: "none" }} />
      ) : (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button block style={{ justifyContent: "space-between" }}>
            {selectedGroup?.name ?? t("select-group")}
            <ChevronDownIcon
              style={{ display: "block", width: 20, height: 20 }}
            />
          </Button>
        </Dropdown>
      )}
    </div>
  );
};
