import { ReactComponent as TextTypeIcon } from "assets/icons/field-types/text.svg";
import { ReactComponent as NumberTypeIcon } from "assets/icons/field-types/number.svg";
import { ReactComponent as CheckboxTypeIcon } from "assets/icons/field-types/checkbox.svg";
import { ReactComponent as MultiCheckboxTypeIcon } from "assets/icons/field-types/multi-checkbox.svg";
import { ReactComponent as RadioTypeIcon } from "assets/icons/field-types/radio.svg";

export const FieldTypes = {
  Text: "UserInputCriterion",
  Number: "NumberCriterion",
  Checkbox: "CheckboxCriterion",
  MultipleChoices: "MultiCheckboxCriterion",
  Radio: "RadioCriterion",
};

export const FieldTypesOptions = [
  { value: FieldTypes.Text, label: "fieldType.text" },
  { value: FieldTypes.Number, label: "fieldType.number" },
  { value: FieldTypes.Checkbox, label: "fieldType.checkbox" },
  { value: FieldTypes.MultipleChoices, label: "fieldType.multipleChoices" },
  { value: FieldTypes.Radio, label: "fieldType.radio" },
];

export const FieldTypesIcons = {
  [FieldTypes.Text]: TextTypeIcon,
  [FieldTypes.Number]: NumberTypeIcon,
  [FieldTypes.Checkbox]: CheckboxTypeIcon,
  [FieldTypes.MultipleChoices]: MultiCheckboxTypeIcon,
  [FieldTypes.Radio]: RadioTypeIcon,
};
