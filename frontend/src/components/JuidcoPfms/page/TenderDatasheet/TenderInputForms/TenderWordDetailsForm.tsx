"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-05-2024
 * | Created for- Tender Work Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
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
} from "../molecules/checkList";
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

type TenderWorkDetailsFormProps = {
  handleTabChange: (type: string) => void;
};

const TenderWorkDetailsForm: React.FC<TenderWorkDetailsFormProps> = (props) => {
  const { handleTabChange } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    work_title: "",
    description: "",
    pre_qualification_details: "",
    product_categories: [],
    product_sub_category: "",
    contract_type: "",
    tender_value: "",
    bid_validity: "",
    completion_period: "",
    work_location: "",
    pin_code: "",
    pre_bid_meeting: true,
    bid_opening_place: "",
    pre_bid_meeting_place: "",
    pre_bid_meeting_address: "",
    tenderer_class: [],
    inviting_officer_name: "",
    inviting_officer_address: "",
    inviting_officer_contact: "",
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
        <Image src={WorkIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">Work Details</header>
      </div>

      {/* Form section */}
      <Formik
        initialValues={initialValues}
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
                  readonly={readonly}
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
                  readonly={readonly}
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
                    name="contract_type"
                  />
                  <RadioComponent
                    checkList={tender_value}
                    onBlur={handleBlur}
                    value={values.tender_value}
                    error={errors.tender_value}
                    touched={touched.tender_value}
                    required
                    name="tender_value"
                  />
                  <RadioComponent
                    checkList={bid_validity}
                    onBlur={handleBlur}
                    value={values.bid_validity}
                    error={errors.bid_validity}
                    touched={touched.bid_validity}
                    required
                    name="bid_validity"
                  />
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
                <Button
                  onClick={() => handleTabChange("prev")}
                  buttontype="button"
                  variant="cancel"
                >
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

export default TenderWorkDetailsForm;
