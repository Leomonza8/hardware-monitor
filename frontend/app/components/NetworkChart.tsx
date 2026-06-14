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
        label: "↓ Download",
        data: history.map((m) => m.network[0]?.rxSec ?? 0),
        fill: true,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.08)",
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "↑ Upload",
        data: history.map((m) => m.network[0]?.txSec ?? 0),
        fill: true,
        borderColor: "#9ca3af",
        backgroundColor: "rgba(156, 163, 175, 0.06)",
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
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: {
          color: "#9ca3af",
          font: { family: "var(--font-mono)", size: 10 },
          callback: (v: string | number) => formatSpeed(Number(v)),
        },
        border: { color: "rgba(255,255,255,0.07)" },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#9ca3af",
          boxWidth: 10,
          font: { size: 10, family: "var(--font-mono)" },
        },
      },
    },
    animation: { duration: 0 },
  };

  return (
    <div>
      {latest && (
        <p
          className="text-xs mb-3"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
        >
          {latest.iface} · ↓ {formatSpeed(latest.rxSec)} · ↑ {formatSpeed(latest.txSec)}
        </p>
      )}
      <div style={{ height: 120 }}>
        <Line data={data} options={options as never} />
      </div>
    </div>
  );
}
