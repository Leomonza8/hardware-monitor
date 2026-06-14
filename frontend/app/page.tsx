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
    <div
      className={`rounded-lg p-5 ${className}`}
      style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Home() {
  const { metrics, history, connected } = useMetrics("http://localhost:3001");

  return (
    <div
      className="min-h-screen bg-developer-grid"
      style={{ background: "var(--color-bg-main)" }}
    >
      {/* grid overlay */}
      <div className="min-h-screen bg-developer-grid">

        {/* navbar */}
        <header
          className="navbar-glass sticky top-0 z-10 flex items-center justify-between px-8 py-4"
        >
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-semibold tracking-tight"
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}
            >
              Hardware Monitor
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(37,99,235,0.12)",
                color: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
                border: "1px solid rgba(37,99,235,0.2)",
              }}
            >
              v1.0
            </span>
          </div>

          <span
            className="flex items-center gap-2 text-xs"
            style={{
              color: connected ? "#34d399" : "#f87171",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: connected ? "#34d399" : "#f87171" }}
            />
            {connected ? "ONLINE" : "OFFLINE"}
          </span>
        </header>

        {/* main content */}
        <main className="relative px-8 py-8">
          {!metrics ? (
            <p
              className="text-center mt-24 text-sm"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
            >
              aguardando dados do servidor...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <MetricCard title={`CPU · ${metrics.cpu.load}%`}>
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
        </main>
      </div>
    </div>
  );
}
