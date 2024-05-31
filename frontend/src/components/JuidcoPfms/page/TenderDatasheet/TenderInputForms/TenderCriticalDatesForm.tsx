"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-05-2024
 * | Created for- Tender Critical Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import { tenderFeeDetailsSchema } from "pfmslib";
import React, { useRef, useState } from "react";
import { bg_color, emd_fee_type } from "../molecules/checkList";
import RadioComponent from "../molecules/RadioComponent";
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
import FeeIcon from "@/assets/svg/Rupee.svg";
import Input from "@/components/global/atoms/Input";
import RadioYesNoComponent from "../molecules/RadioYesNoComponent";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateTimePickerComponent from "../molecules/DateTimePicker";

const TenderCriticalDatesForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    tender_fee_examption_allowed: true,
    tender_fee: "",
    processing_fee: "",
    tender_fee_payable_to: "",
    tender_fee_payable_at: "",
    surcharges: "",
    other_charges: "",
    emd_examption_allowed: true,
    emd_fee_type: "",
    fixed_emd_fee: "",
    percentage_emd_fee: "",
    emd_fee_payable_to: "",
    emd_fee_payable_at: "",
  };

  const readonly = false;
  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const [date, setDate] = useState<Dayjs | null>(null);

  const { showWarning, triggerFun, showFinalError } = state;

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    console.log("Basic Details", values);
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

  /////// Handle Exemption Allowed
  const handleExemptionAllowed = (
    value: boolean,
    setFieldValue: (key: string, value: any) => void
  ) => {
    setFieldValue("emd_fee_type", value ? "" : "fixed");
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
        <Image src={FeeIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">Critical Dates</header>
      </div>

      {/* Form section */}
      <Formik
        initialValues={initialValues}
        validationSchema={tenderFeeDetailsSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          dirty,
          handleReset,
          setFieldValue,
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
            <div className="grid grid-cols-1 gap-6">
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={date}
                    onChange={setDate}
                    referenceDate={dayjs("2022-04-17T15:30")}
                  />
                   </LocalizationProvider> */}
                  <DateTimePickerComponent
                    label="Start Date"
                    name="start_date"
                    error=""
                    touched={false}
                    value={""}
                  />
                </div>
              </div>
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
                <Button onClick={goBack} buttontype="button" variant="cancel">
                  Back
                </Button>
              )}

              {!readonly && (
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
