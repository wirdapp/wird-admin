import React from "react";
import {Container, TextLabel} from "./InputField.styled";
import {Input} from "../../ui/input";

const InputField = ({type, label, onChange, checked, value, disabled, onClick}) => {
  return (
    <Container>
      <TextLabel>{label}:</TextLabel>
      <Input
        type={type}
        placeholder={type === "number" ? 0 : undefined}
        min={type === "number" ? 0 : undefined}
        onChange={onChange}
        checked={checked}
        value={value}
        disabled={disabled}
        onClick={onClick}
      />
    </Container>
  );
};

export default InputField;
