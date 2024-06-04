// src/components/DetailsPage.js
"use client";
import React, { useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import CardDetails from "./CardDetails";
import EstimatedCost from "./EstimatedCost";
import MBRecordBill from "./MBRecordBill";
import ViewDocuments from "./ViewDocuments";
import Action from "./Action";
const DetailsPage = () => {
  const [activeTab, setActiveTab] = useState("viewDetails");

  return (
    <div className=" mx-auto ">
      <div className="flex">
        <button
          className={` px-4 ${
            activeTab === "viewDetails" ? "text-indigo-700" : "text-gray-500"
          } `}
          onClick={() => setActiveTab("viewDetails")}
        >
          View Details. <div></div>
        </button>

        {/* <GoTriangleUp /> */}
        <button
          className={`ml-4  px-4 ${
            activeTab === "viewDoc" ? "text-indigo-700" : "text-gray-500"
          } `}
          onClick={() => setActiveTab("viewDoc")}
        >
          View Document <div>{/* <GoTriangleUp /> */}</div>
        </button>

        <button
          className={`ml-4  px-4 ${
            activeTab === "action" ? "text-indigo-700" : "text-gray-500"
          } `}
          onClick={() => setActiveTab("action")}
        >
          Action <div></div>
        </button>
      </div>

      {activeTab == "viewDetails" && <GoTriangleUp className="ml-10" />}
      {activeTab == "viewDoc" && <GoTriangleUp className="ml-[13rem]" />}
      {activeTab == "action" && <GoTriangleUp className="ml-[21rem]" />}

      <hr className="w-full border-indigo-700 border-[2px] text-blue-800" />

      <div className="mt-4">
        {activeTab === "viewDetails" && (
            <div>
              <GoTriangleUp />
            </div>
          ) && (
            <div>
            <CardDetails />
            <EstimatedCost />
            <MBRecordBill/>
            </div>
          )}
        {activeTab === "viewDoc" && (
            <div>
              <GoTriangleUp />
            </div>
          ) && <div><ViewDocuments/></div>}
        {activeTab === "action" && (
            <div>
              <GoTriangleUp />
            </div>
          ) && <div><Action/></div>}
      </div>
    </div>
  );
};

export default DetailsPage;
