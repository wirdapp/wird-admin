import styled from "@emotion/styled";

const StyledCheckboxLabel = styled.label`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const Checkbox = ({label, ...props}) => {
  return (
    <StyledCheckboxLabel>
      <input {...props} type="checkbox"/>
      {label}
    </StyledCheckboxLabel>
  )
}