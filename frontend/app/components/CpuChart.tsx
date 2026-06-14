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
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderWidth: 1.5,
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
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: {
          color: "#9ca3af",
          font: { family: "var(--font-mono)", size: 10 },
          callback: (v: string | number) => `${v}%`,
        },
        border: { color: "rgba(255,255,255,0.07)" },
      },
    },
    plugins: { legend: { display: false } },
    animation: { duration: 0 },
  };

  return <Line data={data} options={options as never} />;
}
