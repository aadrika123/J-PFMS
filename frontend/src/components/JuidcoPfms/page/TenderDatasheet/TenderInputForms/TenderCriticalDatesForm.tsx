"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-05-2024
 * | Created for- Tender Critical Dates Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack, { removeEmptyField } from "@/utils/helper";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";

type TenderCriticalDatesFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  readonly: boolean;
};

const TenderCriticalDatesForm: React.FC<TenderCriticalDatesFormProps> = (
  props
) => {
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const { handleTabChange, tenderFormId, readonly } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
    finalData: "",
    showConfirmation: false,
  });

  const { showWarning, triggerFun, showFinalError } = state;

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.TENDER_CRITICAL_DATES.getById}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(
    ["tender-critical-dates", tenderFormId],
    fetch
  );

  const initialDetails = {
    tender_datasheet_id: data?.tender_datasheet_id || tenderFormId,
    publishing_date: data?.publishing_date || "",
    bid_opening_date: data?.bid_opening_date || "",
    document_sale_start_date: data?.document_sale_start_date || "",
    document_sale_end_date: data?.document_sale_end_date || "",
    seek_clarification_start_date: data?.seek_clarification_start_date || "",
    seek_clarification_end_date: data?.seek_clarification_end_date || "",
    bid_submission_start_date: data?.bid_submission_start_date || "",
    bid_submission_end_date: data?.bid_submission_end_date || "",
    pre_bid_meeting_date: data?.pre_bid_meeting_date || "",
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

  //////////// Handle Save Fee Details /////////////
  const handleSave = async (values: any) => {
    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.TENDER_CRITICAL_DATES?.create}`,
      method: "POST",
      data: {
        data: values,
      },
    });

    if (!res.data.status) throw "Something Went Wrong!!!";
  };

  const { mutate } = useMutation(handleSave, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries([
          "tender-critical-openers",
          tenderFormId,
        ]),
        queryClient.invalidateQueries(["tender-all-details", tenderFormId]),
      ]);
      toast.success("Details Saved Successfully");
      setTimeout(() => {
        handleTabChange("next");
      }, 100);
    },
    onError: (error) => {
      toast.error("Something Went Wrong!!");
      console.log(error);
    },
    onSettled: () => {
      hideWorkingAnimation();
    },
  });

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    mutate(removeEmptyField(values));
  };

  return (
    <>
      <Toaster />
      {workingAnimation}
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
        initialValues={initialDetails}
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
            className="flex flex-col h-full"
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
                value={values.bid_opening_date}
                touched={touched.bid_opening_date}
                error={errors.bid_opening_date}
                name="bid_opening_date"
                readonly={readonly}
                required
              />
            </div>
            {Object.keys(errors).length !== 0 && showFinalError && (
              <span className="text-red-500 mt-3 flex justify-end">
                Please Fill the all required field
              </span>
            )}
            <div className="mt-4 w-full">
              {!dirty && (
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => handleTabChange("prev")}
                    buttontype="button"
                    variant="cancel"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => handleTabChange("next")}
                    buttontype="button"
                    variant="cancel"
                  >
                    Next
                  </Button>
                </div>
              )}

              {!readonly && dirty && (
                <div className="flex items-center gap-5 justify-end">
                  <Button
                    onClick={() => handleBackAndReset(goBack)}
                    buttontype="button"
                    variant="cancel"
                  >
                    Cancel
                  </Button>
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
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default TenderCriticalDatesForm;
