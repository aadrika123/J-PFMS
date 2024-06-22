"use client";

import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PieChartProps {
  isDarkMode: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ isDarkMode }) => {
  const [activeButton, setActiveButton] = useState<string>("Monthly");

  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: ["RMC", "BUNDU", "BOKARO", "CHAS", "PALAMU"],
    fill: {
      type: "gradient",
      gradient: {
        shade: isDarkMode ? "dark" : "light",
        type: "diagonal1",
        shadeIntensity: 0.5,
        gradientToColors: [
          "#6E1A52",
          "#A1278D",
          "#D033D4",
          "#E44BFF",
          "#9D00FF",
        ],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 20, 40, 60, 80, 100],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const monthlyData = [44, 55, 13, 43, 22];
  const quarterlyData = [20, 30, 15, 25, 10];
  const series = activeButton === "Monthly" ? monthlyData : quarterlyData;

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div
      id="chart"
      className={`flex flex-col gap-4 flex-1 justify-center items-center m-4 ${
        isDarkMode ? "bg-#1E1F25 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-1">
        <div className="m-4 flex flex-col items-center gap-4">
          <p className="flex justify-center text-center font-semibold">
            ULB Details
          </p>
          <span className="flex justify-center flex-row text-center font-semibold">
            Top 5 Performing ULB by Project Budget
          </span>
        </div>
      </div>

      <div className="flex flex-1 ml-14">
        <Chart options={options} series={series} type="pie" width={"380"} />
      </div>

      <div className="flex flex-1 mr-8">
        <div
          className={`flex justify-end items-end space-x-4 p-4 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          } rounded-xl`}
        >
          <button
            className={`px-4 py-2 rounded-md ${
              activeButton === "Monthly"
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleClick("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeButton === "Quarterly"
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleClick("Quarterly")}
          >
            Quarterly
          </button>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
