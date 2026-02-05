import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { loginWithGoogle } from "../../services/auth/session";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" role="img" aria-label="Google">
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				fill="#EA4335"
			/>
		</svg>
	);
}

function AppleIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="currentColor"
			role="img"
			aria-label="Apple"
		>
			<path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
		</svg>
	);
}

interface SocialLoginSectionProps {
	mode: "login" | "signup";
	onError: (error: unknown) => void;
}

function GoogleLoginButton({ mode, onError }: SocialLoginSectionProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(false);

	const googleLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (response) => {
			setLoading(true);
			try {
				await loginWithGoogle(response.code);
				const searchParams = new URLSearchParams(location.search);
				navigate(searchParams.get("redirectTo") ?? "/dashboard");
			} catch (err) {
				onError(err);
			} finally {
				setLoading(false);
			}
		},
		onError: (error) => {
			onError(error);
		},
	});

	return (
		<Button
			type="button"
			variant="outline"
			className="w-full h-12 gap-3"
			onClick={() => googleLogin()}
			disabled={loading}
		>
			<GoogleIcon />
			{loading ? t("loading") : mode === "login" ? t("signInWithGoogle") : t("signUpWithGoogle")}
		</Button>
	);
}

function AppleLoginButton({ mode }: { mode: "login" | "signup" }) {
	const { t } = useTranslation();

	return (
		<Button type="button" variant="outline" className="w-full h-12 gap-3" disabled>
			<AppleIcon />
			{mode === "login" ? t("signInWithApple") : t("signUpWithApple")}
			<span className="text-xs text-muted-foreground">({t("comingSoon")})</span>
		</Button>
	);
}

export function SocialLoginSection({ mode, onError }: SocialLoginSectionProps) {
	const { t } = useTranslation();

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<Separator className="flex-1" />
				<span className="text-sm text-muted-foreground">{t("orKey")}</span>
				<Separator className="flex-1" />
			</div>
			{googleClientId && <GoogleLoginButton mode={mode} onError={onError} />}
			<AppleLoginButton mode={mode} />
		</div>
	);
}
