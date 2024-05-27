"use client";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
import Button from "@/components/global/atoms/buttons/Button";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import { acknowledgeProposal, useProjectProposalDetails } from "@/hooks/data/ProjectProposalsHooks";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import Image from "next/image";
import home from "@/assets/svg/list.svg";
import Popup from "@/components/global/molecules/general/Popup";
import { AddMeasurementComponent } from "./AddMeasurementComponent";
import { usePathname, useRouter } from "next/navigation";

import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";
import ProjectProposalApprovalStepper from "@/components/JuidcoPfms/page/ProjectProposal/molecules/ProjectProposalApprovalStepper";
import admi from "@/assets/svg/admi.svg";
import { Icons } from "@/assets/svg/icons";
import goBack from "@/utils/helper";
import { LinkWithLoader } from "@/components/global/atoms/LinkWithLoader";
import Table from "@/components/global/molecules/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useUser } from "@/components/global/molecules/general/useUser";
import toast, { Toaster } from "react-hot-toast";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Formik } from "formik";
import * as Yup from "yup";

import { usePagination } from "@/hooks/Pagination";



const units = ["Sqm", "Day"];

interface InputProps {
  name?: string;
  type?: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean | false;
}

const Input: React.FC<InputProps> = (props) => {
  const fieldId = "id_" + props.name;

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-1 w-[80%]">
          <div
            className={`flex items-center w-[100px] justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none overflow-hidden`}
          >
            <input
              disabled={props.readonly}
              required={props.required}
              placeholder={props.placeholder}
              onChange={props.onChange}
              type={props.type}
              value={props?.value}
              className={`text-primary h-[40px] p-3 bg-transparent outline-none`}
              name={props.name}
              id={fieldId}
            />
          </div>

          <div>
            {props.touched && props.error && (
              <div className="text-red-500">{props.error}</div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};


interface DDLOptions {
  name: string;
  caption: string;
}

interface DDLProps {
  name?: string;
  type?: string;
  readonly?: boolean;
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean | false;
  options: DDLOptions[];
}

const DDL: React.FC<DDLProps> = (props) => {
  const fieldId = "id_" + props.name;


  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-1 w-[80%]">
          <div
            className={`flex items-center justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`}
          >
            <select
              disabled={props.readonly}
              required={props.required}
              onChange={props.onChange}
              value={props?.value}
              className={`text-primary h-[40px] p-3 bg-transparent outline-none`}
              name={props.name}
              id={fieldId}
            >

              {props.options.map((item, index) => {
                return (
                  <option key={`${item.name}-option-${index}`} value={item.name}>{item.caption}</option>
                );
              })}
            </select>
          </div>

          <div>
            {props.touched && props.error && (
              <div className="text-red-500">{props.error}</div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};





const MeasurementRecord = () => {

  const [editable, setEditable] = useState<boolean>(false);

  // const initialValues = {
  //   description: "",
  //   unit: "Sqm",
  //   quantity: "0",
  //   rate: "0.0",
  //   cost: 0,
  //   year: "",
  //   remarks: ""
  // };

  const initialValues = {
    description: "fdsf",
    unit: "Sqm",
    quantity: "5",
    rate: "5",
    cost: 10,
    year: "2024",
    remarks: "fsdf fdsf"
  };


  const validationSchema = Yup.object({
    description: Yup.string().required(),
    unit: Yup.string().oneOf(units),
    quantity: Yup.number().required().moreThan(0),
    rate: Yup.number().required().moreThan(0),
    cost: Yup.number().required().moreThan(0),
    year: Yup.number().required().moreThan(2023).lessThan(2025),
    remarks: Yup.string().required(),
  });


  const save = () => {
    // save
    setEditable(false);
  }

  return (

    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => { }}

      >
        {({ values, handleChange, errors, touched }: any) => (

          <>
            <div className="table-cell text-color-primary">

              <Input
                onChange={handleChange}
                value={values.description}
                error={errors.description}
                touched={touched.description}
                name="description"
                placeholder="Enter Description"
                required
                type="text"
                readonly={!editable}
              />
            </div>
            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.quantity}
                error={errors.quantity}
                touched={touched.quantity}
                name="quantity"
                placeholder="Enter quantity"
                required
                type="text"
                readonly={!editable}
              />
            </div>
            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.rate}
                error={errors.rate}
                touched={touched.rate}
                name="rate"
                placeholder="Enter rate"
                required
                type="text"
                readonly={!editable}
              />
            </div>

            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.cost}
                error={errors.cost}
                touched={touched.cost}
                name="cost"
                placeholder="Enter Cost"
                required
                type="text"
                readonly={!editable}
              />
            </div>

            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.year}
                error={errors.year}
                touched={touched.year}
                name="year"
                placeholder="Enter Year"
                required
                type="text"
                readonly={!editable}
              />
            </div>


            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.remarks}
                error={errors.remarks}
                touched={touched.remarks}
                name="remarks"
                placeholder="Enter Remarks"
                required
                type="text"
                readonly={!editable}
              />
            </div>



            <div className="table-cell text-color-secondary pt-2">
              <DDL
                onChange={handleChange}
                value={values.unit}
                error={errors.unit}
                touched={touched.unit}
                name="unit"
                required
                type="text"
                readonly={!editable}
                options={
                  [
                    { name: "Sqm", caption: "Sqm" },
                    { name: "Day", caption: "Day" },

                  ]}
              />


            </div>


            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.remarks}
                error={errors.remarks}
                touched={touched.remarks}
                name="remarks"
                placeholder="Enter Remarks"
                required
                type="text"
                readonly={!editable}
              />
            </div>

            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.remarks}
                error={errors.remarks}
                touched={touched.remarks}
                name="remarks"
                placeholder="Enter Remarks"
                required
                type="text"
                readonly={!editable}
              />
            </div>

            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.remarks}
                error={errors.remarks}
                touched={touched.remarks}
                name="remarks"
                placeholder="Enter Remarks"
                required
                type="text"
                readonly={!editable}
              />
            </div>

          </>


        )}
      </Formik >

        {editable? (
          <div onClick={save}>Save</div>
        ) : (
          <div onClick={() => setEditable(!editable)}>Edit</div>
        )}
    </>

  )
}


const MeasurementTable = () => {
  const [limit, page, paginator, resetPaginator] = usePagination();
  const [measurementFormVisible, setMeasurementFormVisible] = useState<boolean>(false);


  return (
    <>

{measurementFormVisible && (
        <Popup width={80} zindex={30}>
          <AddMeasurementComponent onBack={() => setMeasurementFormVisible(false)} />
        </Popup>

      )}

    
      <div className="mx-2 p-2">
        <div className="overflow-x-auto">
          <div className="text-xs table border-2">
            <div className="table-caption" title="Double click to change the title">
              <div className="flex justify-between bg-primary_bg_indigo p-2">
                <div></div>
                <div className="flex justify-center text-2xl text-white font-bold">
                  Prepare Cost Estimation
                </div>

                <div>
                  {/* {!titleEditable && (<Button variant="primary" onClick={() => setTitleEditable(!titleEditable)}>Edit</Button>)} */}
                </div>
              </div>

            </div>


            <div className="table-row p-6 border text-center">
              <div className="table-cell text-color-secondary p-2">Sr. No</div>
              <div className="table-cell text-color-primary">Description</div>
              <div className="table-cell text-color-primary">No</div>
              <div className="table-cell text-color-primary">Length</div>
              <div className="table-cell text-color-primary">Breadth</div>
              <div className="table-cell text-color-primary">Height</div>
              <div className="table-cell text-color-primary">Quantity</div>
              <div className="table-cell text-color-primary">Unit</div>
              <div className="table-cell text-color-primary">SOR Rate</div>
              <div className="table-cell text-color-primary">Amount</div>
              <div className="table-cell text-color-primary">Remarks</div>
              <div className="table-cell text-color-primary">Edit</div>
            </div>

            <form className="table-row border">
              <div className="table-cell text-color-secondary text-center">1</div>
              <MeasurementRecord />

            </form>


            <form className="table-row border">
              <div className="table-cell text-color-secondary text-center">1</div>
              <MeasurementRecord />

            </form>


            <form className="table-row border">
              <div className="table-cell text-color-secondary text-center">1</div>
              <MeasurementRecord />
            </form>

          </div>

          {paginator}

          <div className="flex justify-end">
              <Button variant="primary" onClick={() => setMeasurementFormVisible(true)}>Add New Measurement(s)</Button>
          </div>

        </div>

      </div>


    </>

  )
};





type StateType = {
  comment: string | null;
};

type ActionPropsType = {
  proposalId: number;
  proposalDetails: any;
};

const Action: React.FC<ActionPropsType> = (props) => {
  const { proposalId, proposalDetails } = props;
  const queryClient = useQueryClient();
  const user = useUser();
  const [state, setState] = useState<StateType>({
    comment: null,
  });
  const { comment } = state;

  const handleApprove = async () => {
    const res = await axios({
      url: `${FINANCE_URL.BILLS_VERIFICATION.approve}`,
      method: "POST",
      data: {
        data: {
          bill_id: billId,
          comment,
        },
      },
    });

    if (!res.data.status) throw "Something Went Wrong!!!";

    return res.data.data;
  };

  const { mutate } = useMutation(handleApprove, {
    onSuccess: () => {
      toast.success("Forwarded Successfully");
      window.location.replace("/finance/bills-verify/outbox");
    },
    onError: () => {
      console.log("error");
      toast.error("Something Went Wrong!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  ////////// handle send back

  const handleSendBack = async () => {
    const res = await axios({
      url: `${FINANCE_URL.BILLS_VERIFICATION.sendBack}`,
      method: "POST",
      data: {
        data: {
          bill_id: props?.proposalId,
          comment,
        },
      },
    });

    if (!res.data.status) throw "Something Went Wrong!!!";

    toast.success("Forwarded Successfully");
    window.location.replace("/finance/bills-verify");
    return res.data.data;
  };

  //// handling comming comment stage
  const handleGetStage = (proposalDetails: any) => {
    if (proposalDetails?.status === "rejected")
      return proposalDetails?.approval_stage_id ? user?.getProjectProposalStage(proposalDetails?.approval_stage_id + 2) : user?.getBillStage(2);
    if (!proposalDetails?.approval_stage_id) return "Vendor";
    if (!user?.getProjectProposalStage(proposalDetails?.approval_stage_id)) return user?.getProjectProposalStage(proposalDetails?.approval_stage_id + 1)
    return user?.getProjectProposalStage(proposalDetails?.approval_stage_id)
  };

  return (
    <>
      <Toaster />
      <div className="flex mt-4">
        <div className="w-1/3 bg-[#f9fafc]">
          <header className="bg-[#e1e8f0] p-2 flex items-center justify-center text-secondary_black">
            Members
          </header>
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
              {!user?.isJuniorEngineer() && (
                <Button
                  onClick={handleSendBack}
                  className="hover:bg-[#f44646]"
                  variant="danger"
                  disabled={!comment}
                >
                  Send Back
                </Button>
              )}
              <Button variant="primary" onClick={mutate} disabled={!comment}>
                Forward
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/3">
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
        </div>
      </div>
    </>
  );
};




const items = [
  {
    info: "BACK OFFICE",
    img: admi,
    level: 0,
    approvalAmount: 100,
  },
  {
    info: "TECHNICAL DEPARTMENT",
    img: admi,
    level: 1,
    others: [
      {
        info: "EXECUTIVE OFFICER",
        img: admi,
        approvalAmount: 200,
      },
      {
        info: "NEW BACK OFFICE",
        img: admi,
        approvalAmount: 300,
      },
      {
        info: "NEW CITY MANAGER",
        img: admi,
        approvalAmount: 400,
      },
    ],
  },
  {
    info: "ADD DEPARTMENT",
    img: admi,
    level: 2,
    others: [
      {
        info: "ADD OFFICER",
        img: admi,
        approvalAmount: 200,
      },
      {
        info: "ADD BACK OFFICE",
        img: admi,
        approvalAmount: 300,
      },
      {
        info: "ADD CITY MANAGER",
        img: admi,
        approvalAmount: 400,
      },
    ],
  },
];



const usePrimaryTabs = (defaultTabIndex: number, changeAllowed: boolean): [ReactNode, number, (index: number) => void] => {

  const items = [
    { caption: "List", icon: list },
    { caption: "Details", icon: details },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState<number>(defaultTabIndex);

  const tabs = (
    <div className="flex">

      {items.map((item, index) => {
        return (
          <>
            <div onClick={() => { if (changeAllowed) setActiveTabIndex(index); }} className={`flex items-center  pb-1 w-28 justify-center ${activeTabIndex == index ? 'border-b-2 border-b-black' : ''}`}>
              {item.icon && <Image src={item.icon} height={20} width={20} alt="pro-1" />}
              <span className="ml-2 text-gray-500">{item.caption}</span>
            </div>
          </>
        );
      })}
    </div>

  );

  return [tabs, activeTabIndex, setActiveTabIndex]
}




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


const ProjectProposalApprovalView = ({ ProProposalId }: { ProProposalId: number }) => {
  const pathName = usePathname();

  const router = useRouter();

  const [ceTableExists, setCeTableExists] = useState(true);


  const [state, setState] = useState<any>({
    activeStep: 0,
    showPopup: false,
    remarks: "",
    docData: null,
  });

  const { activeStep, showPopup, docData } = state;



  const { data: projectProposalDetails, refetch: refetchProjectProposalDetails } = useProjectProposalDetails(ProProposalId);
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();

  const [primaryTabs, activePrimaryTabIndex, setActivePrimaryTabIndex] = usePrimaryTabs(1, false);

  console.log(projectProposalDetails);

  useEffect(() => {
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




  return (
    <>
      {workingAnimation}


      <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
        <Button
          variant="cancel"
          className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
          onClick={goBack}
        >
          {Icons.back}
          <b>Back</b>
        </Button>
        <h2 className="text-black">
          <b>Project Proposal Details</b>
        </h2>
      </div>


      <div className="flex justify-between">
        <div className="flex items-center mb-2 gap-2">
          <LinkWithLoader href={`/engineering/projects`}>
            <Button
              variant="primary"
              className={`${(pathName.includes("outbox") || pathName.includes("archive")) && "bg-gray-200 text-gray-500"}`}
            >
              {Icons.outbox}
              Inbox
            </Button>
          </LinkWithLoader>
          <LinkWithLoader href={`/engineering/projects/outbox`}>
            <Button
              variant="primary"
              className={`${!pathName.includes("outbox") && "bg-gray-200 text-gray-500"}`}
            >
              {Icons.outbox}
              Outbox
            </Button>
          </LinkWithLoader>

          <LinkWithLoader href={'/engineering/projects/archive'}>
            <Button
              variant="primary"
              className={`${!pathName.includes("archive") && "bg-gray-200 text-gray-500"}`}
            >
              {Icons.outbox}
              Archive
            </Button>
          </LinkWithLoader>

        </div>


        <div>
          {projectProposalDetails?.acknowledged ? (
            <>
              <div className="flex gap-2 justify-end">
                <Button variant="primary">Add BOQ</Button>
                <Button variant="primary">Upload</Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-end mt-4">
                <Button variant="primary" onClick={() => setAcknowledgetmentPopupVisible(true)}>Acknowledge</Button>
              </div>
              <div className="flex justify-end">
                <span className="text-red-500">*</span>
                Please acknowledge the form to submit measurement * other details
              </div>
            </>
          )}

        </div>
      </div>


      <div className="mt-10">{primaryTabs}</div>


      {acknowledgementPopupVisible && (<ConfirmationPopup message="Acknowledge the assignement?" cancel={() => setAcknowledgetmentPopupVisible(false)} continue={acknowledge} />)}



      <div className="shadow-lg p-4 border">

        <ProjectProposalApprovalStepper
          level={2}
          subLevel={0}
          budget={300}
          items={items}
        />

        <div className="flex items-center gap-2 mt-4">
          <div className="bg-gray-100 border flex flex-col p-4 h-52 w-1/3 items-center justify-center rounded">
            <BoldSpan
              className="text-secondary_black mb-4 text-center"
              label={""}
            />
            <BoldSpan label={"BiLL nO"} />
            <BoldSpan content="Proposal Date" />
            <div className="flex items-center mb-2">
              <Image src={home} alt="calender" />
              <BoldSpan
                className="mt-2 ml-1 text-red-500"
                content={""}
              />
            </div>
            <div>
              time delta information
            </div>
          </div>
          <div className="bg-gray-100 border flex flex-col py-4 px-8 h-52 w-full rounded">
            <section>
              <Title title="Project Summary" />
              <Paragraph desc={projectProposalDetails?.summary} />
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
            <Tab>PREPARE COST ESTIMATION</Tab>
            <Tab>VERIFY DOCUMENTS</Tab>
            <Tab>ACTION</Tab>
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
                    Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text Description Text
                  </div>

                </div>
                <div className="flex gap-10">
                  <div>
                    <div className="font-bold">
                      State
                    </div>
                    <div>
                      Jharkhand
                    </div>
                  </div>

                  <div>
                    <div className="font-bold">
                      UTB Name
                    </div>
                    <div>
                      Xyz value
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      PIN Code
                    </div>
                    <div>
                      Xyz value
                    </div>
                  </div>

                  <div>
                    <div className="font-bold">
                      Ward No
                    </div>
                    <div>
                      Xyz value
                    </div>
                  </div>

                  <div>
                    <div className="font-bold">
                      Address
                    </div>
                    <div>
                      Xyz value
                    </div>
                  </div>


                  <div>
                    <div className="font-bold">
                      Execution Body
                    </div>
                    <div>
                      Xyz value
                    </div>
                  </div>
                </div>
              </div>

            </>
          </TabPanel>
          <TabPanel>
            {ceTableExists ? (
              <>
                {/* Table of existing measurements */}
                <div>
                  <MeasurementTable />
                </div>

                <div>
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
                </div>

              </>
            ) : (
              <div className="w-full flex justify-center gap-4 text-center bg-primary_bg_indigo p-4 text-white rounded font-bold">
                <div>
                  Prepare Cost Estimation
                </div>
                <div className="bg-white text-black rounded-full p-1 h-8 w-8">
                  +
                </div>
              </div>
            )}

          </TabPanel >

          <TabPanel>
            <div className="mt-4">
              <Table columns={columns} data={data?.files} center />
            </div>
          </TabPanel>

          <TabPanel>
            <Action proposalId={Number(ProProposalId)} proposalDetails={projectProposalDetails} />
          </TabPanel>
        </Tabs >

      </div >
    </>
  );
};

export default ProjectProposalApprovalView;