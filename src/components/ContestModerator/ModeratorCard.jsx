import ModeratorCards, {
  BoldText,
  ColumnContainer,
  LightText,
  ParticipantsNumbers,
  ShortedName,
} from "./ModeratorCards";
import { useTranslation } from "react-i18next";
import { updateContestPeopleRole } from "../../services/adminsServices";
import { useDashboardData } from "../../util/routes-data";
import { getFullName } from "../../util/user-utils";
import { Button } from "antd";

const ModeratorCard = ({ person, onChange }) => {
  const { t } = useTranslation();
  const { currentUser } = useDashboardData();

  let fullName = getFullName(person);
  let userName = person.username;
  if (!fullName) fullName = userName;

  const deactivateAdmin = (username) => {
    updateContestPeopleRole(
      username,
      {
        contest_role: 6,
      },
      (res) => {
        if (res && res.status === 200) {
          onChange?.();
        }
      },
      (err) => {
        console.log(`Failed to deactivate admin ${username}: ${err}`);
      },
    );
  };

  return (
    <ModeratorCards>
      <ParticipantsNumbers>
        <div style={{ display: "flex", gap: "12px" }}>
          <ShortedName>
            {` ${"name".match(/\b\w/g).join("").toUpperCase()}`}
          </ShortedName>
          <ColumnContainer>
            <BoldText>{fullName}</BoldText>
            <LightText>{userName}</LightText>
          </ColumnContainer>
        </div>

        {currentUser?.username !== userName && (
          <Button
            danger
            onClick={() => {
              deactivateAdmin(userName);
            }}
          >
            {t("deactivate")}
          </Button>
        )}
      </ParticipantsNumbers>
    </ModeratorCards>
  );
};

export default ModeratorCard;
