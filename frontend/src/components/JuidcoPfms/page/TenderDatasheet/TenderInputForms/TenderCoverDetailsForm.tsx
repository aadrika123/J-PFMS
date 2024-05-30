"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 29-05-2024
 * | Created for- Tender Basic Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import { tenderBasicDetailsSchema } from "pfmslib";
import React, { useRef, useState } from "react";
import { bg_color, coverList } from "../molecules/checkList";
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
import CoverIcon from "@/assets/svg/Parchment.svg";
import ImageUploadUi from "./ImageUploadUi";
import TextArea from "@/components/global/atoms/Textarea";

const TenderCoverDetailsForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    cover_no: "1",
    fee_img: "",
    content: "",
    files: [
      {
        file_type: "",
        file_name: "",
        path: "",
        size: "",
      },
    ],
  };

  const readonly = false;
  const [state, setState] = useState<any>({
    tabNo: 1,
    coverNo: "1",
    files: [],
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const {
    tabNo,
    coverNo,
    files,
    showWarning,
    triggerFun,
    showFinalError,
  } = state;

  ////////////// Handle Cover No Change ////////////
  const handleTabChange = (tabNo: number) => {
    setState({ ...state, tabNo });
  };

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    console.log("Basic Details", values);
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

  /////// Handle Upload
  const handleUpload = (status: any) => {
    const lists: string[] =
      coverList?.options?.find((cover: any) => cover.value === coverNo)?.list ||
      [];

    const tabName = lists[tabNo - 1]?.toLowerCase();

    const tabFile: any = {
      type: tabName,
    };

    const prevFile = state.files.find((f: any) => f.type === tabName);
    
    if (prevFile) {
      tabFile.files = [
        ...prevFile.files,
        {
          file_name: status.file_name,
          path: "",
          size: status.size,
        },
      ];
    } else {
      tabFile.files = [
        {
          file_name: status.file_name,
          path: "",
          size: status.size,
        },
      ];
    }

    setState({
      ...state,
      files: [...state.files.filter((i: any) => i.type !== tabName), tabFile],
    });
  };

  ////// Find Current File Tab Name
  const findCurrentTabFiles = (files : any[]) =>{
    return files.find(
      (i: any) =>
        i.type ===
        coverList?.options
          ?.find((cover: any) => cover.value === coverNo)
          ?.list[tabNo - 1]?.toLowerCase()
    )
  }

  /////////////// Handle Delete File 
  const handleDeleteFile = (type: string, index: number) =>{
    const allFiles = [...state.files];

    const tabInfo = findCurrentTabFiles(allFiles);

    const files = tabInfo.files.filter((item:any, i:number) => i !== index);

    const updatedTabInfo = {...tabInfo, files};


    setState({
      ...state,
      files: [...state.files.filter((i: any) => i.type !== tabInfo.type), updatedTabInfo],
    });
  }

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
        <Image src={CoverIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">Cover Details</header>
      </div>

      {/* Form section */}
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
            <div
              className={`bg-${bg_color} p-3 shadow-xl border rounded grid gap-4`}
            >
              <RadioComponent
                checkList={coverList}
                changeHandler={(newItem) =>
                  setState({ ...state, coverNo: newItem })
                }
                onBlur={handleBlur}
                value={values.cover_no}
                error={errors.cover_no}
                touched={touched.cover_no}
                required
                name="cover_no"
              />

              <div className="flex gap-3 border-b-2 border-b-primary_bg_indigo rounded">
                {coverList?.options
                  ?.find((cover: any) => cover.value === values.cover_no)
                  ?.list.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleTabChange(index + 1)}
                      className={`px-3 py-1 rounded cursor-pointer ${index + 1 === tabNo ? "bg-primary_bg_indigo text-white" : "bg-gray-200 text-secondary"}`}
                    >
                      {item}
                    </div>
                  ))}
              </div>

              {/* File Upload */}
              <ImageUploadUi
                handleUpload={handleUpload}
                handleDeleteFile={handleDeleteFile}
                fileInfo={findCurrentTabFiles(files)}
              />

              <TextArea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                error={errors.content}
                touched={touched.content}
                label="Content"
                name="content"
                placeholder="Enter content"
                maxlength={50}
                required
                readonly={readonly}
              />
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

export default TenderCoverDetailsForm;
