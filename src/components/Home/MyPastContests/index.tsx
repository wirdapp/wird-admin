import type React from "react";
import { useTranslation } from "react-i18next";

import LeftArrowIcon from "../../../assets/icons/Home/LeftArrow.svg";
import RightArrowIcon from "../../../assets/icons/Home/RightArrow.svg";
import SeeMore from "../../../assets/icons/Home/SeeMore.svg";

import { MyOngoingContest, VictorLeft, VictorRight } from "../DaysSlider/DaysSlider.styles";
import {
	MemberImgsAndNumNumbers,
	MemberNumbers,
	MembersImg,
	MembersImgs,
	ParticipantsTitels,
	ParticipantsTitelsAtHome,
	SeeAll,
	SeeAllIcon,
	SeeAllP,
	Top2Img,
	TotalOfMembers,
} from "../TopRanks/TopRanks.styles";
import DefaultMyPastContests, {
	LeftPastContests,
	MyOngoingContestDiv,
	ParticipantsMember,
	ParticipantsNumbers,
	ParticipantsNumbersRanks,
	RightLeftArrow,
	RightLeftPastContests,
	SeeContestResult,
	TitelPastContests,
	Top1Img,
	Top1Name,
	Top2Name,
	Top3RankDiv,
	TopRank,
	TopRanksAndParticipants,
	TopRanksSection,
	VictorArrows,
} from "./MyPastContests.styles";

function MyPastContests(): React.ReactElement {
	const { t } = useTranslation();

	return (
		<DefaultMyPastContests>
			<MyOngoingContestDiv>
				<MyOngoingContest>{t("pastContest")}</MyOngoingContest>

				<VictorArrows>
					<RightLeftArrow>
						<VictorLeft src={LeftArrowIcon} alt="" />
					</RightLeftArrow>

					<RightLeftArrow>
						<VictorRight src={RightArrowIcon} alt="" />
					</RightLeftArrow>
				</VictorArrows>
			</MyOngoingContestDiv>

			<RightLeftPastContests>
				<LeftPastContests>
					<TitelPastContests>12 months ago</TitelPastContests>

					<TopRank>
						<TopRanksAndParticipants>
							<ParticipantsMember>
								<ParticipantsTitels>
									<ParticipantsTitelsAtHome>{t("participantsKey")}</ParticipantsTitelsAtHome>

									<SeeAll to="#">
										<SeeAllP>{t("see-all")}</SeeAllP>
										<SeeAllIcon src={SeeMore} alt="" />
									</SeeAll>
								</ParticipantsTitels>

								<ParticipantsNumbers>
									<TotalOfMembers>251</TotalOfMembers>

									<MemberImgsAndNumNumbers>
										<MembersImgs>
											<MembersImg style={{ background: "#FDD561", right: "10px" }}>AB</MembersImg>
											<MembersImg style={{ background: "#FF5367", right: "30px" }}>MK</MembersImg>
											<MembersImg style={{ background: "#503E9D", right: "50px" }}>HA</MembersImg>
										</MembersImgs>

										<MemberNumbers>251+</MemberNumbers>
									</MemberImgsAndNumNumbers>
								</ParticipantsNumbers>
							</ParticipantsMember>

							<TopRanksSection>
								<ParticipantsTitels>
									<ParticipantsTitelsAtHome>Top 3 rank</ParticipantsTitelsAtHome>

									<SeeAll to="#">
										<SeeAllP>{t("see-all")}</SeeAllP>
										<SeeAllIcon src={SeeMore} alt="" />
									</SeeAll>
								</ParticipantsTitels>

								<ParticipantsNumbers>
									<ParticipantsNumbersRanks>
										<Top3RankDiv to="#">
											<Top1Img style={{ background: "#FDD561" }}>Am</Top1Img>
											<Top1Name>Ameen Betawi</Top1Name>
										</Top3RankDiv>

										<Top3RankDiv to="#">
											<Top2Img style={{ background: "#FF5367" }}>MK</Top2Img>
											<Top2Name>Mohammad Mokdad</Top2Name>
										</Top3RankDiv>

										<Top3RankDiv to="#">
											<Top2Img style={{ background: "#503E9D" }}>AQ</Top2Img>
											<Top2Name>Anas ALQdy</Top2Name>
										</Top3RankDiv>
									</ParticipantsNumbersRanks>
								</ParticipantsNumbers>
							</TopRanksSection>
							<SeeContestResult>{t("see-contest-result")}</SeeContestResult>
						</TopRanksAndParticipants>
					</TopRank>
				</LeftPastContests>

				<LeftPastContests>
					<TitelPastContests>24 months ago</TitelPastContests>
					<TopRank>
						<TopRanksAndParticipants>
							<ParticipantsMember>
								<ParticipantsTitels>
									<ParticipantsTitelsAtHome>{t("participantsKey")}</ParticipantsTitelsAtHome>

									<SeeAll to="#">
										<SeeAllP>{t("see-all")}</SeeAllP>
										<SeeAllIcon src={SeeMore} alt="" />
									</SeeAll>
								</ParticipantsTitels>

								<ParticipantsNumbers>
									<TotalOfMembers>251</TotalOfMembers>

									<MemberImgsAndNumNumbers>
										<MembersImgs>
											<MembersImg style={{ background: "#FDD561", right: "10px" }}>AB</MembersImg>
											<MembersImg style={{ background: "#FF5367", right: "30px" }}>MK</MembersImg>
											<MembersImg style={{ background: "#503E9D", right: "50px" }}>HA</MembersImg>
										</MembersImgs>

										<MemberNumbers>251+</MemberNumbers>
									</MemberImgsAndNumNumbers>
								</ParticipantsNumbers>
							</ParticipantsMember>

							<TopRanksSection>
								<ParticipantsTitels>
									<ParticipantsTitelsAtHome>Top 3 rank</ParticipantsTitelsAtHome>

									<SeeAll to="#">
										<SeeAllP>{t("see-all")}</SeeAllP>
										<SeeAllIcon src={SeeMore} alt="" />
									</SeeAll>
								</ParticipantsTitels>

								<ParticipantsNumbers>
									<ParticipantsNumbersRanks>
										<Top3RankDiv to="#">
											<Top1Img style={{ background: "#FDD561" }}>Am</Top1Img>
											<Top1Name>Ameen Betawi</Top1Name>
										</Top3RankDiv>

										<Top3RankDiv to="#">
											<Top2Img style={{ background: "#FF5367" }}>MK</Top2Img>
											<Top2Name>Mohammad Mokdad</Top2Name>
										</Top3RankDiv>

										<Top3RankDiv to="#">
											<Top2Img style={{ background: "#503E9D" }}>AQ</Top2Img>
											<Top2Name>Anas ALQdy</Top2Name>
										</Top3RankDiv>
									</ParticipantsNumbersRanks>
								</ParticipantsNumbers>
							</TopRanksSection>

							<SeeContestResult>{t("see-contest-result")}</SeeContestResult>
						</TopRanksAndParticipants>
					</TopRank>
				</LeftPastContests>
			</RightLeftPastContests>
		</DefaultMyPastContests>
	);
}
export default MyPastContests;
