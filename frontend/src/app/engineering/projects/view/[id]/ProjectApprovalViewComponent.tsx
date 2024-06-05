"use client";
import React, { ChangeEvent, ReactNode, useCallback, useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
import Button from "@/components/global/atoms/buttons/Button";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import { acknowledgeProposal, PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS, useProjectProposalDetails } from "@/hooks/data/ProjectProposalsHooks";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import Image from "next/image";
import home from "@/assets/svg/list.svg";

import { Icons } from "@/assets/svg/icons";
import goBack, { DateFormatter } from "@/utils/helper";
import Table from "@/components/global/molecules/Table";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useUser } from "@/components/global/molecules/general/useUser";
import toast, { Toaster } from "react-hot-toast";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import moment from "moment";
import Loader from "@/components/global/atoms/Loader";
import { MeasurementManagementComponent } from "./MeasurementManagementComponent";
import { motion } from "framer-motion";
import SuperStepper, { GroupDict } from "../super-stepper";
import { useQuery, useQueryClient } from "react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";







type StateType = {
  comment: string | null;
};

type ActionPropsType = {
  proposalId: number;
  proposalDetails: any;
};

const Action: React.FC<ActionPropsType> = (props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();


  const [sendBackPopupVisible, setSendBackPopupVisible] = useState<boolean>(false);
  const [sendForwardPopupVisible, setSendForwardPopupVisible] = useState<boolean>(false);


  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUser();
  const [state, setState] = useState<StateType>({
    comment: null,
  });
  const { comment } = state;




  const sendForward = async () => {
    if (!comment) {
      toast.error("Kindly provide some comment !");
      return;
    }

    activateWorkingAnimation();


    const res = await axios({
      url: `${PFMS_URL.PROJECT_VERIFICATION.approve}`,
      method: "POST",
      data: {
        data: {
          proposalId: props?.proposalId,
          comment,
        },
      },
    });

    hideWorkingAnimation();

    if (!res.data.status) throw "Something Went Wrong!!!";

    toast.success("Forwarded successfully.");

    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_LIST]);
    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_ITEM_COUNT]);
    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.OUTBOX_ITEM_COUNT]);
    router.push(pathName + '?section=outbox&viewMode=list');
    return res.data.data;

  }


  const handleSendBack = async () => {

    if (!comment) {
      toast.error("Kindly provide some comment !");
      return;
    }

    activateWorkingAnimation();


    const res = await axios({
      url: `${PFMS_URL.PROJECT_VERIFICATION.sendBack}`,
      method: "POST",
      data: {
        data: {
          proposalId: props?.proposalId,
          comment,
        },
      },
    });

    hideWorkingAnimation();

    if (!res.data.status) throw "Something Went Wrong!!!";

    toast.success("Sent Back Successfully");
    router.push(pathName + '?section=inbox&viewMode=list');


    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_LIST]);
    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_ITEM_COUNT]);

    return res.data.data;
  };

  return (
    <>
      {workingAnimation}
      {sendBackPopupVisible && (<ConfirmationPopup message="Send the proposal back?" cancel={() => setSendBackPopupVisible(false)} continue={handleSendBack} />)}
      {sendForwardPopupVisible && (<ConfirmationPopup message="Forward the proposal?" cancel={() => setSendForwardPopupVisible(false)} continue={sendForward} />)}


      <Toaster />
      <div className="flex mt-4">
        <div className="w-1/3 bg-[#f9fafc]">
          {/* <header className="bg-[#e1e8f0] p-2 flex items-center justify-center text-secondary_black">
            Members
          </header> */}
          <div className="p-4">
            <span className="mt-4 text-secondary_black">Comments</span>
            <textarea
              className="bg-white border text-secondary"
              name="comments"
              cols={30}
              rows={5}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setState({ ...state, comment: e.target.value })
              }
            />
            {/* <Button
              className="mt-2 bg-[#38bdf8] hover:bg-[#5bc8f7]"
              variant="primary"
            >
              Send Comment
            </Button> */}
            <div className="flex justify-between mt-8">
              {!user?.isBackOffice() && (
                <Button
                  onClick={() => setSendBackPopupVisible(true)}
                  className="hover:bg-[#f44646]"
                  variant="danger"
                >
                  Send Back
                </Button>
              )}

              <Button variant="primary" onClick={() => setSendForwardPopupVisible(true)}>
                Forward
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="w-2/3">
          <header className="bg-gray-200 p-2 flex items-center justify-center text-secondary_black">
            Timeline
          </header>
          <div className="p-4 text-secondary_black">
            <span>{handleGetStage(proposalDetails)}&apos;s Comment</span> <br />
            {proposalDetails?.comment || proposalDetails?.remarks ? (
              <span className="mt-4">{proposalDetails?.comment || proposalDetails?.remarks}</span>
            ) : (
              <span className="flex justify-center text-red-500">
                No Comment Yet!
              </span>
            )}
            <hr className="mb-4" />
            <span>Level Comment</span>
            <div className="bg-[#e0f2fe] p-4 mt-4 rounded-lg w-2/3 relative">
              <div className="h-5 w-5 bg-[#3abdf3] rounded-full text-white flex items-center justify-center absolute top-0 left-0">
                1
              </div>
              <div className="flex items-center">
                <Image src={admi} alt="admi" />
                <div className="flex flex-col ml-1">
                  <span>
                    <b>Rakesh Kumar</b>
                  </span>
                  <span>Junior Engineer</span>
                </div>
              </div>
              <div className="my-1">
                forwarded to{" "}
                <span className="bg-gray-700 rounded p-2 text-white text-xs">
                  Assistant Engineer
                </span>
              </div>
              <BoldSpan label="Comment:" content="Verify the bill" /> <br />
              <BoldSpan
                label="Received Date:"
                content="09-03-2024 16:31"
              />{" "}
              <br />
              <BoldSpan label="Forward Date:" content="NA NA" />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};






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


const ProjectApprovalViewComponent = ({ ProProposalId }: { ProProposalId: number | undefined }) => {
  if (!ProProposalId) return <>Error! Project proposal id not provided</>;
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

  console.log(projectProposalDetails);

  useEffect(() => {
    setStepperItems(projectProposalDetails?.participants);
    console.log(projectProposalDetails);
  }, [projectProposalDetails]);

  const [acknowledgementPopupVisible, setAcknowledgetmentPopupVisible] = useState<boolean>(false);


  const acknowledge = () => {
    console.log("Acknowledetment!");
    setAcknowledgetmentPopupVisible(false);
    activateWorkingAnimation();
    acknowledgeProposal(ProProposalId).then((data) => {
      console.log(data);
      refetchProjectProposalDetails();
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

  /////// View Button
  const ViewButton = (id: number | string) => {
    const doc = data?.files.find((item: any) => item.id === id);
    const handleClick = () => {
      setState((prev: any) => ({
        ...prev,
        showPopup: !showPopup,
        docData: doc,
      }));
    };

    return (
      <div onClick={handleClick}>
        {doc?.path.split(".")[1] !== "pdf" ? (
          <img
            className="w-12 h-12"
            src={`${process.env.img_base}${doc?.path}`}
            alt=""
          />
        ) : (
          <Image src={pdfIcon} width={30} height={30} alt="pdf-icon" />
        )}
      </div>
    );
  };



  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    {
      name: "file_name",
      caption: "Document Name",
    },
    {
      name: "path",
      caption: "View",
      value: ViewButton,
    },
    {
      name: "approved",
      caption: "Status",
    },
    {
      name: "remarks",
      caption: "Remarks",
    },
  ];



  //// handling comming comment stage
  // const getCurrentState = (proposalDetails: any) => {
  //   if (proposalDetails?.status === "rejected")
  //     return proposalDetails?.approval_stage_id ? user?.getProjectProposalStage(proposalDetails?.approval_stage_id + 2) : user?.getProjectProposalStage(2);
  //   if (!proposalDetails?.approval_stage_id) return "Vendor";
  //   if (!user?.getProjectProposalStage(proposalDetails?.approval_stage_id)) return user?.getProjectProposalStage(proposalDetails?.approval_stage_id + 1)
  //   return user?.getProjectProposalStage(proposalDetails?.approval_stage_id)
  // };



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
                  {/* <div className="flex gap-2 justify-end">
                    <Button variant="primary">Add BOQ</Button>
                    <Button variant="primary">Upload</Button>
                  </div> */}
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
            <div className="flex justify-center p-2 overflow-auto">
              <div className="p-10 rounded-2xl">

                <SuperStepper items={stepperItems} activeStep={projectProposalDetails?.approval_stage_id} />

              </div>

            </div>

            <div className="flex items-center gap-2 mt-4">
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
              <div className="bg-gray-100 border flex flex-col py-4 px-8 h-52 w-full rounded">
                <section>
                  <Title title="Project Summary" />
                  <Paragraph desc={projectProposalDetails?.description} />
                </section>
              </div>
              <div>

              </div>
            </div>


            <div className="mt-10">
            </div>


            <Tabs>
              <TabList>
                <Tab>VIEW DETAILS</Tab>
                <Tab>VERIFY DOCUMENTS</Tab>
                {projectProposalDetails?.acknowledged && (<Tab>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 1 }}
                  >
                    COST ESTIMATION
                  </motion.div>
                </Tab>)}
                {projectProposalDetails?.measurements_added && (<Tab>
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
                <div className="mt-4">
                  <Table columns={columns} data={data?.files} center />
                </div>
              </TabPanel>

              <TabPanel>
                {projectProposalDetails?.acknowledged ? (
                  <>
                    {/* Table of existing measurements */}
                    <div>
                      <MeasurementManagementComponent proposal_id={projectProposalDetails.id} onNewMeasurementEntries={() => {
                        refetchProjectProposalDetails();
                      }} />
                    </div>

                    {/* <div>
                      <div className="pt-10 border-b">
                        Reference Docs
                      </div>
                      <div>
                        <div className="flex gap-10">
                          <div>Doc1</div>
                          <div>View</div>
                          <div>Download</div>
                        </div>

                        <div className="flex gap-10">
                          <div>Doc2</div>
                          <div>View</div>
                          <div>Download</div>
                        </div>


                        <div className="flex gap-10">
                          <div>Doc3</div>
                          <div>View</div>
                          <div>Download</div>
                        </div>

                      </div>
                      <div>
                        <Button variant="primary"> Upload New</Button>
                      </div>
                    </div> */}

                  </>
                ) : (
                  <div className="w-full flex justify-center gap-4 text-center bg-primary_bg_indigo p-4 text-white rounded font-bold">
                    Kindly acknowledge the proposal first to be able to record measurements.
                  </div>
                )}

              </TabPanel >



              <TabPanel>
                {projectProposalDetails?.measurements_added ? (
                  <Action proposalId={Number(ProProposalId)} proposalDetails={projectProposalDetails} />

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