import React from "react";
import SeeMore from "../../../assets/icons/Home/SeeMore.svg";
import { useTranslation } from "react-i18next";

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
import NumberAndAbbreviationOfNames from "../../shared/NumberAndAbbreviationOfNames";
import { Avatar, Spin } from "antd";
import { getFullName, getInitials } from "../../../util/user-utils";

function TopRanks({
  topMembers,
  topMembersLoading,
  students,
  studentsLoading,
}) {
  const { t } = useTranslation();

  console.log(topMembers);
  return (
    <TopRank>
      <TopRanksAndParticipants>
        <ParticipantsMember>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>
              {t("participants")}
            </ParticipantsTitelsAtHome>

            <SeeAll to="/dashboard/participants">
              <SeeAllP>{t("see-all")}</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt="" />
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            {!studentsLoading ? (
              <>
                <TotalOfMembers>{students.length}</TotalOfMembers>
                <NumberAndAbbreviationOfNames users={students} />
              </>
            ) : (
              <Spin />
            )}
          </ParticipantsNumbers>
        </ParticipantsMember>

        <TopRanksSection>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>
              {t("top-3-rank")}
            </ParticipantsTitelsAtHome>

            <SeeAll href="/dashboard/leaderboard" target="_blank">
              <SeeAllP>{t("see-all")}</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt="" />
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            {!topMembersLoading ? (
              <>
                {topMembers.length > 0 ? (
                  <ParticipantsNumbersRanks>
                    {topMembers.map((topMember, i) => {
                      const user = {
                        firstName: topMember.person__first_name,
                        lastName: topMember.person__last_name,
                        username: topMember.person__username,
                        profile_photo: topMember.person__profile_photo,
                      };
                      return (
                        <Top3RankDiv
                          to={`/dashboard/results/members?userId=${topMember.id}`}
                          key={i}
                        >
                          <Avatar src={user.profile_photo} size={40}>
                            {getInitials(user)}
                          </Avatar>
                          <Top1Name>{getFullName(user)}</Top1Name>
                        </Top3RankDiv>
                      );
                    })}
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
