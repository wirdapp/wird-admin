import { useDashboardData } from "../../util/routes-data";
import { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";
import { Modal } from "../../ui/modal";
import { TextArea } from "../../ui/input";
import { TrashIcon } from "@heroicons/react/20/solid";
import { updateContest } from "../../services/contests/api";

const StyledAnnouncementWrapper = styled.div`
  width: 100%;

  > div {
    padding: 24px;
    background-color: ${colors.warmWheat};
    border-radius: 24px;
    height: 100%;
  }

  h2 {
    font-size: 16px;
    font-weight: 700;
  }

  .announcement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledAnnouncementsList = styled.ul`
  list-style: none;
  padding: 16px 0;
  margin: 0;
  display: flex;
  gap: 2px;
  flex-direction: column;

  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.white};
    padding: 12px;
    border-radius: 0;
    white-space: pre-wrap;

    button {
      min-width: 0;
    }

    &:first-child {
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
`;

export const ManageAnnouncements = () => {
  const { currentContest } = useDashboardData();
  const { t } = useTranslation();

  const [announcements, setAnnouncments] = useState(
    currentContest.announcements ?? [],
  );
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [announcementFormVisible, setAnnouncementFormVisible] = useState(false);

  const handleAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value);
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    const newAnnouncements = [...announcements, newAnnouncement.trim()];
    await updateContest(currentContest.id, {
      ...currentContest,
      announcements: newAnnouncements,
    });
    setAnnouncments(newAnnouncements);
    setNewAnnouncement("");
    setAnnouncementFormVisible(false);
  };

  const handleAnnouncementDelete = (index) => {
    setAnnouncments(announcements.filter((_, i) => i !== index));
  };

  return (
    <StyledAnnouncementWrapper>
      <div>
        <div className="announcement-header">
          <h2>{t("active-announcements")}</h2>

          <Button onClick={() => setAnnouncementFormVisible(true)}>
            {t("new-announcement")}
          </Button>
        </div>
        {announcements.length === 0 ? (
          <p>{t("no-announcements-yet")}</p>
        ) : (
          <StyledAnnouncementsList>
            {announcements.map((announcement, index) => (
              <li key={index}>
                {announcement}
                <Button
                  variant="link"
                  onClick={() => handleAnnouncementDelete(index)}
                >
                  <TrashIcon />
                </Button>
              </li>
            ))}
          </StyledAnnouncementsList>
        )}
      </div>
      <Modal
        title={t("make-an-announcement")}
        visible={announcementFormVisible}
        onClose={() => setAnnouncementFormVisible(false)}
      >
        <TextArea
          rows={5}
          onChange={handleAnnouncementChange}
          value={newAnnouncement}
        />
        <Button onClick={handleAnnouncementSubmit}>{t("submit")}</Button>
      </Modal>
    </StyledAnnouncementWrapper>
  );
};
