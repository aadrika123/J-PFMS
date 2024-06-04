"use client";

// pages/view.tsx
import React from "react";

import goBack from "@/utils/helper";
import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import MBRecordBillForm from "./MBRecord";
// import EstimatedCost from "../E-Measurement-View/EstimatedCost";
// import PreparedCost from "./EstimatedCost";
import PreparedCost from "./EstimatedCost";
// import Table from "./Table";
// import Button from "@mui/material/Button";

const AddMeasurementComponent: React.FC = () => {
  //   const [noRows, setNoRows] = useState<string>("");
  // // const [Table1Data, setTable1Data] = useState([]);
  // //   const [Table2Data, setTable2Data] = useState([]);

  // //   const [Table3Data, setTable3Data] = useState([]);

  //  const handleSave = () => {
  //   const allData = {
  //     table1: setNoRows,

  //     table2: setNoRows,
  //     table3: setTable3Data
  //   };

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
            Enter Measurment Details
          </SubHeading>
        </div>
      </div>
      {/* <div>
        <Table heading="Measurements" />
      </div> */}

      <div>
        <PreparedCost heading="Prepare Cost Estimation" />
      </div>
      <div>
        <MBRecordBillForm />
      </div>
    
    </>
  );
};

export default AddMeasurementComponent;
