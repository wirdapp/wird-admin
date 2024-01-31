import React, { useEffect, useState } from "react";
import AddStandardForm from "./AddStandardForm";
import EditStandardForm from "./EditStandardForm";
import AddSectionForm from "./AddSectionForm";
import EditSectionForm from "./EditSectionForm";
import { deleteSection, deleteStandard } from "../../services/standardServices";
import Tabs from "../shared/Tabs";
import Container, { StandardsDropDownList } from "./Standards.styles";
import Modal from "../shared/Modal";
import {
  Button,
  DivPass,
  DropdownListItem,
  Span,
} from "../Admins/Admins.styles";
import { H5 } from "../Students/setPasswordStudent/SetPasswordStudent.styles";
import Loader from "../Loader";
import { isSuperAdmin } from "../../util/ContestPeople_Role";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";

export default function Standards() {
  const { currentUser } = useDashboardData();

  const [sections, setSections] = useState([]);
  const [standards, setStandards] = useState([]);
  const [openStandardModal, setOpenStandardModal] = useState(false);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [standardIdToDelete, setStandardIdToDelete] = useState("");
  const [sectionIdToDelete, setSectionIdToDelete] = useState("");
  const [hasPermission, setPermission] = useState(false);
  const [labels, setLabels] = useState([]);
  const [currentLabels, setCurrentLabels] = useState([]);
  const [contents, setContents] = useState([]);
  const [currentContents, setCurrentContents] = useState([]);
  const [showStandardDeleteFailedMsg, setShowStandardDeleteFailedMsg] =
    useState(false);
  const [showSectionDeleteFailedMsg, setShowSectionDeleteFailedMsg] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    // retrieveStandards(
    //   (res) => {
    //     setStandards(res.data.results);
    //     setLoading(false);
    //   },
    //   (err) => {
    //     console.log(
    //       "Failed to retrieve standards, ERROR: ",
    //       JSON.stringify(err.response.data)
    //     );
    //     setLoading(false);
    //   }
    // );
    //
    // retrieveSections(
    //   (res) => {
    //     setSections(res.data);
    //   },
    //   (err) => {
    //     console.log(
    //       "Failed to retrieve sections, ERROR: ",
    //       JSON.stringify(err.response.data)
    //     );
    //   }
    // );
  }, []);

  useEffect(() => {
    setPermission(currentUser && isSuperAdmin(currentUser?.role));
  }, [context.adminInfo]);

  useEffect(() => {
    let labelsArray = [];
    let contentsArray = [];
    let currentLabelsArray = [];
    let currentContentsArray = [];

    if (hasPermission) {
      if (sections && sections.length > 0) {
        labelsArray.push(t("edit-section"));
        contentsArray.push(
          <EditSectionForm sections={sections} setSections={setSections} />,
        );
      }
      labelsArray.push(t("addSection"));
      contentsArray.push(
        <AddSectionForm sections={sections} setSections={setSections} />,
      );
      if (standards && standards.length > 0) {
        labelsArray.push(t("edit-criteria"));
        contentsArray.push(
          <EditStandardForm
            sections={sections}
            standards={standards}
            setStandards={setStandards}
          />,
        );
      }
      labelsArray.push(t("add-criteria"));
      contentsArray.push(
        <AddStandardForm
          sections={sections}
          standards={standards}
          setStandards={setStandards}
        />,
      );
    }

    if (sections && sections.length > 0) {
      currentLabelsArray.push(t("currentSections"));
      currentContentsArray.push(
        <StandardsDropDownList className="DropdownList">
          {sections.map((section, index) => {
            return (
              <DropdownListItem key={index}>
                {hasPermission ? (
                  <>
                    <Button
                      id="deleteBtn"
                      onClick={handleOpenSectionModelChange}
                      value={section.id}
                    >
                      {t("delete")}{" "}
                    </Button>
                    <Span>{section.label}</Span>
                  </>
                ) : (
                  <Span style={{ width: "100%" }}>{section.label}</Span>
                )}
              </DropdownListItem>
            );
          })}
          {showSectionDeleteFailedMsg && (
            <DropdownListItem>
              <DivPass className="red">{t("deleteRecord")} </DivPass>
            </DropdownListItem>
          )}
        </StandardsDropDownList>,
      );
    }

    if (standards && standards.length > 0) {
      currentLabelsArray.push(t("currentStandards"));
      currentContentsArray.push(
        <StandardsDropDownList className="DropdownList">
          {standards.map((standard, index) => {
            return (
              <DropdownListItem key={index}>
                {hasPermission ? (
                  <>
                    <Button
                      id="deleteBtn"
                      onClick={handleOpenStandardModelChange}
                      value={standard.id}
                    >
                      {t("delete")}{" "}
                    </Button>
                    <Span>{standard.label}</Span>
                  </>
                ) : (
                  <Span style={{ width: "100%" }}>{standard.label}</Span>
                )}
              </DropdownListItem>
            );
          })}
          {showStandardDeleteFailedMsg && (
            <DropdownListItem>
              <DivPass className="red">{t("deleteAllStudents")} </DivPass>
            </DropdownListItem>
          )}
        </StandardsDropDownList>,
      );
    }

    setCurrentLabels(currentLabelsArray);
    setCurrentContents(currentContentsArray);
    setLabels(labelsArray);
    setContents(contentsArray);
  }, [
    sections,
    standards,
    hasPermission,
    showStandardDeleteFailedMsg,
    showSectionDeleteFailedMsg,
  ]);

  const handleOpenStandardModelChange = (e) => {
    setStandardIdToDelete(e.target.value);
    setOpenStandardModal(true);
  };

  const handleOpenSectionModelChange = (e) => {
    setSectionIdToDelete(e.target.value);
    setOpenSectionModal(true);
  };

  const deleteStandardFunction = () => {
    deleteStandard(
      standardIdToDelete,
      (res) => {
        if (res && res.status === 204) {
          console.log(
            `Standard with id: ${standardIdToDelete} has been deleted`,
          );
          setStandards([
            ...standards.filter(
              (standard) => standard.id !== Number(standardIdToDelete),
            ),
          ]);
        }
      },
      (err) => {
        console.log(
          "Failed to delete standard: ",
          JSON.stringify(err.response.data),
        );
        if (err?.response?.status === 500) {
          setShowStandardDeleteFailedMsg(true);
          setTimeout(() => {
            setShowStandardDeleteFailedMsg(false);
          }, 7000);
        }
      },
    );
    setOpenStandardModal(false);
  };

  const deleteSectionFunction = () => {
    deleteSection(
      sectionIdToDelete,
      (res) => {
        if (res && res.status === 204) {
          console.log(`Section with id: ${sectionIdToDelete} has been deleted`);
          setSections(
            sections.filter(
              (section) => section.id !== Number(sectionIdToDelete),
            ),
          );
        }
      },
      (err) => {
        console.log(
          "Failed to delete section: ",
          JSON.stringify(err.response.data),
        );
        if (err?.response?.status === 500) {
          setShowSectionDeleteFailedMsg(true);
          setTimeout(() => {
            setShowSectionDeleteFailedMsg(false);
          }, 7000);
        }
      },
    );
    setOpenSectionModal(false);
  };

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <>
      {openSectionModal && (
        <Modal
          title={t("delete-confirm")}
          content={t("deleteSection")}
          deleteBtn={t("delete")}
          cancelBtn={t("cancel")}
          setOpenModal={setOpenSectionModal}
          deleteFunction={deleteSectionFunction}
        />
      )}

      {openStandardModal && (
        <Modal
          title={t("delete-confirm")}
          content={t("deleteCriterion")}
          deleteBtn={t("delete")}
          cancelBtn={t("cancel")}
          setOpenModal={setOpenStandardModal}
          deleteFunction={deleteStandardFunction}
        />
      )}
      <Container>
        {
          // TODO: We need to add images for both of other and checkbox types, for now
          //       there is just an image for numeric type.
          // <H3Login>نوع النموذج الذي تم اختياره</H3Login>
          // <Frame>
          //     <Framephone>
          //         <Imgtype src={typephoto + '.png'} alt=""/>
          //         {/* <Imgtype src="type2.png" alt="" /> */}
          //
          //     </Framephone>
          // </Frame>
        }

        {currentLabels.length === 0 && labels.length === 0 && (
          <Tabs
            labels={[t("criterias")]}
            contents={[<H5>{t("noStandard")}</H5>]}
          />
        )}
        <Tabs
          labels={currentLabels}
          contents={currentContents}
          contentClass=" no-padding"
        />

        <Tabs labels={labels} contents={contents} />
      </Container>
    </>
  );
}
