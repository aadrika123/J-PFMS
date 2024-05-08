import { Formik, FormikValues } from "formik";
import React, { ChangeEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Input from "@/components/global/atoms/Input";
import { PFMS_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
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
import { docType } from "./docType";
import TextArea from "@/components/global/atoms/Textarea";

type FileTypes = {
  document_type_id: number;
  file_token: string;
  file_name?: string;
};

export type ProjectProposalSchema = {
  district_id: number;
  description: string;
  summary: string;
  state_id: number;
  date: string;
  ulb_id: number;
  ward_id: number;
  user_id: number;
  address: string;
  pin_code: number | undefined;
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
    inProgress1: false,
    inProgress2: false,
    showWarning: false,
    triggerFun: null,
  });
  const {
    ulbId,
    districtId,
    inProgress1,
    inProgress2,
    showWarning,
    triggerFun,
  } = state;

  ////// Fetching data
  const fetch = async (endpoint: string, dependence?: any) => {
    if (!dependence || dependence === null) return [];

    const res = await axios({
      url: endpoint,
      method: "GET",
    });

    if (!res.data.status) throw "Something Went Wrong!!";

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
      url: `${PFMS_URL.DISTRICT_URL.get}/${res.data.data.id}`,
      method: "GET",
    });

    return { state: res.data.data, district: resDistrict?.data?.data };
  };

  ///////// Getting District and State
  const { data: data } = useQuery(["districtState"], fetchStateDistrict);

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

  ////// Handle Upload
  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (key: string, value: any) => void,
    index: number
  ) => {
    setState((prev: any) => {
      if (index === 0) return { ...prev, inProgress1: true };

      return { ...prev, inProgress2: true };
    });
    try {
      if (e.target.files) {
        const formData = new FormData();

        formData.append("doc", e.target.files[0]);
        const res = await axios({
          url: `${PFMS_URL.FILE_UPLOAD_URL.upload}`,
          method: "POST",
          data: formData,
        });
        if (!res.data.status) throw "Something Went Wrong";

        setFieldValue(`files[${index}].file_token`, res.data.data.file_token);
        setFieldValue(`files[${index}].file_name`, e.target.files[0].name);
      }
    } catch (error) {
      setFieldValue(`files[${index}].file_token`, "");
      toast.error("Something Went Wrong!!");
      console.log(error);
    } finally {
      setState((prev: any) => {
        if (index === 0) return { ...prev, inProgress1: false };

        return { ...prev, inProgress2: false };
      });
    }
  };

  ///// handlBackAndReset
  const handleBackAndReset = (trigger?: () => void) => {
    setState({ ...state, showWarning: !showWarning, triggerFun: trigger });
    if (trigger) {
      const d: any = document?.getElementById("identity");
      d.value = "";
      const c: any = document?.getElementById("letter");
      c.value = "";
    }
  };

  return (
    <>
      <Toaster />
      {showWarning && (
        <LosingDataConfirmPopup
          continue={triggerFun}
          cancel={handleBackAndReset}
        />
      )}
      <div className="shadow-lg p-4 border">
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
                      required
                      // type="text"
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
                      // type="text"
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
                      readonly={readonly}
                      required
                      handler={(id: number | string) =>
                        handler(id, setFieldValue)
                      }
                    />
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date}
                      error={errors.date}
                      touched={touched.date}
                      label="Date"
                      name="date"
                      placeholder="Select the date"
                      required
                      type="date"
                      readonly={readonly}
                    />
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
                      readonly={readonly}
                      handler={(id: number | string) =>
                        ulbHandler(id, setFieldValue)
                      }
                    />
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
                    <TextArea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      error={errors.address}
                      touched={touched.address}
                      label="Address"
                      name="address"
                      placeholder="Enter Address"
                      required
                      readonly={readonly}
                    />

                    <div></div>
                    <div className="flex">
                      <div>
                        <div className="flex">
                          <SelectForNoApi
                            className="w-48 h-[32px] bg-[#4338ca] text-white border-[#4338ca]"
                            data={docType}
                            onChange={handleChange}
                            value={values.files[0]?.document_type_id}
                            error={
                              errors.files && errors.files[0]?.document_type_id
                            }
                            touched={
                              touched.files &&
                              touched.files[0]?.document_type_id
                            }
                            readonly={readonly}
                            label="Upload Document"
                            name="files[0].document_type_id"
                            required
                          />
                          <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleUpload(e, setFieldValue, 0)
                            }
                            id="identity"
                            type="file"
                            className="hidden"
                            disabled={readonly}
                          />
                          <label
                            className={`bg-primary_bg_indigo relative p-[6px] h-8 w-8 rounded mt-6 ml-1 ${readonly ? "bg-opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                            htmlFor="identity"
                          >
                            {values.files[0]?.file_token && !inProgress1 ? (
                              <Image
                                src={Check}
                                width={20}
                                height={20}
                                alt="upload"
                              />
                            ) : inProgress1 ? (
                              <div className="absolute -left-2 -top-4">
                                <RunningAnimation />
                              </div>
                            ) : (
                              <Image
                                src={upload}
                                width={20}
                                height={20}
                                alt="upload"
                              />
                            )}
                          </label>
                        </div>
                        {touched.files && errors.files ? (
                          <span className="text-red-500">
                            {errors.files[0]?.file_token}
                          </span>
                        ) : (
                          <span className="">{values.files[0]?.file_name}</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-28 ml-2">
                        <span className="text-secondary text-sm mb-1 ml-2">
                          Upload Letter
                          <span className="ml-2 text-red-500">*</span>
                        </span>
                        <input
                          id="letter"
                          type="file"
                          className="hidden"
                          disabled={readonly}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleUpload(e, setFieldValue, 1)
                          }
                        />
                        <label
                          className={`bg-primary_bg_indigo relative p-1 rounded ml-2 flex text-white justify-between px-2 ${readonly ? "bg-opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                          htmlFor="letter"
                        >
                          Upload
                          {values.files[1]?.file_token && !inProgress2 ? (
                            <Image
                              src={Check}
                              width={20}
                              height={20}
                              alt="letter"
                            />
                          ) : inProgress2 ? (
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
                        {touched.files && errors.files ? (
                          <span className="text-red-500 ml-2">
                            {errors.files[1]?.file_token}
                          </span>
                        ) : (
                          <span className="ml-2">
                            {values.files[1]?.file_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-5 justify-end">
                    {!readonly ? (
                      <Button
                        onClick={() => handleBackAndReset(goBack)}
                        buttontype="button"
                        variant="cancel"
                      >
                        Back
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
                          Save
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
