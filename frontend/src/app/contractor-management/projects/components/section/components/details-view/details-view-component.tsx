"use client";
import React, { useCallback, useEffect } from "react";
// import { usePathname } from "next/navigation";
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
import { useQuery } from "react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContractDetailsData } from "./contract-details-data";
import { Stepper } from "@/components/global/molecules/stepper";
import { ActionComponent } from "./components/action-component/action-component";

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


interface ContractorManagementViewComponentProps {
  ProProposalId: number | undefined;
  readOnly: boolean;
}

const ContractorManagementViewComponent = ({ ProProposalId, readOnly }: ContractorManagementViewComponentProps) => {
  if (!ProProposalId) return <>Error! Project proposal id not provided</>;

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();


  const { isLoading: isLoading, data: projectProposalDetails } = useContractDetailsData(ProProposalId);
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();

  useEffect(() => {
    if (projectProposalDetails?.department_wise_checklist) {
      console.log(projectProposalDetails);
    }

  }, [projectProposalDetails]);

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


          <div>


            <div>

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

                  {/* View Details */}
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



                    </div>
                  </div>

                </section>
              </div>
              <div>

              </div>
            </div>


            <div className="flex justify-center p-2 overflow-auto">
              <div className="mt-4 p-4 border-indigo-400 justify-center items-center rounded-lg">
                <Stepper items={["CONTRACTOR", "MUNICIPAL COMMISSIONER", "ENGINEERING DEPARTMENT"]} currentStep={1} allChecked={false} />
              </div>

            </div>

            <div className="mt-10">
            </div>


            <Tabs selectedIndex={Number(searchParams.get("tab") ? searchParams.get("tab") : "0")}>
              <TabList>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 0 }))}>VERIFY DOCUMENTS</Tab>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 1 }))}>BILLS OF QUANTITY</Tab>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 2 }))}>PROJECT MILESTONES</Tab>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 3 }))}>CONTRACTOR BILLS</Tab>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 4 }))}>REQUESTS</Tab>
                <Tab onClick={() => router.push(pathName + '?' + createQueryString({ tab: 5 }))}>ACTION</Tab>
              </TabList>

              <TabPanel>

              </TabPanel>

              <TabPanel>
              </TabPanel >

              <TabPanel>
              </TabPanel>

              <TabPanel>

              </TabPanel>


              <TabPanel>

              </TabPanel>

              <TabPanel>
                {/* "Action TAB" */}
                <ActionComponent proposalId={ProProposalId} proposalDetails={projectProposalDetails} readOnly={false}/>
              </TabPanel>

            </Tabs >

          </div >


        </>
      )}
    </>
  );
};

export default ContractorManagementViewComponent;