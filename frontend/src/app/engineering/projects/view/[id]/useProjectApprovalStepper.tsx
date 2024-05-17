import React, { ReactNode } from "react";
import Stepper from "./molecules/Stepper";
import admi from "@/assets/svg/admi.svg";
const items = [
    {
      info: "JUNIOR ENGINEER",
      img: admi,
    },
    {
      info: "ASSISTANT ENGINEER",
      img: admi,
    },
    {
      info: "EXECUTIVE ENGINEER",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
    {
      info: "ACCOUNT DEPARTMENT (MANAGER)",
      img: admi,
    },
    {
      info: "INTERNAL AUDITOR",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
    {
      info: "ACCOUNTS DEPARTMENT (PDF)",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
  ];


export const useProjectApprovalStepper = (): [ReactNode] => {
    const projectApprovalStepper =  <Stepper items={items} activeStepper={1}/>
    return [projectApprovalStepper]
}