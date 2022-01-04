import React, { useEffect } from "react";
import AriaModal from "react-aria-modal";
import { useForm, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { months, years } from "../constants/constant";
import AnimatedInputField, {
  ErrorMessage,
  InputLabel,
} from "./AnimatedInputField";

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
  width: 744px;
  background-color: white;
  border-radius: 10px;
  padding: 16px 24px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const CustomSelect = styled.select`
  width: 332px;
  height: 32px;
  border-radius: 5px;
  padding: 0 5px;
`;

const CustomOption = styled.option`
  font-size: 14px;
`;

const CustomTextArea = styled.textarea`
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  display: flex;
  background-color: #0a66c2;
  color: white;
  padding: 8px 16px;
  border: none;
  outline: none;
  border-radius: 1000px;
  font-size: 14px;
  margin-top: 20px;
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
  { dropdownData: any; disabled?: any } & ReturnType<
    UseFormRegister<IFormValues>
  >
>(({ onChange, onBlur, dropdownData, name, disabled }, ref) => (
  <>
    <CustomSelect
      ref={ref}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    >
      <CustomOption value="" selected disabled hidden>
        Select an Option
      </CustomOption>
      {dropdownData.map((data: any, index: any) => (
        <CustomOption value={data}>{data}</CustomOption>
      ))}
    </CustomSelect>
  </>
));

const JobDescription = React.forwardRef<
  HTMLTextAreaElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <InputLabel>{label}</InputLabel>
    <CustomTextArea name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
  </div>
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
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm({
    reValidateMode: "onBlur",
  });

  const submitHandler = (formData: any) => {
    submitFormHandler(formData);
    reset();
  };

  const watchFields = watch([
    "endDateMonth",
    "endDateYear",
    "startDateMonth",
    "startDateYear",
    "isCurrentJob",
  ]);

  useEffect(() => {
    if (
      watchFields[0]?.length &&
      watchFields[1]?.length &&
      watchFields[2]?.length &&
      watchFields[3]?.length
    ) {
      const startDate = new Date(
        watchFields[3],
        months.indexOf(watchFields[2])
      );

      const endDate = new Date(watchFields[1], months.indexOf(watchFields[0]));

      if (endDate.getTime() < startDate.getTime()) {
        setError("endDateMonth", {
          type: "manual",
          message: "End date can’t be earlier than start date",
        });
      } else {
        clearErrors("endDateMonth");
      }
    }
  }, [...watchFields, setError]);

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
          onSubmit={handleSubmit(submitHandler)}
        >
          <AnimatedInputField
            label="Job title*"
            error={errors["jobTitle"]?.message}
            control={control}
            {...register("jobTitle", {
              required: "Job title is required!",
              pattern: NAME_REGEX,
            })}
          />
          <AnimatedInputField
            label="Company name*"
            error={errors["companyName"]?.message}
            control={control}
            {...register("companyName", {
              required: "Company name is required!",
            })}
          />
          <AnimatedInputField
            label="Location*"
            error={errors["location"]?.message}
            control={control}
            {...register("location", { required: "Location is required!" })}
          />
          <div>
            <input type="checkbox" {...register("isCurrentJob")} /> I am
            currently working in this role
          </div>
          <Block>
            <InputLabel>Start date*</InputLabel>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Select
                dropdownData={months}
                {...register("startDateMonth", {
                  required: true,
                })}
              />
              <Select
                dropdownData={years}
                {...register("startDateYear", {
                  required: true,
                })}
              />
            </div>
          </Block>
          <Block>
            <InputLabel>End date*</InputLabel>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Select
                dropdownData={months}
                disabled={watchFields[4]}
                {...register("endDateMonth", {
                  required: !watchFields[4],
                })}
              />
              <Select
                dropdownData={years}
                disabled={watchFields[4]}
                {...register("endDateYear", {
                  required: !watchFields[4],
                })}
              />
            </div>
            <div>
              {(errors.startDateMonth?.type ||
                errors.startDateYear?.type ||
                errors.endDateMonth?.type ||
                errors.endDateYear?.type) && (
                <ErrorMessage>
                  {errors.endDateMonth?.type === "manual"
                    ? errors.endDateMonth?.message
                    : "Start and end dates are required"}
                </ErrorMessage>
              )}
            </div>
          </Block>
          <JobDescription label="Description" {...register("jobDescription")} />
          <SubmitButton type="submit">submit</SubmitButton>
        </form>
      </ModalContainer>
    </AriaModal>
  );
};

export default ExperienceModal;
