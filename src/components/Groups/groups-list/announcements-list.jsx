import {Button, Collapse, Form, Input, message, Modal} from "antd";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {TrashIcon} from "@heroicons/react/20/solid";
import {StyledAnnouncementsList} from "../../Competition/manage-announcements";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useGroups} from "../use-groups";

export const AnnouncementsList = ({group})=>{
    const [announcements, setAnnouncements] = useState([]);
    const { actions } = useGroups();
    const [errors, setErrors] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [announcementFormVisible, setAnnouncementFormVisible] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();
    const { t } = useTranslation();


    const handleAnnouncementDelete = async (index) => {
        try {
            const newAnnouncements = announcements.filter((val, i) => index !== i)
            await actions.update(group.id,{id: group.id, announcements: newAnnouncements})
            setAnnouncements(newAnnouncements);
        } catch (err) {
            console.log(err);
            message.error(t("something-went-wrong"));
        }
    }

   const onFormFinish = async (values)=> {

        try {
            setSubmitting(true);
            const newAnnouncements = [...announcements, values.announcement.trim()];
            await actions.update(group.id, {id: group.id, announcements: newAnnouncements});
            setAnnouncements(newAnnouncements);
            setAnnouncementFormVisible(false);
            form.resetFields();
        }catch (err){
            console.log(err);
            const errorsList = [];
            Object.values(err.response?.data ?? {}).forEach((errMsg) => {
                errorsList.push(errMsg);
            });
            if (errorsList.length > 0) {
                setErrors(errorsList);
            } else {
                setErrors([t("something-went-wrong")]);
            }
            message.error(
                errorsList.map((err) => (
                    <React.Fragment key={err}>
                        {err}
                        <br />
                    </React.Fragment>
                )),
            );
        }finally {
            setSubmitting(false);
        }
    }

    return(
        <Collapse
            activeKey={expanded ? group.id + "announcements" : undefined}
            onChange={() => setExpanded(!expanded)}
            collapsible="icon"
            items={[
                {
                    key: group.id + "announcements",
                    label: <h4>{t("announcements")}</h4>,
                    children: (
                        <StyledAnnouncementsList>
                            {group.announcements.map((announcement, index) => (
                                <li key={index}>
                                    {announcement}
                                    <Button
                                        type="text"
                                        danger
                                        size="small"
                                        onClick={() => handleAnnouncementDelete(index)}
                                    >
                                        <TrashIcon />
                                    </Button>
                                </li>
                            ))}
                            <Button
                                size="small"
                                icon={<PlusIcon />}
                                type="dashed"
                                onClick={() => { setAnnouncementFormVisible(true);}}
                            >
                                {t("make-an-announcement")}
                            </Button>
                            <Modal
                                title={t("make-an-announcement")}
                                open={announcementFormVisible}
                                onCancel={() => setAnnouncementFormVisible(false)}
                                onOk={() => form.submit()}
                                okText={t("add")}
                                cancelText={t("cancel")}
                                okButtonProps={{
                                    loading: submitting,
                                }}
                            >
                                <Form onFinish={onFormFinish} form={form}>
                                    <Form.Item
                                        name="announcement"
                                        rules={[{ required: true, message: t("requiredField") }]}
                                        validateStatus={errors.length > 0 ? "error" : undefined}
                                        help={
                                            errors.length
                                                ? errors.map((err) => <div key={err}>{err}</div>)
                                                : undefined
                                        }
                                    >
                                        <Input.TextArea
                                            placeholder={t("announcement-placeholder")}
                                            rows={5}
                                        />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </StyledAnnouncementsList>
                    )
                }
            ]}
        />
    )
}