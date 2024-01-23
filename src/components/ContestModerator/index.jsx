import React, { useEffect, useState } from "react";
import Loader from "components/Loader";
import { ReactComponent as SearchIcons2 } from "assets/icons/search2.svg";
import { useTranslation } from "react-i18next";

import ContestModeratorDefault, {
  AddModeratorContainer,
  AddModeratorSpan,
  BoldText,
  ContentContainer,
  GoBtn,
  ModeratorSearchContainer,
  RowContainer,
  SearchContainer,
  SearchContainerForm,
  SearchInput,
  SearchInputContainer,
} from "./ContestModerator.styles";

import ModeratorCard from "./ModeratorCard";
// import {retrieveContestInfo} from "../../services/competitionsServices";
import { DivPass } from "../ResetPassword/ResetPassword.styles";
import { useDashboardData } from "../../util/routes-data";
import { MembersApi } from "../../services/members/api";

const ContestModerator = () => {
  const { currentUser, currentContest } = useDashboardData();
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminSearchText, setAdminSearchText] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalState, setModalState] = useState(false);
  const [newAdminUsername, setNewAdminUsername] = useState("");

  const fetchAdmins = async (search) => {
    setLoading(true);
    try {
      const data = await MembersApi.getAdmins({ search });
      setAdmins(data.results);
    } catch (err) {
      console.log("Failing", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!currentContest) return;
    fetchAdmins();
  }, []);

  const handleAdminSearchTextChange = (e) => {
    setAdminSearchText(e.target.value);
  };

  const handleAdminSearchClick = async () => {
    setLoading(true);
    await fetchAdmins(adminSearchText);
    setIsExpanded(false);
  };

  const handleNonAdminTextChange = (e) => {
    setNewAdminUsername(e.target.value);
  };

  const handleAddAdminManuallyClick = () => {
    if (newAdminUsername.length === 0) {
      return;
    }
    MembersApi.addAdminToContest({ username: newAdminUsername })
      .then(() => {
        setNewAdminUsername("");
        setShowErrorMessage(false);
        fetchAdmins();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.detail);
        setShowErrorMessage(true);
      });
  };

  const getAdminsNumber = () => {
    return admins.some(
      (admin) => admin.person_info.username === currentUser?.username,
    )
      ? admins.length - 1
      : admins.length;
  };

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <ContestModeratorDefault>
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
              {t("moderators")}
              {` (${getAdminsNumber()})`}
            </BoldText>
            <ModeratorSearchContainer>
              <SearchInput
                onChange={handleAdminSearchTextChange}
                onClick={() => setIsExpanded(!isExpanded)}
                placeholder={t("search")}
                value={adminSearchText.length === 0 ? "" : adminSearchText}
                isExpanded={isExpanded}
              />
              <SearchIcons2 onClick={handleAdminSearchClick} />
            </ModeratorSearchContainer>
          </RowContainer>

          {admins
            .filter(
              (admin) => admin.person_info.username !== currentUser.username,
            )
            .map((person, idx) => {
              return (
                <ModeratorCard
                  key={idx}
                  person={person.person_info}
                  admins={admins}
                  setAdmins={setAdmins}
                />
              );
            })}
        </div>

        <AddModeratorContainer>
          <AddModeratorSpan>{t("add-moderator-manually")}</AddModeratorSpan>
          <SearchInputContainer>
            <SearchContainerForm>
              <SearchContainer
                placeholder={t("username")}
                type="text"
                onChange={handleNonAdminTextChange}
              />
            </SearchContainerForm>

            <GoBtn onClick={handleAddAdminManuallyClick}>
              {t("add-admin")}
            </GoBtn>
          </SearchInputContainer>
          {showErrorMessage && (
            <DivPass className="red">{errorMessage}</DivPass>
          )}
        </AddModeratorContainer>
      </ContentContainer>
    </ContestModeratorDefault>
  );
};

export default ContestModerator;
