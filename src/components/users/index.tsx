import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, type MotionProps, motion } from "motion/react";
import type React from "react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembers } from "../../services/members/queries";
import type { ContestPerson } from "../../types";
import { AnimatedPage } from "../../ui/animated-page";
import { isAtLeastSuperAdmin, type Role } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import { debounce } from "../../util/utils";
import { AddUserPopup } from "./add-user-popup";
import { RolesSelect } from "./roles-select";
import UserListItem from "./user-list-item";

const MotionDiv = motion.div as React.FC<
	MotionProps & React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>;

interface StudentChangeResult {
	id?: string;
}

export default function Students(): React.ReactElement {
	const { t } = useTranslation();
	const [role, setRole] = useState<Role | number>(-1);
	const [showAddUserPopup, setShowAddUserPopup] = useState<boolean>(false);
	const { currentUser } = useDashboardData();
	const [search, setSearch] = useState<string>("");
	const [debouncedSearch, setDebouncedSearch] = useState<string>("");

	const { data, isLoading, refetch } = useMembers({
		role: role > -1 ? (role as Role) : undefined,
		search: debouncedSearch,
	});
	const students = data?.results ?? [];

	const debouncedSetSearch = useMemo(
		() => debounce((value: string) => setDebouncedSearch(value), 500),
		[],
	);

	const onStudentChange = async (res?: StudentChangeResult | ContestPerson): Promise<void> => {
		await refetch();
		setTimeout(() => {
			if (res?.id) {
				const studentElement = document.querySelector(`[data-person-id="${res.id}"]`);
				if (studentElement) {
					studentElement.scrollIntoView({ behavior: "smooth" });
				}
			}
		}, 5);
	};

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDebouncedSearch(search);
	};

	return (
		<AnimatedPage className="w-full flex mx-auto flex-col gap-12 max-w-[900px] max-md:gap-0">
			<div className="flex mx-auto justify-between gap-5 w-full max-md:flex-col-reverse">
				<div className="flex flex-col gap-5 w-full">
					<div className="flex justify-between items-center">
						<h3 className="text-2xl font-semibold">{t("participants")}</h3>
						{isAtLeastSuperAdmin(currentUser!.role!) && (
							<Button onClick={() => setShowAddUserPopup(true)}>
								<PlusIcon className="h-4 w-4" />
								{t("add-user")}
							</Button>
						)}
					</div>
					<div className="flex gap-4 items-center flex-wrap">
						<span className="text-muted-foreground">{t("show")}:</span>
						<RolesSelect
							showAll
							value={role}
							onChange={setRole}
							className="w-full max-w-[300px]"
							title={t("show")}
						/>
						<span className="text-sm text-muted-foreground">
							{(!isLoading && students.length && `${t("showing")} ${students.length}`) || ""}
						</span>
					</div>
					<form onSubmit={handleSearch} className="relative w-full">
						<Input
							value={search}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const value = e.target.value;
								setSearch(value);
								debouncedSetSearch(value);
							}}
							placeholder={t("search")}
							className="pe-10"
						/>
						<button
							type="submit"
							className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							<MagnifyingGlassIcon className="h-4 w-4" />
						</button>
					</form>
					<AnimatePresence mode="wait">
						{students.length === 0 ? (
							isLoading ? (
								<div className="flex flex-col gap-3 w-full">
									<Skeleton className="h-24 w-full rounded-3xl" />
									<Skeleton className="h-24 w-full rounded-3xl" />
									<Skeleton className="h-24 w-full rounded-3xl" />
								</div>
							) : (
								<Empty description={t("dailySubmissionsPopup.noData")} className="w-full" />
							)
						) : (
							<MotionDiv
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								className="flex flex-col gap-3 w-full"
							>
								{students?.map?.((student: ContestPerson, idx: number) => {
									return <UserListItem key={idx} student={student} onChange={onStudentChange} />;
								})}
							</MotionDiv>
						)}
					</AnimatePresence>
				</div>
			</div>
			<AddUserPopup
				open={showAddUserPopup}
				onClose={() => setShowAddUserPopup(false)}
				onAdded={onStudentChange}
			/>
		</AnimatedPage>
	);
}
