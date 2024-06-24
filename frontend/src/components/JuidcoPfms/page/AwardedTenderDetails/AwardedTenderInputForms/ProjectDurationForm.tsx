"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-06-2024
 * | Created for- Project Duration Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack, { removeEmptyField } from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import { awardedTenderValidation } from "pfmslib";
import React, { useRef, useState } from "react";
import { bg_color } from "../molecules/StaticList";
import Image from "next/image";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import Input from "@/components/global/atoms/Input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import TimeDurationIcon from "@/assets/svg/time-duration.svg";

type ProjectDurationFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  readonly: boolean;
};

const ProjectDurationForm: React.FC<ProjectDurationFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const { handleTabChange, tenderFormId, readonly } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const { showWarning, triggerFun, showFinalError } = state;

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.TENDER_WORK.getById}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(
    ["tender-work-details", tenderFormId],
    fetch
  );

  const initialDetails = {
    awarded_tender_id: data?.awarded_tender_id || tenderFormId,
    commencement_date: data?.commencement_date || "",
    stipulated_completion_date: data?.stipulated_completion_date || "",
    work_period_month: data?.work_period_month || "",
    work_period_day: data?.work_period_day || "",
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

  //////////// Handle Save Work Details /////////////
  const handleSave = async (values: any) => {
    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.TENDER_WORK.create}`,
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
        queryClient.invalidateQueries(["tender-work-openers", tenderFormId]),
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

      {/* Form section */}
      <Formik
        initialValues={initialDetails}
        validationSchema={awardedTenderValidation.projectDurationsSchema}
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
            <div className="grid gap-6 max-md:grid-cols-1">
              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid gap-4`}
              >
                <header className="flex items-center">
                  <Image src={TimeDurationIcon} height={40} width={40} alt="" />
                  <h1 className="font-medium text-lg ml-2">
                    Time & Duration Details
                  </h1>
                </header>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.commencement_date}
                    error={errors.commencement_date}
                    touched={touched.commencement_date}
                    label="Actual Commencement Date"
                    name="commencement_date"
                    required
                    type="date"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.stipulated_completion_date}
                    error={errors.stipulated_completion_date}
                    touched={touched.stipulated_completion_date}
                    label="Stipulated Completion Date"
                    name="stipulated_completion_date"
                    required
                    type="date"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  {/* Work Period */}
                  {!values.work_period_day && (
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.work_period_month}
                      error={errors.work_period_month}
                      touched={touched.work_period_month}
                      label="Work Period In Month"
                      name="work_period_month"
                      required
                      type="number"
                      readonly={readonly}
                      placeholder="Enter month"
                      labelColor="black font-medium"
                    />
                  )}
                  {!values.work_period_month && (
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.work_period_day}
                      error={errors.work_period_day}
                      touched={touched.work_period_day}
                      label="Work Period In Day"
                      name="work_period_day"
                      required
                      type="number"
                      readonly={readonly}
                      placeholder="Enter day"
                      labelColor="black font-medium"
                    />
                  )}
                </div>
              </div>
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

export default ProjectDurationForm;
