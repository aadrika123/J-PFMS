"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-05-2024
 * | Created for- Tender Critical Dates Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import { tenderCriticalDateSchema } from "pfmslib";
import React, { useRef, useState } from "react";
import { bg_color } from "../molecules/checkList";
import Image from "next/image";
// const RunningAnimation = dynamic(
//   () =>
//     import("../../ProjectProposal/Animations").then((module) => {
//       return { default: module.RunningAnimation };
//     }),
//   {
//     ssr: false,
//   }
// );
// import dynamic from "next/dynamic";
// import Popup from "@/components/global/molecules/Popup";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import CriticalIcon from "@/assets/svg/Time Management Skills.svg";
import DateTimePickerComponent from "../molecules/DateTimePicker";

type TenderCriticalDatesFormProps = {
  handleTabChange: (type: string) => void;
};

const TenderCriticalDatesForm: React.FC<TenderCriticalDatesFormProps> = (
  props
) => {
  const { handleTabChange } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    publishing_date: "",
    bid_opeining_date: "",
    document_sale_start_date: "",
    document_sale_end_date: "",
    seek_clarification_start_date: "",
    seek_clarification_end_date: "",
    bid_submission_start_date: "",
    bid_submission_end_date: "",
    pre_bid_meeting_date: "",
  };

  const readonly = false;
  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const { showWarning, triggerFun, showFinalError } = state;

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    console.log("Basic Details", values);
    handleTabChange("next");
  };

  ///// handlBackAndReset
  const handleBackAndReset = (trigger?: () => void) => {
    setState({ ...state, showWarning: !showWarning, triggerFun: trigger });
  };

  ///// handle Complete Reset
  const handleCompleteReset = () => {
    triggerFun();
    setTimeout(() => {
      setState((prev: any) => ({
        ...prev,
        file: null,
      }));
    }, 100);
  };

  return (
    <>
      {/* {showPopup && (
        <Popup padding="0">
          <iframe
            width={1000}
            height={570}
            src={`${file.split(".")[1] === "pdf" ? `${process.env.img_base}${file}` : file}`}
          ></iframe>
          <div className="flex items-center absolute bottom-3 self-center">
            <Button
              onClick={() => setState({ ...state, showPopup: !showPopup })}
              variant="cancel"
            >
              Close
            </Button>
          </div>
        </Popup>
      )} */}
      {showWarning && (
        <LosingDataConfirmPopup
          continue={handleCompleteReset}
          cancel={handleBackAndReset}
        />
      )}
      {/* Header section */}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg">
        <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">Critical Dates</header>
      </div>

      {/* Form section */}
      <Formik
        initialValues={initialValues}
        validationSchema={tenderCriticalDateSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          dirty,
          handleReset,
        }: any) => (
          <form
            ref={formRef}
            onSubmit={(e) => {
              setState({ ...state, showFinalError: true });
              handleSubmit(e);
            }}
            encType="multipart/form-data"
            className="flex flex-col justify-between h-full"
          >
            <div className="grid grid-cols-2 gap-6">
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <DateTimePickerComponent
                  label="Publishing Date"
                  onBlur={handleBlur}
                  value={values.publishing_date}
                  touched={touched.publishing_date}
                  error={errors.publishing_date}
                  name="publishing_date"
                  readonly={readonly}
                  required
                />
                <DateTimePickerComponent
                  label="Pre Bid Meeting Date"
                  onBlur={handleBlur}
                  value={values.pre_bid_meeting_date}
                  touched={touched.pre_bid_meeting_date}
                  error={errors.pre_bid_meeting_date}
                  name="pre_bid_meeting_date"
                  readonly={readonly}
                  required
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <DateTimePickerComponent
                  label="Document Sale Start Date"
                  onBlur={handleBlur}
                  value={values.document_sale_start_date}
                  touched={touched.document_sale_start_date}
                  error={errors.document_sale_start_date}
                  name="document_sale_start_date"
                  readonly={readonly}
                  required
                />
                <DateTimePickerComponent
                  label="Document Sale End Date"
                  onBlur={handleBlur}
                  value={values.document_sale_end_date}
                  touched={touched.document_sale_end_date}
                  error={errors.document_sale_end_date}
                  name="document_sale_end_date"
                  readonly={readonly}
                  required
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <DateTimePickerComponent
                  label="Seek Clarification Start Date"
                  onBlur={handleBlur}
                  value={values.seek_clarification_start_date}
                  touched={touched.seek_clarification_start_date}
                  error={errors.seek_clarification_start_date}
                  name="seek_clarification_start_date"
                  readonly={readonly}
                  required
                />
                <DateTimePickerComponent
                  label="Seek Clarification End Date"
                  onBlur={handleBlur}
                  value={values.seek_clarification_end_date}
                  touched={touched.seek_clarification_end_date}
                  error={errors.seek_clarification_end_date}
                  name="seek_clarification_end_date"
                  readonly={readonly}
                  required
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <DateTimePickerComponent
                  label="Bid submission Start Date"
                  onBlur={handleBlur}
                  value={values.bid_submission_start_date}
                  touched={touched.bid_submission_start_date}
                  error={errors.bid_submission_start_date}
                  name="bid_submission_start_date"
                  readonly={readonly}
                  required
                />
                <DateTimePickerComponent
                  label="Bid submission End Date"
                  onBlur={handleBlur}
                  value={values.bid_submission_end_date}
                  touched={touched.bid_submission_end_date}
                  error={errors.bid_submission_end_date}
                  name="bid_submission_end_date"
                  readonly={readonly}
                  required
                />
              </div>
            </div>
            <div
              className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4 mt-6`}
            >
              <DateTimePickerComponent
                label="Bid Opening Date"
                onBlur={handleBlur}
                value={values.bid_opeining_date}
                touched={touched.bid_opeining_date}
                error={errors.bid_opeining_date}
                name="bid_opeining_date"
                readonly={readonly}
                required
              />
            </div>
            {Object.keys(errors).length !== 0 && showFinalError && (
              <span className="text-red-500 mt-3 flex justify-end">
                Please Fill the all required field
              </span>
            )}
            <div className="mt-4 flex items-center gap-5 justify-end">
              {!readonly && dirty ? (
                <Button
                  onClick={() => handleBackAndReset(goBack)}
                  buttontype="button"
                  variant="cancel"
                >
                  Cancel
                </Button>
              ) : (
                <Button onClick={() => handleTabChange("prev")} buttontype="button" variant="cancel">
                  Back
                </Button>
              )}

              {!readonly && dirty && (
                <>
                  <Button
                    onClick={() => handleBackAndReset(handleReset)}
                    buttontype="button"
                    variant="cancel"
                  >
                    Reset
                  </Button>
                  <Button
                    buttontype="submit"
                    variant="primary"
                    className="animate-pulse"
                  >
                    Save & Next
                  </Button>
                </>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default TenderCriticalDatesForm;
