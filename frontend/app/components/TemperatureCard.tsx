"use client";

import type { Metrics } from "../hooks/useMetrics";

function tempColor(t: number | null): string {
  if (t === null) return "var(--color-text-secondary)";
  if (t < 50) return "#34d399";
  if (t < 75) return "#fbbf24";
  return "#f87171";
}

export function TemperatureCard({ temperature }: { temperature: Metrics["temperature"] }) {
  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3">
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
        >
          CPU
        </span>
        <span
          className="text-3xl font-semibold"
          style={{ color: tempColor(temperature.cpu) }}
        >
          {temperature.cpu !== null ? `${temperature.cpu}°C` : "N/D"}
        </span>
      </div>

      {temperature.cores.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {temperature.cores.map((t, i) => (
            <div
              key={i}
              className="rounded-lg p-2 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <p
                className="text-[10px] mb-0.5"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
              >
                C{i}
              </p>
              <p
                className="text-sm font-semibold"
                style={{ color: tempColor(t), fontFamily: "var(--font-mono)" }}
              >
                {t}°C
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
