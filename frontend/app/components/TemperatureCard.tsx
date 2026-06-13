"use client";

import type { Metrics } from "../hooks/useMetrics";

function tempColor(t: number | null) {
  if (t === null) return "text-gray-500";
  if (t < 50) return "text-emerald-400";
  if (t < 75) return "text-yellow-400";
  return "text-red-400";
}

export function TemperatureCard({ temperature }: { temperature: Metrics["temperature"] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3">
        <span className="text-gray-400 text-sm">CPU</span>
        <span className={`text-3xl font-bold ${tempColor(temperature.cpu)}`}>
          {temperature.cpu !== null ? `${temperature.cpu}°C` : "N/D"}
        </span>
      </div>

      {temperature.cores.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {temperature.cores.map((t, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-500 mb-0.5">C{i}</p>
              <p className={`text-sm font-semibold ${tempColor(t)}`}>{t}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
