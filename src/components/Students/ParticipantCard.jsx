import { useTranslation } from "react-i18next";
import DropDownMenu from "./DropDown";
import ParticipantCards, {
  BoldText,
  ColumnContainer,
  LightText,
  ParticipantsNumbers,
  ShortedName
} from "./ParticipantCard.styles";
const ModeratorCard = ({
  key,
  name,
  student,
  setStudents,
  students
}) => {

  const { t } = useTranslation();


  return (
    <ParticipantCards key={key}>
      <ParticipantsNumbers>
        <div style={{ display: "flex", gap: "12px" }}>
          <ShortedName>
            {name.split(" ").length > 1
              ? (
                name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0)
              ).toUpperCase()
              : name.slice(0, 2).toUpperCase()}

          </ShortedName>
          <ColumnContainer>
            <BoldText>{name}</BoldText>
            <LightText>{t("first-name")}: {student?.person_info
              ?.first_name
            }</LightText>
            <LightText>{t("last-name")}: {student?.person_info
              ?.last_name
            }</LightText>
            <LightText>{t("mainRole")}: <span
              style={{ color: student?.contest_role == 5 || student?.contest_role == 6 ? "red" : "green" }}>
              {t(`role.${student?.contest_role}`)} </span> </LightText>

          </ColumnContainer>
        </div>
        <DropDownMenu
          name={name}
          student={student}
          setStudents={setStudents}
          students={students}
        />

      </ParticipantsNumbers>

    </ParticipantCards >
  );
};

export default ModeratorCard;
