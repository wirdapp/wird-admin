import React, { useState } from "react";
import SignupFormContainer, { DivCenter } from "../Signup/Signup.styles";
import { HeadLogIn, StyledErrorsList, TitleLogin } from "../Login/login.styles";
import * as AuthApi from "../../services/auth/api";
import { updateUserInfo } from "../../services/auth/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../../services/auth/session";
import { Button, Flex, Form, Input, Space, Typography, Upload } from "antd";
import { isAxiosError } from "axios";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { AuthPageFooter } from "../shared/auth-page-footer";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";

function Signup() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    setErrors({});
    setLoading(true);
    try {
      await AuthApi.signup(values, false);
      await login(values.username, values.password1);
      await updateUserInfo({
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        profile_photo: values.profile_photo,
      });
      navigate("/dashboard");
    } catch (err) {
      if (isAxiosError(err)) {
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: [err.message] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupFormContainer>
      <DivCenter>
        <HeadLogIn>
          <WirdLogo />
          <TitleLogin>{t("signUp")}</TitleLogin>
        </HeadLogIn>

        <Form
          form={form}
          onFinish={onFinish}
          disabled={loading}
          layout="vertical"
          validateMessages={{
            required: t("requiredField"),
          }}
        >
          <Form.Item
            label={t("userNameKey")}
            required
            rules={[{ required: true }]}
            name="username"
            validateStatus={errors.username ? "error" : undefined}
            help={errors.username}
          >
            <Input size="large" placeholder={t("userNameKey")} />
          </Form.Item>

          <Form.Item
            label={t("passwordKey")}
            required
            rules={[{ required: true }]}
            name="password1"
            validateStatus={errors.password1 ? "error" : undefined}
            help={errors.password1 ?? undefined}
          >
            <Input.Password size="large" placeholder={t("passwordKey")} />
          </Form.Item>

          <Form.Item
            label={t("retypePassword")}
            required
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password1") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("retypePasswordDisclimar")),
                  );
                },
              }),
            ]}
            name="password2"
            validateStatus={errors.password2 ? "error" : undefined}
            help={errors.password2 ?? undefined}
          >
            <Input.Password size="large" placeholder={t("retypePassword")} />
          </Form.Item>

          <Form.Item
            label={t("firstName")}
            name="first_name"
            validateStatus={errors.first_name ? "error" : undefined}
            help={errors.first_name ?? undefined}
          >
            <Input size="large" placeholder={t("firstName")} />
          </Form.Item>

          <Form.Item
            label={t("lastName")}
            name="last_name"
            validateStatus={errors.last_name ? "error" : undefined}
            help={errors.last_name ?? undefined}
          >
            <Input placeholder={t("lastName")} size="large" />
          </Form.Item>

          <Form.Item
            label={t("emailAddress")}
            required
            rules={[{ required: true }]}
            name="email"
            validateStatus={errors.email ? "error" : undefined}
            help={errors.email ?? undefined}
          >
            <Input size="large" placeholder={t("emailAddress")} />
          </Form.Item>

          <Form.Item
            label={t("phoneNumber")}
            name="phone_number"
            validateStatus={errors.phone_number ? "error" : undefined}
            help={errors.phone_number ?? undefined}
          >
            <Input size="large" placeholder={t("phoneNumber")} />
          </Form.Item>

          <Form.Item
            name="profile_photo"
            label={t("profilePhoto")}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              listType="picture-circle"
              accept="image/*"
              multiple={false}
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
              onRemove={() => setFileList([])}
            >
              {fileList.length === 0 && (
                <button style={{ border: 0, background: "none" }} type="button">
                  <ArrowUpTrayIcon style={{ width: 16 }} />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </Form.Item>
          <br />

          {/* <PageLink href="https://www.facebook.com/Wird.Competition/" target="_blank">
            هل تواجه مشكلة تقنية أو نسيت كلمة المرور؟ تواصل مع الدعم الفني
          </PageLink> */}
          {errors.non_field_errors?.length > 0 && (
            <StyledErrorsList>
              {errors.non_field_errors?.map?.((message, index) => {
                return (
                  <div className="red" key={message}>
                    {message}
                  </div>
                );
              })}
            </StyledErrorsList>
          )}
          <Flex vertical align="center" gap={16}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              value="login"
              loading={loading}
              block
            >
              {t("signUp")}
            </Button>
            <Space>
              <Typography.Text type="secondary">
                {t("alreadyHaveAccount")}
              </Typography.Text>
              <Button type="link" href="/login">
                {t("loginNow")}
              </Button>
            </Space>
          </Flex>
        </Form>
      </DivCenter>
      <AuthPageFooter />
    </SignupFormContainer>
  );
}

export default Signup;
