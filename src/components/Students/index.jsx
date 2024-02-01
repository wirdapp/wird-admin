import { App, Empty, Radio } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MembersApi } from "../../services/members/api";
import { Role } from "../../util/ContestPeople_Role";
import Loader from "../Loader";
import ParticipantCard from "./ParticipantCard";
import StudentsContainer, {
  AddModeratorSpan,
  AddParticipantContainer,
  ContentContainer,
  GoBtn,
  SearchContainer,
  SearchContainerForm,
  SearchInputContainer,
} from "./Students.styles";

export default function Students() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const typeOfMembers = useRef("");

  const callMemebersData = (page = 1) => {
    setLoading(true);

    MembersApi.getUsers({ role: typeOfMembers.current })
      .then((data) => setStudents(data))
      .catch((e) => console.log("student error", e))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    callMemebersData();
  }, []);

  const handleChange = (e) => setSearch(e.target.value);

  const handleSearch = async () => {
    if (!search.length) return;
    try {
      const res = await MembersApi.addUserToContest({
        role: 3,
        username: search,
      });
      message.success(t("notification.addStudent"));
    } catch (error) {
      message.error(t("notification.errorStudent"));
    }
  };

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

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
          <Radio.Group
            value={typeOfMembers.current}
            onChange={(e) => {
              typeOfMembers.current = e.target.value;
              callMemebersData();
            }}
            style={{
              marginBottom: 16,
            }}
          >
            <Radio.Button value="">{t("see-all")}</Radio.Button>
            <Radio.Button value={`${Role.MEMBER}`}>{t("role.3")}</Radio.Button>
            <Radio.Button value={`${Role.PENDING}`}>{t("role.5")}</Radio.Button>
            <Radio.Button value={`${Role.DEACTIVATED}`}>
              {t("role.6")}
            </Radio.Button>
          </Radio.Group>
          {students.length === 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description={t("dailySubmissionsPopup.noData")}
            />
          )}
          {students?.map?.((student, idx) => {
            return (
              <ParticipantCard
                key={idx}
                name={
                  student.person?.first_name?.length > 0
                    ? student.person_info.first_name +
                      " " +
                      student.person_info.last_name
                    : student.person_info.username
                }
                username={student.person_info.username}
                setStudents={setStudents}
                student={student}
                students={students}
              />
            );
          })}
        </div>

        <AddParticipantContainer>
          <AddModeratorSpan>{t("addParticipantManually")}</AddModeratorSpan>
          <SearchInputContainer>
            <SearchContainerForm>
              <SearchContainer
                placeholder={t("username")}
                type="text"
                onChange={handleChange}
                value={search}
              />
            </SearchContainerForm>

            <GoBtn onClick={handleSearch}>{t("add-admin")}</GoBtn>
          </SearchInputContainer>
        </AddParticipantContainer>
      </ContentContainer>
    </StudentsContainer>
  );
}
