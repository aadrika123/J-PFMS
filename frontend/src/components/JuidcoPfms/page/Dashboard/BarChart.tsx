"use client";
import dynamic from "next/dynamic";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface BarChartProps {
  title: string;
  data?: any[];
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const { title, data } = props;
  const updatedData = data?.map((item) => ({
    x: item?.name?.split(" ")[0],
    y: item.amount,
  })) || [
    {
      x: "category A",
      y: 10,
    },
    {
      x: "category B",
      y: 18,
    },
    {
      x: "category C",
      y: 13,
    },
  ];
  const options = {
    plotOptions: {
      bar: {
        barHeight: "80%",
        barPadding: 2,
        horizontal: true,
      },
    },
    series: [
      {
        data: updatedData,
      },
    ],
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
    grid: {
      show: false, // Hides the grid lines
    },
    stroke: {
      width: 0, // Hides the border around bars
    },
    chart: {
      toolbar: {
        show: false, // Hides the toolbar
      },
    },
    colors: ["#377ACB"],
  };
  return (
    <div className="w-72 max-md:w-80 max-sm:w-96 bg-white rounded p-4 border">
      <h1 className="text-secondary_black font-semibold flex flex-col items-center">
        {title}
      </h1>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={130}
        width={200}
      />
    </div>
  );
};

export default BarChart;
