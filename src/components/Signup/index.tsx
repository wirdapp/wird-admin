import { zodResolver } from "@hookform/resolvers/zod";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";
import { isAxiosError } from "axios";
import { Upload as UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { AuthService } from "../../services/auth/auth.service";
import { login } from "../../services/auth/session";
import { AuthPageFooter } from "../shared/auth-page-footer";

interface SignupFormValues {
	username: string;
	email: string;
	password1: string;
	password2: string;
	first_name?: string;
	last_name?: string;
	phone_number?: string;
	profile_photo?: File;
}

interface SignupErrors {
	username?: string[];
	email?: string[];
	password1?: string[];
	password2?: string[];
	first_name?: string[];
	last_name?: string[];
	phone_number?: string[];
	non_field_errors?: string[];
}

function Signup() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [serverErrors, setServerErrors] = useState<SignupErrors>({});
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const formSchema = z
		.object({
			username: z.string().min(1, t("requiredField")),
			email: z.string().min(1, t("requiredField")).email(t("invalidEmail")),
			password1: z.string().min(1, t("requiredField")),
			password2: z.string().min(1, t("requiredField")),
			first_name: z.string().optional(),
			last_name: z.string().optional(),
			phone_number: z.string().optional(),
			profile_photo: z.any().optional(),
		})
		.refine((data) => data.password1 === data.password2, {
			message: t("retypePasswordDisclimar"),
			path: ["password2"],
		});

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password1: "",
			password2: "",
			first_name: "",
			last_name: "",
			phone_number: "",
		},
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			form.setValue("profile_photo", file);
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const handleSubmit = async (values: SignupFormValues) => {
		setServerErrors({});
		setLoading(true);
		try {
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			await AuthService.signup({ ...values, timezone }, false);
			await login(values.username, values.password1);
			await AuthService.updateUserInfo({
				first_name: values.first_name,
				last_name: values.last_name,
				phone_number: values.phone_number,
				profile_photo: values.profile_photo ? [values.profile_photo] : undefined,
			});
			navigate("/dashboard");
		} catch (err) {
			if (isAxiosError(err)) {
				setServerErrors(err.response?.data ?? {});
			} else {
				setServerErrors({ non_field_errors: [(err as Error).message] });
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-6 m-0 p-8 bg-wheat-light min-h-screen">
			<div className="my-8 mx-auto w-full max-w-[500px] flex flex-col justify-center p-9 gap-5 bg-white rounded-3xl">
				<div className="mt-4 flex font-medium flex-col justify-center items-center p-1 gap-4 rounded-3xl">
					<WirdLogo />
					<div className="w-auto h-9 font-bold text-3xl leading-9 text-center text-black">
						{t("signUp")}
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("userNameKey")} *</FormLabel>
									<FormControl>
										<Input placeholder={t("userNameKey")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
									{serverErrors.username && (
										<p className="text-sm text-destructive">{serverErrors.username.join(", ")}</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password1"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("passwordKey")} *</FormLabel>
									<FormControl>
										<PasswordInput placeholder={t("passwordKey")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
									{serverErrors.password1 && (
										<p className="text-sm text-destructive">{serverErrors.password1.join(", ")}</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password2"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("retypePassword")} *</FormLabel>
									<FormControl>
										<PasswordInput placeholder={t("retypePassword")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
									{serverErrors.password2 && (
										<p className="text-sm text-destructive">{serverErrors.password2.join(", ")}</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("firstName")}</FormLabel>
									<FormControl>
										<Input placeholder={t("firstName")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
									{serverErrors.first_name && (
										<p className="text-sm text-destructive">{serverErrors.first_name.join(", ")}</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("lastName")}</FormLabel>
									<FormControl>
										<Input placeholder={t("lastName")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
									{serverErrors.last_name && (
										<p className="text-sm text-destructive">{serverErrors.last_name.join(", ")}</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("emailAddress")} *</FormLabel>
									<FormControl>
										<Input placeholder={t("emailAddress")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
									{serverErrors.email && (
										<p className="text-sm text-destructive">{serverErrors.email.join(", ")}</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("phoneNumber")}</FormLabel>
									<FormControl>
										<Input placeholder={t("phoneNumber")} className="h-12" {...field} />
									</FormControl>
									<FormMessage />
									{serverErrors.phone_number && (
										<p className="text-sm text-destructive">
											{serverErrors.phone_number.join(", ")}
										</p>
									)}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="profile_photo"
							render={() => (
								<FormItem>
									<FormLabel>{t("profilePhoto")}</FormLabel>
									<FormControl>
										<div className="flex items-center gap-4">
											<input
												type="file"
												ref={fileInputRef}
												onChange={handleFileChange}
												accept="image/*"
												className="hidden"
											/>
											<Avatar
												className="h-20 w-20 cursor-pointer border-2 border-dashed border-input hover:border-primary"
												onClick={() => fileInputRef.current?.click()}
											>
												{previewUrl ? (
													<AvatarImage src={previewUrl} alt="Preview" />
												) : (
													<AvatarFallback className="flex flex-col gap-1">
														<UploadIcon className="h-5 w-5 text-muted-foreground" />
														<span className="text-xs text-muted-foreground">Upload</span>
													</AvatarFallback>
												)}
											</Avatar>
											{previewUrl && (
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => {
														setPreviewUrl(null);
														form.setValue("profile_photo", undefined);
														if (fileInputRef.current) {
															fileInputRef.current.value = "";
														}
													}}
												>
													Remove
												</Button>
											)}
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						{serverErrors.non_field_errors && serverErrors.non_field_errors.length > 0 && (
							<Alert variant="destructive">
								<AlertDescription>
									{serverErrors.non_field_errors.map((message) => (
										<div key={message}>{message}</div>
									))}
								</AlertDescription>
							</Alert>
						)}

						<div className="flex flex-col items-center gap-4 pt-4">
							<Button type="submit" className="w-full h-12" disabled={loading}>
								{loading ? t("loading") : t("signUp")}
							</Button>

							<div className="flex items-center gap-2">
								<span className="text-muted-foreground">{t("alreadyHaveAccount")}</span>
								<Button variant="link" render={<Link to="/login" />} className="p-0 h-auto">
									{t("loginNow")}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
			<AuthPageFooter />
		</div>
	);
}

export default Signup;
