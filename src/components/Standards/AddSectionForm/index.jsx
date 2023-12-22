import React, {useEffect, useState} from 'react';
import {Span} from "../AddStandardForm/AddStandardForm.styles"
import {
    DivTxtFieldnumber,
    FormInputnumber,
    Label,
    InputSubmit,
    FormInput,
    DivTxtField,
    Formm,
    H3Pass
} from "../../shared/styles";
import {addSection} from "../../../services/standardServices";
import { useTranslation } from 'react-i18next';

export default function AddSectionForm(props){

    const [label, setLabel] = useState("");
    const [position, setPosition] = useState(-1);
    const [messages, setMessages] = useState([]);
    const [classColor, setClassColor] = useState("");
    const {t} = useTranslation();
    useEffect(()=>{
        resetAddSectionForm();
    },[props.reset]);

    const resetAddSectionForm = ()=>{
      setLabel("");
      setPosition(-1);
    };

    const handleLabelChange = (e)=>{
        setLabel(e.target.value);
    };

    const handlePositionChange = (e)=>{
        setPosition(e.target.value);
    };

    const handleAddSectionSubmit = (e)=>{
        e.preventDefault();

        addSection({
                label: label,
                position: position
            },
            (res) => {
                if (res && res.status === 201) {
                    resetAddSectionForm();

                    setClassColor("green");
                    setMessages([t("success-add-section-msg")]);

                    setTimeout(()=>{
                        props.setSections([...props.sections, {label: label, position: position, id : res.data.id}]);
                        setClassColor("");
                        setMessages([]);
                    },2000);
                }
            },
            (err) => {
                let errMessages =[];
                errMessages.push([t("fail-add-section-msg")]);
                if(err.response.data){
                    let obj = err.response.data;
                    Object.keys(obj).forEach(e => {
                        errMessages.push(`${obj[e]} : ${e}`);
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
            <DivTxtField>
                <Span/>
                <FormInput placeholder={t("enter-title")} type="text" required value={label} onChange={handleLabelChange}/>
            </DivTxtField>

            <DivTxtFieldnumber>
                <Span/>
                <FormInputnumber type="number"  min='1' value={position !== -1 ? (position+"") : "" } required onChange={handlePositionChange}/>
                <Label>   {t("section-order")}</Label>
            </DivTxtFieldnumber>

            {messages.length > 0 &&
                messages.map((message, index) => {
                    return <H3Pass className={classColor} key={index}>{message}</H3Pass>
                })
            }
            <InputSubmit type="submit">{t("add-section")}</InputSubmit>
        </Formm>
    );
};