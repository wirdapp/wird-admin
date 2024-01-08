import React, { useEffect, useState } from "react";
import {
  deleteStudent,
  retrieveDeactivatedMembers,
  retrieveStudents,
} from "../../services/studentsServices";
import Loader from "../Loader";
import { isSuperAdmin, Role } from "../../util/ContestPeople_Role";
import { ReactComponent as SearchIcons2 } from "assets/icons/search2.svg";
import { useTranslation } from "react-i18next";
import StudentsContainer, {
  AddParticipantContainer,
  BoldText,
  ContentContainer,
  RowContainer,
  SearchInput,
  StudentSearchContainer,
} from "./Students.styles";
import ParticipantCard from "./ParticipantCard";
import WaitingCard from "./WaitingCard";
import Participants from "./ParticipantsMember";
import { useDashboardData } from "../../util/routes-data";
import { usePageTitle } from "../shared/page-title";
import { MembersApi } from "../../services/members/api";

export default function Students() {
  const { currentUser } = useDashboardData();

  const { t } = useTranslation();
  usePageTitle(t("students"));

  const [students, setStudents] = useState([]);
  const [deactivatedStudents, setDeactivatedStudents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState("");
  const [hasPermission, setPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStudentsDisplayed, setIsStudentsDisplayed] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      MembersApi.getMembers(Role.DEACTIVATED).then((data) => {
        setDeactivatedStudents(data.results);
      }),
      MembersApi.getMembers(Role.MEMBER).then((data) => {
        setStudents(data.results);
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setPermission(currentUser && isSuperAdmin(currentUser));
  }, [currentUser]);

  useEffect(() => {
    setSearchText("");
  }, [isStudentsDisplayed]);

  const handleDeleteStudentModalChange = (e) => {
    setStudentToDelete(e.target.value);
    setOpenModal(true);
  };

  const deleteFunction = () => {
    deleteStudent(
      studentToDelete,
      (res) => {
        if (res && res.status === 204) {
          console.log(`Student ${studentToDelete} has been deleted`);
          setStudents(
            students.filter(
              (student) => student.person.username !== studentToDelete,
            ),
          );
        }
      },
      (err) => {
        console.log(
          "Failed to delete admin: ",
          JSON.stringify(err?.response?.data),
        );
      },
    );
    setOpenModal(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    setLoading(true);

    if (isStudentsDisplayed) {
      retrieveStudents(
        (res) => {
          setStudents(res.data);
          setLoading(false);
        },
        (err) => {
          console.log(
            "Failed to retrieve students: " +
              JSON.stringify(err?.response?.data),
          );
          setLoading(false);
        },
        searchText,
      );
    } else {
      retrieveDeactivatedMembers(
        (res) => {
          if (res && res.status === 200) {
            setDeactivatedStudents(res.data);
          }
          setLoading(false);
        },
        (err) => {
          console.log(
            "Failed to retrieve deactivated students: " +
              JSON.stringify(err?.response?.data),
          );
          setLoading(false);
        },
        searchText,
      );
    }
  };

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }
  const showDeactivatedStudents = () => {
    setIsStudentsDisplayed(!isStudentsDisplayed);
  };

  return (
    <StudentsContainer>
      <ContentContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          <RowContainer>
            <BoldText>
              {isStudentsDisplayed
                ? `${t("students")}(${students.length})`
                : `${t("deactivatedStudents")}(${deactivatedStudents.length})`}
            </BoldText>
            <StudentSearchContainer>
              <SearchInput
                value={searchText.length > 0 ? searchText : ""}
                onChange={handleSearchTextChange}
                placeholder={t("search")}
                isExpanded={isExpanded}
              />
              <SearchIcons2 onClick={handleSearchClick} />
            </StudentSearchContainer>
          </RowContainer>
          {isStudentsDisplayed
            ? students.map((student, idx) => {
                return (
                  <ParticipantCard
                    key={idx}
                    name={
                      student.person?.first_name?.length > 0
                        ? student.person.first_name +
                          " " +
                          student.person.last_name
                        : student.person.username
                    }
                    username={student.person.username}
                    setStudents={setStudents}
                    students={students}
                    setDeactivatedStudents={setDeactivatedStudents}
                    deactivatedStudents={deactivatedStudents}
                  />
                );
              })
            : deactivatedStudents.map((deactivatedStudent, idx) => {
                return (
                  <WaitingCard
                    key={idx}
                    name={
                      deactivatedStudent.person?.first_name?.length > 0
                        ? deactivatedStudent.person.first_name +
                          " " +
                          deactivatedStudent.person.last_name
                        : deactivatedStudent.person.username
                    }
                    username={deactivatedStudent.person.username}
                    setStudents={setStudents}
                    students={students}
                    setDeactivatedStudents={setDeactivatedStudents}
                    deactivatedStudents={deactivatedStudents}
                  />
                );
              })}
        </div>

        <AddParticipantContainer>
          <Participants
            title={
              isStudentsDisplayed ? t("deactivatedStudents") : t("students")
            }
            showButton
            onClick={showDeactivatedStudents}
            length={
              isStudentsDisplayed ? deactivatedStudents.length : students.length
            }
          />
        </AddParticipantContainer>
      </ContentContainer>
    </StudentsContainer>
  );
}
