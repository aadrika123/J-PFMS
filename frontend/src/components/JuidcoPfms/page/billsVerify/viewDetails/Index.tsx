"use client";

import React from "react";
import BillLayout from "../BillLayout";
import BillDetails from "../details/BillDetails";
import Image from "next/image";
import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";
import { Toaster } from "react-hot-toast";

const ViewDetailsHero = ({ BillsId }: { BillsId: string }) => {
  return (
    <>
      <Toaster />
      <BillLayout>
        <section className="border bg-white shadow-xl p-6 px-10">
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
          <BillDetails billId={BillsId} />
        </section>
      </BillLayout>
    </>
  );
};

export default ViewDetailsHero;
