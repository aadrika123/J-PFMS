/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Tender Basic Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import Input from "@/components/global/atoms/Input";
import goBack, { removeEmptyField } from "@/utils/helper";
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
import uploadImg from "@/assets/svg/upload.svg";
import dynamic from "next/dynamic";
import Popup from "@/components/global/molecules/Popup";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import FolderIcon from "@/assets/svg/Folder.svg";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { upload } from "@/utils/fileUploadAndGet";
import { Icons } from "@/assets/svg/icons";

type TenderBasicDetailsFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
};

const TenderBasicDetailsForm: React.FC<TenderBasicDetailsFormProps> = (
  props
) => {
  const queryClient = useQueryClient();
  const { handleTabChange, tenderFormId } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const readonly = false;
  const [state, setState] = useState<any>({
    file: "",
    showPopup: false,
    inProgress: false,
    validationError: null,
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
    currentFile:""
  });

  const {
    showPopup,
    validationError,
    inProgress,
    showWarning,
    triggerFun,
    showFinalError,
    currentFile
  } = state;

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.TENDER_BASIC.getById}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(
    ["tender-basic-details", tenderFormId],
    fetch
  );

  const initialDetails = {
    tender_datasheet_id: data?.tender_datasheet_id || tenderFormId,
    reference_no: data?.reference_no || "",
    tender_type: data?.tender_type || "",
    contract_forms: data?.contract_forms || [],
    tender_categories: data?.tender_categories || [],
    allow_resubmission: data?.allow_resubmission,
    allow_withdrawal: data?.allow_withdrawal,
    allow_offline_submission: data?.allow_offline_submission,
    payment_mode: data?.payment_mode || "online",
    bank_id: data?.bank?.id || "",
    instrument: data?.instrument || "",
    file: {
      file_name: data?.file?.file_name || "",
      size: data?.file?.size || "",
      path: data?.file?.path || "",
    },
  }

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

        setFieldValue(`file.path`, file);
        setFieldValue(`file.file_name`, file.name);
        setFieldValue("file.size", String(file.size));
        setState({
          ...state,
          validationError: null,
          file: URL.createObjectURL(file),
          fileType: file?.type?.includes("pdf") ? "pdf" : "",
        });
      }
    } catch (error: any) {
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

  //////////// Handle Save Basic Details /////////////
  const handleSave = async (values: any) => {
    activateWorkingAnimation();
    if (!String(values.file.path).includes("https")) {
      const file_path = await upload(values.file.path);

      values.file.path = file_path;
    }
    const res = await axios({
      url: `${PFMS_URL.TENDER_BASIC.create}`,
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
        queryClient.invalidateQueries(["tender-basic-openers", tenderFormId]),
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

  ////////// Handle Show Image in Full Screen /////////
  const handleShowFileInFullScreen = (path: string | any) => {
    setState({
      ...state,
      showPopup: !showPopup,
      currentFile: !String(path).includes("https")
        ? URL.createObjectURL(path)
        : path,
    });
  };

  ///////// Get Visibal Image /////
  const getVisibleImage = (path: any): any => {
    if (!String(path).includes("https")) {
      return path.name.includes(".pdf") ? (
        Icons.pdf
      ) : (
        <img
          src={URL.createObjectURL(path)}
          height={50}
          width={50}
          alt="t"
          className="max-h-20 w-20 object-cover"
        />
      );
    } else {
      return String(path).includes(".pdf") ? (
        Icons.pdf
      ) : (
        <img
          src={path}
          height={50}
          width={50}
          alt="t"
          className="max-h-20 w-20 object-cover"
        />
      );
    }
  };

  ////////////// handle cancle /////////////
  // const handleCancel = () => {
  //   setState({ ...state, showConfirmation: false });
  // };

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    mutate(removeEmptyField(values));
    // setState({ ...state, showConfirmation: true, finalData: { ...values } });
  };

  ////////////// handle cancle /////////////
  // const handleContinue = () => {
  //   mutate(removeEmptyField(finalData));
  // };

  return (
    <>
      <Toaster />
      {workingAnimation}
      {/* {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure? want to save the details?"
          cancel={handleCancel}
          continue={handleContinue}
        />
      )} */}
      {showPopup && (
        <Popup padding="0">
          <iframe
            width={1000}
            height={570}
            src={currentFile}
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
        initialValues={initialDetails}
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
                    className={`text-sm font-medium ${touched?.file?.path && errors?.file?.path ? "text-red-600" : "text-black"}`}
                  >
                    NIT Document
                    <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs">
                    {"(Only .jpg, .jpeg and .pdf files are supported )"}
                  </span>
                </div>
                {values?.file?.path && (
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
                      {values.file.path && !inProgress
                        ? "Uploaded"
                        : "Upload NIT Document"}
                      {values.file.path && !inProgress ? (
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
                          src={uploadImg}
                          width={20}
                          height={20}
                          alt="letter"
                        />
                      )}
                    </label>
                    {!values?.file.path &&
                    !validationError &&
                    touched?.file &&
                    errors?.file &&
                    errors?.file.path ? (
                      <span className="text-red-500">{errors.file.path}</span>
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
                  {values.file.path !== "" && (
                    <div
                    className="hide-scrollbar ml-6"
                      onClick={() =>
                        handleShowFileInFullScreen(values.file.path)
                      }
                    >
                      {getVisibleImage(values.file.path)}
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
                  required
                  name="payment_mode"
                />

                {values.payment_mode === "online" ? (
                  <SelectForNoApi
                    data={online_bank}
                    onBlur={handleBlur}
                    value={values.bank_id}
                    error={errors.bank_id}
                    touched={touched.bank_id}
                    required
                    name="bank_id"
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

export default TenderBasicDetailsForm;
