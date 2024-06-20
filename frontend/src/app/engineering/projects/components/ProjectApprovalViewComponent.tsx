"use client";
import React, { useCallback, useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
import Button from "@/components/global/atoms/buttons/Button";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import { acknowledgeProposal, useProjectProposalDetails } from "@/hooks/data/ProjectProposalsHooks";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import Image from "next/image";
import home from "@/assets/svg/list.svg";

import { DateFormatter } from "@/utils/helper";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import moment from "moment";
import Loader from "@/components/global/atoms/Loader";
import { MeasurementManagementComponent } from "../MeasurementManagementComponent";
import { motion } from "framer-motion";
import SuperStepper, { GroupDict } from "../../../../components/global/molecules/super-stepper";
import { useQuery } from "react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MeasurementReferenceDocs from "../measurement-reference-docs";
import { ActionComponent } from "./action-component";
import { ProposalDocumentListComponent } from "./proposal-document-list-component";

const Title = ({ title }: { title: string }) => {
  return <b>{title}</b>;
};

type SpanProps = {
  label?: string;
  content?: string;
  className?: string;
};

/////////// BoldSpan Component
export const BoldSpan: React.FC<SpanProps> = (props) => {
  const { label, content, className } = props;
  return (
    <span className={`mb-2 text-secondary ${className} `}>
      {label && <b>{label}&nbsp;</b>}
      {content}
    </span>
  );
};

export const Paragraph = ({ desc }: { desc: string }) => {
  return <p className="text-gray-500">{desc}</p>;
};


interface ProjectApprovalViewComponent {
  ProProposalId: number | undefined;
  readOnly: boolean;
}

const ProjectApprovalViewComponent = ({ ProProposalId, readOnly }: ProjectApprovalViewComponent) => {
  if (!ProProposalId) return <>Error! Project proposal id not provided</>;

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();



  const [state, setState] = useState<any>({
    activeStep: 0,
    showPopup: false,
    remarks: "",
    docData: null,
  });

  const { showPopup } = state;



  const { isLoading: isLoading, data: projectProposalDetails, refetch: refetchProjectProposalDetails } = useProjectProposalDetails(ProProposalId);
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();
  const [stepperItems, setStepperItems] = useState<GroupDict>();
  const [stepperCurrentStep, setStepperCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (projectProposalDetails?.department_wise_checklist) {
      console.log(projectProposalDetails);
      setStepperItems(JSON.parse(projectProposalDetails?.department_wise_checklist));

      const checkList: string[] = JSON.parse(projectProposalDetails?.checklist);
      setStepperCurrentStep(checkList.indexOf(projectProposalDetails?.at_role_name));
    }

  }, [projectProposalDetails]);

  const [acknowledgementPopupVisible, setAcknowledgetmentPopupVisible] = useState<boolean>(false);


  const acknowledge = () => {
    console.log("Acknowledetment!");
    setAcknowledgetmentPopupVisible(false);
    activateWorkingAnimation();
    acknowledgeProposal(ProProposalId).then((data) => {
      console.log(data);
      refetchProjectProposalDetails().then(() => {
        router.push(pathName + '?' + createQueryString({ tab: 2 }));
      });
      hideWorkingAnimation();

    }).catch((error) => {
      hideWorkingAnimation();
      console.log(error);
    });
  }

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.PROJ_RPOPOSAL_URL.getById}/${ProProposalId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    console.log(data);
    return res.data.data;
  };


  const { data: data }: any = useQuery(["pro-proposal", ProProposalId], fetch);

  const createQueryString = useCallback(
    (newParams: any) => {
      const params = new URLSearchParams(searchParams.toString())

      const keys = Object.keys(newParams);
      keys.forEach((key) => {
        params.set(key, newParams[key])
      });
      return params.toString()
    },
    [searchParams]
  )


  return (
    <>
      {workingAnimation}

      {(isLoading) ? <Loader /> : (
        <>


          {acknowledgementPopupVisible && (<ConfirmationPopup message="Acknowledge the assignment?" cancel={() => setAcknowledgetmentPopupVisible(false)} continue={acknowledge} />)}



          <div>


            <div>
              {projectProposalDetails?.acknowledged ? (
                <>
                  
                </>
              ) : (
                <>
                  <div className="flex justify-end mt-4">
                    <Button variant="primary" onClick={() => setAcknowledgetmentPopupVisible(true)}>Acknowledge</Button>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-red-500">*</span>
                    Please acknowledge the form to submit measurement & other details
                  </div>
                </>
              )}

            </div>


            <div className="flex gap-2 mt-4">
              <div className="bg-gray-100 border flex flex-col p-4 h-52 w-1/3 items-center justify-center rounded">
                <BoldSpan
                  className="text-secondary_black mb-4 text-center"
                  label={""}
                />
                <BoldSpan label={data?.project_proposal_no} />
                <BoldSpan content={DateFormatter(data?.proposed_date)} />
                <div className="flex items-center mb-2">
                  <Image src={home} alt="calender" />
                  <BoldSpan
                    content="Proposal Date"
                  />
                </div>
                <div
                >
                  <span className="ml-1 text-red-500">
                    {`${data?.proposed_date.split("T")[0] == new Date().toISOString().split("T")[0] ? "Today" : moment(data?.proposed_date).fromNow()}`}
                  </span>

                </div>
              </div>
              <div className="bg-gray-100 border flex flex-col py-4 px-8 w-full rounded">
                <section>
                  <Title title="Project Summary" />
                  <div>
                    {projectProposalDetails?.description}
                  </div>
                </section>
              </div>
              <div>

              </div>
            </div>


            <div className="flex justify-center p-2 overflow-auto">
              <div className="p-10 rounded-2xl">

                <SuperStepper items={stepperItems} activeStep={stepperCurrentStep} />

              </div>

            </div>

            <div className="mt-10">
            </div>


            <Tabs selectedIndex={Number(searchParams.get("tab") ? searchParams.get("tab") : "0")}>
              <TabList>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 0 }))}>VIEW DETAILS</Tab>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 1 }))}>VERIFY DOCUMENTS</Tab>
                {projectProposalDetails?.acknowledged && (
                  <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 2 }))}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeOut", duration: 1 }}
                    >
                      COST ESTIMATION
                    </motion.div>
                  </Tab>)}
                {projectProposalDetails?.measurements_added && (
                  <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 3 }))}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeOut", duration: 1 }}
                    >
                      ACTION
                    </motion.div>
                  </Tab>)}
              </TabList>

              <TabPanel>

                <>
                  {/* View Detailas */}
                  <div className="mt-4 p-4 border-2 bg-gray-100 rounded">
                    <div className="mb-10">
                      <div className="font-bold">
                        Project Description
                      </div>
                      <div>
                        {data?.description}
                      </div>

                    </div>
                    <div className="flex gap-10">

                      <div>
                        <div className="font-bold">
                          ULB Name
                        </div>
                        <div>
                          {data?.ulb_name}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          PIN Code
                        </div>
                        <div>
                          {data?.pin_code}
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">
                          Ward No
                        </div>
                        <div>
                          {data?.ward_name}
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">
                          Address
                        </div>
                        <div>
                          {data?.address}
                        </div>
                      </div>


                      {/* <div>exit
                    <div className="font-bold">
                      Execution Body
                    </div>
                    <div>
                      {data?.execution_body_name}

                    </div>
                  </div> */}
                    </div>
                  </div>

                </>
              </TabPanel>

              <TabPanel>
                {/* Document List */}
                <ProposalDocumentListComponent proposalId={projectProposalDetails?.id} />
              </TabPanel>

              <TabPanel>
                {projectProposalDetails?.acknowledged ? (
                  <>
                    {/* Table of existing measurements */}
                    <div>
                      <MeasurementManagementComponent readOnly={readOnly} proposal_id={projectProposalDetails.id} onNewMeasurementEntries={() => {
                        refetchProjectProposalDetails().then(() => {
                          // router.push(pathName + '?' + createQueryString({tab:3}));
                        });
                      }} />
                    </div>

                    <MeasurementReferenceDocs proposalId={projectProposalDetails.id} />

                  </>
                ) : (
                  <div className="w-full flex justify-center gap-4 text-center bg-primary_bg_indigo p-4 text-white rounded font-bold">
                    Kindly acknowledge the proposal first to be able to record measurements.
                  </div>
                )}

              </TabPanel >



              <TabPanel>
                {projectProposalDetails?.measurements_added ? (
                  <ActionComponent proposalId={Number(ProProposalId)} proposalDetails={projectProposalDetails} readOnly={readOnly} />

                ) : (
                  <>
                    <div className="w-full flex justify-center gap-4 text-center bg-primary_bg_indigo p-4 text-white rounded font-bold">
                      Kindly add measurements first.
                    </div>

                    <div className="flex justify-center">
                      <div className="cursor-pointer rounded border border-1 bg-primary_bg_indigo p-2 text-white" onClick={() => refetchProjectProposalDetails()}
                      >
                        Rrefresh
                      </div>

                    </div>

                  </>

                )}
              </TabPanel>
            </Tabs >

          </div >


        </>
      )}


    </>
  );
};

export default ProjectApprovalViewComponent;