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
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";

type StateTypes = {
  showNotification: boolean;
  showConfirmation: boolean;
  projectData: FormikValues;
};

const AddProjectProposal = () => {
  const queryClient = new QueryClient();
  const user = useUser();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const initialValues: ProjectProposalSchema = {
    title: "",
    description: "",
    address: "",
    proposed_by: "",
    type_id: 0,
    district_id: user?.getDistrict()?.id,
    ulb_id: user?.getUlb()?.id,
    ward_id: 0,
    pin_code: "",
    files: [
      {
        document_type_id: 0,
        file_token: "",
        file_name: "",
      },
    ],
    state_id: user?.getState()?.id,
    user_id: user?.getUserId(),
    execution_body: user?.getDepartment()?.id,
  };

  const [state, setState] = useState<StateTypes>({
    showNotification: false,
    showConfirmation: false,
    projectData: initialValues,
  });
  const { showNotification, showConfirmation, projectData } = state;

  ///////////////// Handling Submit /////////////
  const handleSubmit = async (values: FormikValues) => {
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
      setState({ ...state, showNotification: true, showConfirmation: false });
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

  /////// Handle showing comfirmation popup
  const handleConfirmSubmit = (values: any) => {
    setState({
      ...state,
      showConfirmation: true,
      projectData: values,
    });
  };

  ////////////// handle cancle /////////////
  const handleCancel = () => {
    setState({ ...state, showConfirmation: false });
  };

  ////////////// handle cancle /////////////
  const handleContinue = () => {
    mutate(projectData);
    setState({ ...state, showConfirmation: false });
  };

  return (
    <>
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to add proposal?"
          cancel={handleCancel}
          continue={handleContinue}
        />
      )}
      {workingAnimation}
      {showNotification && (
        <SuccesfullConfirmPopup message="Recorded Successfully" />
      )}
      <div className="shadow-lg px-4 py-2 border mb-6 bg-white">
        <span className="text-secondary font-bold">Fill Project Details</span>
      </div>
      <Suspense fallback={<Loader />}>
        <ProjectProposalForm
          onSubmit={handleConfirmSubmit}
          initialValues={initialValues}
        />
      </Suspense>
    </>
  );
};

export default AddProjectProposal;
