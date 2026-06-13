"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface Metrics {
  cpu: { load: number; cores: number[] };
  memory: { total: number; used: number; free: number; usedPercent: number };
  disk: { fs: string; mount: string; size: number; used: number; usedPercent: number }[];
  network: { iface: string; rxSec: number; txSec: number }[];
  temperature: { cpu: number | null; cores: number[] };
  timestamp: number;
}

const HISTORY_SIZE = 30;

export function useMetrics(url: string) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [history, setHistory] = useState<Metrics[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("metrics", (data: Metrics) => {
      setMetrics(data);
      setHistory((prev) => [...prev.slice(-(HISTORY_SIZE - 1)), data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);

  return { metrics, history, connected };
}
