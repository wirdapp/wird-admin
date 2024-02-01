import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { MembersApi } from "../../../services/members/api";
import { getFullName } from "../../../util/user-utils";

export const MembersSelect = ({ role, valueField = "id", ...props }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    MembersApi.getUsers({ role })
      .then((res) => {
        setMembers(
          res.map((member) => ({
            value:
              typeof valueField === "function"
                ? valueField(member)
                : member[valueField || "id"],
            label: getFullName(member.person_info),
          })),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Select
      {...props}
      loading={loading}
      options={members}
      showSearch
      optionFilterProp="label"
    />
  );
};
