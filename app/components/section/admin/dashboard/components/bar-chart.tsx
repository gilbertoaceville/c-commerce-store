"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarChartProps } from "../types";
import { memo } from "react";
import Subject from "@/components/element/subject/subject";

import locale from "../locale/en.json"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ data }: BarChartProps) {
  const days = data?.map((item) => item.day);
  const amount = data?.map((item) => item.amount);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Sale Amount",
        data: amount,
        backgroundColor: "rgba(75,192,192, 0.6)",
        borderColor: "rgba(75,192,192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Subject title={locale.chartTitle} />
      <Bar data={chartData} options={options}></Bar>
    </>
  );
}

export default memo(BarChart);
