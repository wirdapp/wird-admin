import {Space, Collapse, Select} from "antd";
import React, {useState} from "react";
import {getFullName} from "../../../util/user-utils";
import {useTranslation} from "react-i18next";
import {GroupsApi} from "../../../services/groups/api";
import {Role} from "../../../util/ContestPeople_Role";

export const GroupMembers = ({group, members})=>{
    const [membersListExpanded, setMembersListExpanded] = useState(false);
    const [adminListExpanded, setAdminListExpanded] = useState(false);
    const [groupMembersLoaded, setGroupMembersLoaded] = useState(false);
    const [groupMembers, setGroupMembers] = useState([]);
    const { t } = useTranslation();

    const loadGroupMembers = async ()=>{
        try {
            const data = await GroupsApi.getGroupMembers({groupId: group.id});
            setGroupMembers(data.results);
            setGroupMembersLoaded(true);
        }catch (err){

        }
    }
    const membersListExpandedChange = ()=>{
        setMembersListExpanded(!membersListExpanded);
        if(!groupMembersLoaded){
            loadGroupMembers();

        }
    }

    const adminListExpandedChange = ()=> {
        setAdminListExpanded(!adminListExpanded);
        if(!groupMembersLoaded){
            loadGroupMembers();

        }
    }

    const groupMembersUsernames = (role)=>{
        return groupMembers.filter(groupMember => groupMember.group_role === role).map((groupMember) => groupMember.username);
    }
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Collapse
                activeKey={membersListExpanded  ? group.id + "members" : undefined}
                onChange={membersListExpandedChange}
                collapsible="icon"
                items={[
                    {
                        key: group.id + "members" ,
                        label: <h4>{t("participantsKey")}</h4>,
                        children: (
                            <Select
                                mode="multiple"
                                placeholder={t("selectMember")}
                                style={{ width: "100%" }}

                            >
                                {
                                    members.filter(member =>  Role.MEMBER === member.contest_role  && !groupMembersUsernames(2).includes(member.person_info.username))
                                    .map((member, index )=>{
                                        const user = {
                                            firstName: member.person_info.first_name,
                                            lastName: member.person_info.last_name,
                                            username: member.person_info.username,
                                            relationId: member.id,
                                            id: member.contest_person
                                        }
                                        return <Select.Option key={index} value={user.username} >{getFullName(user)}</Select.Option>
                                    } )
                                }
                            </Select>

                        )
                    }
                ]}
            />
            <Collapse
                activeKey={adminListExpanded  ? group.id + "admins" : undefined}
                onChange={adminListExpandedChange}
                collapsible="icon"
                items={[
                    {
                        key: group.id + "admins" ,
                        label: <h4>{t("admins")}</h4>,
                        children: (
                            <Select
                                mode="multiple"
                                placeholder={t("chooseAdmin")}
                                style={{ width: "100%" }}

                            >
                                {
                                    members.filter(member =>  [Role.SUPER_ADMIN, Role.ADMIN].includes(member.contest_role) &&
                                                !groupMembersUsernames(1).includes(member.person_info.username))
                                        .map((member, index )=>{
                                            const user = {
                                                firstName: member.person_info.first_name,
                                                lastName: member.person_info.last_name,
                                                username: member.person_info.username,
                                                relationId: member.id,
                                                id: member.contest_person
                                            }
                                            return <Select.Option key={index} value={user.username} >{getFullName(user)}</Select.Option>
                                        } )
                                }
                            </Select>

                        )
                    }
                ]}
            />
        </Space>
    )
}