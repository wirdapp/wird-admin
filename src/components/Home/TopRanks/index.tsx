import { Avatar, Spin } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import SeeMore from "../../../assets/icons/Home/SeeMore.svg";
import type { ContestPerson, LeaderboardEntry } from "../../../types";
import { getFullName, getInitials } from "../../../util/user-utils";
import NumberAndAbbreviationOfNames from "../../shared/NumberAndAbbreviationOfNames";
import TopRank, {
	Empty,
	ParticipantsMember,
	ParticipantsNumbers,
	ParticipantsNumbersRanks,
	ParticipantsTitels,
	ParticipantsTitelsAtHome,
	SeeAll,
	SeeAllIcon,
	SeeAllP,
	Top1Name,
	Top3RankDiv,
	TopRanksAndParticipants,
	TopRanksSection,
	TotalOfMembers,
} from "./TopRanks.styles";

interface TopRanksProps {
	topMembers: LeaderboardEntry[];
	topMembersLoading: boolean;
	students: ContestPerson[];
	studentsLoading: boolean;
}

function TopRanks({
	topMembers,
	topMembersLoading,
	students,
	studentsLoading,
}: TopRanksProps): React.ReactElement {
	const { t } = useTranslation();

	return (
		<TopRank>
			<TopRanksAndParticipants>
				<ParticipantsMember>
					<ParticipantsTitels>
						<ParticipantsTitelsAtHome>{t("participants")}</ParticipantsTitelsAtHome>

						<SeeAll to="/dashboard/participants">
							<SeeAllP>{t("see-all")}</SeeAllP>
							<SeeAllIcon src={SeeMore} alt="" />
						</SeeAll>
					</ParticipantsTitels>

					<ParticipantsNumbers>
						{!studentsLoading ? (
							<>
								<TotalOfMembers>{students?.length ?? 0}</TotalOfMembers>
								<NumberAndAbbreviationOfNames users={students ?? []} />
							</>
						) : (
							<Spin />
						)}
					</ParticipantsNumbers>
				</ParticipantsMember>

				<TopRanksSection>
					<ParticipantsTitels>
						<ParticipantsTitelsAtHome>{t("top-3-rank")}</ParticipantsTitelsAtHome>

						<SeeAll to="/dashboard/leaderboard">
							<SeeAllP>{t("see-all")}</SeeAllP>
							<SeeAllIcon src={SeeMore} alt="" />
						</SeeAll>
					</ParticipantsTitels>

					<ParticipantsNumbers>
						{!topMembersLoading ? (
							<>
								{(topMembers?.length ?? 0) > 0 ? (
									<ParticipantsNumbersRanks>
										{(topMembers ?? []).map((topMember, i) => (
											<Top3RankDiv to={`/dashboard/results/members?userId=${topMember.id}`} key={i}>
												<Avatar size={40}>{getInitials(topMember.person_info)}</Avatar>
												<Top1Name>{getFullName(topMember.person_info)}</Top1Name>
											</Top3RankDiv>
										))}
									</ParticipantsNumbersRanks>
								) : (
									<Empty>No data</Empty>
								)}
							</>
						) : (
							<Spin />
						)}
					</ParticipantsNumbers>
				</TopRanksSection>
			</TopRanksAndParticipants>
		</TopRank>
	);
}

export default TopRanks;
