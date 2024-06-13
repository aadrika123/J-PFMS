"use client";
import React from "react";
import { BoldSpan } from "../../ProjectProposal/molecules/BoxContainer";
import Image from "next/image";
import admi from "@/assets/svg/admi.svg";

const Action: React.FC = () => {
  return (
    <>
      <div className="flex bg-[#E1E8F0] h-49">
        <div className="w-[58.77%] h-[57.42%] border p-3">
          <h2 className=" font-bold flex justify-center ml-5">Members</h2>
        </div>
        <div className="w-[65%] border p-3">
          <h2 className=" font-bold flex justify-center ">Timeline</h2>
        </div>
      </div>
      <div className="flex">
        <div className=" w-[35%] bg-[#F9FAFC]">
          <div className="mb-4 mt-8 ">
            <label htmlFor="">
              <b>Comments</b>
            </label>
            <textarea
              className="bg-white rounded border border-neutral-300 m-1"
              style={{ width: "540.9px", height: "133.14px" }}
              placeholder="Add a comment..."
            ></textarea>
          </div>
          <div className="flex justify-start mb-4">
            <input type="checkbox" className="mr-2" />
            <label>Escalate</label>
          </div>
          <div className="flex mb-4">
            <button className="bg-sky-400 text-white px-4 py-2 rounded mr-2">
              Send Comment
            </button>
          </div>
          <div className="flex mb-4 justify-between">
            <button className=" bg-red-500 text-white px-4 py-2 rounded mr-2">
              Send Back
            </button>
            <button className=" bg-indigo-500 text-white px-4 py-2 flex justify-start rounded mr-5">
              Forward
            </button>
          </div>
        </div>
        <div className=" w-[65%] bg-[#ffff]">
          <div className="flex flex-1 flex-col ">
            <div className="flex justify-start font-bold text-md items-start mt-4">
              Assistant Engineer Comment
            </div>
            <div className="flex justify-center item-center text-red-500 font-bold text-md items-start mt-4">
              No Comments
            </div>
          </div>
          <div className="flex flex-1 flex-col mt-2 ">
            <div className="flex justify-start font-bold text-md items-start mt-4">
              Level Comment
            </div>
            <div className="flex flex-col justify-start item-start bg-blue-100 h-full font-bold text-md items-start mt-4">
              {/* <hr className="mb-4" />
            <span>Level Comment</span> */}
            <div className="bg-[#e0f2fe] p-4 mt-4 rounded-lg w-2/3 relative">
              <div className="h-5 w-5 bg-[#3abdf3] rounded-full text-white flex items-center justify-center absolute top-0 left-0">
                1
              </div>
              <div className="flex items-center">
                <Image src={admi} alt="admi" className="bg-indigo-500" />
                <div className="flex flex-col ml-1">
                  <span>
                    <b>Rakesh Kumar</b>
                  </span>
                  <span>Junior Engineer</span>
                </div>
              </div>
              <div className="my-1">
                forwarded to{" "}
                <span className="bg-gray-700 rounded p-2 text-white text-xs">
                  Assistant Engineer
                </span>
              </div>
              <BoldSpan label="Comment:" content="Verify the bill" /> <br />
              <BoldSpan
                label="Received Date:"
                content="09-03-2024 16:31"
              />{" "}
              <br />
              <BoldSpan label="Forward Date:" content="NA NA" />
            </div> 
              <div className="flex "></div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="flex gap-3 bg-gray-200 p-4">
    //   <div className="w-full md:w-1/2   flex justify-center">
    //     <div className="w-full md:w-3/4 p-2 ">
    //       <b className="flex justify-center bg-gray-200  mb-4">
    //         Members
    //       </b>
    // <div className="mb-4">
    //   <label htmlFor="">
    //     <b>Comments</b>
    //   </label>
    //   <textarea
    //     className="w-[564.90px] h-[133.14px] bg-white rounded border border-neutral-300"
    //     placeholder="Add a comment..."
    //   ></textarea>
    // </div>
    // <div className="flex justify-start mb-4">
    //   <input type="checkbox" className="mr-2" />
    //   <label>Escalate</label>
    // </div>
    // <div className="flex mb-4">
    //   <button className="bg-sky-400 text-white px-4 py-2 rounded mr-2">
    //     Send Comment
    //   </button>
    // </div>
    // <div className="flex mb-4 justify-between">
    //   <button className=" bg-red-500 text-white px-4 py-2 rounded mr-2">
    //     Send Back
    //   </button>
    //   <button className=" bg-indigo-500 text-white px-4 py-2 rounded">
    //     Forward
    //   </button>
    // </div>
    //     </div>
    //   </div>

    //   <div className="flex flex-1 flex-col">
    //     <div className="bg-gray-200 font-bold ">Timeline</div>
    //     <div className="flex  flex-col flex-1 w-full  p-2 justify-center bg-white  rounded-md">
    // <div className="flex flex-1 flex-col ">
    //   <div className="flex justify-start font-bold text-md items-start mt-4">
    //     Assistant Engineer Comment
    //   </div>
    //   <div className="flex justify-center item-center text-red-500 font-bold text-md items-start mt-4">
    //     No Comments
    //   </div>
    // </div>
    // <div className="flex flex-1 flex-col mt-2 ">
    //   <div className="flex justify-start font-bold text-md items-start mt-4">
    //     Assistant Engineer Comment
    //   </div>
    //   <div className="flex flex-col justify-start item-start bg-blue-100 h-full font-bold text-md items-start mt-4">
    //     <div className="flex justify-start items-start p-2  text-center text-white rounded-full bg-blue-300">
    //       4
    //     </div>
    //     <div className="flex "></div>
    //   </div>
    // </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Action;
