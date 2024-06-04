"use client";
import React from "react";
const Action: React.FC = () => {
  return (
    <div className="flex flex-wrap bg-gray-200 p-4">
      <div className="w-full md:w-1/2   flex justify-center">
        <div className="w-full md:w-3/4 p-2 ">
          <b className="flex justify-center mb-4">Members</b>
          <div className="mb-4">
            <label htmlFor="">
              <b>Comments</b>
            </label>
            <textarea
              className="w-[564.90px] h-[133.14px] bg-white rounded border border-neutral-300"
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
            <button className=" bg-indigo-500 text-white px-4 py-2 rounded">
              Forward
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-2 flex justify-center ">
        <b>Timeline</b>
      </div>
    </div>
  );
};

export default Action;
