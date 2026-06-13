"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import type { Metrics } from "../hooks/useMetrics";

ChartJS.register(ArcElement, Tooltip);

function formatBytes(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(1) + " GB";
}

export function MemoryChart({ metrics }: { metrics: Metrics }) {
  const { memory } = metrics;

  const data = {
    datasets: [
      {
        data: [memory.used, memory.free],
        backgroundColor: ["#8b5cf6", "rgba(255,255,255,0.05)"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { duration: 300 },
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height: 160 }}>
      <Doughnut data={data} options={options as never} />
      <div className="absolute text-center pointer-events-none">
        <p className="text-2xl font-bold text-white">{memory.usedPercent}%</p>
        <p className="text-xs text-gray-400">
          {formatBytes(memory.used)} / {formatBytes(memory.total)}
        </p>
      </div>
    </div>
  );
}
