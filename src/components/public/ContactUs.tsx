import { useTranslation } from "react-i18next";
import { Section } from "components/public/landing/Section";
import { Card, CardContent } from "components/ui/card";

const ContactUsLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => (
	<a target="_blank" rel="noopener noreferrer" href={href} className="block">
		<Card className="bg-[#f9eaea] hover:bg-white transition w-[270px] h-[150px] hover:shadow-xl hover:shadow-gray-200">
			<CardContent className="flex flex-col items-center justify-center gap-2 h-full p-5">
				{children}
			</CardContent>
		</Card>
	</a>
);

export function ContactUs() {
	const { t } = useTranslation();

	return (
		<Section
			id="contact-us"
			title={t("ContactUsSection.title")}
			description={t("ContactUsSection.description")}
			classNames={{
				root: "bg-[#fbf9f7] py-12",
				wrapper: "text-center",
			}}
		>
			<div className="flex flex-col md:flex-row justify-center items-center w-full my-8 gap-10">
				<ContactUsLink href="mailto:info@wird.app">
					<span className="text-lg">{t("ContactUsSection.volunteer")}</span>
					<img src="/assets/mail.svg" alt="EmailIcon" />
				</ContactUsLink>
				<ContactUsLink href="https://t.me/wird_platform">
					<span className="text-lg">{t("ContactUsSection.telegram")}</span>
					<img
						src="/assets/telegram-icon.svg"
						alt="TelegramIcon"
						width={40}
						height={40}
					/>
				</ContactUsLink>
				<ContactUsLink href="https://web.facebook.com/Wird.Competition">
					<span className="text-lg">{t("ContactUsSection.followUs")}</span>
					<img src="/assets/facebook.svg" alt="FacebookIcon" />
				</ContactUsLink>
			</div>
		</Section>
	);
}
