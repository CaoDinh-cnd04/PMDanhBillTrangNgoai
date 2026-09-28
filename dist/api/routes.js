import { Router } from 'express';
import { createCatalogRouter } from '../modules/catalog/presentation/catalog.controller.js';
import { createPricingRouter } from '../modules/pricing/presentation/pricing.controller.js';
import { createOrderRouter } from '../modules/orders/presentation/order.controller.js';
import { createEcomRouter } from '../modules/ecommerce/presentation/ecommerce.controller.js';
import { createTroubleRouter } from '../modules/trouble/presentation/trouble.controller.js';
import { createPickupRouter } from '../modules/pickup/presentation/pickup.controller.js';
import { createAddressBookRouter } from '../modules/address-book/presentation/address-book.controller.js';
import { createNotificationRouter } from '../modules/notifications/presentation/notification.controller.js';
import { createAiAssistantRouter } from '../modules/ai-assistant/presentation/ai-assistant.controller.js';
export function createModularApi(repos) {
    const api = Router();
    // Root endpoints matching the official API specification
    const pricingRouter = createPricingRouter(repos.pricing);
    const orderRouter = createOrderRouter(repos.orders);
    api.use(pricingRouter); // provides /rates and /pricing/...
    api.use(orderRouter); // provides /orders, /orders/batch, /orders/:ref, /orders/:ref/label, /drafts...
    api.use('/catalog', createCatalogRouter(repos.catalog));
    api.use('/ecom', createEcomRouter(repos.ecom));
    api.use(createTroubleRouter(repos.trouble)); // provides /troubles
    api.use(createPickupRouter(repos.pickup)); // provides /pickups
    api.use('/addresses', createAddressBookRouter(repos.addressBook));
    api.use(createNotificationRouter(repos.notifications)); // provides /notifications
    api.use('/ai', createAiAssistantRouter(repos.aiService));
    return api;
}
//# sourceMappingURL=routes.js.map