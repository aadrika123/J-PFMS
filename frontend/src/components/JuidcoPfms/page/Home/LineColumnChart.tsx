import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { ApexOptions } from "apexcharts";

interface DataType {
  barData: number[];
  lineData: number[];
  labels: string[];
}

type Period = "Annually" | "Monthly" | "Quarterly";

const LineColumnChart: React.FC = () => {
  const [activeButton, setActiveButton] = useState<Period>("Annually");
  const [series, setSeries] = useState<{ type: string; data: number[] }[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  const baseOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "rangeArea",
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#219AE8"],
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#4338CA",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#219AE8",
            opacity: 1,
          },
        ],
      },
    },
    xaxis: {
      type: "datetime",
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
  };

  const fetchData = async (period: Period) => {
    try {
      const response = await axios.get<DataType>(
        `http://localhost:2001/data?period=${period}`
      );
      const data = response.data;

      const formattedData = [
        {
          type: "bar",
          data: data.barData,
        },
        {
          type: "line",
          data: data.lineData,
        },
      ];

      setSeries(formattedData);
      setChartOptions({
        ...baseOptions,
        labels: data.labels,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(activeButton);
  }, [activeButton]);

  const handleClick = (buttonName: Period) => {
    setActiveButton(buttonName);
  };

  return (
    <div id="chart" className="w-full lg:w-[100%] ">
      <div className="m-4 flex justify-between items-center">
        <p className="font-semibold text-[25px]">
          Physical Goals Achieved by All Departments
        </p>
        <div className="flex justify-end space-x-2">
          <div className="flex space-x-4 p-4 bg-gray-100 rounded-xl">
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
            <button
              className={`px-4 py-2 rounded-md ${
                activeButton === "Annually"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => handleClick("Annually")}
            >
              Annually
            </button>
          </div>
        </div>
      </div>
      <Chart
        options={chartOptions}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default LineColumnChart;
