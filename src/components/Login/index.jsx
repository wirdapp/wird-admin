import React, { useState } from "react";
import LoginFormContainer, {
	DivCenter,
	HeadLogIn,
	StyledErrorsList,
	TitleLogin,
} from "./login.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../../services/auth/session";
import { useHandleError } from "hooks/handleError";
import { Button, Flex, Form, Input, Space, Typography } from "antd";
import { AuthPageFooter } from "../shared/auth-page-footer";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";

function Login() {
	const { t } = useTranslation();
	let navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const location = useLocation();

	const { messages, classColor, handleError } = useHandleError();
	const handleSubmit = async (values) => {
		setLoading(true);
		try {
			await login(values.username, values.password);
			const searchParams = new URLSearchParams(location.search);
			navigate(searchParams.get("redirectTo") ?? "/dashboard");
		} catch (err) {
			handleError(err);
			setLoading(false);
		}
	};

	return (
		<LoginFormContainer>
			<DivCenter>
				<HeadLogIn>
					<WirdLogo />
					<TitleLogin>{`${t("login")}`}</TitleLogin>
				</HeadLogIn>

				<Form onFinish={handleSubmit} layout="vertical">
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: t("requiredField"),
							},
						]}
						label={t("username")}
					>
						<Input size="large" placeholder={t("username")} />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: t("requiredField"),
							},
						]}
						label={t("passwordKey")}
					>
						<Input.Password size="large" placeholder={t("passwordKey")} />
					</Form.Item>

					{/* TODO: style the error message */}
					{/* {showErrorMessage && (
            <DivPass className="red">{t("checkPassword")}</DivPass>
          )} */}
					{/* <PageLink href="https://www.facebook.com/Wird.Competition/" target="_blank">
            هل تواجه مشكلة تقنية أو نسيت كلمة المرور؟ تواصل مع الدعم الفني
          </PageLink> */}
					{messages.length > 0 && (
						<StyledErrorsList>
							{messages?.map?.((message, index) => {
								return (
									<div className={classColor} key={message}>
										{message}
									</div>
								);
							})}
						</StyledErrorsList>
					)}
					<Flex vertical align="center" gap={16}>
						<Button
							style={{ marginTop: "24px" }}
							type="primary"
							htmlType="submit"
							loading={loading}
							size="large"
							block
						>
							{t("login")}
						</Button>
						<Space>
							<Typography.Text type="secondary">
								{t("notAccount")}
							</Typography.Text>
							<Button type="link" size="small" href="/signup">
								{t("signUpKey")}
							</Button>
						</Space>
						<Button
							size="small"
							href={`${process.env.REACT_APP_MAIN_URL}/user/forgot-password`}
							type="link"
						>
							{t("forgetPassOrUsername")}
						</Button>
					</Flex>
				</Form>
			</DivCenter>
			<AuthPageFooter />
		</LoginFormContainer>
	);
}

export default Login;
