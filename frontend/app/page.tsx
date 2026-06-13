"use client";

import { useMetrics } from "./hooks/useMetrics";
import { CpuChart } from "./components/CpuChart";
import { MemoryChart } from "./components/MemoryChart";
import { DiskList } from "./components/DiskList";
import { NetworkChart } from "./components/NetworkChart";
import { TemperatureCard } from "./components/TemperatureCard";

function MetricCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-xl p-4 ${className}`}>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Home() {
  const { metrics, history, connected } = useMetrics("http://localhost:3001");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight">Hardware Monitor</h1>
        <span
          className={`flex items-center gap-2 text-xs ${
            connected ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              connected ? "bg-emerald-400" : "bg-red-400"
            }`}
          />
          {connected ? "Conectado" : "Desconectado"}
        </span>
      </header>

      {!metrics ? (
        <p className="text-gray-500 text-center mt-20 text-sm">
          Aguardando dados do servidor...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <MetricCard title={`CPU — ${metrics.cpu.load}%`}>
            <div style={{ height: 120 }}>
              <CpuChart history={history} />
            </div>
          </MetricCard>

          <MetricCard title="Memória RAM">
            <MemoryChart metrics={metrics} />
          </MetricCard>

          <MetricCard title="Temperatura">
            <TemperatureCard temperature={metrics.temperature} />
          </MetricCard>

          <MetricCard title="Rede">
            <NetworkChart history={history} />
          </MetricCard>

          <MetricCard title="Disco" className="md:col-span-2 xl:col-span-2">
            <DiskList disk={metrics.disk} />
          </MetricCard>
        </div>
      )}
    </div>
  );
}
