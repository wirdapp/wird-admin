import React, {useEffect, useState} from 'react';
import {
    Span,
    DropdownListStanderd,
} from "../AddStandardForm/AddStandardForm.styles";

import {
    DivTxtFieldnumber,
    FormInputnumber,
    Label,
    InputSubmit,
    FormInput,
    DivTxtField,
    Formm,
    H3Pass,
    DropdownDiv,
    DropdownListItemStanderd
} from "../../shared/styles";

import {updateSection} from "../../../services/standardServices";
import { useTranslation } from 'react-i18next';

export default function EditSectionForm(props){

    const [selectedSection, setSelectedSection] = useState({});
    const [label, setLabel] = useState("");
    const [position, setPosition] = useState(-1);
    const [messages, setMessages] = useState([]);
    const [classColor, setClassColor] = useState("");
    const {t} = useTranslation();
    useEffect(()=>{
        resetEditSectionForm();
    },[props.reset]);

    const resetEditSectionForm = ()=>{
        setLabel("");
        setSelectedSection({});
        setPosition(-1);
    };

    const handleLabelChange = (e)=>{
        setLabel(e.target.value);
    };

    const handlePositionChange = (e)=>{
        setPosition(e.target.value);
    };

    const handleSelectedSectionChange = (e)=>{
        if(e.target.value ===""){
            resetEditSectionForm();
        }else{
            let sec = props.sections.filter(section => section.id === Number(e.target.value))[0];
            setSelectedSection(sec);
            setLabel(sec.label);
            setPosition(sec.position);
        }
    }

    const handleAddSectionSubmit = (e)=>{
        e.preventDefault();

        if(Object.keys(selectedSection).length === 0){
            setMessages([t('mustEdit')]);
            setClassColor("red");
            return;
        }

        updateSection(selectedSection.id,
            {
                label: label,
                position: position
            },
            (res) => {
                if (res && res.status === 200) {
                    let updatedSection = props.sections.filter( section => section.id === Number(selectedSection.id))[0];
                    updatedSection.label = label;
                    updatedSection.position = position;
                    resetEditSectionForm();

                    setClassColor("green");
                    setMessages([t('success-edit-section-msg')]);

                    setTimeout(()=>{
                        props.setSections(
                            [...props.sections.filter( section => section.id !== Number(selectedSection.id)), updatedSection]
                        );
                        setClassColor("");
                        setMessages([]);
                    },2000);
                }
            },
            (err) => {
                let errMessages =[];
                errMessages.push([t("fail-edit-section-msg")]);
                if(err.response.data){
                    let obj = err.response.data;
                    Object.keys(obj).forEach(e => {
                            errMessages.push(obj[e]);
                        }
                    )
                }
                setClassColor("red");
                setMessages(errMessages);
            }
        );

    }

    return(
        <Formm onSubmit={handleAddSectionSubmit}>

            { props.sections && props.sections.length > 0
                ?
                <DropdownDiv >
                    <DropdownListStanderd className='DropdownList' onChange={handleSelectedSectionChange}
                                          value={Object.keys(selectedSection).length ===0 ? "" : setSelectedSection.id}>
                        <DropdownListItemStanderd key={0} value="">{t("choose-section")}</DropdownListItemStanderd>
                        { props.sections.map((section, index) => {
                            return <DropdownListItemStanderd key={index + 1} value={section.id}>{section.label}</DropdownListItemStanderd>
                        })
                        }
                    </DropdownListStanderd>
                </DropdownDiv>
                :
                <Span>{t("displaySection")}</Span>

            }

            <DivTxtField>
                <Span/>
                <FormInput placeholder={t("enter-title")} type="text" value={label} onChange={handleLabelChange} required/>
            </DivTxtField>

            <DivTxtFieldnumber>
                <Span/>
                <FormInputnumber type="number"  min='1' value={position !== -1 ? (position+"") : "" } onChange={handlePositionChange} required/>
                <Label> {t("section-order")}</Label>
            </DivTxtFieldnumber>

            {messages.length > 0 &&
                messages.map((message, index) => {
                    return <H3Pass className={classColor} key={index}>{message}</H3Pass>
                })
            }
            <InputSubmit type="submit">{t("edit-section")}</InputSubmit>
        </Formm>
    );
};