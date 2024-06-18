"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Tender Datasheet Input Form
 * | Status- open
 */

import React, { useRef } from "react";
import TenderBasicDetailsForm from "./TenderInputForms/TenderBasicDetailsForm";
import Image from "next/image";
import TenderIcon from "@/assets/svg/tender_form.svg";
import { tabList } from "./molecules/checkList";
import TenderCoverDetailsForm from "./TenderInputForms/TenderCoverDetailsForm";
import TenderWorkDetailsForm from "./TenderInputForms/TenderWorkDetailsForm";
import TenderFeeDetailsForm from "./TenderInputForms/TenderFeeDetailsForm";
import TenderCriticalDatesForm from "./TenderInputForms/TenderCriticalDatesForm";
import TenderBidOpenerForm from "./TenderInputForms/TenderBidOpenersForm";
import ViewTenderFormDetails from "./TenderInputForms/ViewTenderFormDetails";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import goBack from "@/utils/helper";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import Button from "@/components/global/atoms/buttons/Button";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "react-query";

const TenderInputForm = ({ tenderFormId }: { tenderFormId: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const componentRef = useRef<any>();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();

  const pageNo: number = Number(searchParams.get("pageNo"));

  ///////// Fetching Data
  const fetch = async () => {
    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.TENDER_FORM.getById}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    hideWorkingAnimation();
    return res.data.data;
  };

  const { data: data }: any = useQuery(["tender-form", tenderFormId], fetch);

  // ////// Checking TenderFormId is valid or not ////
  // useEffect(() => {
  //   (async function () {
  //     activateWorkingAnimation();
  //     const res = await axios({
  //       url: `${PFMS_URL.TENDER_FORM.getById}/${tenderFormId}`,
  //       method: "GET",
  //     });

  //     if (!res.data.data) goBack();

  //     const data = res.data.data;
  //     setState({...state, readonly: data.status === "submitted", project_proposal: data.project_proposal});
  //     hideWorkingAnimation();
  //   })();
  // }, [tenderFormId]);

  //////////// Handle Tab Jump //////////
  const handleTabJump = (tabNo: number) => {
    router.push(`${pathname}?pageNo=${tabNo}`);
  };

  //////////// Handle Tab Change //////////
  const handleTabChange = (changeType: string) => {
    if (changeType === "prev") {
      goBack();
    } else if (changeType === "next") {
      if (pageNo < 7) {
        router.push(`${pathname}?pageNo=${pageNo + 1}`);
      }
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {data && (
        <>
          {workingAnimation}
          {/* Header */}
          <div className="bg-white shadow-lg p-4 flex justify-between items-center rounded mb-6">
            <div className="flex items-center">
              <Image
                src={TenderIcon}
                height={30}
                width={30}
                alt="tender-icon"
              />
              <header className="font-bold ml-2">{`Tender Input Form ${pageNo === 7 ? " - Preview Details" : ""}`}</header>
            </div>
            {pageNo === 7 ? (
              <Button onClick={handlePrint} variant="primary">
                Print
              </Button>
            ) : (
              <div className="flex items-center w-1/4">
                <progress
                  className="progress progress-primary primary  w-56"
                  value={pageNo * (100 / 6)}
                  max="100"
                ></progress>
                <span className="text-xs text-nowrap ml-2">
                  Steps-{pageNo}/6
                </span>
              </div>
            )}
          </div>

          {/* {!showPreview ? ( */}
          <>
            {/* Header Tabs */}
            <div className="flex items-center gap-4 mb-4">
              {tabList.map((tab, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded shadow-lg flex items-center cursor-pointer border ${pageNo === tab.id && "bg-primary_bg_indigo"}`}
                  onClick={() => handleTabJump(tab.id)}
                >
                  <Image
                    src={tab?.icon}
                    height={30}
                    width={30}
                    alt="tender-icon"
                  />
                  <span
                    className={`text-xs font-medium text-secondary ml-2 text-nowrap ${pageNo === tab.id && "text-white"}`}
                  >
                    {tab?.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Tender Forms */}
            {pageNo === 1 ? (
              <TenderBasicDetailsForm
                handleTabChange={handleTabChange}
                tenderFormId={tenderFormId}
                readonly={data.status === "submitted"}
              />
            ) : pageNo === 2 ? (
              <TenderCoverDetailsForm
                handleTabChange={handleTabChange}
                tenderFormId={tenderFormId}
                readonly={data.status === "submitted"}
              />
            ) : pageNo === 3 ? (
              <TenderWorkDetailsForm
                handleTabChange={handleTabChange}
                tenderFormId={tenderFormId}
                readonly={data.status === "submitted"}
                project_proposal={data.project_proposal}
              />
            ) : pageNo === 4 ? (
              <TenderFeeDetailsForm
                handleTabChange={handleTabChange}
                tenderFormId={tenderFormId}
                readonly={data.status === "submitted"}
              />
            ) : pageNo === 5 ? (
              <TenderCriticalDatesForm
                handleTabChange={handleTabChange}
                tenderFormId={tenderFormId}
                readonly={data.status === "submitted"}
              />
            ) : pageNo === 6 ? (
              <TenderBidOpenerForm
                handleTabChange={handleTabChange}
                tenderFormId={tenderFormId}
                readonly={data.status === "submitted"}
              />
            ) : (
              pageNo === 7 && (
                <ViewTenderFormDetails
                  componentRef={componentRef}
                  handleTabChange={handleTabChange}
                  tenderFormId={tenderFormId}
                />
              )
            )}
          </>
        </>
      )}
    </>
  );
};

export default TenderInputForm;
