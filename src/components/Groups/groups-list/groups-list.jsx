import {Button, Card, Flex, Form, Input, Space} from "antd";
import {css} from "@emotion/css";
import React, {useState} from "react";
import {PlusCircleIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";
import {useGroups} from "../use-groups";
import {GroupsListItem} from "./groups-list-item";

export const GroupsList = ({members})=>{
    const [adding, setAdding] = useState(false);
    const {groups, actions} = useGroups();
    const [form] = Form.useForm();
    const newGroupName = Form.useWatch("label", form);
    const { t } = useTranslation();


    const handleAddGroup = async (values) => {
        setAdding(true);
        try {
            const data = {
                name: values.label
            }
            await actions.add(data);
            form.resetFields();
        } finally {
            setAdding(false);
        }
    };
    return (
        <Flex vertical gap={16}>
            { groups.map((group, index) => (
                <GroupsListItem group={group} members={members} index={index}/>
              ))
            }

            <Card className={css`border-style: dashed;`}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddGroup}
                    requiredMark={false}
                >
                    <Form.Item
                        rules={[{ required: true, message: t("requiredField") }]}
                        label={
                            <Space align="center">
                                <PlusCircleIcon
                                    style={{ display: "block", width: 20, height: 20 }}
                                />
                                {t("add-group")}
                            </Space>
                        }
                        name="label"
                    >
                        <Input placeholder={t("group-name")} />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={adding}
                        icon={<PlusIcon />}
                        size="small"
                        disabled={!newGroupName}
                    >
                        {t("add-group")}
                    </Button>
                </Form>
            </Card>
        </Flex>
    );
}