import React, { useState } from "react";
import Loader from "../Loader";
import {
  AverageParsents as AverageParents,
  AverageWrapper,
  AverageWrapperButon,
  DayInAverageWrapper,
  DivLine,
  LeaderBoardContainer,
  LeaderBoardMain,
  LeaderBoardMainTitel,
  PAverageWrapper,
  SecondaryWrapper,
  StudentPointsWrapper,
  Top2Img,
  Top2Name,
  Top3RankDiv,
  TopStudentsSpan,
  WarbSlider,
} from "./TopStudents.styles";
import { usePageTitle } from "../shared/page-title";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../util/routes-data";
import { getFullName, getInitials } from "../../util/user-utils";

const colors = ["#503E9D", "#FB862C", "#FF5367", "#FDD561", "#FFBAC2"];

function getColor(index) {
  return colors[index % colors.length];
}

const dummyData = [
  {
    id: 1,
    total_points: 25,
    first_name: "mohammad",
    last_name: "almokdad",
    username: "modad",
    scores: [
      { day: 12, points: 80 },
      { day: 13, points: 20 },
      { day: 14, points: 100 },
      { day: 15, points: 100 },
      { day: 16, points: 32 },
      { day: 17, points: 40 },
      { day: 18, points: 80 },
      { day: 19, points: 90 },
      { day: 20, points: 80 },
    ],
  },
  {
    id: 2,
    total_points: 20,
    first_name: "ameen",
    last_name: "albetawi",
    username: "ameeno",
    scores: [
      { day: 12, points: 80 },
      { day: 13, points: 20 },
      { day: 14, points: 100 },
      { day: 15, points: 100 },
      { day: 16, points: 32 },
      { day: 17, points: 40 },
      { day: 18, points: 80 },
      { day: 19, points: 90 },
      { day: 20, points: 80 },
    ],
  },
  {
    id: 3,
    total_points: 25,
    first_name: "bassam",
    last_name: "saleh",
    username: "bassamo",
    scores: [
      { day: 12, points: 80 },
      { day: 13, points: 20 },
      { day: 14, points: 100 },
      { day: 15, points: 100 },
      { day: 16, points: 32 },
      { day: 17, points: 40 },
      { day: 18, points: 80 },
      { day: 19, points: 90 },
      { day: 20, points: 80 },
    ],
  },
];

export default function Leaderboard() {
  const [topStudents, setTopStudents] = useState(dummyData);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { currentContest } = useDashboardData();
  usePageTitle(t("leaders-board"));

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  let last = 1;
  return (
    <LeaderBoardMain>
      {currentContest && (
        <div>
          <LeaderBoardMainTitel>
            Participant Performance (251)
          </LeaderBoardMainTitel>

          <LeaderBoardContainer>
            {topStudents.map((student, index) => (
              <StudentPointsWrapper key={student.id}>
                <SecondaryWrapper>
                  <TopStudentsSpan> #{index + 1}</TopStudentsSpan>
                  <Top3RankDiv>
                    <Top2Img style={{ background: getColor(index) }}>
                      {getInitials(student)}
                    </Top2Img>
                    <Top2Name>{getFullName(student)}</Top2Name>
                  </Top3RankDiv>
                  <DivLine />
                </SecondaryWrapper>

                <WarbSlider>
                  {student.scores.map((score) => (
                    <AverageWrapper key={score.day}>
                      <DayInAverageWrapper>
                        {score.day} Ramadan
                      </DayInAverageWrapper>
                      <AverageParents>{score.points}/100</AverageParents>
                    </AverageWrapper>
                  ))}
                </WarbSlider>

                <SecondaryWrapper>
                  <DivLine />
                  {student.username.length > 0 && (
                    <AverageWrapperButon>
                      <PAverageWrapper>Average</PAverageWrapper>
                      <AverageParents>
                        {student.total_points}/100
                      </AverageParents>
                    </AverageWrapperButon>
                  )}
                </SecondaryWrapper>
              </StudentPointsWrapper>
            ))}
          </LeaderBoardContainer>
        </div>
      )}
    </LeaderBoardMain>
  );
}
