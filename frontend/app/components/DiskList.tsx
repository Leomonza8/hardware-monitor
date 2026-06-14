"use client";

import type { Metrics } from "../hooks/useMetrics";

function formatBytes(bytes: number) {
  const gb = bytes / 1024 / 1024 / 1024;
  return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(bytes / 1024 / 1024).toFixed(0)} MB`;
}

function barColor(percent: number) {
  if (percent < 60) return "#2563eb";
  if (percent < 85) return "#d97706";
  return "#dc2626";
}

export function DiskList({ disk }: { disk: Metrics["disk"] }) {
  const validDisks = disk.filter((d) => d.size > 0 && isFinite(d.usedPercent));
  return (
    <div className="space-y-5">
      {validDisks.map((d) => (
        <div key={d.mount}>
          <div
            className="flex justify-between text-xs mb-2"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>{d.mount}</span>
            <span>
              {formatBytes(d.used)} / {formatBytes(d.size)}
            </span>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${d.usedPercent}%`,
                background: barColor(d.usedPercent),
                transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
          <p
            className="text-xs mt-1 text-right"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
          >
            {d.usedPercent}%
          </p>
        </div>
      ))}
    </div>
  );
}
