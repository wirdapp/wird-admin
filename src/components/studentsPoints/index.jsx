import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {retrieveStudents} from "../../services/studentsServices";
import TotalByPoints from "./TotalByDayChart";
import TotalByLabelChars from "./TotalByLabelChart";
import LoginFormContainer, {
  ChartsContainer,
  DropdownDiv,
  DropdownList,
  LoginForm,
  PointShow,
  SelectInputContainer,
  Wird,
} from "../studentsPoints/StudentsPoints.styles";
import {DropdownListItem} from "../shared/styles";

import TableData from "./table";
import Loader from "../Loader";
import { useTranslation } from "react-i18next";

export default function StudentsPoints() {
  const [Students, setStudents] = useState(null);
  const [username, setUsername] = useState("");
  const [day, setDay] = useState("");
  const [studentsResultsFlag, SetStudentsResultsFlag] = useState(true);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    setLoading(true);
    retrieveStudents(
      (res) => {
        setStudents(res.data);
        setLoading(false);
      },
      (err) => {
        console.log("ERROR: " + JSON.stringify(err.response.data));
        setLoading(false);
      }
    );
  }, []);

  const handleSelectedUser = (e) => {
    setUsername(e.target.value);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  if (loading) {
    return (
      <main>
        <Loader/>
      </main>
    );
  }

  return (
    <LoginFormContainer>
      <PointShow>
        <LoginForm>
          {Students?.length === 0 || !Students ? (
            <p style={{textAlign: "center", margin: 0}}>
              {" "}
              {t("noStudentDiplay")}{" "}
            </p>
          ) : (
            <>
              {studentsResultsFlag ? (
                <Wird
                  onClick={() => SetStudentsResultsFlag(!studentsResultsFlag)}
                >
                  {t("clickView")}                </Wird>
              ) : (
                <Wird
                  onClick={() => SetStudentsResultsFlag(!studentsResultsFlag)}
                >
                  {t("viewChart")}                </Wird>
              )}
              <SelectInputContainer>
                <DropdownDiv className="DropdownDiv">
                  <DropdownList
                    className="DropdownList"
                    onChange={handleSelectedUser}
                  >
                    <DropdownListItem key={0} value="">
                      {t("chooseContestant")}{" "}
                    </DropdownListItem>
                    {Students && (
                      <>
                        {Students.map((student, index) => (
                          <DropdownListItem
                            key={index + 1}
                            value={student.username}
                          >
                            {student.first_name} {student.last_name}
                          </DropdownListItem>
                        ))}
                      </>
                    )}
                  </DropdownList>
                </DropdownDiv>

                {!studentsResultsFlag && (
                  <DropdownDiv className="DropdownDiv">
                    <DropdownList
                      className="DropdownList"
                      onChange={handleDayChange}
                    >
                      <DropdownListItem key={0} value="">
                        {t("chooseRamdan")}                      </DropdownListItem>
                      {Array(30)
                        .fill(undefined)
                        .map((val, idx) => (
                          <DropdownListItem key={idx + 1} value={idx + 1}>
                            {idx + 1} {t("ramadan-word")}                          </DropdownListItem>
                        ))}
                    </DropdownList>
                  </DropdownDiv>
                )}
              </SelectInputContainer>
              {studentsResultsFlag && (
                <ChartsContainer>
                  <TotalByPoints selectedUser={username}/>
                  <TotalByLabelChars selectedUser={username}/>
                </ChartsContainer>
              )}

              {!studentsResultsFlag && (
                <TableData selectedUser={username} selectedDay={day}/>
              )}
            </>
          )}
        </LoginForm>
      </PointShow>
    </LoginFormContainer>
  );
}
