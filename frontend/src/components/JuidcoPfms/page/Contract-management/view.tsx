// pages/view.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

// import { Icons } from "@/assets/svg/icons";
// import goBack from "@/utils/helper";
// import Button from "@/components/global/atoms/Button";

const ViewPage: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/r"); // Navigate to the view table
  };

 
  return (
    <>
      {/* first box */}
      <div
        className="border bg-white shadow-xl p-6 m-5 px-10 rounded-xl "
        
      >
        {/* Add your view page content here */}
        <div className="flex justify-self-start m-5">
          <b>View Project Proposal</b>
        </div>
        {/* form */}
        <div className="flex flex-col flex-wrap">
          <div className="flex flex-row items-center m-2 gap-14 rounded-xl">
            <div className="flex flex-col justify-start ">
              <label htmlFor="input1">Project Summary </label>

              <input
                id="input1"
                type="text"
                placeholder="XYZ VALUE"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
            <div className="flex flex-col justify-end ml-20">
              <label htmlFor="input2">Project Description</label>

              <input
                id="input1"
                type="text"
                placeholder="XYZ VALUE"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center m-2 gap-14 rounded-xl">
            <div className="flex flex-col justify-start">
              <label htmlFor="input1">District</label>
              <div
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  margin: 0,
                  borderRadius: "5px",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <select
                  className="absolute top-0 right-0 bottom-0 left-0 border-blue-500"
                  style={{
                    border: "none",
                    height: "100%",
                    width: "100%",
                    padding: 5,
                    paddingLeft: 10,
                    borderRadius: "5px",
                    appearance: "none",
                    background: "transparent",
                  }}
                >
                  <option value="1">Ranchi</option>
                  <option value="2">Gumla</option>
                  <option value="3">Lohardaga</option>
                  <option value="4">Simdega</option>
                  <option value="5">Palamu</option>
                  <option value="6">Latehar</option>
                  <option value="7">Garhwa</option>
                  <option value="8">Chatra</option>
                  <option value="9">Hazaribagh</option>
                  <option value="10">Koderma</option>
                  <option value="11">Giridih</option>
                  <option value="12">Ramgarh</option>
                  <option value="13">Bokaro</option>
                  <option value="14">Dhanbad</option>
                  <option value="15">Dumka</option>
                  <option value="16">Jamtara</option>
                  <option value="17">Deoghar</option>
                  <option value="18">Godda</option>
                  <option value="19">Sahibganj</option>
                  <option value="20">Pakur</option>
                  <option value="21">West Singhbhum</option>
                  <option value="22">Saraikela Kharsawan</option>
                  <option value="23">East Singhbhum</option>
                  <option value="24">Khunti</option>
                  <option value="25">Ramgarh</option>
                  <option value="26">Simdega</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-end ml-20">
              <label htmlFor="input2">State</label>

              <input
                id="input1"
                type="text"
                placeholder="-Jharkhand-"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
          </div>
          {/* <div className="flex flex-row items-center m-2 gap-14 rounded-xl">
            <div className="flex flex-col justify-start ">
              <label htmlFor="input1">Project Summary </label>

              <input
                id="input1"
                type="text"
                placeholder="XYZ VALUE"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
            <div className="flex flex-col justify-end ml-20">
              <label htmlFor="input2">State</label>

              <input
                id="input1"
                type="text"
                placeholder="-Jharkhand-"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
          </div> */}
          <div className="flex flex-row items-center m-2 gap-14 rounded-xl">
            <div className="flex flex-col justify-start ">
              <label htmlFor="input1">Address</label>

              <input
                id="input1"
                type="text"
                placeholder="XYZ VALUE"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
            <div className="flex flex-col justify-end ml-20">
              <label htmlFor="input2">Pin Code</label>

              <input
                id="input1"
                type="text"
                placeholder="XYZ VALUE"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center m-2 gap-14 rounded-xl">
            <div className="flex flex-col justify-start">
              <label htmlFor="input1">ULB Name </label>
              <div
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  margin: 0,
                  borderRadius: "5px",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <select
                  className="absolute top-0 right-0 bottom-0 left-0 border-blue-500"
                  style={{
                    border: "none",
                    height: "100%",
                    width: "100%",
                    padding: 5,
                    paddingLeft: 10,
                    borderRadius: "5px",
                    appearance: "none",
                    background: "transparent",
                  }}
                >
                  <option value="1">Ranchi</option>
                  <option value="2">Gumla</option>
                  <option value="3">Lohardaga</option>
                  <option value="4">Simdega</option>
                  <option value="5">Palamu</option>
                  <option value="6">Latehar</option>
                  <option value="7">Garhwa</option>
                  <option value="8">Chatra</option>
                  <option value="9">Hazaribagh</option>
                  <option value="10">Koderma</option>
                  <option value="11">Giridih</option>
                  <option value="12">Ramgarh</option>
                  <option value="13">Bokaro</option>
                  <option value="14">Dhanbad</option>
                  <option value="15">Dumka</option>
                  <option value="16">Jamtara</option>
                  <option value="17">Deoghar</option>
                  <option value="18">Godda</option>
                  <option value="19">Sahibganj</option>
                  <option value="20">Pakur</option>
                  <option value="21">West Singhbhum</option>
                  <option value="22">Saraikela Kharsawan</option>
                  <option value="23">East Singhbhum</option>
                  <option value="24">Khunti</option>
                  <option value="25">Ramgarh</option>
                  <option value="26">Simdega</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-end ml-20">
              <label htmlFor="input2">Ward No</label>

              <input
                id="input1"
                type="text"
                placeholder="XYZ VALUE"
                style={{
                  border: "2px solid #cccc",
                  height: "40px",
                  width: "470px",
                  padding: "20px",
                  borderRadius: "5px",
                  // marginBottom: "60px"
                }}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-row gap-10 mt-5">
         <div className="flex justify-start flex-col">
          <label htmlFor="viewUploadedDocuments">View Uploaded Documents</label>
          <button id="viewUploadedDocuments" className="bg-indigo-700 text-white rounded-md h-10 w-50">Addhar Card &gt;</button>
         </div>
         <div className="flex justify-start flex-col">
          <label htmlFor="viewUploadedLetter">View Uploaded Letter</label>
          <button className="bg-indigo-700 text-white rounded-md h-10 w-50">Letter &gt;</button>
         </div>
          </div>
        </div>
      </div>
      {/* second box................................................ */}
      <div
        className="border bg-white shadow-xl p-6 m-5 px-10 rounded-xl "
      
      >
        {/* Add your view page content here */}
        <div className="flex justify-self-start m-5">
          <b>Add Measurement</b>
        </div>
        {/* secoond task  */}
        <div className="flex justify-between   m-5 rounded-xl">
          <div className="">
            <label htmlFor="input1">Length</label>
            <br />
            <br />
            <input
              id="input1"
              type="text"
              placeholder="XYZ VALUE"
              style={{
                border: "2px solid #cccc",
                height: "30px",
                width: "200px",
                padding: "20px",
                borderRadius: "5px",
                // marginBottom: "60px"
              }}
            />
          </div>
          <div className="">
            <label htmlFor="input2">Breadth</label>
            <br />
            <br />
            <input
              id="input1"
              type="text"
              placeholder="XYZ VALUE"
              style={{
                border: "2px solid #cccc",
                height: "30px",
                width: "200px",
                padding: "20px",
                borderRadius: "5px",
                // marginBottom: "60px"
              }}
            />
          </div>
          <div>
            <label htmlFor="input3">Height</label>
            <br />
            <br />
            <input
              id="input1"
              type="text"
              placeholder="XYZ VALUE"
              style={{
                border: "2px solid #cccc",
                height: "30px",
                width: "200px",
                padding: "20px",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
        {/* third task */}
        <div className="flex items-end gap-3 m-5">
          <div>
            <label htmlFor="input1">Add Qunatities & Rates</label>
            <br />
            <br />
            <input
              id="input1"
              type="text"
              placeholder="Quantities"
              style={{
                border: "2px solid #cccc",
                height: "30px",
                width: "200px",
                padding: "20px",
                borderRadius: "10px",
                // marginBottom: "60px"
              }}
            />
          </div>
          <div>
            <input
              id="input2"
              type="text"
              placeholder="Rates"
              style={{
                border: "2px solid #cccc",
                height: "30px",
                width: "200px",
                padding: "20px",
                // marginTop: "10px",
                borderRadius: "10px",
                // marginBottom: "10px",
              }}
            />
          </div>

          <div>
            <button className="flex justify-between ">
              <svg
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.155 36.31C8.12831 36.31 2.88671e-05 28.1818 2.88671e-05 18.155C2.88671e-05 8.12828 8.12831 0 18.155 0C28.1818 0 36.3101 8.12828 36.3101 18.155C36.3101 28.1818 28.1818 36.31 18.155 36.31Z"
                  fill="#4338CA"
                />
                <path
                  d="M17.6039 26.5387V10.668"
                  stroke="white"
                  strokeWidth="2.26725"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.66852 18.6035H25.5393"
                  stroke="white"
                  strokeWidth="2.26725"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <br />
        {/* fourth task */}
        <div className="flex items-end m-5">
          <div>
            <label htmlFor="input1">Schedule of Rates</label>
            <br />
            <br />
            <select
              id="input1"
              style={{
                border: "2px solid #000000",
                height: "40px",
                width: "200px",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
              }}
            >
              <option value="option1">Drop Down</option>
              <option value="option2">Drop Down</option>
              <option value="option3">Drop Down</option>
            </select>
          </div>
        </div>
        <br />
        <br />
        {/* fifth task */}
        <div className="w-[271px] h-9 relative">
          <div className="w-[180px] h-9 px-5 py-2 left-[900px] top-0 absolute bg-indigo-700 rounded flex justify-end  gap-2 ">
            <button
              className="text-white text-sm font-medium font-['Inter'] capitalize leading-tight"
             
            >
              Save & Acknowladge{" "}
            </button>
          </div>
          <div className="w-[73px] h-9 px-5 py-2 left-[750px] top-0 absolute rounded border border-indigo-700 justify-start items-center gap-2 inline-flex">
            <button
              className="text-indigo-700 text-sm font-medium font-['Inter'] capitalize leading-tight"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
