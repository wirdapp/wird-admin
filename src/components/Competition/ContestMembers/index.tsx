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
import { MembersService } from "../../../services/members/members.service";
import { Role } from "../../../util/roles";
import { GroupsService } from "../../../services/groups/groups.service";
import type { ContestPerson, Group } from "../../../types";

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
        setAdmins(
          members.filter((u) =>
            [Role.ADMIN, Role.SUPER_ADMIN].includes(u.contest_role),
          ),
        );
      }),
      GroupsService.getGroups().then((data) => {
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

            <SeeAll to="/dashboard/participants">
              <SeeAllP>{t("seeAll")}</SeeAllP>
              <SeeAllIcon src={SeeMore} alt="" />
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

            <SeeAll to="/dashboard/participants">
              <SeeAllP>{t("seeAll")}</SeeAllP>
              <SeeAllIcon src={SeeMore} alt="" />
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

            <SeeAll to="/dashboard/groups">
              <SeeAllP>{t("seeAll")}</SeeAllP>
              <SeeAllIcon src={SeeMore} alt="" />
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
};

export default ContestMembers;
