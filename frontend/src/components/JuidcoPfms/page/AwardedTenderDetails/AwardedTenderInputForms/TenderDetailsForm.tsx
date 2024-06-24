"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 30-05-2024
 * | Created for- Tender Cover Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack, { removeEmptyField } from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import { awardedTenderValidation } from "pfmslib";
import React, { useState } from "react";
import { agreement_type, bg_color } from "../molecules/StaticList";
import Image from "next/image";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import Input from "@/components/global/atoms/Input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import toast, { Toaster } from "react-hot-toast";
import TenderDetailsDescIcon from "@/assets/svg/tender-detail-desc.svg";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

type TenderDetailsFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  readonly: boolean;
  project_proposal: {
    title: string;
    description: string;
  };
};

const TenderDetailsForm: React.FC<TenderDetailsFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const { handleTabChange, tenderFormId, readonly } = props;

  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const { showWarning, triggerFun, showFinalError } = state;

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.TENDER_COVER.getById}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(
    ["awarded-tender-details", tenderFormId],
    fetch
  );

  const initialDetails = {
    awarded_tender_id: data?.awarded_tender_id || tenderFormId,
    contractor_name: data?.contractor_name || "",
    agreement_type_id: data?.agreement_type_id || "",
    agreement_no: data?.agreement_no || "",
    agreement_date: data?.agreement_date || "",
    work_order_no: data?.work_order_no || "",
    awarding_authority: data?.awarding_authority || "",
    quoted_amount: data?.quoted_amount || "",
    quoted_percentage: data?.quoted_percentage || "",
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
        files: [],
      }));
    }, 100);
  };

  //////////// Handle Save Cover Details /////////////
  const handleSave = async (values: any) => {
    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.TENDER_COVER.create}`,
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
        queryClient.invalidateQueries(["tender-cover-openers", tenderFormId]),
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
        validationSchema={awardedTenderValidation.awardedTenderDetailsSchema}
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
            onSubmit={(e) => {
              setState({ ...state, showFinalError: true });
              handleSubmit(e);
            }}
            className="flex flex-col h-full"
          >
            <div className="grid gap-6 max-md:grid-cols-1">
              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid gap-4`}
              >
                <header className="flex items-center">
                  <Image
                    src={TenderDetailsDescIcon}
                    height={40}
                    width={40}
                    alt=""
                  />
                  <h1 className="font-medium text-lg ml-2">
                    Tender Details & Description
                  </h1>
                </header>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contractor_name}
                    error={errors.contractor_name}
                    touched={touched.contractor_name}
                    label="Contractor Name"
                    name="contractor_name"
                    placeholder="Enter Contractor Name"
                    maxlength={50}
                    required
                    type="text"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <SelectForNoApi
                    data={agreement_type}
                    onBlur={handleBlur}
                    value={values.agreement_type_id}
                    error={errors.agreement_type_id}
                    touched={touched.agreement_type_id}
                    required
                    name="agreement_type_id"
                    label="Agreement Type"
                    placeholder="Select Agreement Type"
                    labelColor="black font-medium"
                    readonly={readonly}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.agreement_no}
                    error={errors.agreement_no}
                    touched={touched.agreement_no}
                    label="Agreement Number"
                    name="agreement_no"
                    placeholder="Enter Agreement Number"
                    maxlength={50}
                    required
                    type="text"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.agreement_date}
                    error={errors.agreement_date}
                    touched={touched.agreement_date}
                    label="Agreement Date"
                    name="agreement_date"
                    placeholder="Enter Agreement Date"
                    maxlength={50}
                    required
                    type="date"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.work_order_no}
                    error={errors.work_order_no}
                    touched={touched.work_order_no}
                    label="Work Order Number"
                    name="work_order_no"
                    placeholder="Enter Work Order Number"
                    maxlength={50}
                    required
                    type="text"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.awarding_authority}
                    error={errors.awarding_authority}
                    touched={touched.awarding_authority}
                    label="Awarding Authority"
                    name="awarding_authority"
                    placeholder="Enter Awarding Authority"
                    maxlength={50}
                    required
                    type="text"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quoted_amount}
                    error={errors.quoted_amount}
                    touched={touched.quoted_amount}
                    label="Quoted Amount"
                    name="quoted_amount"
                    placeholder="Enter Quoted Amount"
                    maxlength={50}
                    required
                    type="text"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quoted_percentage}
                    error={errors.quoted_percentage}
                    touched={touched.quoted_percentage}
                    label="Quoted Percentage (Above/Below/at Par)"
                    name="quoted_percentage"
                    placeholder="Enter Quoted Percentage"
                    maxlength={50}
                    required
                    type="text"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
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

export default TenderDetailsForm;
