import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

const DoubleBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options: ApexOptions = {
      series: [
        {
          name: "Q1 Budget",
          group: "budget",
          data: [44000, 55000, 41000, 67000, 22000],
        },
        {
          name: "Q2 Actual",
          group: "actual",
          data: [20000, 40000, 25000, 10000, 12000],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          borderRadius: 5, // Rounded corners for bars
          horizontal: false,
        },
      },
      dataLabels: {
        formatter: (val: number) => {
          return (val / 1000).toFixed(1) + "K";
        },
      },
      xaxis: {
        categories: [
          "2017-2018",
          "2019-2020",
          "2021-2022",
          "2022-2023",
          "2023-2024",
        ],
        labels: {
          show: true,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.4, // Adjust intensity of the shade
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91], // Specify gradient stops
        },
      },
      colors: ["#219AE8", "#4338CA"], // Adjust colors as needed
      yaxis: {
        labels: {
          formatter: (val: number) => {
            return (val / 1000).toFixed(1) + "K";
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
    };

    const chart = new ApexCharts(chartRef.current!, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col m-4">
      <div className="font-semibold flex justify-start text-[25px] mb-4">
        Budget VS Actual by Departments
      </div>
      <div ref={chartRef} className="mb-4 flex w-[100%]" />
      <div className="flex justify-between font-semibold">
        <div className="ml-36">RCD</div>
        <div className="ml-6">BCD</div>
        <div className="ml-6">WRD</div>
        <div className="ml-6">DWSD</div>
        <div className="mr-20">Energy</div>
      </div>
    </div>
  );
};

export default DoubleBarChart;
