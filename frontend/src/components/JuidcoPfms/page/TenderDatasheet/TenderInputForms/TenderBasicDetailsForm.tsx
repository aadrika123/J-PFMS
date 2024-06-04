"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Tender Basic Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import Input from "@/components/global/atoms/Input";
import goBack from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import { tenderBasicDetailsSchema } from "pfmslib";
import React, { ChangeEvent, useRef, useState } from "react";
import CheckboxComponent from "../molecules/CheckboxComponent";
import {
  bg_color,
  contractFormList,
  offline_instument,
  online_bank,
  payment_mode,
  tenderCategoryList,
  tenderTypeList,
} from "../molecules/checkList";
import RadioComponent from "../molecules/RadioComponent";
import RadioYesNoComponent from "../molecules/RadioYesNoComponent";
import CustomImage from "@/components/global/molecules/general/CustomImage";
import Image from "next/image";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
const RunningAnimation = dynamic(
  () =>
    import("../../ProjectProposal/Animations").then((module) => {
      return { default: module.RunningAnimation };
    }),
  {
    ssr: false,
  }
);
import Check from "@/assets/svg/Check.svg";
import upload from "@/assets/svg/upload.svg";
import dynamic from "next/dynamic";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import Popup from "@/components/global/molecules/Popup";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import FolderIcon from "@/assets/svg/Folder.svg";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

type TenderBasicDetailsFormProps = {
  handleTabChange: (type: string) => void;
};

const TenderBasicDetailsForm: React.FC<TenderBasicDetailsFormProps> = (
  props
) => {
  const { handleTabChange } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    reference_no: "",
    tender_type: "",
    contract_forms: [],
    tender_categories: [],
    allow_resubmission: undefined,
    allow_withdrawal: undefined,
    allow_offline_submission: undefined,
    payment_mode: "online",
    bank: "",
    instrument: "",
    file: {
      file_name: "",
      size: "",
      file_token: "",
    },
  };

  const readonly = false;
  const [state, setState] = useState<any>({
    file: "",
    showPopup: false,
    inProgress: false,
    validationError: null,
    fileType: "",
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const {
    file,
    showPopup,
    validationError,
    inProgress,
    fileType,
    showWarning,
    triggerFun,
    showFinalError,
  } = state;

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    console.log("Basic Details", values);
    handleTabChange("next");
  };

  ///////////// Checking File Type
  const validateFileType = (file: any) => {
    const fileTypes = ["jpeg", "jpg", "pdf"];

    return fileTypes.some((type) => file?.type?.includes(type));
  };

  ////// Handle Upload
  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (key: string, value: any) => void,
    index: number
  ) => {
    setState((prev: any) => {
      if (index === 0) return { ...prev, inProgress: true };

      return { ...prev, inProgress: true };
    });
    try {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        if (file.size > 2 * 1024 * 1024 || file.size! < 9 * 1024) {
          setState({
            ...state,
            validationError: `file size should be between 10 kb to 2 mb`,
          });
          return;
        }
        if (!validateFileType(file)) {
          setState({
            ...state,
            validationError: `'${file.name.substring(file.name.lastIndexOf("."))}' file is not allowed`,
          });
          return;
        }

        const formData = new FormData();

        formData.append("doc", file);
        const res = await axios({
          url: `${PFMS_URL.FILE_UPLOAD_URL.upload}`,
          method: "POST",
          data: formData,
        });
        if (!res.data.status) throw "Something Went Wrong";

        setFieldValue(`file.file_token`, res.data.data.file_token);
        setFieldValue(`file.file_name`, file.name);
        setFieldValue("file.size", file.size);
        setState({
          ...state,
          validationError: null,
          file: URL.createObjectURL(file),
          fileType: file?.type?.includes("pdf") ? "pdf" : "",
        });
      }
    } catch (error: any) {
      setFieldValue(`file.file_token`, "");
      toast.error(error);
      console.log(error);
    } finally {
      setState((prev: any) => ({ ...prev, inProgress: false }));
    }
  };

  ///// handlBackAndReset
  const handleBackAndReset = (trigger?: () => void) => {
    setState({ ...state, showWarning: !showWarning, triggerFun: trigger });
    if (trigger) {
      const c: any = document?.getElementById("letter");
      c.value = "";
    }
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

  ///////// Handle Reset Payment Mode
  const handleResetPaymentMode = (
    setFieldValue: (key: string, value: string) => void,
    value: string
  ) => {
    if (value === "online") {
      setFieldValue("instrument", "");
    } else {
      setFieldValue("bank", "");
    }
  };

  return (
    <>
      <Toaster />
      {showPopup && (
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
      )}
      {showWarning && (
        <LosingDataConfirmPopup
          continue={handleCompleteReset}
          cancel={handleBackAndReset}
        />
      )}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg">
        <Image src={FolderIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">Basic Details</header>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={tenderBasicDetailsSchema}
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
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid gap-4`}
              >
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reference_no}
                  error={errors.reference_no}
                  touched={touched.reference_no}
                  label="Tender Reference No"
                  name="reference_no"
                  placeholder="Enter Tender Reference No"
                  maxlength={50}
                  required
                  type="text"
                  readonly={readonly}
                  labelColor="black font-medium"
                />
              </div>
              <div className={`bg-${bg_color} p-3 shadow-xl border rounded`}>
                <CheckboxComponent
                  checkList={contractFormList}
                  onBlur={handleBlur}
                  value={values.contract_forms}
                  error={errors.contract_forms}
                  touched={touched.contract_forms}
                  required
                  name="contract_forms"
                />
              </div>
              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid gap-3`}
              >
                <RadioComponent
                  checkList={tenderTypeList}
                  onBlur={handleBlur}
                  value={values.tender_type}
                  error={errors.tender_type}
                  touched={touched.tender_type}
                  required
                  name="tender_type"
                />
                <CheckboxComponent
                  checkList={tenderCategoryList}
                  onBlur={handleBlur}
                  value={values.tender_categories}
                  error={errors.tender_categories}
                  touched={touched.tender_categories}
                  required
                  name="tender_categories"
                />
              </div>
              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid grid-cols-2 gap-3`}
              >
                <RadioYesNoComponent
                  title="Allow Resubmission"
                  onBlur={handleBlur}
                  value={values.allow_resubmission}
                  error={errors.allow_resubmission}
                  touched={touched.allow_resubmission}
                  required
                  name="allow_resubmission"
                />
                <RadioYesNoComponent
                  title="Allow Withdrawal"
                  onBlur={handleBlur}
                  value={values.allow_withdrawal}
                  error={errors.allow_withdrawal}
                  touched={touched.allow_withdrawal}
                  required
                  name="allow_withdrawal"
                />
                <RadioYesNoComponent
                  title="Allow Offline Submission"
                  onBlur={handleBlur}
                  value={values.allow_offline_submission}
                  error={errors.allow_offline_submission}
                  touched={touched.allow_offline_submission}
                  required
                  name="allow_offline_submission"
                />
              </div>

              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid grid-cols-1 gap-3`}
              >
                <div className="flex flex-col">
                  <label
                    className={`text-sm font-medium ${touched?.file?.file_token && errors?.file?.file_token ? "text-red-600" : "text-black"}`}
                  >
                    NIT Document
                    <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs">
                    {"(Only .jpg, .jpeg and .pdf files are supported )"}
                  </span>
                </div>
                {values?.file?.file_token && (
                  <table className="border">
                    <thead className="bg-primary_bg_indigo text-white">
                      <th className="border">File Name</th>
                      <th className="border">{"Document Size (kb)"}</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border">
                          <div className="flex items-center justify-center">
                            {values.file.file_name}
                          </div>
                        </td>
                        <td className="">
                          <div className="flex items-center justify-center">
                            {values.file.size ? values.file.size + " kb" : ""}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                <div className="flex items-center w-full">
                  <div className="flex flex-col min-w-28">
                    <input
                      id="letter"
                      type="file"
                      className="hidden"
                      disabled={readonly}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleUpload(e, setFieldValue, 0)
                      }
                      accept={".jpg, .jpeg, .pdf"}
                    />
                    <label
                      className={`bg-primary_bg_indigo relative p-1 shadow-lg rounded flex text-white justify-between px-2 ${readonly ? "bg-opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                      htmlFor="letter"
                    >
                      {values.file.file_token && !inProgress
                        ? "Uploaded"
                        : "Upload NIT Document"}
                      {values.file.file_token && !inProgress ? (
                        <Image
                          src={Check}
                          width={20}
                          height={20}
                          alt="letter"
                        />
                      ) : inProgress ? (
                        <div className="absolute -right-2 -top-4 h-">
                          <RunningAnimation />
                        </div>
                      ) : (
                        <Image
                          src={upload}
                          width={20}
                          height={20}
                          alt="letter"
                        />
                      )}
                    </label>
                    {!values?.file.file_token &&
                    !validationError &&
                    touched?.file &&
                    errors?.file &&
                    errors?.file.file_token ? (
                      <span className="text-red-500">
                        {errors.file.file_token}
                      </span>
                    ) : validationError ? (
                      <span className="text-red-500">{validationError}</span>
                    ) : (
                      <span>
                        {values.files?.file_name || (
                          <span className="text-sm text-red-500">
                            file size should 10 kb to 2 mb
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  {file && (
                    <div className="hide-scrollbar ml-4">
                      {fileType !== "pdf" ? (
                        <CustomImage src={file} width={100} height={80} />
                      ) : (
                        <Image
                          onClick={() =>
                            setState({ ...state, showPopup: !showPopup })
                          }
                          src={pdfIcon}
                          width={70}
                          height={70}
                          alt="pdf-icon"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid gap-3`}
              >
                <RadioComponent
                  checkList={payment_mode}
                  onBlur={handleBlur}
                  value={values.payment_mode}
                  error={errors.payment_mode}
                  touched={touched.payment_mode}
                  changeHandler={(value: string) =>
                    handleResetPaymentMode(setFieldValue, value)
                  }
                  required
                  name="payment_mode"
                />

                {values.payment_mode === "online" ? (
                  <SelectForNoApi
                    data={online_bank}
                    onBlur={handleBlur}
                    value={values.bank}
                    error={errors.bank}
                    touched={touched.bank}
                    required
                    name="bank"
                    label="Online (Banks)"
                    placeholder="Select Bank"
                    labelColor="black font-medium"
                  />
                ) : (
                  values.payment_mode === "offline" && (
                    <RadioComponent
                      checkList={offline_instument}
                      onBlur={handleBlur}
                      value={values.instrument}
                      error={errors.instrument}
                      touched={touched.instrument}
                      required
                      name="instrument"
                    />
                  )
                )}
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

export default TenderBasicDetailsForm;
