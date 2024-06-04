"use client";
import Image from "next/image";
import React, { useState } from "react";
import Profile from "@/assets/icons/profile_new.png";
import Popup from "@/components/global/molecules/Popup";
import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";

const ViewTenderFormDetails = () => {
  const [state, setState] = useState<any>({
    activeStep: 0,
    showPopup: false,
    docData: null,
  });

  const { showPopup, docData } = state;

  /*  Handle View Document  */
  const handleViewDoc = (path: string) => {
    setState((prev: any) => ({
      ...prev,
      showPopup: !showPopup,
      docData: path,
    }));
  };

  return (
    <>
      {showPopup && (
        <Popup padding="0">
          <iframe
            width={1000}
            height={570}
            src={`${process.env.img_base}${docData}`}
          ></iframe>
          <div className="flex items-center absolute bottom-3 self-center">
            <Button
              onClick={() => setState({ ...state, showPopup: !showPopup })}
              variant="cancel"
            >
              Close
            </Button>
          </div>
        </Popup>
      )}
      {/* Header section Basic Details */}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">Basic Details</header>
      </div>
      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2 gap-2">
        <span className="font-medium">
          Organization Chain:&nbsp;
          <span className="text-gray-500 text-xs">
            RWS EinC | RWD CE | RWD SE | RANCHI | RWD EE, RANCHI.
          </span>
        </span>
        <span className="font-medium">
          Withdrawal Allowed:&nbsp;{" "}
          <span className="text-gray-500 text-xs">No</span>
        </span>
        <span className="font-medium">
          Tender Reference Number:&nbsp;
          <span className="text-gray-500 text-xs">
            RWD/RANCHI/42/STPKG/10/2023-24
          </span>
        </span>
        <span className="font-medium">
          Form of Contract:&nbsp;
          <span className="text-gray-500 text-xs">Percentage</span>
        </span>
        <span className="font-medium">
          Tender ID:&nbsp;
          <span className="text-gray-500 text-xs">2024_RWD_85407_1</span>
        </span>
        <span className="font-medium">
          No of Covers:&nbsp; <span className="text-gray-500 text-xs">2</span>
        </span>
        <span className="font-medium">
          Tender Type:&nbsp;
          <span className="text-gray-500 text-xs">Open Tender</span>
        </span>
        <span className="font-medium">
          Item Wise Technical Evaluation Allowed :&nbsp;
          <span className="text-gray-500 text-xs">No</span>
        </span>
        <span className="font-medium">
          Tender Category:&nbsp;{" "}
          <span className="text-gray-500 text-xs">Works</span>
        </span>
        <span className="font-medium">
          Is Multi Currency Allowed for BOQ:&nbsp;
          <span className="text-gray-500 text-xs">No</span>
        </span>
        <span className="font-medium">
          Payment Mode:&nbsp;{" "}
          <span className="text-gray-500 text-xs"> Online</span>
        </span>
        <span className="font-medium">
          Allow Two Stage Bidding:&nbsp;
          <span className="text-gray-500 text-xs">No</span>
        </span>
        <span className="font-medium">
          Multi Currency Allowed For Fee:&nbsp;
          <span className="text-gray-500 text-xs">No</span>
        </span>
      </div>

      {/* Header section Cover Details*/}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">
          Cover Details, No of Cover-4
        </header>
      </div>
      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2 gap-2 items-start">
        <div className="flex flex-col">
          <span className="font-medium">
            No of Covers:&nbsp;
            <span className="text-gray-500 text-xs">Two Covers</span>
          </span>
          <span className="font-medium">
            Remarks:&nbsp;
            <span className="text-gray-500 text-xs">
              Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
              reiciendis ex distinctio voluptatum ut deleniti possimus sit dicta
              maxime et quae Lipsum dolor sit amet. 33 quod temporibus sed
              repudiandae reiciendis ex distinctio voluptatum ut deleniti
              possimus sit dicta maxime et quae
            </span>
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center justify-center">
            <Image
              onClick={() => handleViewDoc("img1.jpg")}
              src={Profile}
              height={50}
              width={50}
              alt="cover-1"
            />
            <span>Cover 01</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              onClick={() => handleViewDoc("img2.jpg")}
              src={Profile}
              height={50}
              width={50}
              alt="cover-1"
            />
            <span>Cover 01</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              onClick={() => handleViewDoc("img3.jpg")}
              src={Profile}
              height={50}
              width={50}
              alt="cover-1"
            />
            <span>Cover 01</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              onClick={() => handleViewDoc("img4.jpg")}
              src={Profile}
              height={50}
              width={50}
              alt="cover-1"
            />
            <span>Cover 01</span>
          </div>
        </div>
      </div>

      {/* Header section Work Item Details*/}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">Work Item Details</header>
      </div>
      <div className="flex flex-col bg-white shadow-xl rounded border p-4">
        <span className="font-medium">
          Work Item Title:&nbsp;
          <span className="text-gray-500 text-xs">XYZ Value</span>
        </span>
        <span className="font-medium">
          Work Description:&nbsp;
          <span className="text-gray-500 text-xs">
            Lipsum dolor sit amet. 33 quod temporibus sed repudiandae reiciendis
            ex distinctio voluptatum ut deleniti possimus sit dicta maxime et
            quae Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
            reiciendis ex distinctio voluptatum ut deleniti possimus sit dicta
            maxime et quae
          </span>
        </span>
        <div className="grid grid-cols-2 gap-2 items-start mt-4">
          <span className="font-medium">
            Pre Qualification Details:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Location(Work/Item/Service):&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Product Category :&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Pin Code:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Product Sub Category:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Bid Validity Date (In Days) :&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Contract Type:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Completion Period in Months:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Tender Value :&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Bid Validity Date (In Days):&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2 gap-2 items-start mt-4">
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            Pre Bid Meeting:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Pre Bid Meeting Place :&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Pre Bid Meeting Address:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Bid Opening Place :&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Tender Class :&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            Inviting Officer Name:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Inviting Officer Address:&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
          <span className="font-medium">
            Inviting Officer Phone/Email :&nbsp;
            <span className="text-gray-500 text-xs">XYZ Value</span>
          </span>
        </div>
      </div>

      {/* Header section Tender Fee Details*/}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">
          Tender Fee Details
        </header>
      </div>
      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-3">
        <span className="font-medium">
          Tender Fee :&nbsp;
          <span className="text-gray-500 text-xs">XYZ Value</span>
        </span>
        <span className="font-medium">
          Tender Fee Payable At:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Surg Charges:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Processing Fee:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Tender Fee Payable To:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Other Charges:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
      </div>

      {/* Header section EMD Fee Details*/}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">EMD Fee Details</header>
      </div>
      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-3">
        <span className="font-medium">
          EMD Fee :&nbsp;
          <span className="text-gray-500 text-xs">XYZ Value</span>
        </span>
        <span className="font-medium">
          Tender Fee Payable To :&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          EMD Exemption Allowed:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          EMD (Fixed/Percentage):&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Tender Fee Payable At :&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
      </div>

      {/* Header section Critical Dates*/}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">Critical Dates</header>
      </div>
      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-3">
        <span className="font-medium">
          Publishing Date :&nbsp;
          <span className="text-gray-500 text-xs">XYZ Value</span>
        </span>
        <span className="font-medium">
          Document Sale Start Date:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Seek Clarification Start Date:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Bid Opening Date:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Document Sale End Date:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Seek Clarification End Date:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Pre Bid Meeting Date:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
      </div>

      {/* Header section Bid Openers Selection*/}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">
          Bid Openers Selection
        </header>
      </div>
      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2">
        <span className="font-medium">
          BO1 Name/Designation :&nbsp;
          <span className="text-gray-500 text-xs">XYZ Value</span>
        </span>
        <span className="font-medium">
          Email:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          BO2 Name/Designation :&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Email:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          BO3 Name/Designation :&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
        <span className="font-medium">
          Email:&nbsp;
          <span className="text-gray-500 text-xs">XYZ</span>
        </span>
      </div>

      {/* Header section Tender Documents*/}
      <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
        {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
        <header className="font-bold ml-2 text-white">Tender Documents</header>
      </div>
      <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              File Name :&nbsp;
              <span className="text-gray-500 text-xs">XYZ Value</span>
            </span>
            <span className="font-medium">
              Document Size :&nbsp;
              <span className="text-gray-500 text-xs">XYZ Value</span>
            </span>
          </div>
          <span className="font-medium">
            Description :&nbsp;
            <span className="text-gray-500 text-xs">
              Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
              reiciendis ex distinctio voluptatum ut deleniti possimus sit dicta
              maxime et quaerat doloribus. Est
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            onClick={() => handleViewDoc("img5.jpg")}
            src={Profile}
            height={50}
            width={50}
            alt="cover-1"
          />
          <span>Cover 01</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button variant="cancel" onClick={goBack}>
          Back
        </Button>
        <Button variant="primary">Submit</Button>
      </div>
    </>
  );
};

export default ViewTenderFormDetails;
