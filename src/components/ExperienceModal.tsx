import React, { useEffect } from "react";
import AriaModal from "react-aria-modal";
import { useForm, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { months, years } from "../constants/constant";
import AnimatedInputField, {
  ErrorMessage,
  InputLabel,
} from "./AnimatedInputField";
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

const Block = styled.div`
  display: flex;
  flex-direction: column;
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
    <select
      ref={ref}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    >
      <option value="" selected disabled hidden>
        Select an Option
      </option>
      {dropdownData.map((data: any, index: any) => (
        <option value={data}>{data}</option>
      ))}
    </select>
  </>
));

const JobDescription = React.forwardRef<
  HTMLTextAreaElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <InputLabel>{label}</InputLabel>
    <textarea name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
  </>
));

// const Input = React.forwardRef<
//   HTMLInputElement,
//   { label: string } & ReturnType<UseFormRegister<IFormValues>>
// >(({ onChange, onBlur, name, label }, ref) => (
//   <>
//     <label>{label}</label>
//     <input name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
//   </>
// ));

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

  console.log("error is: ", errors);
  const watchFields = watch([
    "endDateMonth",
    "endDateYear",
    "startDateMonth",
    "startDateYear",
    "isCurrentJob",
  ]);

  console.log("disabled", watchFields[4]);

  useEffect(() => {
    console.log("watch fields are: ", watchFields);
    // console.log(
    //   "get field are: ",
    //   );
    // let watchFields = getValues(["startDateMonth", "startDateYear"]);
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

      console.log("start date ==>", startDate, endDate);

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
          <div>
            <input type="checkbox" {...register("isCurrentJob")} /> I am
            currently working in this role
          </div>
          <Block>
            <InputLabel>Start date*</InputLabel>
            <div>
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
            <div>
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
          </Block>
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
          <JobDescription label="Description" {...register("jobDescription")} />
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
