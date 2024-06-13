"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-05-2024
 * | Created for- Tender Fee Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack, { removeEmptyField } from "@/utils/helper";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";

type TenderFeeDetailsFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
};

const TenderFeeDetailsForm: React.FC<TenderFeeDetailsFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const { handleTabChange, tenderFormId } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const readonly = false;
  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
    finalData: "",
    showConfirmation: false,
  });

  const {
    showWarning,
    triggerFun,
    showFinalError,
  } = state;

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.TENDER_FEE.getById}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(
    ["tender-fee-details", tenderFormId],
    fetch
  );

 const initialDetails = {
  tender_datasheet_id: data?.tender_datasheet_id || tenderFormId,
  tender_fee_examption_allowed: data?.tender_fee_examption_allowed,
  tender_fee: data?.tender_fee || "",
  processing_fee: data?.processing_fee || "",
  tender_fee_payable_to: data?.tender_fee_payable_to || "",
  tender_fee_payable_at: data?.tender_fee_payable_at || "",
  surcharges: data?.surcharges || "",
  other_charges: data?.other_charges || "",
  emd_examption_allowed: data?.emd_examption_allowed,
  emd_fee_type: data?.emd_fee_type || "",
  fixed_emd_fee: data?.fixed_emd_fee || "",
  percentage_emd_fee: data?.percentage_emd_fee || "",
  emd_fee_payable_to: data?.emd_fee_payable_to || "",
  emd_fee_payable_at: data?.emd_fee_payable_at || "",
}

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

  //////////// Handle Save Fee Details /////////////
  const handleSave = async (values: any) => {
    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.TENDER_FEE?.create}`,
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
        queryClient.invalidateQueries(["tender-fee-openers", tenderFormId]),
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
        <Image src={FeeIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">
          Tender Fee Details
        </header>
      </div>

      {/* Form section */}
      <Formik
        initialValues={initialDetails}
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
                <RadioYesNoComponent
                  title="Tender Fee Exemption Allowed"
                  onBlur={handleBlur}
                  value={values.tender_fee_examption_allowed}
                  error={errors.tender_fee_examption_allowed}
                  touched={touched.tender_fee_examption_allowed}
                  required
                  name="tender_fee_examption_allowed"
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tender_fee}
                    error={errors.tender_fee}
                    touched={touched.tender_fee}
                    label="Tender Fee"
                    name="tender_fee"
                    placeholder="Enter Tender Fee"
                    required={!values.tender_fee_examption_allowed}
                    readonly={values.tender_fee_examption_allowed || readonly}
                    labelColor="black font-medium"
                    type="number"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.processing_fee}
                    error={errors.processing_fee}
                    touched={touched.processing_fee}
                    label="Processing Fee"
                    name="processing_fee"
                    placeholder="Enter Processing Fee"
                    readonly={values.tender_fee_examption_allowed || readonly}
                    labelColor="black font-medium"
                    type="number"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tender_fee_payable_to}
                    error={errors.tender_fee_payable_to}
                    touched={touched.tender_fee_payable_to}
                    label="Tender Fee Payable To"
                    name="tender_fee_payable_to"
                    placeholder="Enter Tender Fee Payable To"
                    required={!values.tender_fee_examption_allowed}
                    readonly={values.tender_fee_examption_allowed || readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tender_fee_payable_at}
                    error={errors.tender_fee_payable_at}
                    touched={touched.tender_fee_payable_at}
                    label="Tender Fee Payable At"
                    name="tender_fee_payable_at"
                    placeholder="Enter Tender Fee Payable At"
                    required={!values.tender_fee_examption_allowed}
                    readonly={values.tender_fee_examption_allowed || readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.surcharges}
                    error={errors.surcharges}
                    touched={touched.surcharges}
                    label="Surcharges"
                    name="surcharges"
                    placeholder="Enter Surcharges"
                    readonly={values.tender_fee_examption_allowed || readonly}
                    labelColor="black font-medium"
                    type="number"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.other_charges}
                    error={errors.other_charges}
                    touched={touched.other_charges}
                    label="Other Charges"
                    name="other_charges"
                    placeholder="Enter Other Charges"
                    readonly={values.tender_fee_examption_allowed || readonly}
                    labelColor="black font-medium"
                    type="number"
                  />
                </div>
              </div>

              {/* Header section */}
              <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded shadow-lg">
                <Image src={FeeIcon} height={30} width={30} alt="tender-icon" />
                <header className="font-bold ml-2 text-white">
                  EMD Fee Details
                </header>
              </div>

              {/* Second Section */}
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <RadioYesNoComponent
                  title="EMD Exemption Allowed"
                  changeHandler={(isChecked: boolean) =>
                    handleExemptionAllowed(isChecked, setFieldValue)
                  }
                  onBlur={handleBlur}
                  value={values.emd_examption_allowed}
                  error={errors.emd_examption_allowed}
                  touched={touched.emd_examption_allowed}
                  required
                  name="emd_examption_allowed"
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <div className="flex justify-between">
                  <RadioComponent
                    checkList={emd_fee_type}
                    onBlur={handleBlur}
                    value={values.emd_fee_type}
                    error={errors.emd_fee_type}
                    touched={touched.emd_fee_type}
                    required={!values.emd_examption_allowed}
                    readonly={values.emd_examption_allowed || readonly}
                    name="emd_fee_type"
                  />
                  {values.emd_fee_type === "fixed" ? (
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fixed_emd_fee}
                      error={errors.fixed_emd_fee}
                      touched={touched.fixed_emd_fee}
                      label="EMD Fee is Fixed"
                      name="fixed_emd_fee"
                      placeholder="Enter EMD Fee"
                      required={!values.emd_examption_allowed}
                      readonly={values.emd_examption_allowed || readonly}
                      labelColor="black font-medium"
                      type="number"
                    />
                  ) : (
                    values.emd_fee_type === "percentage" && (
                      <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.percentage_emd_fee}
                        error={errors.percentage_emd_fee}
                        touched={touched.percentage_emd_fee}
                        label="EMD Fee is Percentage"
                        name="percentage_emd_fee"
                        placeholder="Enter EMD Fee"
                        required={!values.emd_examption_allowed}
                        readonly={values.emd_examption_allowed || readonly}
                        labelColor="black font-medium"
                        type="number"
                        maxlength={3}
                      />
                    )
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emd_fee_payable_to}
                    error={errors.emd_fee_payable_to}
                    touched={touched.emd_fee_payable_to}
                    label="EMD Fee Payable To"
                    name="emd_fee_payable_to"
                    placeholder="Enter EMD Fee Payable To"
                    required={!values.emd_examption_allowed}
                    readonly={values.emd_examption_allowed || readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emd_fee_payable_at}
                    error={errors.emd_fee_payable_at}
                    touched={touched.emd_fee_payable_at}
                    label="EMD Fee Payable At"
                    name="emd_fee_payable_at"
                    placeholder="Enter EMD Fee Payable At"
                    required={!values.emd_examption_allowed}
                    readonly={values.emd_examption_allowed || readonly}
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
              {!readonly && !dirty && (
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

export default TenderFeeDetailsForm;
