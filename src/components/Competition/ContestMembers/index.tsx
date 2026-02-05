import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import SeeMore from "../../../assets/icons/Home/SeeMore.svg";
import { GroupsService } from "../../../services/groups/groups.service";
import { MembersService } from "../../../services/members/members.service";
import type { ContestPerson, Group } from "../../../types";
import { Role } from "../../../util/roles";
import NumberAndAbbreviationOfNames from "../../shared/NumberAndAbbreviationOfNames";

const ContestMembers: React.FC = () => {
	const [admins, setAdmins] = useState<ContestPerson[]>([]);
	const [students, setStudents] = useState<ContestPerson[]>([]);
	const [groups, setGroups] = useState<Group[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { t } = useTranslation();

	useEffect(() => {
		setLoading(true);
		Promise.all([
			MembersService.getUsers({ page_size: 1000 }).then((response) => {
				const members = Array.isArray(response) ? response : response.results;
				setStudents(members.filter((u) => u.contest_role === Role.MEMBER));
				setAdmins(members.filter((u) => [Role.ADMIN, Role.SUPER_ADMIN].includes(u.contest_role)));
			}),
			GroupsService.getGroups().then((data) => {
				setGroups(data);
			}),
		]).finally(() => {
			setLoading(false);
		});
	}, []);

	return (
		<div className="mt-8 flex w-auto justify-center rounded-3xl">
			<div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
				{/* Moderators */}
				<div className="flex w-full flex-col items-start justify-center gap-3">
					<div className="flex h-5 w-full flex-row justify-between">
						<h4 className="text-center text-base font-bold">{t("moderatorsKey")}</h4>
						<Link
							to="/dashboard/participants"
							className="flex h-5 flex-row items-start gap-1.5 no-underline"
						>
							<span className="text-base font-normal text-brand-red">{t("seeAll")}</span>
							<img src={SeeMore} alt="" />
						</Link>
					</div>
					<div className="flex w-full max-w-[567px] flex-row items-center justify-start gap-6 rounded-3xl bg-wheat-warm p-6">
						<div className="text-5xl font-bold max-sm:text-4xl">
							{loading ? (
								<EllipsisHorizontalIcon className="h-8 w-8 text-wheat-warm" />
							) : (
								admins.length
							)}
						</div>
						<NumberAndAbbreviationOfNames users={admins} />
					</div>
				</div>

				{/* Participants */}
				<div className="flex w-full flex-col items-start justify-center gap-3">
					<div className="flex h-5 w-full flex-row justify-between">
						<h4 className="text-center text-base font-bold">{t("participantsKey")}</h4>
						<Link
							to="/dashboard/participants"
							className="flex h-5 flex-row items-start gap-1.5 no-underline"
						>
							<span className="text-base font-normal text-brand-red">{t("seeAll")}</span>
							<img src={SeeMore} alt="" />
						</Link>
					</div>
					<div className="flex w-full max-w-[567px] flex-row items-center justify-start gap-6 rounded-3xl bg-wheat-warm p-6">
						<div className="text-5xl font-bold max-sm:text-4xl">
							{loading ? (
								<EllipsisHorizontalIcon className="h-8 w-8 text-wheat-warm" />
							) : (
								students.length
							)}
						</div>
						<NumberAndAbbreviationOfNames users={students} />
					</div>
				</div>

				{/* Groups */}
				<div className="flex w-full flex-col items-start justify-center gap-3">
					<div className="flex h-5 w-full flex-row justify-between">
						<h4 className="text-center text-base font-bold">{t("groupsKey")}</h4>
						<Link
							to="/dashboard/groups"
							className="flex h-5 flex-row items-start gap-1.5 no-underline"
						>
							<span className="text-base font-normal text-brand-red">{t("seeAll")}</span>
							<img src={SeeMore} alt="" />
						</Link>
					</div>
					<div className="flex w-full max-w-[567px] flex-row items-center justify-start gap-6 rounded-3xl bg-wheat-warm p-6">
						<div className="text-5xl font-bold max-sm:text-4xl">
							{loading ? (
								<EllipsisHorizontalIcon className="h-8 w-8 text-wheat-warm" />
							) : (
								groups.length
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContestMembers;
