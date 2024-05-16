"use client";
import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
import Button from "@/components/global/atoms/buttons/Button";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import { acknowledgeProposal, useProjectProposalDetails } from "@/hooks/data/ProjectProposalsHooks";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { useProjectApprovalStepper } from "./useProjectApprovalStepper";
import Image from "next/image";
import home from "@/assets/svg/list.svg";
import Popup from "@/components/global/molecules/general/Popup";
import { AddMeasurementComponent } from "./AddMeasurementComponent";
import { usePathname } from "next/navigation";




type StepPorps = {
  className?: string;
  activeStep: number;
  handleClick: (step: number) => void;
};

const Steps: React.FC<StepPorps> = (props) => {
  const pathname = usePathname();
  const { className, activeStep, handleClick } = props;
  const items = [
    {
      info: "VIEW DETAILS",
      isVisible: true,
    },
    {
      info: "VIEW DOCUMENTS",
      isVisible: true,
    },
    // {
    //   info: "VERIFY DOCUMENTS",
    //   isVisible: !pathname.includes('outbox'),
    // },
    {
      info: "ACTION",
      isVisible: !pathname.includes('outbox'),
    },
  ];

  return (
    <>
      <div className={`flex ${className}`}>
        {items.map((item, index) => (
          <div onClick={() => handleClick(index)} key={index} className={`mr-4 flex-col items-center cursor-pointer ${!item?.isVisible && 'hidden'}`}>
            <span className="text-black">{item.info}</span>
            <div
              className={`h-2 w-4 rounded-t-full bg-indigo-500 ml-[50%] ${index !== activeStep && "hidden"}`}
            ></div>
          </div>
        ))}
      </div>
      <hr className="border-2 border-indigo-500" />
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


const ProjectProposalApprovalView = ({ ProProposalId }: { ProProposalId: number }) => {
  const {data: projectProposalDetails, refetch: refetchProjectProposalDetails} = useProjectProposalDetails(ProProposalId);
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();

  const [projectApprovalStepper] = useProjectApprovalStepper();

  const [measurementFormVisible, setMeasurementFormVisible] = useState<boolean>(false);

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

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <>
    {workingAnimation}
      {acknowledgementPopupVisible && (<ConfirmationPopup message="Acknowledge the assignement?" cancel={() => setAcknowledgetmentPopupVisible(false)} continue={acknowledge} />)}
      
      
      {measurementFormVisible && (
              <Popup width={80} zindex={30}>
             <AddMeasurementComponent onBack={() => setMeasurementFormVisible(false)}/>
            </Popup>
      
      )}

      <div className="shadow-lg p-4 border">
        
        {projectApprovalStepper}

        <div className="flex items-center gap-2 mt-4">
      <div className="bg-gray-100 border flex flex-col p-4 h-52 w-1/3 items-center justify-center rounded">
        <BoldSpan
          className="text-secondary_black mb-4 text-center"
          label={""}
        />
        <BoldSpan label={""} />
        <BoldSpan content="Proposal Date" />
        <div className="flex items-center mb-2">
          <Image src={home} alt="calender" />
          <BoldSpan
            className="mt-2 ml-1 text-red-500"
            content={""}
          />
        </div>
      </div>
      <div className="bg-gray-100 border flex flex-col py-4 px-8 h-52 w-full rounded">
        <section>
          <Title title="Project Summary" />
          <Paragraph desc={projectProposalDetails?.summary} />
        </section>
      </div>
    </div>


    <div className="border p-6 mt-4">
        <section>
          <Title title="Project Description" />
          <Paragraph
            desc={projectProposalDetails?.description}
          />
        </section>
        <hr className="mt-3 border border-gray-400" />
        <hr className="border border-gray-400" />
        <div className=" grid grid-cols-4 gap-4 mt-3">
        </div>
      </div>

      <Steps
            handleClick={handleStepClick}
            activeStep={activeStep}
            className="mt-4"
          />

        {activeStep === 0 ? (
          
          projectProposalDetails?.acknowledged? (
            <>
            <div className="flex gap-2 justify-end">
              <Button variant="primary">Add BOQ</Button>
              <Button variant="primary" onClick={() => setMeasurementFormVisible(true)}>Add Measurement</Button>
              <Button variant="primary">Upload</Button>
            </div>
            </>
          ): (
            <>
            <div className="flex justify-end mt-4">
              <Button variant="primary" onClick={() => setAcknowledgetmentPopupVisible(true)}>Acknowledge</Button>
            </div>
            <div className="flex justify-end">
              <span className="text-red-500">*</span>
              Please acknowledge the form to submit measurement * other details
            </div>
            </>
          )
          
        ) : (
          activeStep === 1 && (
            <div className="mt-4">
                Hello
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ProjectProposalApprovalView;