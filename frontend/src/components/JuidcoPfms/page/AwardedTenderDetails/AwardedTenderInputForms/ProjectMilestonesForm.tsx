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
import React, { useRef, useState } from "react";
import { bg_color, milestoneColors } from "../molecules/StaticList";
import Image from "next/image";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import MilestoneIcon from "@/assets/svg/project-mile-details.svg";
import Input from "@/components/global/atoms/Input";
import { ImBin } from "react-icons/im";
import { awardedTenderValidation } from "pfmslib";

type ProjectMilestonesFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  readonly: boolean;
};

type milestonesProps = {
  amount: number;
  start_date: string;
  end_date: string;
  percentage: number;
};

const ProjectMilestonesForm: React.FC<ProjectMilestonesFormProps> = (props) => {
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
    awarded_tender_id: data?.awarded_tender_id || tenderFormId,
    milestones: [
      {
        start_date: "",
        end_date: "",
        amount: "",
        percentage: "",
      },
    ],
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

  ////// Handle Add New Row /////
  const handleAddRow = (
    setFieldValue: (key: string, value: any) => void,
    milestones: milestonesProps[]
  ) => {
    setFieldValue(`milestones`, [
      ...milestones,
      {
        start_date: "",
        end_date: "",
        amount: "",
        percentage: "",
      },
    ]);
  };

  //////// Remove Purticular Row /////
  const handleRemoveRow = (
    setFieldValue: (key: string, value: any) => void,
    milestones: milestonesProps[],
    index: number
  ) => {
    if (milestones.length > 1) {
      const restData = milestones.filter((i, idx: number) => idx !== index);

      setFieldValue(`milestones`, restData);
    }
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
        validationSchema={awardedTenderValidation.awardedMilestoneSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
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
            className="flex flex-col h-full"
          >
            <div className="grid gap-6 max-md:grid-cols-1">
              <div
                className={`bg-${bg_color} p-5 shadow-xl border rounded grid gap-4`}
              >
                <header className="flex items-center">
                  <Image src={MilestoneIcon} height={40} width={40} alt="" />
                  <h1 className="font-medium text-lg ml-2">
                    Project Milestone Details
                  </h1>
                </header>
                <div className="">
                  {values.milestones.map((milestone: any, index: number) => (
                    <div key={index} className="flex mb-4">
                      <div className="flex flex-col">
                        {index > 0 && (
                          <div
                            className={`${milestoneColors[index - 1]} h-7 ml-2 -mt-5 rounded w-1`}
                          ></div>
                        )}
                        <span
                          className={`relative ${index > 0 ? "-mt-1" : "mt-1"}  mr-6 flex h-5 w-5`}
                        >
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${milestoneColors[index]} opacity-75`}
                          ></span>
                          <span
                            className={`relative inline-flex rounded-full h-5 w-5 ${milestoneColors[index]}`}
                          ></span>
                        </span>
                        <div
                          className={`${milestoneColors[index]} h-full ml-2 -mt-1 rounded w-1`}
                        ></div>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.milestones[index]?.start_date}
                            error={
                              errors.milestones &&
                              errors.milestones[index]?.start_date
                            }
                            touched={
                              touched.milestones &&
                              touched.milestones[index]?.start_date
                            }
                            label="Financial Year"
                            name={`milestones[${index}].start_date`}
                            required
                            type="date"
                            readonly={readonly}
                            labelColor="black font-medium"
                          />
                          <div className="mb-2"></div>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.milestones[index]?.end_date}
                            error={
                              errors.milestones &&
                              errors.milestones[index]?.end_date
                            }
                            touched={
                              touched.milestones &&
                              touched.milestones[index]?.end_date
                            }
                            label="To"
                            name={`milestones[${index}].end_date`}
                            required
                            type="date"
                            readonly={readonly}
                            labelColor="black font-medium"
                          />
                        </div>
                        <Input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.milestones[index]?.amount}
                          error={
                            errors.milestones &&
                            errors.milestones[index]?.amount
                          }
                          touched={
                            touched.milestones &&
                            touched.milestones[index]?.amount
                          }
                          label="Financial Goal Amount"
                          name={`milestones[${index}].amount`}
                          required
                          type="number"
                          readonly={readonly}
                          placeholder="Enter Financial Goal Amount"
                          labelColor="black font-medium"
                        />
                        <div>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.milestones[index]?.percentage}
                            error={
                              errors.milestones &&
                              errors.milestones[index]?.percentage
                            }
                            touched={
                              touched.milestones &&
                              touched.milestones[index]?.percentage
                            }
                            label="Goal In Percentage"
                            name={`milestones[${index}].percentage`}
                            required
                            type="number"
                            readonly={readonly}
                            placeholder="Enter Percentage"
                            labelColor="black font-medium"
                          />
                          {values.milestones.length === index + 1 && (
                            <span className="text-red-500">
                              {!Array.isArray(errors.milestones) &&
                                errors.milestones}
                            </span>
                          )}
                        </div>
                        {values.milestones.length > 1 && (
                          <div
                            onClick={() =>
                              handleRemoveRow(
                                setFieldValue,
                                values.milestones,
                                index
                              )
                            }
                            className="h-8 w-8 cursor-pointer bg-gray-300 rounded-full flex items-center justify-center mt-6"
                          >
                            <ImBin />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleAddRow(setFieldValue, values.milestones)}
                  variant="primary"
                  className="w-56 mt-4"
                  buttontype="button"
                >
                  <div className="bg-white h-4 w-4 rounded-full text-black flex justify-center items-center">
                    +
                  </div>
                  Add New Milestone
                </Button>
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

export default ProjectMilestonesForm;
