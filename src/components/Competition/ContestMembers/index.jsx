import React, {useEffect, useState} from "react";
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
import {retrieveAdmins} from "../../../services/adminsServices";
import {retrieveStudents} from "../../../services/studentsServices";
import NumberAndAbbreviationOfNames from "../../shared/NumberAndAbbreviationOfNames";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";

function ContestMembers({contest}) {
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);

    retrieveAdmins(
      (res) => {
        setAdmins([...res.data]);
      }, (err) => {
        console.log("Failed to retrieve admins: " + JSON.stringify(err.response.data));
      }
    );

    retrieveStudents(
      (res) => {
        setStudents(res.data);
        setLoading(false);
      }, (err) => {
        console.log("Failed to retrieve students: " + JSON.stringify(err.response.data));
        setLoading(false);
      });
  }, []);

  return (
    <TopRank>
      <TopRanksAndParticipants>
        <ParticipantsMember>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>Moderators</ParticipantsTitelsAtHome>

            <SeeAll href="/Admins" target="_blank">
              <SeeAllP>See all</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt=""/>
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            <TotalOfMembers>{loading ? <EllipsisHorizontalIcon/> : admins.length}</TotalOfMembers>

            <NumberAndAbbreviationOfNames users={admins}/>
          </ParticipantsNumbers>
        </ParticipantsMember>

        <ParticipantsMember>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>Participants</ParticipantsTitelsAtHome>

            <SeeAll href="/Students" target="_blank">
              <SeeAllP>See all</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt=""/>
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            <TotalOfMembers>{loading ? <EllipsisHorizontalIcon/> : students.length}</TotalOfMembers>
            <NumberAndAbbreviationOfNames users={students}/>
          </ParticipantsNumbers>
        </ParticipantsMember>

        <ParticipantsMember>
          <ParticipantsTitels>
            <ParticipantsTitelsAtHome>Groups</ParticipantsTitelsAtHome>

            <SeeAll href="/Groups" target="_blank">
              <SeeAllP>See all</SeeAllP>
              <SeeAllIcon src={SeeMore} Alt=""/>
            </SeeAll>
          </ParticipantsTitels>

          <ParticipantsNumbers>
            <TotalOfMembers>{loading ? <EllipsisHorizontalIcon/> : contest.group_count}</TotalOfMembers>
          </ParticipantsNumbers>
        </ParticipantsMember>
      </TopRanksAndParticipants>
    </TopRank>
  );
}

export default ContestMembers;
