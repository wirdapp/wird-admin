import React, { useEffect, useState } from "react";
import {
  retrieveStudents,
  retrieveStudentsPointsOfTypeOther,
  updateStudentPoint,
} from "../../services/studentsServices";
import { DropDownDiv, DropdownList, TxtArea } from "./ReviewOtherPoints.styles";
import { DropdownDivSelect as Box } from "../Groups/Groups.styles";
import Tabs from "../shared/Tabs";
import { H5 } from "../Students/setPasswordStudent/SetPasswordStudent.styles";
import { Span } from "../Login/login.styles";
import {
  DivPass,
  DivTxtField,
  DivTxtFieldnumber,
  DropdownListItem,
  Form,
  FormInput,
  FormInputnumber,
  InputSubmit,
  Label,
} from "../shared/styles";
import Container from "../Standards/Standards.styles";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useTranslation } from "react-i18next";

export default function ReviewOtherPoints() {
  const { t } = useTranslation();
  const [selectedStudentUsername, setSelectedStudentUsername] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);
  const [students, setStudents] = useState([]);
  const [otherPoints, setOtherPoints] = useState([]);
  const [messages, setMessages] = useState([]);
  const [classColor, setClassColor] = useState("");
  const [selectedPoint, setSelectedPoint] = useState({});
  const [pointRecord, setPointRecord] = useState(-1);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    retrieveStudents(
      (res) => {
        setStudents(res.data.results);
        setLoading(false);
      },
      (err) => {
        console.log(
          "Failed to retrieve students: " + JSON.stringify(err.response.data),
        );
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    setMessages([]);
    setClassColor("");
  }, [
    selectedStudentUsername,
    selectedDay,
    otherPoints,
    selectedPoint,
    pointRecord,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pointRecord < 0) {
      setMessages([t("mustEnter")]);
      setClassColor("red");
      return;
    }

    updateStudentPoint(
      selectedStudentUsername,
      selectedPoint.id,
      {
        point_scored_units: pointRecord,
        point_template: selectedPoint.point_template.id,
        ramadan_record_date: selectedDay,
      },
      (res) => {
        if (res && res.status === 200) {
          let filteredOtherPoints = otherPoints.filter(
            (otherPoint) => otherPoint.id !== selectedPoint.id,
          );

          setMessages([t("succussResult")]);
          setClassColor("green");

          setTimeout(() => {
            setOtherPoints(filteredOtherPoints);
          }, 2000);
        }
      },
      (err) => {
        let errMessages = [];
        errMessages.push([t("notAddResult")]);
        if (err.response.data) {
          let obj = err.response.data;
          Object.keys(obj).forEach((e) => {
            errMessages.push(obj[e]);
          });
        }
        setClassColor("red");
        setMessages(errMessages);
      },
    );
  };

  const getUserPoint = (username, day) => {
    retrieveStudentsPointsOfTypeOther(
      username,
      day,
      (res) => {
        if (res && res.status === 200) {
          setOtherPoints(res.data.results);
          if (res.data.length === 1) {
            setSelectedPoint(res.data[0]);
          }
        }
      },
      (err) => {
        console.log(
          "Failed to retrieve students point of type other: ",
          err?.response?.data,
        );
      },
    );
  };

  const handleSelectedUserChange = (e) => {
    setSelectedPoint({});
    setOtherPoints([]);
    setSelectedStudentUsername(e.target.value);
    if (e.target.value !== "" && selectedDay !== 0) {
      getUserPoint(e.target.value, selectedDay);
    }
  };

  const handleDayChange = (e) => {
    setSelectedPoint({});
    setOtherPoints([]);
    setSelectedDay(Number(e.target.value));
    if (Number(e.target.value) !== 0 && selectedStudentUsername !== "") {
      getUserPoint(selectedStudentUsername, Number(e.target.value));
    }
  };

  const handlePointChange = (e) => {
    let point = otherPoints.filter(
      (otherPoint) => otherPoint.id === e.target.value,
    )[0];
    if (point) {
      setSelectedPoint(point);
    } else {
      setSelectedPoint({});
    }
  };

  const handlePointRecordChange = (e) => {
    setPointRecord(Number(e.target.value));
  };

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <Container>
      <Tabs
        labels={[t("reviewText")]}
        contents={[
          <>
            {students && students.length > 0 ? (
              <Form onSubmit={handleSubmit}>
                <DropDownDiv
                  className="DropdownDiv"
                  onChange={handleSelectedUserChange}
                >
                  <DropdownList className="DropdownList">
                    <DropdownListItem key={0} value="">
                      {t("selectStudent")}
                    </DropdownListItem>
                    {students.map((student, index) => (
                      <DropdownListItem
                        key={index + 1}
                        value={student.username}
                      >
                        {student.first_name} {student.last_name}
                      </DropdownListItem>
                    ))}
                  </DropdownList>
                </DropDownDiv>

                <DropDownDiv className="DropdownDiv" onChange={handleDayChange}>
                  <DropdownList className="DropdownList">
                    <DropdownListItem key={0} value="0">
                      {t("chooseDay")}
                    </DropdownListItem>
                    {[...Array(30).keys()]
                      .map((i) => i + 1)
                      .map((day) => (
                        <DropdownListItem key={day} value={day}>
                          {" "}
                          {day} {t("ramadan-word")}{" "}
                        </DropdownListItem>
                      ))}
                  </DropdownList>
                </DropDownDiv>

                {selectedDay === 0 && selectedStudentUsername === "" ? (
                  <Span>{t("selectStudentDay")}</Span>
                ) : selectedDay === 0 ? (
                  <Span>{t("chooseDay")}</Span>
                ) : selectedStudentUsername === "" ? (
                  <Span>{t("selectStudent")}</Span>
                ) : (
                  <>
                    {otherPoints && otherPoints.length === 0 ? (
                      <Span>{t("studentText")}</Span>
                    ) : otherPoints.length > 1 ? (
                      <DropDownDiv
                        className="DropdownDiv"
                        onChange={handlePointChange}
                      >
                        <DropdownList className="DropdownList">
                          <DropdownListItem key={0} value="0">
                            {" "}
                            {t("standardKey")}
                          </DropdownListItem>
                          {otherPoints.map((point, index) => (
                            <DropdownListItem key={index + 1} value={point.id}>
                              {point.point_template.label}
                            </DropdownListItem>
                          ))}
                        </DropdownList>
                      </DropDownDiv>
                    ) : (
                      <></>
                    )}
                    {Object.keys(selectedPoint).length > 0 && (
                      <>
                        {selectedPoint.user_input?.length > 0 ? (
                          <Box>
                            <H5>{t("textEntered")}</H5>
                            <TxtArea
                              readOnly
                              value={selectedPoint.user_input}
                            />
                          </Box>
                        ) : (
                          <Span>{t("notTextEntered")}</Span>
                        )}
                        <DivTxtField>
                          <FormInput
                            placeholder={t("addressKey")}
                            type="text"
                            value={selectedPoint.point_template.label}
                            readOnly
                          />
                        </DivTxtField>

                        <DivTxtFieldnumber>
                          <Span />
                          <FormInputnumber
                            type="number"
                            readOnly
                            value={
                              selectedPoint.point_template.upper_units_bound
                            }
                          />
                          <Label> {t("limitReptition")} </Label>
                        </DivTxtFieldnumber>

                        <DivTxtFieldnumber>
                          <Span />
                          <FormInputnumber
                            type="number"
                            max={selectedPoint.point_template.upper_units_bound}
                            required
                            onChange={handlePointRecordChange}
                          />
                          <Label>{t("enterResult")}</Label>
                        </DivTxtFieldnumber>

                        {messages.length > 0 &&
                          messages.map((message, index) => {
                            return (
                              <DivPass className={classColor} key={index}>
                                {message}
                              </DivPass>
                            );
                          })}
                        <InputSubmit type="submit">
                          {t("addResult")}
                        </InputSubmit>
                      </>
                    )}
                  </>
                )}
              </Form>
            ) : (
              <H5> {t("notStudent")}</H5>
            )}
          </>,
        ]}
      />
    </Container>
  );
}
