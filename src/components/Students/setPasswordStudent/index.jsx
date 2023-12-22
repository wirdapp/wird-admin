import React, {useState, useEffect} from "react";

import {
    DivPass,
    DropdownDiv,
    Span,
} from "./SetPasswordStudent.styles";
import {
    InputSubmit,
    DivTxtField,
    Form,
    DropdownListItem,
    DropdownList,
    FormInput
} from "../../shared/styles";
import "./Setpass.css";
import {setStudentPassword} from "../../../services/studentsServices";
import { useTranslation } from "react-i18next";

export default function SetPasswordStudents(props) {
    const [userName, setUserName] = useState("");
    const [PasswordStudent1, setPasswordStudent1] = useState("");
    const [PasswordStudent2, setPasswordStudent2] = useState("");
    const [PasswordStudentEqual, setPasswordStudentEqual] = useState(true);
    const [messages, setMessages] = useState([]);
    const [classColor, setClassColor] = useState("");
    const [isValidPassword, setValidPassword] = useState(true);
    const {t} = useTranslation();

    useEffect(() => {
        setMessages([]);
        setClassColor("");
    }, [userName, PasswordStudent1, PasswordStudent2]);

    useEffect(()=>{
        resetStudentChangePasswordForm();
    },[props.reset]);

    useEffect(()=>{
        setPasswordStudent1("");
        setPasswordStudent2("");
        setPasswordStudentEqual(true);
        setValidPassword(true);
    },[userName]);

    const resetStudentChangePasswordForm = ()=>{
        setUserName("");
        setPasswordStudent1("");
        setPasswordStudent2("");
        setPasswordStudentEqual(true);
        setValidPassword(true);
    };

    const selectedUser = (e) => {
        setUserName(e.target.value);
    };

    const handleChangeStudentPassword1 = (e) => {
        if (e.target.value.length < 8) {
            setValidPassword(false);
        } else {
            setValidPassword(true);
        }
        setPasswordStudent1(e.target.value);
    };

    const handleChangeStudentPassword2 = (e) => {
        setPasswordStudent2(e.target.value);
    };


    const Set_Pas_St_Fun = async (e) => {
        e.preventDefault();

        if(PasswordStudent1 !== PasswordStudent2){
            setPasswordStudentEqual(false);
            setClassColor("red");
            return;
        }

        if (!isValidPassword) {
            setClassColor("red");
            return;
        }

        if (userName === "") {
            setMessages([t("mustSelect")]);
            setClassColor("red");
            return;
        }

        let PasswordStudent = {
            password: PasswordStudent1,
        };

        setStudentPassword(
            userName,
            PasswordStudent,
            (res) => {
                if(res && res.status === 200){
                    resetStudentChangePasswordForm();

                    setMessages([t("changePassword")]);
                    setClassColor("green");
                }
            },
            (err) => {
                let errMessages = [];
                errMessages.push(t("notChangePassword"));
                if (err.response.data) {
                    let obj = err.response.data;
                    Object.keys(obj).forEach(e => {
                        errMessages.push(`${obj[e]} : ${e}`);
                        }
                    )
                }
                setClassColor("red");
                setMessages(errMessages)
            }
        );

    };

    return (
        <Form onSubmit={Set_Pas_St_Fun}>

            <DropdownDiv className="DropdownDiv">
                <DropdownList className="DropdownList" onChange={selectedUser} value={userName}>
                    <DropdownListItem key={0} value="">{t("selectStudent")} </DropdownListItem>
                    {
                        props.students.map((student, index) => (
                            <DropdownListItem key={index + 1}
                                              value={student.person.username}>{student.person.first_name} {student.person.last_name}</DropdownListItem>
                        ))
                    }
                </DropdownList>
            </DropdownDiv>

            <DivTxtField>
                <Span/>
                <FormInput
                    onChange={handleChangeStudentPassword1}
                    type="password"
                    placeholder={t("enterPassword")}
                    value={PasswordStudent1}
                    required
                />
            </DivTxtField>
            {!isValidPassword &&
                <DivPass className={classColor}> {t("passwordValidation")}</DivPass>
            }

            <DivTxtField>
                <Span/>
                <FormInput
                    onChange={handleChangeStudentPassword2}
                    placeholder={t("confirm-new-password")}
                    type="password"
                    value={PasswordStudent2}
                    required
                />
            </DivTxtField>

            {!PasswordStudentEqual &&
                <DivPass className={classColor}>
               {t("matchPassword")}
                </DivPass>
            }

            {messages.length > 0 &&
                messages.map((message, index) => {
                    return <DivPass className={classColor} key={index}>{message}</DivPass>
                })
            }
            <InputSubmit type="submit" value="login">
                {t("change-password")}
            </InputSubmit>
        </Form>
    );
}