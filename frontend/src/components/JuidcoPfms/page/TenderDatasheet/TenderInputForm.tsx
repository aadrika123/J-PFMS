"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Tender Datasheet Input Form
 * | Status- open
 */

import React, { useState } from "react";
import TenderBasicDetailsForm from "./TenderInputForms/TenderBasicDetailsForm";
import Image from "next/image";
import TenderIcon from "@/assets/svg/tender_form.svg";
import { tabList } from "./molecules/checkList";
import TenderCoverDetailsForm from "./TenderInputForms/TenderCoverDetailsForm";

const TenderInputForm = ({ PageNo }: { PageNo: number }) => {
  const [state, setState] = useState({
    tabNo: 1,
  });

  const { tabNo } = state;

  //////////// Handle Tab Change //////////
  const handleTabChange = (tabNo: number) =>{
    setState({...state, tabNo})
  }
  console.log("pageNo", PageNo);

  return (
    <div>
      {/* Header */}
      <div className="bg-white shadow-lg p-4 flex justify-between items-center rounded mb-6">
        <div className="flex items-center">
          <Image src={TenderIcon} height={30} width={30} alt="tender-icon" />
          <header className="font-bold ml-2">Tender Input Form</header>
        </div>
        <div className="flex items-center w-1/4">
        <progress className="progress progress-primary primary  w-56" value={tabNo * (100/6)} max="100"></progress>
          <span className="text-xs text-nowrap ml-2">Steps-{tabNo}/6</span>
        </div>
      </div>

      {/* Header Tabs */}
      <div className="flex items-center gap-4 mb-4">
        {tabList.map((tab, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded shadow-lg flex items-center cursor-pointer border ${tabNo === tab.id && 'bg-primary_bg_indigo'}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <Image src={tab?.icon} height={30} width={30} alt="tender-icon" />
            <span className={`text-xs font-medium text-secondary ml-2 text-nowrap ${tabNo === tab.id && 'text-white'}`}>
              {tab?.title}
            </span>
          </div>
        ))}
      </div>

      {/* Tender Forms */}
      {tabNo === 1 ? <TenderBasicDetailsForm /> : tabNo === 2 &&  <TenderCoverDetailsForm /> }
    </div>
  );
};

export default TenderInputForm;
