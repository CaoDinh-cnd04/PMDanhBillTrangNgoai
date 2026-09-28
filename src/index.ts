import dotenv from 'dotenv';
import { createApp } from './api/server.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const { app } = createApp();

const server = app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🚀 VIỆT AN EXPRESS PORTAL — MODULAR MONOLITH & CLEAN ARCHITECTURE`);
  console.log(`📡 Server running at http://localhost:${PORT}`);
  console.log(`📖 Healthcheck: http://localhost:${PORT}/health`);
  console.log(`🔌 API Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`📦 Modular Domains: Catalog, Pricing, Orders, E-com, Trouble, Pickup, Addresses, Noti, AI`);
  console.log(`================================================================`);
});

export { app, server };
