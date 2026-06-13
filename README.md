# Hardware Monitor

Um painel web simples (mas funcional)  em tempo real para monitorar os recursos do seu computador — CPU, memória, disco, rede e temperatura — via interface web .

## Como funciona

O projeto tem duas partes:

- **Server** — um servidor Node.js que coleta as métricas do sistema usando a biblioteca `systeminformation` e as envia via WebSocket (Socket.IO) a cada 1 segundo.
- **Frontend** — uma interface feita com Next.js que recebe esses dados e os exibe em gráficos e cards atualizados em tempo real.

## Pré-requisitos

- Node.js 18+
- npm

## Como rodar

**1. Suba o servidor:**

```bash
cd server
npm install
npm run dev
```
**1. Suba o site:**
```bash
cd frontend
npm install
npm run dev
```
