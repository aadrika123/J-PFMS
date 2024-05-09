"use client";

import React from "react";
import Button from "@/components/global/atoms/Button";
import goBack from "@/utils/helper";
import { Icons } from "@/assets/svg/icons";
import admi from "@/assets/svg/admi.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
type item = {
  label?: string;
  img?: any;
  info?: string;
};

const items: item[] = [
  {
    info: "BACK OFFICE",
    img: admi,
  },
  {
    info: "EXECUTIVE OFFICER",
    img: admi,
  },
  {
    info: "CITY MANAGER",
    img: admi,
  },
  {
    info: "ENGENEERING DEPARTMENT",
    img: admi,
  },
  {
    info: "ADMINSITRATIVE DEPARTMENT",
    img: admi,
  },
];

type StepperProps = {
  activeStepper: number;
  activeBgColor?: string;
  inActiveBgColor?: string;
  stepWidth?: 36 | 32 | 48;
};

const StepperTech: React.FC<StepperProps> = (props) => {
  const router = useRouter();
  const { activeStepper, activeBgColor = "primary_bg_indigo" } = props;
  const handleViewReject = () => {
    router.push("/r/reject");
  };
  const handleViewApprove = () => {
    router.push("/r/accept");
  };
  return (
    <Formik
    initialValues={{
      district: "",
      projectDescription: "",
      projectSummary: "",
      state: "",
      gpsLocation: "",
      ulbName: "",
      officerName: "",
    }}
    onSubmit={(values, actions) => {
      console.log(values);
      actions.setSubmitting(false);
    }}
  >
    
    <Form action="">
      {/* First ...... */}
      <section className="border bg-white shadow-xl p-6 px-10 rounded-md">
        <div className="flex items-center justify-between  pb-4 mb-4">
          <Button
            variant="cancel"
            className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
            onClick={goBack}
          >
            {Icons.back}
            <b>Back</b>
          </Button>
          <h2 className="text-black">
            <b>View Project Proposal</b>
          </h2>
        </div>
        <br />
        {/* Second Task   */}
        <div className="flex ml-10">
          {items?.map((item, index) => (
            <div key={index} className={`w-full`}>
              <div className={`flex items-center`}>
                <div
                  className={`h-8 w-10 rounded-full flex items-center justify-center p-1 text-white ${activeStepper >= index + 1 ? `bg-${activeBgColor}` : `bg-gray-500`}`}
                >
                  {activeStepper === index + 1 &&
                    (item?.label || <Image src={item.img} alt="" />)}
                </div>

                <hr
                  className={`w-full border-2 ${items.length === index + 1 && "opacity-0"} ${activeStepper >= index + 1 && `border-${activeBgColor}`}`}
                />
              </div>
              <div
                className={`mr-6 mt-3 -ml-10 w-28 text-xs text-center ${activeStepper >= index + 1 && "font-bold"}`}
              >
                {item.info}
              </div>
            </div>
          ))}
        </div>
        {/* form ........... */}
        <br />
        <br />
        {/* ............ */}
        <div className="flex flex-col flex-wrap">
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
                  <option value="2">Jamshedpur</option>
                  <option value="3">Dhanbad</option>
                  <option value="4">Bokaro</option>
                  <option value="5">Deoghar</option>
                  <option value="6">Hazaribagh</option>
                  <option value="7">Giridih</option>
                  <option value="8">Ramgarh</option>
                  <option value="9">Palamu</option>
                  <option value="10">Sahibganj</option>
                </select>
              </div>
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
          </div>
          <div className="flex flex-row items-center m-2 gap-14 rounded-xl">
            <div className="flex flex-col justify-start ">
              <label htmlFor="input1">GPS Location </label>

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
              <label htmlFor="input2">Date</label>

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
                  <option value="2">Jamshedpur</option>
                  <option value="3">Dhanbad</option>
                  <option value="4">Bokaro</option>
                  <option value="5">Deoghar</option>
                  <option value="6">Hazaribagh</option>
                  <option value="7">Giridih</option>
                  <option value="8">Ramgarh</option>
                  <option value="9">Palamu</option>
                  <option value="10">Sahibganj</option>
                </select>
              </div>
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
            <div className="flex flex-col justify-start ">
              <label htmlFor="input1">Name of the Officer </label>

              <input
                id="input1"
                type="text"
                placeholder="-Auto Populated-"
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
          <br />
          <br />
          <div className="w-[271px] h-9 relative ">
            <div className="w-[100px] h-9 px-5 py-2 left-[850px] top-0 absolute bg-indigo-700 rounded flex justify-end">
              <button className="text-white text-sm text-center font-medium font-['Inter'] capitalize leading-tight" onClick={handleViewApprove}>
                Approve
              </button>
            </div>
            <div className="w-[73px] mr-10 h-9 px-5 py-2 left-[750px] top-0 right-10 absolute rounded border border-indigo-700 justify-items-center items-center gap-1 inline-flex">
              <button
                className="text-indigo-700 text-sm font-medium font-['Inter'] capitalize leading-tight"
                onClick={handleViewReject}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </section>
   
    </Form>
    </Formik>
    
  );
};

export default StepperTech;
