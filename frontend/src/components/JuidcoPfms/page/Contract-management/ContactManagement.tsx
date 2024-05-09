//
"use client";
import React, { useState, useEffect } from "react";
import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/Button";
import goBack from "@/utils/helper";
import Image from "next/image";
import list from "@/assets/svg/list.svg";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/global/molecules/general/useUser";

interface DataItem {
  gpsLocation: string;
  wardNo: string;
  date: string;
  description: string;
  summary: string;
}

const ContractManagement: React.FC = () => {
  const user = useUser();
  console.log(user);
  const router = useRouter();
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    // Generate dummy data
    const dummyData = Array.from({ length: 10 }, (_, index) => ({
      gpsLocation: `${index}`,
      wardNo: `${index}`,
      date: `${index}`,
      description: `${index}`,
      summary: `${index}`,
    }));

    // Set the dummy data to state
    setData(dummyData);
  }, []);

  const handleViewClick = () => {
    router.push("/r/view");
  };
  const handleViewStepper = () => {
    router.push("/r/stepper");
  };
  return (
    <>
      <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
        <Button
          variant="cancel"
          className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
          onClick={goBack}
        >
          {Icons.back}
          <b>Back</b>
        </Button>
        <h2 className="text-black">
          <b>Assigned Work </b>
        </h2>
      </div>
      {/* .......................second task ........................ */}
      <section className="border bg-white shadow-xl p-6 px-10 rounded-md">
        <div className="flex items-center mb-4">
          <div className={`flex items-center  mr-3 pb-1 w-20 justify-center`}>
            <Image src={list} height={20} width={20} alt="pro-1" />
            <span className="ml-2 text-gray-500">List</span>
          </div>
        </div>
        {/* ..................... */}
        <div className="flex justify-between">
          <div className="flex gap-6">
            <select>
              <option value="">Select ULB</option>
              <option value="ranchi">Ranchi</option>
              <option value="bundu">Bundu</option>
              <option value="dewri">Dewri</option>
              <option value="itki">Itki</option>
            </select>
            <input
              type="text"
              placeholder="Bill Number"
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <svg
              width="56"
              height="46"
              viewBox="0 0 56 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="55"
                height="45"
                rx="7.5"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width="55"
                height="45"
                rx="7.5"
                stroke="#A19BE4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.2817 17.0416C18.34 15.2475 19.645 12.0046 22.2881 12.0555L33.287 12.2675C35.9301 12.3184 37.1093 15.6092 35.0999 17.3271L30.8146 20.9909C30.6066 21.1688 30.4845 21.4272 30.4793 21.7008L30.2912 31.4622C30.2583 33.1694 28.1776 33.9846 26.9937 32.7542L25.1143 30.8009C24.7619 30.4346 24.5694 29.9433 24.5791 29.4351L24.7303 21.59C24.7356 21.3164 24.6236 21.0535 24.4225 20.8677L20.2817 17.0416ZM22.2512 13.9718C21.3702 13.9548 20.9352 15.0358 21.5824 15.6338L25.7233 19.46C26.3265 20.0173 26.6625 20.8059 26.6467 21.6269L26.4955 29.472L28.3748 31.4253L28.563 21.6639C28.5788 20.8428 28.9449 20.0677 29.5691 19.5341L33.8544 15.8703C34.5241 15.2977 34.1311 14.2008 33.2501 14.1838L22.2512 13.9718Z"
                fill="#8F9399"
              />
            </svg>
            {/*  */}
            <input
              type="text"
              placeholder="Type Here"
              className="p-2 border  rounded-md flex justify-end"
            />
          </div>
        </div>
        {/* third part */}
        <div className="flex m-4">Total Results : {data.length}</div>
        {/* fourt part */}
        <div>
          <table className="border-collapse w-full ">
            <thead className="relative bg-slate-200 border">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">GPS Location</th>
                <th className="border p-2">Ward No</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Summary</th>
                <th className="border p-2">View</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.gpsLocation}</td>
                  <td className="border p-2">{item.wardNo}</td>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2">{item.summary}</td>
                  <td className="border flex justify-center">
                    <button
                      className="border p-2 rounded-xl  text-white  hover:bg-indigo-700 bg-indigo-700"
                      onClick={handleViewClick}
                    >
                      view
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* fifth part */}
        <div className="flex items-end gap-6 m-5">
          <div>
            <input
              id="input1"
              type="text"
              placeholder="Go to Page "
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
            <button className="flex justify-between "  onClick={handleViewStepper}>
              <svg
                width="38"
                height="37"
                viewBox="0 0 38 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="19.1095" cy="18.3347" r="18.155" fill="#4338CA" />
                <path
                  d="M27.9822 19.5044C28.325 19.1617 28.325 18.6059 27.9822 18.2631L22.3963 12.6772C22.0535 12.3345 21.4978 12.3345 21.155 12.6772C20.8122 13.02 20.8122 13.5758 21.155 13.9185L26.1202 18.8838L21.155 23.849C20.8122 24.1918 20.8122 24.7476 21.155 25.0903C21.4978 25.4331 22.0535 25.4331 22.3963 25.0903L27.9822 19.5044ZM11.9573 19.7615H27.3615V18.0061H11.9573V19.7615Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div>
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
          <option value="option1">Show 10</option>
          <option value="option2">show 20</option>
          <option value="option3">show 30</option>
        </select>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContractManagement;
