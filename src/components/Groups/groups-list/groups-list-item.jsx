import {css} from "@emotion/css";
import {colors} from "../../../styles";
import {Button, Collapse, Input, message, Popconfirm, Space} from "antd";
import {CheckIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/20/solid";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {AnnouncementsList} from "./announcements-list";
import {GroupMembers} from "./group-members";
import {useGroups} from "../use-groups";

export const GroupsListItem = ({ group, members , index}) => {
    const [expanded, setExpanded] = useState(index === 0);
    const [updating, setUpdating] = useState(false);
    const [messageApi] = message.useMessage();
    const [groupName, setGroupName] = useState(group.name);
    const { actions } = useGroups();
    const { t } = useTranslation();

    const expandIconClassName = (isActive, isRtl) => css`
      transform: rotate(${isActive ? (isRtl ? -90 : 90) : 0}deg);
      width: 16px;
      transition: transform 0.3s ease-in-out;
    `;

    const ExpandIcon = ({ isActive }) => {
        const { i18n } = useTranslation();
        const isRtl = i18n.dir() === "rtl";

        return isRtl ? (
            <ChevronLeftIcon className={expandIconClassName(isActive, isRtl)} />
        ) : (
            <ChevronRightIcon className={expandIconClassName(isActive, isRtl)} />
        );
    };
    const handleGroupUpdate = async (id, body ) => {
        setUpdating(true);
        try {
            await actions.update(id, body);
            messageApi.success(t("group-updated"));
        } catch (e) {
            console.error(e);
            messageApi.error(t("group-update-failed"));
        } finally {
            setUpdating(false);
        }
    };

    const onDelete = async () => {
        try {
            await actions.remove(group.id);
            messageApi.success(t("group-deleted"));
        } catch (e) {
            console.error(e);
            messageApi.error(t("group-delete-failed"));
        }
    };

    const onNameUpdate = () => handleGroupUpdate(group.id, { name: groupName });
    return (
        <Collapse
            activeKey={ expanded ? group.id : undefined }
            onChange={() => setExpanded(!expanded)}
            expandIcon={({ isActive }) => <ExpandIcon isActive={isActive} />}
            collapsible="icon"
            className={css`
                background: ${colors.lightYellow};
                border: 1px solid ${colors.yellow};

                .ant-collapse-header {
                  align-items: center !important;
                }
              `}
            gap={16}
            items={[
                {
                    key: group.id,
                    label: (
                        <Space
                            size="small"
                            className={css`
                              margin-inline-end: 16px;
                            `}
                        >
                            <Input
                                placeholder={t("group-name")}
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                className={css`
                                     max-width: 200px;
                                `}
                            />
                            {groupName !== group.name && (
                                <>
                                    <Button
                                        size="small"
                                        onClick={onNameUpdate}
                                        type="text"
                                        icon={<CheckIcon />}
                                        loading={updating}
                                    />
                                    <Button
                                        size="small"
                                        onClick={() => setGroupName(group.name)}
                                        type="text"
                                        icon={<XMarkIcon />}
                                        disabled={updating}
                                    />
                                </>
                            )}
                        </Space>
                    ),
                    extra: (
                        <Space>
                            <Popconfirm
                                title={t("delete-confirm")}
                                description={t("delete-group-confirm-description")}
                                onConfirm={onDelete}
                                okText={t("yes")}
                                cancelText={t("no")}
                            >
                                <Button
                                    size="small"
                                    type="text"
                                    danger
                                    icon={<TrashIcon />}
                                />
                            </Popconfirm>
                        </Space>
                    ),
                    children:(
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <AnnouncementsList group={group} />
                            <GroupMembers group={group} members={members} />
                        </Space>),
                },
            ]}
        />
    );
}