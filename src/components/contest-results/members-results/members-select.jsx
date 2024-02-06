import React, {useEffect, useMemo, useState} from "react";
import {Select} from "antd";
import {MembersApi} from "../../../services/members/api";
import {getFullName} from "../../../util/user-utils";

/**
 *
 * @param role
 * @param valueField
 * @param excludeUsernames
 * @param {import('antd').SelectProps} props
 * @returns {Element}
 * @constructor
 */
export const MembersSelect = ({
  role,
  valueField = "id",
  excludeUsernames,
  ...props
}) => {
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
            username: member.person_info.username,
          })),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredMembers = useMemo(
    () =>
      members.filter((member) => !excludeUsernames?.includes(member.username)),
    [members, excludeUsernames],
  );

  return (
    <Select
      {...props}
      loading={loading}
      options={filteredMembers}
      showSearch
      optionFilterProp="label"
    />
  );
};
