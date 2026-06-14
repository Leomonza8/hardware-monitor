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
        backgroundColor: ["#2563eb", "rgba(255,255,255,0.04)"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "78%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { duration: 150 },
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height: 160 }}>
      <Doughnut data={data} options={options as never} />
      <div className="absolute text-center pointer-events-none">
        <p
          className="text-2xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {memory.usedPercent}%
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
        >
          {formatBytes(memory.used)} / {formatBytes(memory.total)}
        </p>
      </div>
    </div>
  );
}
