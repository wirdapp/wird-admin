import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "components/shared/Sidebar";

import { retrieveStudents } from "../../services/studentsServices";
import TotalByPoints from "./TotalByDayChart";
import TotalByLabelChars from "./TotalByLabelChart";
import LoginFormContainer, {
  PointShow,
  LoginForm,
  DropdownList,
  DropdownDiv,
  Wird,
  SelectInputContainer,
  ChartsContainer,
} from "../studentsPoints/StudentsPoints.styles";
import { DropdownListItem } from "../shared/styles";

import TableData from "./table";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import MyOngoingContestTab from "components/shared/MyOngoingContestTab";
import { useTranslation } from "react-i18next";

export default function StudentsPoints() {
  const [Students, setStudents] = useState(null);
  const [username, setUsername] = useState("");
  const [day, setDay] = useState("");
  const [studentsResultsFlag, SetStudentsResultsFlag] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();
  useEffect(() => {
    if (!cookie.load("token")) {
      navigate("/login", { state: { redirectTo: "/students-points" } });
      return;
    }

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
        <Loader />
      </main>
    );
  }

  return (
    <LoginFormContainer>
      <MyOngoingContestTab />
      <PointShow>
        <LoginForm>
          {Students?.length === 0 || !Students ? (
            <p style={{ textAlign: "center", margin: 0 }}>
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
                  <TotalByPoints selectedUser={username} />
                  <TotalByLabelChars selectedUser={username} />
                </ChartsContainer>
              )}

              {!studentsResultsFlag && (
                <TableData selectedUser={username} selectedDay={day} />
              )}
            </>
          )}
        </LoginForm>
      </PointShow>
    </LoginFormContainer>
  );
}
