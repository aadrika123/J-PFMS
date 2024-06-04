"use client"
import React from "react";
import goBack from "@/utils/helper";
import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";
import Image from "next/image";
import DetailsPage from "./DetailsPage";
// import EstimatedCost from "./EstimatedCost";
// import MBRecordBill from "./MBRecordBill";
const ViewDetails: React.FC = () => {
  return (
    <>
      <div className="flex flex-1 items-end justify-between border-b-2 pb-7 mb-10">
        <Button
          variant="cancel"
          className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
          onClick={goBack}
        >
          {Icons.back}
          <b>Back</b>
        </Button>
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl text-indigo-700">
          Measurment Views
          </SubHeading>
        </div>
      </div>
      {/* ............................. */}
      <div className="flex items-center mb-4">
        <div className={`flex items-center  mr-3 pb-1 w-20 justify-center`}>
          <Image src={list} height={20} width={20} alt="pro-1" />
          <span className="ml-2 text-gray-500">List</span>
        </div>
        <div
          className={`flex items-center  pb-1 w-28 justify-center border-b-2 border-b-black`}
        >
          <Image src={details} height={20} width={20} alt="pro-1" />
          <span className="ml-2 text-gray-500">Details</span>
        </div>
      </div>
          {/*........................*/}
      <DetailsPage />
      {/* <EstimatedCost />
      <MBRecordBill/> */}
          
    </>
  );
};

export default ViewDetails;



  

