import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createModularApi } from './routes.js';
import { CatalogRepository } from '../modules/catalog/infrastructure/in-memory-catalog.repository.js';
import { PricingRepository } from '../modules/pricing/infrastructure/in-memory-pricing.repository.js';
import { OrderRepository } from '../modules/orders/infrastructure/in-memory-order.repository.js';
import { EcomRepository } from '../modules/ecommerce/infrastructure/in-memory-ecom.repository.js';
import { TroubleRepository } from '../modules/trouble/infrastructure/in-memory-trouble.repository.js';
import { PickupRepository } from '../modules/pickup/infrastructure/in-memory-pickup.repository.js';
import { AddressBookRepository } from '../modules/address-book/infrastructure/in-memory-address.repository.js';
import { NotificationRepository } from '../modules/notifications/infrastructure/in-memory-notification.repository.js';
import { HeuristicAiService } from '../modules/ai-assistant/infrastructure/heuristic-parser.service.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export function createApp() {
    const app = express();
    // Instantiate Repositories
    const repos = {
        catalog: new CatalogRepository(),
        pricing: new PricingRepository(),
        orders: new OrderRepository(),
        ecom: new EcomRepository(),
        trouble: new TroubleRepository(),
        pickup: new PickupRepository(),
        addressBook: new AddressBookRepository(),
        notifications: new NotificationRepository(),
        aiService: new HeuristicAiService()
    };
    // Global Middlewares
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    // Healthcheck endpoint
    app.get('/health', (_req, res) => {
        res.json({
            status: 'UP',
            service: 'VietAn Express Portal - Modular Monolith',
            version: '2.0.0',
            timestamp: new Date().toISOString()
        });
    });
    // Modular REST API v1
    const modularRoutes = createModularApi(repos);
    app.use('/api/v1', modularRoutes);
    app.use('/api', modularRoutes); // fallback alias
    // Static assets serving (SPA Client)
    const publicDir = path.resolve(__dirname, '../../public');
    const clientDistDir = path.resolve(__dirname, '../client');
    app.use('/client', express.static(clientDistDir));
    app.use(express.static(publicDir));
    // Client SPA fallback
    app.use((req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }
        if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
            return next();
        }
        const indexPath = path.join(publicDir, 'index.html');
        res.sendFile(indexPath, err => {
            if (err) {
                res.status(200).send(`
          <html>
            <head><title>Việt An Express Portal</title></head>
            <body>
              <h1>Việt An Express Portal API & Backend</h1>
              <p>Hệ thống Modular Monolith đang chạy. Xem tài liệu API tại <code>/api/v1/health</code>.</p>
            </body>
          </html>
        `);
            }
        });
    });
    // Global Error Handler
    app.use((err, _req, res, _next) => {
        console.error('Unhandled Server Error:', err);
        const msg = err instanceof Error ? err.message : 'Internal Server Error';
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: msg });
    });
    return { app, repos };
}
//# sourceMappingURL=server.js.map