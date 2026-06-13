"use client";

import type { Metrics } from "../hooks/useMetrics";

function formatBytes(bytes: number) {
  const gb = bytes / 1024 / 1024 / 1024;
  return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(bytes / 1024 / 1024).toFixed(0)} MB`;
}

function barColor(percent: number) {
  if (percent < 60) return "bg-emerald-500";
  if (percent < 85) return "bg-yellow-500";
  return "bg-red-500";
}

export function DiskList({ disk }: { disk: Metrics["disk"] }) {
  return (
    <div className="space-y-4">
      {disk.map((d) => (
        <div key={d.mount}>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span className="font-medium text-gray-300">{d.mount}</span>
            <span>
              {formatBytes(d.used)} / {formatBytes(d.size)}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor(d.usedPercent)}`}
              style={{ width: `${d.usedPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-0.5 text-right">{d.usedPercent}%</p>
        </div>
      ))}
    </div>
  );
}
