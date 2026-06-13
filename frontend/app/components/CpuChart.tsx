"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import type { Metrics } from "../hooks/useMetrics";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export function CpuChart({ history }: { history: Metrics[] }) {
  const data = {
    labels: history.map(() => ""),
    datasets: [
      {
        data: history.map((m) => m.cpu.load),
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: {
        min: 0,
        max: 100,
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: {
          color: "#6b7280",
          callback: (v: string | number) => `${v}%`,
        },
      },
    },
    plugins: { legend: { display: false } },
    animation: { duration: 0 },
  };

  return <Line data={data} options={options as never} />;
}
