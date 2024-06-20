"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-05-2024
 * | Created for- Tender Work Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack, { removeEmptyField } from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import { tenderWorkDetailsSchema } from "pfmslib";
import React, { useRef, useState } from "react";
import {
  bg_color,
  bid_validity,
  contract_type,
  product_category,
  tender_value,
  tenderer_class,
} from "../molecules/StaticList";
import RadioComponent from "../molecules/RadioComponent";
import Image from "next/image";
import WorkIcon from "@/assets/svg/New Job.svg";
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
import TextArea from "@/components/global/atoms/Textarea";
import Input from "@/components/global/atoms/Input";
import CheckboxComponent from "../molecules/CheckboxComponent";
import RadioYesNoComponent from "../molecules/RadioYesNoComponent";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

type TenderWorkDetailsFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  readonly: boolean;
  project_proposal: {
    title: string;
    description: string;
  };
};

const TenderWorkDetailsForm: React.FC<TenderWorkDetailsFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const { handleTabChange, tenderFormId, readonly, project_proposal } = props;
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
    tender_datasheet_id: data?.tender_datasheet_id || tenderFormId,
    work_title: data?.work_title || project_proposal.title,
    description: data?.description || project_proposal.description,
    pre_qualification_details: data?.pre_qualification_details || "",
    product_categories: data?.product_categories || [],
    product_sub_category: data?.product_sub_category || "",
    contract_type: data?.contract_type || "",
    tender_value: data?.tender_value || "",
    bid_validity: data?.bid_validity || "",
    completion_period: data?.completion_period || "",
    work_location: data?.work_location || "",
    pin_code: data?.pin_code || "",
    pre_bid_meeting: data?.pre_bid_meeting,
    bid_opening_place: data?.bid_opening_place || "",
    pre_bid_meeting_place: data?.pre_bid_meeting_place || "",
    pre_bid_meeting_address: data?.pre_bid_meeting_address || "",
    tenderer_class: data?.tenderer_class || [],
    inviting_officer_name: data?.inviting_officer_name || "",
    inviting_officer_address: data?.inviting_officer_address || "",
    inviting_officer_contact: data?.inviting_officer_contact || "",
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
      {/* Header section */}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg">
        <Image src={WorkIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">Work Details</header>
      </div>

      {/* Form section */}
      <Formik
        initialValues={initialDetails}
        validationSchema={tenderWorkDetailsSchema}
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
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.work_title}
                  error={errors.work_title}
                  touched={touched.work_title}
                  label="Work Item Title"
                  name="work_title"
                  placeholder="Enter Work Item Title"
                  required
                  readonly={true}
                  labelColor="black font-medium"
                />
                <TextArea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                  label="Work Description"
                  name="description"
                  placeholder="Enter description"
                  className="min-h-20 max-h-32"
                  maxlength={250}
                  required
                  readonly={true}
                  labelColor="black font-medium"
                />
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pre_qualification_details}
                  error={errors.pre_qualification_details}
                  touched={touched.pre_qualification_details}
                  label="Pre Qualification Details"
                  name="pre_qualification_details"
                  placeholder="Enter pre qualification details"
                  maxlength={250}
                  className="min-h-[80px] max-h-[80px]"
                  readonly={readonly}
                  labelColor="black font-medium"
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <CheckboxComponent
                  checkList={product_category}
                  onBlur={handleBlur}
                  value={values.product_categories}
                  error={errors.product_categories}
                  touched={touched.product_categories}
                  required
                  readonly={readonly}
                  gridClass="grid-cols-4"
                  name="product_categories"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.product_sub_category}
                    error={errors.product_sub_category}
                    touched={touched.product_sub_category}
                    label="Product Sub Category"
                    name="product_sub_category"
                    placeholder="Enter product sub category"
                    maxlength={50}
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <div></div>
                </div>
              </div>
              <div
                className={`bg-${bg_color} px-4 py-3 shadow-xl border rounded grid gap-4`}
              >
                <div className="flex flex-wrap gap-8">
                  <RadioComponent
                    checkList={contract_type}
                    onBlur={handleBlur}
                    value={values.contract_type}
                    error={errors.contract_type}
                    touched={touched.contract_type}
                    required
                    readonly={readonly}
                    name="contract_type"
                  />
                  <RadioComponent
                    checkList={tender_value}
                    onBlur={handleBlur}
                    value={values.tender_value}
                    error={errors.tender_value}
                    touched={touched.tender_value}
                    required
                    readonly={readonly}
                    name="tender_value"
                  />
                  {/* <div className="flex items-end"> */}
                    <RadioComponent
                      checkList={bid_validity}
                      onBlur={handleBlur}
                      // value={
                      //   !bid_validity.options.find(
                      //     (i) => i.value === values.bid_validity
                      //   )
                      //     ? "others"
                      //     : values.bid_validity
                      // }
                      value={values.bid_validity}
                      error={errors.bid_validity}
                      touched={touched.bid_validity}
                      required
                      readonly={readonly}
                      name="bid_validity"
                    />
                    {/* {(bid_validity.options.find(
                      (i) => i.value === values.bid_validity
                    )?.value === "others" ||
                      !bid_validity.options.find(
                        (i) => i.value === values.bid_validity
                      )) && (
                      <input
                        onBlur={handleBlur}
                        value={values.bid_validity === "others" ? "" : values.bid_validity}
                        onChange={(e) =>
                          setFieldValue("bid_validity", e.target.value)
                        }
                        className="bg-white border border-gray-400 rounded-lg h-6 w-20 mb-2"
                      />
                    )} */}
                  {/* </div> */}
                </div>
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.completion_period}
                    error={errors.completion_period}
                    touched={touched.completion_period}
                    label="Completion Period in Months"
                    name="completion_period"
                    placeholder="Enter Completion Period"
                    required
                    readonly={readonly}
                    labelColor="black font-medium"
                    type="number"
                    maxlength={3}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.work_location}
                    error={errors.work_location}
                    touched={touched.work_location}
                    label="Location (Work/Services/Items)"
                    name="work_location"
                    placeholder="Enter Location"
                    required
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pin_code}
                    error={errors.pin_code}
                    touched={touched.pin_code}
                    label="Pin Code"
                    name="pin_code"
                    placeholder="Enter Pin Code"
                    required
                    readonly={readonly}
                    labelColor="black font-medium"
                    type="number"
                    maxlength={6}
                  />
                </div>
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <RadioYesNoComponent
                  title="Pre Bid Meeting"
                  onBlur={handleBlur}
                  value={values.pre_bid_meeting}
                  error={errors.pre_bid_meeting}
                  touched={touched.pre_bid_meeting}
                  required
                  readonly={readonly}
                  name="pre_bid_meeting"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bid_opening_place}
                    error={errors.bid_opening_place}
                    touched={touched.bid_opening_place}
                    label="Bid Opening Place"
                    name="bid_opening_place"
                    placeholder="Enter Bid Opening Place"
                    maxlength={50}
                    required={values.pre_bid_meeting}
                    readonly={!values.pre_bid_meeting || readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pre_bid_meeting_place}
                    error={errors.pre_bid_meeting_place}
                    touched={touched.pre_bid_meeting_place}
                    label="Pre Bid Meeting Place"
                    name="pre_bid_meeting_place"
                    placeholder="Enter Pre Bid Meeting Place"
                    maxlength={50}
                    required={values.pre_bid_meeting}
                    readonly={!values.pre_bid_meeting || readonly}
                    labelColor="black font-medium"
                  />
                </div>
                <TextArea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pre_bid_meeting_address}
                  error={errors.pre_bid_meeting_address}
                  touched={touched.pre_bid_meeting_address}
                  label="Pre Bid Meeting Address"
                  name="pre_bid_meeting_address"
                  placeholder="Enter Pre Bid Meeting Address"
                  maxlength={150}
                  className="min-h-[80px] max-h-[80px]"
                  required={values.pre_bid_meeting}
                  readonly={!values.pre_bid_meeting || readonly}
                  labelColor="black font-medium"
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <CheckboxComponent
                  checkList={tenderer_class}
                  onBlur={handleBlur}
                  value={values.tenderer_class}
                  error={errors.tenderer_class}
                  touched={touched.tenderer_class}
                  required
                  readonly={readonly}
                  gridClass="grid-cols-5"
                  name="tenderer_class"
                />
              </div>
              <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inviting_officer_name}
                    error={errors.inviting_officer_name}
                    touched={touched.inviting_officer_name}
                    label="Inviting Officer Name"
                    name="inviting_officer_name"
                    placeholder="Enter Inviting Officer Name"
                    required
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inviting_officer_address}
                    error={errors.inviting_officer_address}
                    touched={touched.inviting_officer_address}
                    label="Inviting Officer Address"
                    name="inviting_officer_address"
                    placeholder="Enter Inviting Officer Address"
                    required
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inviting_officer_contact}
                    error={errors.inviting_officer_contact}
                    touched={touched.inviting_officer_contact}
                    label="Inviting Officer Phone/Email"
                    name="inviting_officer_contact"
                    placeholder="Enter Inviting Officer Phone/Email"
                    required
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                </div>
              </div>
              {/* <div
                className={`bg-${bg_color} p-4 shadow-xl border rounded grid gap-4`}
              >
                
              </div> */}
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

export default TenderWorkDetailsForm;
