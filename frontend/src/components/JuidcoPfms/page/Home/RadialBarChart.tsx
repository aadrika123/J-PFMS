import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ApexCharts from "apexcharts";

const RadialBarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [series, setSeries] = useState<number[]>([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get<{ value: number }>(
          "http://localhost:2001/data1" // Replace with your actual API endpoint
        );
        const data = response.data;

        // Update the series state with the fetched data
        setSeries([data.value]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (series.length > 0) {
      const options = {
        series: series,
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ["Average Results"],
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [series]);

  return (
    <div className="justify-center">
      <div className="m-8">
        <p className="flex justify-center font-semibold">Total Spending </p>
        <span className="flex justify-center font-semibold">In Rupee (₹)</span>
      </div>
      <div id="chart" ref={chartRef}></div>
      <div className="text-center mt-14 flex justify-center font-semibold">
        <span
          className={`p-4 bg-gradient-to-r from-purple-600 to-blue-500  bg-black text-transparent bg-clip-text`}
        >
          Ranchi Municipal Corporation
        </span>
      </div>
    </div>
  );
};

export default RadialBarChart;
