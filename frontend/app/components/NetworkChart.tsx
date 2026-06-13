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
  Legend,
} from "chart.js";
import type { Metrics } from "../hooks/useMetrics";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function formatSpeed(bytesPerSec: number) {
  if (bytesPerSec >= 1024 * 1024) return `${(bytesPerSec / 1024 / 1024).toFixed(1)} MB/s`;
  return `${(bytesPerSec / 1024).toFixed(1)} KB/s`;
}

export function NetworkChart({ history }: { history: Metrics[] }) {
  const latest = history.at(-1)?.network[0];

  const data = {
    labels: history.map(() => ""),
    datasets: [
      {
        label: "Download",
        data: history.map((m) => m.network[0]?.rxSec ?? 0),
        fill: true,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "Upload",
        data: history.map((m) => m.network[0]?.txSec ?? 0),
        fill: true,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
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
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: {
          color: "#6b7280",
          callback: (v: string | number) => formatSpeed(Number(v)),
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: "#9ca3af", boxWidth: 12, font: { size: 11 } },
      },
    },
    animation: { duration: 0 },
  };

  return (
    <div>
      {latest && (
        <p className="text-xs text-gray-500 mb-2">
          {latest.iface} — ↓ {formatSpeed(latest.rxSec)} · ↑ {formatSpeed(latest.txSec)}
        </p>
      )}
      <div style={{ height: 120 }}>
        <Line data={data} options={options as never} />
      </div>
    </div>
  );
}
