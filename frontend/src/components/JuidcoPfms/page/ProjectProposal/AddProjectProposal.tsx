"use client";
import React, { useState, lazy, Suspense } from "react";
import { ProjectProposalSchema } from "./ProjectProposalForm";
const ProjectProposalForm = lazy(() =>
  import("./ProjectProposalForm").then((module) => {
    return { default: module.ProjectProposalForm };
  })
);
import { FormikValues } from "formik";
import axios from "@/lib/axiosConfig";
import { QueryClient, useMutation } from "react-query";
import { PFMS_URL } from "@/utils/api/urls";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import goBack from "@/utils/helper";
import Loader from "@/components/global/atoms/Loader";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { useUser } from "@/components/global/molecules/general/useUser";

const AddProjectProposal = () => {
  const queryClient = new QueryClient();
  const user = useUser()
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const initialValues: ProjectProposalSchema = {
    district_id: 0,
    description: "",
    summary: "",
    state_id: 1,
    address: "",
    pin_code: "",
    ulb_id: 0,
    ward_id: 0,
    user_id: user?.getUserId(),
    execution_body: 4,
    files: [
      {
        document_type_id: 1,
        file_token: "",
        file_name: "",
      },
      {
        document_type_id: 0,
        file_token: "",
        file_name: "",
      },
    ],
  };

  const [state, setState] = useState({
    showNotification: false,
  });
  const { showNotification } = state;

  ///////////////// Handling Submit /////////////
  const handleSubmit = async (values: FormikValues) => {
    if (values.execution_body !== 4) {
      delete values.ulb_id, delete values.ward_id;
    }

    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.PROJ_RPOPOSAL_URL.create}`,
      method: "POST",
      data: {
        data: values,
      },
    });

    if (!res.data.status) throw "Something Went Wrong!!!";
  };

  const { mutate } = useMutation(handleSubmit, {
    onSuccess: () => {
      setState({ ...state, showNotification: true });
      setTimeout(() => {
        goBack();
      }, 1000);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      hideWorkingAnimation();
      queryClient.invalidateQueries([`${PFMS_URL.PROJ_RPOPOSAL_URL.get}`]);
    },
  });

  ////// Handle Cancel
  // const handleCancel = () => {
  //   setState({ ...state, showConfirmation: !showConfirmation });
  // };

  // //// Handle onSubmit
  // const handleOnSubmit = (values: FormikValues) => {
  //   mutate(values)
  // }

  return (
    <>
      {workingAnimation}
      {/* {showConfirmation && (
        <ConfirmationPopup cancel={handleCancel} continue={mutate} />
      )} */}
      {showNotification && (
        <SuccesfullConfirmPopup message="Recorded Successfully" />
      )}
      <div className="shadow-lg px-4 py-2 border mb-6">
        <span className="text-secondary font-bold">Fill Project Details</span>
      </div>
      <Suspense fallback={<Loader />}>
        <ProjectProposalForm onSubmit={mutate} initialValues={initialValues} />
      </Suspense>
    </>
  );
};

export default AddProjectProposal;
