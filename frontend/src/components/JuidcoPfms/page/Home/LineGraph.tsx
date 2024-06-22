"use client";

import React from "react";
import { Line } from "react-chartjs-2";

interface SalesData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

const SalesGraph: React.FC<SalesData> = ({ labels, datasets }) => {
  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SalesGraph;
