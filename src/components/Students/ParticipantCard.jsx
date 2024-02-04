import { useTranslation } from "react-i18next";
import DropDownMenu from "./DropDown";
import ParticipantCards, {
  BoldText,
  ColumnContainer,
  LightText,
  ParticipantsNumbers,
  ShortedName,
} from "./ParticipantCard.styles";
import { getFullName, getInitials } from "../../util/user-utils";

const ModeratorCard = ({ student, onChange }) => {
  const { t } = useTranslation();

  return (
    <ParticipantCards>
      <ParticipantsNumbers>
        <div style={{ display: "flex", gap: "12px" }}>
          <ShortedName>{getInitials(student?.person_info)}</ShortedName>
          <ColumnContainer>
            <BoldText>{student?.person_info.username}</BoldText>
            <LightText>{getFullName(student?.person_info)}</LightText>
            <LightText>
              {t("mainRole")}:{" "}
              <span
                style={{
                  color:
                    student?.contest_role == 5 || student?.contest_role == 6
                      ? "red"
                      : "green",
                }}
              >
                {t(`role.${student?.contest_role}`)}{" "}
              </span>{" "}
            </LightText>
          </ColumnContainer>
        </div>
        <DropDownMenu student={student} onChange={onChange} />
      </ParticipantsNumbers>
    </ParticipantCards>
  );
};

export default ModeratorCard;
