import React from "react";
import AriaModal from "react-aria-modal";
import { useForm, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import AnimatedInputField from "./AnimatedInputField";
// import { AnimatedInputField } from "./InputField";

const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  top: 24px;
  width: 800px;
  background-color: white;
  border-radius: 10px;
  padding: 16px 24px;
`;

interface ExperienceModalProps {
  deactivateModal: any;
  submitFormHandler: any;
}

interface IFormValues {
  userName: string;
  Age: number;
  Company: number;
}

const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

const Input = React.forwardRef<
  HTMLInputElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <input name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
  </>
));

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  deactivateModal,
  submitFormHandler,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  console.log("error is: ", errors);

  return (
    <AriaModal
      titleText="demo three"
      onExit={deactivateModal}
      focusDialog={true}
      escapeExits={false}
      aria-describedby="describer"
      data-test-id="test-id"
    >
      <ModalContainer>
        <Title>Add Experience</Title>
        <form
          style={{ boxSizing: "border-box" }}
          onSubmit={handleSubmit(submitFormHandler)}
        >
          <AnimatedInputField
            label="Job title"
            error={errors["jobTitle"]?.message}
            control={control}
            {...register("jobTitle", { required: "Job title is required!" })}
          />
          <AnimatedInputField
            label="Company name"
            error={errors["companyName"]?.message}
            control={control}
            {...register("companyName", {
              required: "Company name is required!",
            })}
          />
          <AnimatedInputField
            label="Location"
            error={errors["location"]?.message}
            control={control}
            {...register("location", { required: "Location is required!" })}
          />
          <button type="submit">submit</button>
        </form>
        <footer className="modal-footer">
          {/* <button onClick={deactivateModal}>deactivate modal</button> */}
        </footer>
      </ModalContainer>
    </AriaModal>
  );
};

export default ExperienceModal;
