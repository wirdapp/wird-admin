import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { updateContest } from "../../../services/competitionsServices";

import { ParticipantsTitelsAtHome } from "../ContestMembers/ContestMembers.styles";
import {
  ButtonStyle,
  Form,
  OverflowScrolling,
  ParticipantsNumbers,
} from "./EditCompetition.styles";

import { DivPass } from "../../Admins/Admins.styles";
import InputField from "../../ContestCriteria/InputField";
import { Checkbox } from "../../../ui/checkbox";
import { css } from "@emotion/css";

export default function EditCompetitionForm({ contest, onChange }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showStanding, setShowStanding] = useState(true);
  const [readOnlyMode, setReadOnlyMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [classColor, setClassColor] = useState("");

  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setName(contest.name);
    setDescription(contest.description);
    setReadOnlyMode(contest.readonly_mode);
    setShowStanding(contest.show_standings);
  };
  const handleUpdateContest = () => {
    let data = {
      name: name,
      description: description,
      show_standings: showStanding,
      readonly_mode: readOnlyMode,
    };

    updateContest(
      contest.id,
      data,
      (res) => {
        if (res?.status === 200) {
          contest.name = name;
          contest.readonly_mode = readOnlyMode;
          contest.show_standings = showStanding;

          setClassColor("green");
          setMessages([t("contest-has-been-edited-successfully")]);
        }
      },
      (err) => {
        let errMessages = [];
        errMessages.push([t("contest-isn't-edited-successfully")]);
        if (err.response.data) {
          let obj = err.response.data;
          Object.keys(obj).forEach((e) => {
            errMessages.push(`${obj[e]} : ${e}`);
          });
        }
        setClassColor("red");
        setMessages(errMessages);
      },
    );
  };

  const handleShowStandingChange = (e) => {
    setShowStanding(e.target.checked);
  };

  const handleReadOnlyChange = (e) => {
    setReadOnlyMode(e.target.checked);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    onChange({ ...contest, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onChange({ ...contest, description: e.target.value });
  };

  return (
    <Form>
      <ParticipantsNumbers>
        <ParticipantsTitelsAtHome>
          {t("contest-information")}
        </ParticipantsTitelsAtHome>

        <OverflowScrolling>
          <InputField
            type="text"
            label={t("name-label")}
            onChange={handleNameChange}
            value={name}
          />
          <InputField
            type={"text"}
            label={t("description-label")}
            onChange={handleDescriptionChange}
            value={description}
          />
          <div
            className={css`
              padding-inline-start: 90px;
            `}
          >
            <Checkbox
              label={t("active-announcements")}
              checked={showStanding}
              onChange={handleShowStandingChange}
            />
            <Checkbox
              label={t("readonly")}
              checked={readOnlyMode}
              onChange={handleReadOnlyChange}
            />
          </div>

          {messages.length > 0 &&
            messages.map((message, index) => {
              return (
                <DivPass className={classColor} key={index}>
                  {message}
                </DivPass>
              );
            })}

          <ButtonStyle onClick={handleUpdateContest}>{t("update")}</ButtonStyle>
        </OverflowScrolling>
      </ParticipantsNumbers>
    </Form>
  );
}
