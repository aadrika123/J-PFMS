"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-06-2024
 * | Created for- Tender Bid Opener Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import React, { ChangeEvent, useRef, useState } from "react";
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
import { tenderBidDetailsSchema } from "pfmslib";
import Input from "@/components/global/atoms/Input";
// import { LuCloudy } from "react-icons/lu";
import BidIcon from "@/assets/svg/First Place Ribbon.svg";

type TenderBidOpenerFormProps = {
  handleShowPreview: () => void;
};

const TenderBidOpenerForm: React.FC<TenderBidOpenerFormProps> = (props) => {
  const { handleShowPreview } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    bid_openers: [
      {
        name: "",
        email: "",
      },
      {
        name: "",
        email: "",
      },
      {
        name: "",
        email: "",
      },
    ],
    files: [
      {
        file_name: "",
        file_description: "",
        file_size: "",
        file: "",
      },
      {
        file_name: "",
        file_description: "",
        file_size: "",
        file: "",
      },
    ],
  };

  const readonly = false;
  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
    file_errors: [{ error: "" }, { error: "" }],
  });

  const { showWarning, triggerFun, showFinalError } = state;

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    console.log("Basic Details", values);
    handleShowPreview();
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

  ///////////// Checking File Type
  const validateFileType = (file: any) => {
    const fileTypes = ["jpeg", "jpg", "pdf"];

    return fileTypes.some((type) => file?.type?.includes(type));
  };

  ////// Handle Upload
  const interalHandleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (key: string, value: any) => void,
    index: number
  ) => {
    const errors = [...state.file_errors];
    errors[index].error = "";

    setState({ ...state, file_errors: errors, inProgress: true });

    try {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        if (file.size > 2 * 1024 * 1024 || file.size! < 9 * 1024) {
          throw Error(`file size should be between 10 kb to 2 mb`);
        }
        if (!validateFileType(file)) {
          throw Error(`'${file.type.split("/")[1]}' file not allowed`);
        }

        setFieldValue(`files[${index}].file`, file);
        setFieldValue(`files[${index}].file_size`, file.size);
      }
    } catch (error: any) {
      errors[index].error = error;

      setState({ ...state, file_errors: errors, inProgress: false });
      console.log(error);
    }
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
        <Image src={BidIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">
          Bid Openers Selection: (Mininum 02 or Maximum 03)
        </header>
      </div>

      {/* Form section */}
      <Formik
        initialValues={initialValues}
        validationSchema={tenderBidDetailsSchema}
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
              {values.bid_openers.map((opener: any, index: number) => (
                <div
                  key={index}
                  className={`flex bg-${bg_color} rounded shadow-xl border`}
                >
                  <div className="w-12 flex items-center shadow-xl justify-center bg-gray-300 rounded">
                    B0{index + 1}
                  </div>
                  <div className={`p-4 w-full grid grid-cols-2 gap-4`}>
                    <Input
                      label="Name/Designation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bid_openers[index]?.name}
                      touched={
                        touched.bid_openers && touched?.bid_openers[index]?.name
                      }
                      error={
                        errors.bid_openers && errors.bid_openers[index]?.name
                      }
                      name={`bid_openers[${index}].name`}
                      placeholder="Enter Name/Designation"
                      readonly={readonly}
                      required={index !== values.bid_openers.length - 1}
                    />
                    <Input
                      label="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bid_openers[index]?.email}
                      touched={
                        touched.bid_openers &&
                        touched?.bid_openers[index]?.email
                      }
                      error={
                        errors.bid_openers && errors.bid_openers[index]?.email
                      }
                      name={`bid_openers[${index}].email`}
                      readonly={readonly}
                      placeholder="Enter Email"
                      required={index !== values.bid_openers.length - 1}
                    />
                  </div>
                </div>
              ))}

              {/* Header section */}
              <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg">
                {/* <Image src={FeeIcon} height={30} width={30} alt="tender-icon" /> */}
                <header className="ml-2 text-white">
                  <h2 className="font-bold">Uploading the tender documents</h2>
                  <span className="text-xs">
                    (Only PDF, JPG, XLS & RAR Files Allowed)
                  </span>
                </header>
              </div>
              {values.files.map((file: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex bg-${bg_color} rounded shadow-xl border`}
                >
                  <div className="w-12 flex items-center shadow-xl justify-center bg-gray-300 rounded">
                    B0{idx + 1}
                  </div>
                  <div className={`p-4 w-full grid grid-cols-3 gap-6`}>
                    <div className="grid gap-4 col-span-2">
                      <Input
                        label="File Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.files[idx]?.file_name}
                        touched={touched.files && touched.files[idx]?.file_name}
                        error={errors.files && errors.files[idx]?.file_name}
                        name={`files[${idx}].file_name`}
                        placeholder="Enter File Name"
                        readonly={readonly}
                        required
                      />
                      <Input
                        label="Description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.files[idx]?.file_description}
                        touched={
                          touched.files && touched.files[idx]?.file_description
                        }
                        error={
                          errors.files && errors.files[idx]?.file_description
                        }
                        name={`files[${idx}].file_description`}
                        placeholder="Enter Description"
                        readonly={readonly}
                        required
                      />
                    </div>
                    <div className="grid gap-4">
                      <Input
                        label="Document Size (kb)"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.files[idx]?.file_size}
                        touched={touched.files && touched.files[idx]?.file_size}
                        error={errors.files && errors.files[idx]?.file_size}
                        name={`files[${idx}].file_size`}
                        readonly={true}
                        required
                      />
                      <div className="border-[3px] rounded-xl border-dashed flex justify-center items-center flex-col">
                        <div className="">
                          <input
                            id={`doc-file-${idx}`}
                            type="file"
                            accept=".jpg, .jpeg, .pdf .png"
                            className="hidden"
                            name={`files[${idx}].file`}
                            onChange={(e) =>
                              interalHandleUpload(e, setFieldValue, idx)
                            }
                          />

                          {/* {error && <p className="text-red-500 text-sm m-2">{error}</p>} */}
                          {values.files[idx].file !== "" && (
                            <Image
                              src={URL.createObjectURL(values.files[idx].file)}
                              height={50}
                              width={50}
                              alt="t"
                              className="max-h-20 w-full object-contain"
                            />
                          )}
                          <label
                            htmlFor={`doc-file-${idx}`}
                            className={`bg-white border-gray-300 border text-gray-150 text-sm px-14 py-1 mt-2 hover:bg-gray-200 hover:text-gray-500  rounded leading-5 shadow-lg`}
                          >
                            Browse File
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default TenderBidOpenerForm;
