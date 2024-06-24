/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-06-2024
 * | Created for- Project Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import Input from "@/components/global/atoms/Input";
import goBack, { removeEmptyField } from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import React, { useRef, useState } from "react";
import { bg_color } from "../molecules/StaticList";
import Image from "next/image";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { upload } from "@/utils/fileUploadAndGet";
import TextArea from "@/components/global/atoms/Textarea";
import ProjectContractIcon from "@/assets/svg/project-contract-details.svg";
import { awardedTenderValidation } from "pfmslib";

type ProjectDetailsFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  readonly: boolean;
};

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = (props) => {
  const queryClient = useQueryClient();
  const { handleTabChange, tenderFormId, readonly } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
  });

  const { showWarning, triggerFun, showFinalError } = state;

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
    ["awarded-project-details", tenderFormId],
    fetch
  );

  const initialDetails = {
    awarded_tender_id: data?.awarded_tender_id || tenderFormId,
    work_title: data?.work_title || "",
    description: data?.description || "",
    project_no: data?.project_no || "",
    project_cost: data?.project_cost || "",
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
      <Formik
        initialValues={initialDetails}
        validationSchema={awardedTenderValidation.projectDetailsSchema}
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
            className="flex flex-col h-full"
          >
            <div className="grid gap-6 max-md:grid-cols-1">
              <div
                className={`bg-${bg_color} p-3 shadow-xl border rounded grid gap-4`}
              >
                <header className="flex items-center">
                  <Image
                    src={ProjectContractIcon}
                    height={40}
                    width={40}
                    alt=""
                  />
                  <h1 className="font-medium text-lg ml-2">
                    Project Details & Description
                  </h1>
                </header>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.work_title}
                  error={errors.work_title}
                  touched={touched.work_title}
                  label="Project Or Work Title"
                  name="work_title"
                  placeholder="Enter Project Work Title"
                  maxlength={50}
                  required
                  type="text"
                  readonly={readonly}
                  labelColor="black font-medium"
                />
                <TextArea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                  label="Project Description"
                  name="description"
                  placeholder="Enter Project Details"
                  maxlength={50}
                  required
                  readonly={readonly}
                  labelColor="black font-medium"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.project_no}
                    error={errors.project_no}
                    touched={touched.project_no}
                    label="Project Number"
                    name="project_no"
                    placeholder="Enter Project Work Title"
                    maxlength={50}
                    required
                    type="text"
                    readonly={readonly}
                    labelColor="black font-medium"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.project_cost}
                    error={errors.project_cost}
                    touched={touched.project_cost}
                    label="Project Cost"
                    name="project_cost"
                    placeholder="Enter Project Cost"
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

export default ProjectDetailsForm;
