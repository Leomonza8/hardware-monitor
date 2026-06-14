import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import si from "systeminformation";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

async function collectMetrics() {
  const [cpu, mem, disk, network, cpuTemp] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.cpuTemperature(),
  ]);

  return {
    cpu: {
      load: parseFloat(cpu.currentLoad.toFixed(1)),
      cores: cpu.cpus.map((c) => parseFloat(c.load.toFixed(1))),
    },
    memory: {
      total: mem.total,
      used: mem.used,
      free: mem.free,
      usedPercent: parseFloat(((mem.used / mem.total) * 100).toFixed(1)),
    },
    disk: disk
      .filter(
        (d) =>
          d.size > 0 &&
          d.type !== "squashfs" &&
          !d.mount.startsWith("/sys") &&
          !d.mount.startsWith("/proc") &&
          !d.mount.startsWith("/dev")
      )
      .map((d) => ({
        fs: d.fs,
        mount: d.mount,
        size: d.size,
        used: d.used,
        usedPercent: parseFloat(d.use.toFixed(1)),
      })),
    network: network.map((n) => ({
      iface: n.iface,
      rxSec: n.rx_sec ?? 0,
      txSec: n.tx_sec ?? 0,
    })),
    temperature: {
      cpu: cpuTemp.main ?? null,
      cores: cpuTemp.cores ?? [],
    },
    timestamp: Date.now(),
  };
}

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  const interval = setInterval(async () => {
    try {
      const metrics = await collectMetrics();
      socket.emit("metrics", metrics);
    } catch (err) {
      console.error("Erro ao coletar métricas:", err);
    }
  }, 1000);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    clearInterval(interval);
  });
});

const PORT = process.env.PORT ?? 3001;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
