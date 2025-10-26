import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FairnessCharts({ metrics }) {
  const data = {
    labels: Object.keys(metrics),
    datasets: [
      {
        label: "Fairness Metrics",
        data: Object.values(metrics),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Fairness Metrics",
      },
    },
  };

  return <Bar data={data} options={options} />;
}
