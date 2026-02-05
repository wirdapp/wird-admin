import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { Button } from "components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "components/ui/sheet";
import { cn } from "lib/utils";

type Props = {
	locale: string;
	items: { href: string; label: React.ReactNode; className?: string }[];
};

export function Nav({ items, locale }: Props) {
	const { i18n } = useTranslation();
	const navigate = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const changeLocale = (newLocale: string) => {
		const currentPath = window.location.pathname;
		const newPath = `${currentPath}?locale=${newLocale}`;
		i18n.changeLanguage(newLocale);
		navigate(newPath);
		setMobileMenuOpen(false);
	};

	return (
		<div className="mis-auto self-center">
			{/* Mobile Menu */}
			<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
				<SheetTrigger asChild className="lg:hidden">
					<Button variant="ghost" size="icon">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side={locale === "ar" ? "left" : "right"}>
					<SheetHeader>
						<SheetTitle className="text-start">Menu</SheetTitle>
					</SheetHeader>
					<nav className="flex flex-col gap-4 mt-6">
						<Button
							variant="outline"
							onClick={() => changeLocale(locale === "en" ? "ar" : "en")}
							className="justify-start"
						>
							{locale === "en" ? "عربي" : "English"}
						</Button>
						{items.map((item, index) => (
							<Link
								key={index}
								to={item.href}
								className={cn(
									"text-sm px-4 py-2 rounded-md hover:bg-accent transition-colors",
									item.className,
								)}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>

			{/* Desktop Menu */}
			<nav className="hidden lg:flex lg:flex-row lg:items-center justify-between flex-wrap gap-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => changeLocale(locale === "en" ? "ar" : "en")}
				>
					{locale === "en" ? "عربي" : "English"}
				</Button>
				{items.map((item, index) => (
					<Link key={index} to={item.href}>
						<Button
							variant={
								item.className?.includes("border") ? "outline" : "ghost"
							}
							size="sm"
							className={cn(item.className)}
						>
							{item.label}
						</Button>
					</Link>
				))}
			</nav>
		</div>
	);
}
