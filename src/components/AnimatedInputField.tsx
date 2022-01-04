import React from "react";
import { Control, UseFormRegister, useWatch } from "react-hook-form";
import styled, { css } from "styled-components";

interface IFormValues {
  userName: string;
  Age: number;
  Company: number;
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
`;

export const InputLabel = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.5;
`;

const StyledInputField = styled.input.attrs({ autocomplete: "off" })<{
  noBorder?: boolean;
}>(
  ({ noBorder = false }) => css`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0;
    font-weight: 400;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    padding: 0 10px;
    transition: all 200ms ease-in-out;
    font-size: 16px;
    outline: none;
    caret-color: green;
  `
);

export const ErrorMessage = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #cc1016;
  margin-top: 5px;
`;

interface TAnimatedInputFieldProps {
  control?: Control;
  label: string;
  error: boolean;
  noBorder?: boolean;
  PrefixComponent?: React.FC;
}

const AnimatedInputField = React.forwardRef<
  HTMLInputElement,
  TAnimatedInputFieldProps & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label, control, error }, ref) => {
  const fieldValue = useWatch({ name, control });

  return (
    <MainContainer>
      <InputLabel>{label}</InputLabel>
      <StyledInputField
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </MainContainer>
  );
});

export default AnimatedInputField;
