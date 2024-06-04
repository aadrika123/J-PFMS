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
import TenderWorkDetailsForm from "./TenderInputForms/TenderWordDetailsForm";
import TenderFeeDetailsForm from "./TenderInputForms/TenderFeeDetailsForm";
import TenderCriticalDatesForm from "./TenderInputForms/TenderCriticalDatesForm";
import TenderBidOpenerForm from "./TenderInputForms/TenderBidOpenersForm";
import ViewTenderFormDetails from "./TenderInputForms/ViewTenderFormDetails";
import { usePathname, useRouter } from "next/navigation";

const TenderInputForm = ({ PageNo }: { PageNo: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState({
    tabNo: 1,
    showPreview: false,
  });

  const { tabNo, showPreview } = state;

  //////////// Handle Tab Change //////////
  const handleTabChange = (tabNo: number) => {
    // setState({ ...state, tabNo });
    router.push(`${pathname.split("add/")[0]}/add/${tabNo}`);
  };

  console.log("page No", PageNo);

  /* Handle Show Preview */
  const handleShowPreview = () => {
    setState({ ...state, showPreview: !showPreview });
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white shadow-lg p-4 flex justify-between items-center rounded mb-6">
        <div className="flex items-center">
          <Image src={TenderIcon} height={30} width={30} alt="tender-icon" />
          <header className="font-bold ml-2">Tender Input Form</header>
        </div>
        <div className="flex items-center w-1/4">
          <progress
            className="progress progress-primary primary  w-56"
            value={tabNo * (100 / 6)}
            max="100"
          ></progress>
          <span className="text-xs text-nowrap ml-2">Steps-{tabNo}/6</span>
        </div>
      </div>

      {!showPreview ? (
        <>
          {/* Header Tabs */}
          <div className="flex items-center gap-4 mb-4">
            {tabList.map((tab, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded shadow-lg flex items-center cursor-pointer border ${Number(PageNo) === tab.id && "bg-primary_bg_indigo"}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <Image
                  src={tab?.icon}
                  height={30}
                  width={30}
                  alt="tender-icon"
                />
                <span
                  className={`text-xs font-medium text-secondary ml-2 text-nowrap ${Number(PageNo) === tab.id && "text-white"}`}
                >
                  {tab?.title}
                </span>
              </div>
            ))}
          </div>

          {/* Tender Forms */}
          {Number(PageNo) === 1 ? (
            <TenderBasicDetailsForm />
          ) : Number(PageNo) === 2 ? (
            <TenderCoverDetailsForm />
          ) : Number(PageNo) === 3 ? (
            <TenderWorkDetailsForm />
          ) : Number(PageNo) === 4 ? (
            <TenderFeeDetailsForm />
          ) : Number(PageNo) === 5 ? (
            <TenderCriticalDatesForm />
          ) : (
            Number(PageNo) === 6 && (
              <TenderBidOpenerForm handleShowPreview={handleShowPreview} />
            )
          )}
        </>
      ) : (
        <ViewTenderFormDetails />
      )}
    </div>
  );
};

export default TenderInputForm;
