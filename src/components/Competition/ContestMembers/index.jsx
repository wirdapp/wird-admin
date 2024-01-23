import React, { useEffect, useState } from "react";
import SeeMore from "../../../assets/icons/Home/SeeMore.svg";

import TopRank, {
  ParticipantsMember,
  ParticipantsNumbers,
  ParticipantsTitels,
  ParticipantsTitelsAtHome,
  SeeAll,
  SeeAllIcon,
  SeeAllP,
  TopRanksAndParticipants,
  TotalOfMembers,
} from "./ContestMembers.styles";
import NumberAndAbbreviationOfNames from "../../shared/NumberAndAbbreviationOfNames";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { MembersApi } from "../../../services/members/api";
import { Role } from "../../../util/ContestPeople_Role";
import { GroupsApi } from "../../../services/groups/api";

function ContestMembers() {
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      MembersApi.getUsers().then((data) => {
        setStudents(data.results.filter((u) => u.contest_role === Role.MEMBER));
        setAdmins(
          data.results.filter((u) =>
            [Role.ADMIN, Role.SUPER_ADMIN].includes(u.contest_role),
          ),
        );
      }),
      GroupsApi.getGroups().then((data) => {
        setGroups(data);
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <TopRank>
      <TopRanksAndParticipants>
        <ParticipantsMember>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>
              {t("moderatorsKey")}
            </ParticipantsTitelsAtHome>

            <SeeAll href="/Admins" target="_blank">
              <SeeAllP>{t("seeAll")}</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt="" />
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            <TotalOfMembers>
              {loading ? <EllipsisHorizontalIcon /> : admins.length}
            </TotalOfMembers>

            <NumberAndAbbreviationOfNames users={admins} />
          </ParticipantsNumbers>
        </ParticipantsMember>

        <ParticipantsMember>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>
              {t("participantsKey")}
            </ParticipantsTitelsAtHome>

            <SeeAll href="/Students" target="_blank">
              <SeeAllP>{t("seeAll")}</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt="" />
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            <TotalOfMembers>
              {loading ? <EllipsisHorizontalIcon /> : students.length}
            </TotalOfMembers>
            <NumberAndAbbreviationOfNames users={students} />
          </ParticipantsNumbers>
        </ParticipantsMember>

        <ParticipantsMember>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>
              {t("groupsKey")}
            </ParticipantsTitelsAtHome>

            <SeeAll href="/Groups" target="_blank">
              <SeeAllP>{t("seeAll")}</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt="" />
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            <TotalOfMembers>
              {loading ? <EllipsisHorizontalIcon /> : groups.length}
            </TotalOfMembers>
          </ParticipantsNumbers>
        </ParticipantsMember>
      </TopRanksAndParticipants>
    </TopRank>
  );
}

export default ContestMembers;
