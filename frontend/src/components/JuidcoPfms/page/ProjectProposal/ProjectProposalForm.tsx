import { Formik, FormikValues } from "formik";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Input from "@/components/global/atoms/Input";
import { PFMS_URL } from "@/utils/api/urls";
import { projectProposalValidationSchema } from "pfmslib";
import goBack from "@/utils/helper";
import Image from "next/image";
import upload from "@/assets/svg/upload.svg";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
// import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
const RunningAnimation = dynamic(
  () =>
    import("./Animations").then((module) => {
      return { default: module.RunningAnimation };
    }),
  {
    ssr: false,
  }
);
import Check from "@/assets/svg/Check.svg";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import toast, { Toaster } from "react-hot-toast";
import TextArea from "@/components/global/atoms/Textarea";
import Button from "@/components/global/atoms/buttons/Button";
import CustomImage from "@/components/global/molecules/general/CustomImage";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import Popup from "@/components/global/molecules/Popup";
import { useUser } from "@/components/global/molecules/general/useUser";
import Select from "@/components/global/atoms/Select";
import MultiSelect from "@/components/global/atoms/MultiSelect";

type FileTypes = {
  document_type_id: number;
  file_token: string;
  file_name?: string;
  path?: string;
};

export type ProjectProposalSchema = {
  district_id: number;
  description: string;
  title: string;
  state_id?: number;
  proposed_date?: string;
  type_id: number;
  proposed_by: string;
  execution_body: number;
  ulb_id: number;
  ward_id: number;
  user_id: number;
  address: string;
  pin_code: number | string;
  files: FileTypes[];
  wards: any[];
};

type AddNewProjectProposalProps = {
  onSubmit: (values: FormikValues) => void;
  initialValues: ProjectProposalSchema;
  enableReinitialize?: boolean;
  readonly?: boolean;
  additionalData?: any;
};

export const ProjectProposalForm = (props: AddNewProjectProposalProps) => {
  const {
    onSubmit,
    initialValues,
    enableReinitialize,
    readonly = false,
    additionalData,
  } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const user = useUser();
  const [state, setState] = useState<any>({
    ulbId: initialValues.ulb_id,
    districtId: initialValues.district_id,
    exeBodyId: initialValues.execution_body,
    file: initialValues.files[0]?.path
      ? `${initialValues.files[0]?.path}`
      : null,
    inProgress: false,
    showWarning: false,
    triggerFun: null,
    validationError: null,
    fileType: initialValues.files[0]?.path?.split(".")[1],
    showPopup: false,
    isReset: false,
  });
  const {
    ulbId,
    inProgress,
    showWarning,
    triggerFun,
    validationError,
    file,
    fileType,
    showPopup,
    isReset,
  } = state;
  const [projectDetails, setProjectDetails] = useState<any>();

  useEffect(() => {
    setProjectDetails({
      title: initialValues.title || null,
      description: initialValues.description || null,
      address: initialValues.address || null,
      proposed_by: initialValues.proposed_by || null,
      type: additionalData?.type || null,
      ward_no: additionalData?.ward_no || null,
      pin_code: initialValues.pin_code || null,
    });
  }, [isReset]);

  ////// Fetching data
  const fetch = async (endpoint: string, dependence?: any) => {
    if (!dependence || dependence === null) return [];

    const res = await axios({
      url: endpoint,
      method: "GET",
    });

    if (!res.data.status) throw "Something Went Wrong!!";

    if (dependence === 5) return res.data.data.slice(0, 30);

    return res.data.data;
  };

  //////// Check Execution Body is ULB or Not
  const isUlb = () => {
    return user?.getDepartment()?.name === "ULB";
  };

  ///////// Getting Ward
  const { data: wards } = useQuery(["wards", ulbId], () =>
    fetch(`${PFMS_URL.WARD_URL.get}/${ulbId}`, ulbId)
  );

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
      if (e.target.files) {
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
            validationError: `'${file.type.split("/")[1]}' file not allowed`,
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

        setFieldValue(`files[${index}].file_token`, res.data.data.file_token);
        setFieldValue(`files[${index}].file_name`, file.name);
        setState({
          ...state,
          validationError: null,
          file: URL.createObjectURL(file),
          fileType: file?.type?.includes("pdf") ? "pdf" : "",
        });
      }
    } catch (error: any) {
      setFieldValue(`files[${index}].file_token`, "");
      toast.error(error);
      console.log(error);
    } finally {
      setState((prev: any) => {
        if (index === 0) return { ...prev, inProgress1: false };

        return { ...prev, inProgress: false };
      });
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
        districtId: initialValues.district_id,
        ulbId: initialValues.ulb_id,
        file: null,
        isReset: !isReset,
      }));
    }, 100);
  };

  // Handle Execution Body
  // const exeBodyHandler = (
  //   id: number | string,
  //   setFieldValue: (key: string, value: number) => void
  // ) => {
  //   setState((prev: any) => ({
  //     ...prev,
  //     exeBodyId: id,
  //   }));
  //   if (!isUlb(Number(id))) {
  //     setFieldValue("ulb_id", 0);
  //     setFieldValue("ward_id", 0);
  //   }
  // };

  const handleAllChange = (value: string, key: string) => {
    setProjectDetails({ ...projectDetails, [key]: value });
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
      <div className="grid grid-cols-3 gap-4">
        <div className="shadow-lg p-4 col-span-2 border bg-white">
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={projectProposalValidationSchema}
              onSubmit={onSubmit}
              enableReinitialize={enableReinitialize}
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
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="flex flex-col justify-between h-full"
                >
                  <div className="grid grid-cols-1 gap-x-6 gap-4 ">
                    <TextArea
                      onChange={(e) => {
                        handleChange(e);
                        handleAllChange(e.target.value, "title");
                      }}
                      onBlur={handleBlur}
                      value={values.title}
                      error={errors.title}
                      touched={touched.title}
                      label="Project Title"
                      name="title"
                      placeholder="Enter Project Title"
                      maxlength={50}
                      required
                      readonly={readonly}
                      className="min-h-4 max-h-10"
                    />
                    
                    <TextArea
                      onChange={(e) => {
                        handleChange(e);
                        handleAllChange(e.target.value, "description");
                      }}
                      onBlur={handleBlur}
                      value={values.description}
                      error={errors.description}
                      touched={touched.description}
                      label="Project Description"
                      name="description"
                      placeholder="Enter Project Description"
                      maxlength={500}
                      readonly={readonly}
                      required
                    />
                    <TextArea
                      onChange={(e) => {
                        handleChange(e);
                        handleAllChange(e.target.value, "address");
                      }}
                      onBlur={handleBlur}
                      value={values.address}
                      error={errors.address}
                      touched={touched.address}
                      label="Address"
                      name="address"
                      placeholder="Enter Address"
                      className="min-h-20 max-h-32"
                      maxlength={150}
                      required
                      readonly={readonly}
                    />
                    <div className="grid grid-cols-2 gap-x-6 gap-4">
                      <Input
                        onChange={(e) => {
                          handleChange(e);
                          handleAllChange(e.target.value, "proposed_by");
                        }}
                        onBlur={handleBlur}
                        value={values.proposed_by}
                        error={errors.proposed_by}
                        touched={touched.proposed_by}
                        label="Proposed By"
                        name="proposed_by"
                        placeholder="Enter Proposed By"
                        maxlength={50}
                        required
                        type="text"
                        readonly={readonly}
                      />
                      <Select
                        api={`${PFMS_URL.PROJ_RPOPOSAL_URL.getType}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Please select type"
                        value={values.type_id}
                        error={errors.type_id}
                        touched={touched.type_id}
                        label="Project Type"
                        name="type_id"
                        required
                        readonly={readonly}
                        handler={(_, value) =>
                          handleAllChange(value as string, "type")
                        }
                      />
                      <Input
                        value={user?.getDistrict()?.name}
                        label="District"
                        name="district_id"
                        placeholder="Enter District"
                        required
                        type="text"
                        readonly={true}
                      />
                      {isUlb() && (
                        <>
                          <Input
                            value={user?.getUlb()?.name}
                            label="ULB Name"
                            name="ulb_id"
                            placeholder="Enter ULB Name"
                            required
                            type="text"
                            readonly={true}
                          />
                        </>
                      )}
                     {isUlb() && ( <MultiSelect
                      handler={(value: any) =>{ 
                        const v = value.map((i:any) => i.label).join(',')
                        handleAllChange(v, "ward_no")
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.wards}
                      error={errors.wards}
                      touched={touched.wards}
                      label="Wards"
                      name="wards"
                      placeholder="Enter Project Title"
                      required
                      readonly={readonly}
                      data={wards?.map((ward: any) => {
                        return { value: ward.id, label: ward.name };
                      })}
                    />
                    )} 
                      {/* {isUlb() && (
                        <SelectForNoApi
                          data={wards}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Please select ward no"
                          value={values.ward_id}
                          error={errors.ward_id}
                          touched={touched.ward_id}
                          label="Ward No"
                          name="ward_id"
                          required
                          readonly={readonly}
                          handler={(_, value) =>
                            handleAllChange(value as string, "ward_no")
                          }
                        />
                      )} */}
                      <Input
                        onChange={(e) => {
                          handleChange(e);
                          handleAllChange(e.target.value, "pin_code");
                        }}
                        onBlur={handleBlur}
                        value={values.pin_code}
                        error={errors.pin_code}
                        touched={touched.pin_code}
                        label="Pin Code"
                        name="pin_code"
                        placeholder="Enter Pin Code"
                        maxlength={6}
                        required
                        type="number"
                        readonly={readonly}
                      />
                    </div>
                    <div className="flex items-end w-full">
                      <div className="flex flex-col min-w-28">
                        <span className="text-secondary text-sm mb-1">
                          Upload Letter (jpeg, jpg, pdf)
                          <span className="ml-2 text-red-500">*</span>
                        </span>
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
                          {values.files[0]?.file_token && !inProgress
                            ? "Uploaded"
                            : "Upload"}
                          {values.files[0]?.file_token && !inProgress ? (
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
                        {!values?.files[0]?.file_token &&
                        !validationError &&
                        touched?.files &&
                        errors?.files &&
                        errors?.files[0]?.file_token ? (
                          <span className="text-red-500">
                            {errors.files[0]?.file_token}
                          </span>
                        ) : validationError ? (
                          <span className="text-red-500">
                            {validationError}
                          </span>
                        ) : (
                          <span>
                            {values.files[0]?.file_name || (
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
                        onClick={goBack}
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
                          Submit
                        </Button>
                      </>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </>
        </div>
        <div className="bg-white border shadow-lg p-4">
          {projectDetails?.title && (
            <div>
              <header className="font-semibold">Project Title</header>
              <span className="text-secondary text-sm">
                {projectDetails?.title}
              </span>
            </div>
          )}
          {projectDetails?.description && (
            <div className="my-2">
              <header className="font-semibold">Project Description</header>
              <span className="text-secondary text-sm">
                {projectDetails?.description}
              </span>
            </div>
          )}
          {projectDetails?.address && (
            <div className="my-2">
              <header className="font-semibold">Address</header>
              <span className="text-secondary text-sm">
                {projectDetails?.address}
              </span>
            </div>
          )}
          {projectDetails?.proposed_by && (
            <div className="my-2">
              <header className="font-semibold">Proposed By</header>
              <span className="text-secondary text-sm">
                {projectDetails?.proposed_by}
              </span>
            </div>
          )}
          {projectDetails?.type && (
            <div className="my-2">
              <header className="font-semibold">Proposed Type</header>
              <span className="text-secondary text-sm">
                {projectDetails?.type}
              </span>
            </div>
          )}
          <div className="my-2">
            <header className="font-semibold">District</header>
            <span className="text-secondary text-sm">
              {user?.getDistrict()?.name}
            </span>
          </div>
          <div className="my-2">
            <header className="font-semibold">ULB Name</header>
            <span className="text-secondary text-sm">
              {user?.getUlb()?.name}
            </span>
          </div>
          {projectDetails?.ward_no && (
            <div className="my-2">
              <header className="font-semibold">Ward No</header>
              <span className="text-secondary text-sm">
                {projectDetails?.ward_no}
              </span>
            </div>
          )}
          {projectDetails?.pin_code && (
            <div className="my-2">
              <header className="font-semibold">Pin Code</header>
              <span className="text-secondary text-sm">
                {projectDetails?.pin_code}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
