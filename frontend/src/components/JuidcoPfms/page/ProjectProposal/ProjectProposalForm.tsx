import { Formik, FormikValues } from "formik";
import React, { ChangeEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Input from "@/components/global/atoms/Input";
import { PFMS_URL } from "@/utils/api/urls";
import { projectProposalValidationSchema } from "pfmslib";
import goBack from "@/utils/helper";
import Image from "next/image";
import upload from "@/assets/svg/upload.svg";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import SelectForUpdateValueWithNoAPI from "@/components/global/atoms/SelectForUpdateValueWithNoAPI";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
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
import Loader from "@/components/global/atoms/Loader";
import TextArea from "@/components/global/atoms/Textarea";
import Button from "@/components/global/atoms/buttons/Button";

type FileTypes = {
  document_type_id: number;
  file_token: string;
  file_name?: string;
};

export type ProjectProposalSchema = {
  district_id: number;
  description: string;
  summary: string;
  state_id?: number;
  date?: string;
  execution_body: number;
  ulb_id: number;
  ward_id: number;
  user_id: number;
  address: string;
  pin_code: number | string;
  files: FileTypes[];
};

type AddNewProjectProposalProps = {
  onSubmit: (values: FormikValues) => void;
  initialValues: ProjectProposalSchema;
  enableReinitialize?: boolean;
  readonly?: boolean;
};

export const ProjectProposalForm = (props: AddNewProjectProposalProps) => {
  const {
    onSubmit,
    initialValues,
    enableReinitialize,
    readonly = false,
  } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<any>({
    ulbId: initialValues.ulb_id,
    districtId: initialValues.district_id,
    exeBodyId: initialValues.execution_body,
    inProgress: false,
    showWarning: false,
    triggerFun: null,
    validationError: null,
  });
  const {
    ulbId,
    districtId,
    inProgress,
    showWarning,
    exeBodyId,
    triggerFun,
    validationError,
  } = state;

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

  /// fetching state and district
  const fetchStateDistrict = async () => {
    const res = await axios({
      url: `${PFMS_URL.STATE_URL.get}`,
      method: "GET",
    });

    if (!res.data.status) throw "Something Went Wrong!!";

    const resDistrict = await axios({
      url: `${PFMS_URL.DISTRICT_URL.get}/${res?.data?.data.id}`,
      method: "GET",
    });

    const resDepart = await axios({
      url: `${PFMS_URL.ULB_URL.getDepartments}`,
      method: "GET",
    });

    return {
      state: res?.data?.data,
      district: resDistrict?.data?.data,
      departments: resDepart?.data?.data,
    };
  };

  ///////// Getting District and State
  const { data: data } = useQuery(["districtState"], fetchStateDistrict);

  //////// Check Execution Body is ULB or Not
  const isUlb = (id: number) => {
    return data?.departments.find((i:any) => i.id === id)?.name === "ULB";
  };

  ///////// Getting Ulbs
  const { data: ulbs } = useQuery(["ulbs", districtId], () =>
    fetch(`${PFMS_URL.ULB_URL.get}/${districtId}`, districtId)
  );

  ///////// Getting Ward
  const { data: wards } = useQuery(["wards", ulbId], () =>
    fetch(`${PFMS_URL.WARD_URL.get}/${ulbId}`, ulbId)
  );

  /////// District Handler
  const handler = (
    id: number | string,
    setFieldValue: (key: string, value: number) => void
  ) => {
    setState({ ...state, districtId: id });
    setFieldValue("ulb_id", 0);
  };

  /////// Ulb Handler
  const ulbHandler = (
    id: number | string,
    setFieldValue: (key: string, value: number) => void
  ) => {
    setState({ ...state, ulbId: id });
    setFieldValue("ward_id", 0);
  };

  ///////////// Checking File Type
  const validateFileType = (file: any) => {
    const fileType = ["jpeg", "jpg", "pdf"];

    return fileType.some((type) => file?.type?.includes(type));
  };

  ////// Handle Upload
  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (key: string, value: any) => void,
    index: number
  ) => {
    setState((prev: any) => {
      if (index === 0) return { ...prev, inProgress1: true };

      return { ...prev, inProgress: true };
    });
    try {
      if (e.target.files) {
        const file = e.target.files[0];
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

  return (
    <>
      <Toaster />
      {showWarning && (
        <LosingDataConfirmPopup
          continue={handleCompleteReset}
          cancel={handleBackAndReset}
        />
      )}
      <div className="shadow-lg p-4 border bg-white">
        {data ? (
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
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                    <TextArea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.summary}
                      error={errors.summary}
                      touched={touched.summary}
                      label="Project Summary"
                      name="summary"
                      placeholder="Enter Project Summary"
                      maxlength={250}
                      required
                      readonly={readonly}
                    />
                    <TextArea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      error={errors.description}
                      touched={touched.description}
                      label="Project Description"
                      name="description"
                      placeholder="Enter Project Description"
                      maxlength={500}
                      readonly={readonly}
                    />
                    <SelectForUpdateValueWithNoAPI
                      data={[data?.state]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Please select state"
                      value={data?.state?.id}
                      error={errors.state_id}
                      touched={touched.state_id}
                      readonly={true}
                      label="State"
                      name="state_id"
                      required
                      setFieldValue={setFieldValue}
                    />
                    <SelectForNoApi
                      data={data?.district}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Please select district"
                      value={values.district_id}
                      error={errors.district_id}
                      touched={touched.district_id}
                      label="District"
                      name="district_id"
                      readonly={true}
                      required
                      handler={(id: number | string) =>
                        handler(id, setFieldValue)
                      }
                    />
                    {/* <SelectForNoApi
                      data={data?.departments}
                      onChange={handleChange}
                      value={values.execution_body}
                      error={errors.execution_body}
                      touched={touched.execution_body}
                      readonly={true}
                      label="Execution Body"
                      name="execution_body"
                      placeholder="Please select"
                      required
                      handler={(id: number | string) =>
                        exeBodyHandler(id, setFieldValue)
                      }
                    /> */}
                    {isUlb(exeBodyId) && (
                      <SelectForNoApi
                        data={ulbs}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Please select the ULB"
                        value={values.ulb_id}
                        error={errors.ulb_id}
                        touched={touched.ulb_id}
                        label="ULB Name"
                        name="ulb_id"
                        required
                        readonly={true}
                        handler={(id: number | string) =>
                          ulbHandler(id, setFieldValue)
                        }
                      />
                    )}
                    {isUlb(exeBodyId) && (
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
                      />
                    )}
                    <div className="flex flex-col justify-between">
                      <Input
                        onChange={handleChange}
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
                            <div className="absolute -right-2 -top-4">
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
                          <span>{values.files[0]?.file_name}</span>
                        )}
                      </div>
                    </div>

                    <TextArea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      error={errors.address}
                      touched={touched.address}
                      label="Address"
                      name="address"
                      placeholder="Enter Address"
                      maxlength={500}
                      required
                      readonly={readonly}
                    />
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
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
