"use client";

import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { FINANCE_URL } from "@/utils/api/urls";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import Loader from "@/components/global/atoms/Loader";

const Dashboard = () => {
  const allApi = [
    axios({
      url: `${FINANCE_URL.DASHBOARD.getCollection}`,
      method: "GET",
    }),
    axios({
      url: `${FINANCE_URL.DASHBOARD.getTopPaymentMode}`,
      method: "GET",
    }),
    axios({
      url: `${FINANCE_URL.DASHBOARD.getTopRevenueModules}`,
      method: "GET",
    }),
    axios({
      url: `${FINANCE_URL.DASHBOARD.getTopUlb}`,
      method: "GET",
    }),
  ];

  const fetchData = async () => {
    try {
      const dataList: any = {};
      const responses = await Promise.all(allApi);
      responses.forEach((res: any) => {
        if (res.data.status) {
          if (res?.config?.url === `${FINANCE_URL.DASHBOARD.getCollection}`)
            dataList["collection"] = res.data.data;
          if (res?.config?.url === `${FINANCE_URL.DASHBOARD.getTopPaymentMode}`)
            dataList["paymentModes"] = res.data.data;
          if (
            res?.config?.url === `${FINANCE_URL.DASHBOARD.getTopRevenueModules}`
          )
            dataList["revenueModules"] = res.data.data;
          if (res?.config?.url === `${FINANCE_URL.DASHBOARD.getTopUlb}`)
            dataList["ulbs"] = res.data.data;
        }
      });

      return dataList;
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery(["dashboard"], fetchData);

  //////////////////// Line Chart options /////////////
  const options: any = {
    series: [
      {
        name: "Series A",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: "Series B",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    chart: {
      toolbar: {
        show: false, // Hides the toolbar
      },
    },
  };

  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <div className="bg-[#E3E8FF] -m-5">
          <div>
            <header className="h-11 text-xl bg-[#377ACB] flex justify-center items-center text-white font-bold">
              Finance Dashboard
            </header>
            <div className="flex items-center justify-between flex-wrap my-4 mx-4 gap-3">
              <PieChart
                title="Total Revenue"
                subTitle1="Previous Year"
                subTitle2="Current Year"
              />
              <PieChart
                title="Total Expenditure"
                subTitle1="Previous Year"
                subTitle2="Current Year"
              />
              <PieChart
                title="Net Position"
                subTitle1="Previous Year"
                subTitle2="Current Year"
              />
            </div>
            <div className="mx-4">
              <LineChart title="Total Revenue" options={options} />
            </div>
          </div>
          <div>
            <header className="h-8 bg-[#377ACB] flex items-center flex-wrap pl-4 mt-4 text-white font-bold">
              Revenue
            </header>
            <div className="flex items-center justify-between flex-wrap m-4 gap-3">
              <PieChart arrear={10000} current={2000} title="Demand" subTitle1="Arrear" subTitle2="Current" />
              <PieChart
                arrear={data?.collection?.arrearAmount}
                current={data?.collection?.currentAmount}
                title="Collection"
                subTitle1="Arrear"
                subTitle2="Current"
              />
              <PieChart arrear={data?.collection?.arrearAmount + 10000} current={data?.collection?.currentAmount + 2000} title="Total Revenue" subTitle1="Arrear" subTitle2="Current" />
            </div>
            <div className="flex items-center justify-between flex-wrap m-4 gap-3">
              <BarChart data={data?.revenueModules} title="Revenue type" />
              <BarChart data={data?.ulbs} title="ULB" />
              <BarChart data={data?.paymentModes} title="Payment Mode" />
            </div>
          </div>
          {/* <div>
        <header className="h-8 bg-[#377ACB] flex items-center flex-wrap mt-4 pl-4 text-white font-bold">
          Expenditure
        </header>
        <div className="flex items-center justify-between flex-wrap m-4 gap-3">
          <PieChart
            title="Expenses Payables"
            subTitle1="Arrear"
            subTitle2="Current"
          />
          <PieChart
            title="Expenses Paid"
            subTitle1="Arrear"
            subTitle2="Current"
          />
          <PieChart title="Balance" />
        </div>
        <div className="flex items-center justify-between flex-wrap mt-4 mx-4 pb-4 gap-3">
          <BarChart title="Expenditure type" />
          <BarChart title="ULB" />
          <BarChart title="Payment Modes" />
        </div>
      </div> */}
        </div>
      )}
    </>
  );
};

export default Dashboard;
