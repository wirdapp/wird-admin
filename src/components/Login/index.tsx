import { zodResolver } from "@hookform/resolvers/zod";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";
import { useHandleError } from "hooks/handleError";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { login } from "../../services/auth/session";
import type { LoginFormValues } from "../../types";
import { AuthPageFooter } from "../shared/auth-page-footer";
import { SocialLoginSection } from "../shared/social-login-buttons";

function Login() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const location = useLocation();

	const { messages, handleError } = useHandleError();

	const formSchema = z.object({
		username: z.string().min(1, t("requiredField")),
		password: z.string().min(1, t("requiredField")),
	});

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const handleSubmit = async (values: LoginFormValues) => {
		setLoading(true);
		try {
			await login(values.username, values.password);
			const searchParams = new URLSearchParams(location.search);
			navigate(searchParams.get("redirectTo") ?? "/dashboard");
		} catch (err) {
			handleError(err as Parameters<typeof handleError>[0]);
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-6 m-0 p-8 bg-wheat-light min-h-screen">
			<div className="mx-auto w-full max-w-[500px] flex flex-col justify-center p-9 gap-5 bg-white rounded-3xl">
				<div className="mt-4 flex font-medium flex-col justify-center items-center p-1 gap-4 rounded-3xl">
					<WirdLogo />
					<div className="w-auto h-9 font-bold text-3xl leading-9 text-center text-black">
						{t("login")}
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("username")}</FormLabel>
									<FormControl>
										<Input placeholder={t("username")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("passwordKey")}</FormLabel>
									<FormControl>
										<PasswordInput placeholder={t("passwordKey")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{messages.length > 0 && (
							<Alert variant="destructive">
								<AlertDescription>
									{messages.map((message) => (
										<div key={String(message)}>{message}</div>
									))}
								</AlertDescription>
							</Alert>
						)}

						<div className="flex flex-col items-center gap-4">
							<Button type="submit" className="w-full h-12 mt-6" disabled={loading}>
								{loading ? t("loading") : t("login")}
							</Button>

							<SocialLoginSection
								mode="login"
								onError={(err) => handleError(err as Parameters<typeof handleError>[0])}
							/>

							<div className="flex items-center gap-2">
								<span className="text-muted-foreground">{t("notAccount")}</span>
								<Button variant="link" render={<Link to="/signup" />} className="p-0 h-auto">
									{t("signUpKey")}
								</Button>
							</div>

							<Link
								to="/user/forgot-password"
								className="text-primary underline-offset-4 hover:underline p-0 h-auto text-sm font-medium"
							>
								{t("forgetPassOrUsername")}
							</Link>
						</div>
					</form>
				</Form>
			</div>
			<AuthPageFooter />
		</div>
	);
}

export default Login;
