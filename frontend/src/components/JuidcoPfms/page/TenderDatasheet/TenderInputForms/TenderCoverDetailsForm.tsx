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
import { tenderCoverDetailsSchema } from "pfmslib";
import React, { useEffect, useState } from "react";
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
import Input from "@/components/global/atoms/Input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { upload } from "@/utils/fileUploadAndGet";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import toast, { Toaster } from "react-hot-toast";

type TenderCoverDetailsFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
};

const TenderCoverDetailsForm: React.FC<TenderCoverDetailsFormProps> = (
  props
) => {
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const { handleTabChange, tenderFormId } = props;
  // const formRef = useRef<HTMLFormElement>(null);

  const readonly = false;

  const [state, setState] = useState<any>({
    tabNo: 1,
    coverNo: "1",
    files: [],
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const { tabNo, coverNo, files, showWarning, triggerFun, showFinalError } =
    state;

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
    ["tender-cover-details", tenderFormId],
    fetch
  );

  const initialDetails = {
    tender_datasheet_id: data?.tender_datasheet_id || tenderFormId,
    cover_no: data?.cover_no,
    content: data?.content,
    files: data?.files.length ? data?.files : [],
  };

  useEffect(() => {
    if (data) {
      setState({ ...state, files: data?.files, coverNo: data?.cover_no });
    }
  }, [data]);

  ////////////// Handle Cover No Change ////////////
  const handleFileTabChange = (tabNo: number) => {
    setState({ ...state, tabNo });
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

  /////// Handle Upload
  const handleUpload = (
    fileData: any,
    setFieldValue: (key: string, value: any[]) => void
  ) => {
    const lists: string[] =
      coverList?.options?.find((cover: any) => cover.value === coverNo)?.list ||
      [];

    const tabName = lists[tabNo - 1]?.toLowerCase();

    const tabFile: any = {
      file_id: files[files.length - 1]?.file_id + 1 || 1,
      type: tabName,
      file_name: fileData.file_name,
      path: fileData.file,
      size: fileData.size,
    };

    const newArray = [...state.files, tabFile];
    setFieldValue("files", newArray);
    setState({
      ...state,
      files: newArray,
    });
  };

  ////// Find Current File Tab Name
  const findCurrentTabFiles = (files: any[]) => {
    const currentTab = coverList?.options?.find(
      (cover: any) => cover.value === coverNo
    )?.list[tabNo - 1];
    return files.filter((i: any) => i.type === currentTab?.toLowerCase());
  };

  /////////////// Handle Delete File
  const handleDeleteFile = (
    file_id: number,
    setFieldValue: (key: string, value: any) => void
  ) => {
    const newFileList = files.filter((i: any) => i.file_id !== file_id);

    setState({
      ...state,
      files: newFileList,
    });
    setFieldValue("files", newFileList);
  };

  //////////// Get List of Remaing file tab ///////////
  const handleIsMissning = (error: any, item: string) => {
    if (error && Array.isArray(error)) {
      return false;
    } else {
      return error
        ? error.split(" ")[0]?.split(",").includes(`${item}`)
        : false;
    }
  };

  //////////// Adding File path /////////
  const addingFilePath = async (files: any[]) => {
    const tabs = coverList?.options?.find(
      (cover: any) => cover.value === coverNo
    )?.listInLower;

    const newFiles = files.filter((i) => tabs?.includes(`${i.type}`));
    for (const file of newFiles) {
      if (!String(file.path).includes("https")) {
        file.path = await upload(file.path);
      }
    }
    return newFiles;
  };

  //////////// Handle Save Cover Details /////////////
  const handleSave = async (values: any) => {
    activateWorkingAnimation();
    values.files = await addingFilePath(values.files);
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
      {/* Header section */}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg">
        <Image src={CoverIcon} height={30} width={30} alt="tender-icon" />
        <header className="font-bold ml-2 text-white">Cover Details</header>
      </div>

      {/* Form section */}
      <Formik
        initialValues={initialDetails}
        validationSchema={tenderCoverDetailsSchema}
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
            // ref={formRef}
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
                      onClick={() => handleFileTabChange(index + 1)}
                      className={`px-3 py-1 rounded cursor-pointer ${index + 1 === tabNo ? `${handleIsMissning(errors.files, item) ? "text-red-600 border border-red-600" : " text-white"} bg-primary_bg_indigo` : handleIsMissning(errors.files, item) ? "text-red-600 border border-red-600 bg-gray-200" : "bg-gray-200 text-secondary"}`}
                    >
                      {item}
                    </div>
                  ))}
              </div>

              {/* File Upload */}
              <ImageUploadUi
                handleUpload={(fileData: any) =>
                  handleUpload(fileData, setFieldValue)
                }
                handleDeleteFile={(file_id: number) =>
                  handleDeleteFile(file_id, setFieldValue)
                }
                files={findCurrentTabFiles(files)}
              />

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                error={errors.content}
                touched={touched.content}
                label="Content"
                name="content"
                placeholder="Enter content"
                maxlength={100}
                required
                readonly={readonly}
                labelColor="black font-medium"
              />
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

export default TenderCoverDetailsForm;
