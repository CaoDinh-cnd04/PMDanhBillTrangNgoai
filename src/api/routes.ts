import { Router } from 'express';
import { CatalogRepository } from '../modules/catalog/infrastructure/in-memory-catalog.repository.js';
import { createCatalogRouter } from '../modules/catalog/presentation/catalog.controller.js';
import { PricingRepository } from '../modules/pricing/infrastructure/in-memory-pricing.repository.js';
import { createPricingRouter } from '../modules/pricing/presentation/pricing.controller.js';
import { OrderRepository } from '../modules/orders/infrastructure/in-memory-order.repository.js';
import { createOrderRouter } from '../modules/orders/presentation/order.controller.js';
import { EcomRepository } from '../modules/ecommerce/infrastructure/in-memory-ecom.repository.js';
import { createEcomRouter } from '../modules/ecommerce/presentation/ecommerce.controller.js';
import { TroubleRepository } from '../modules/trouble/infrastructure/in-memory-trouble.repository.js';
import { createTroubleRouter } from '../modules/trouble/presentation/trouble.controller.js';
import { PickupRepository } from '../modules/pickup/infrastructure/in-memory-pickup.repository.js';
import { createPickupRouter } from '../modules/pickup/presentation/pickup.controller.js';
import { AddressBookRepository } from '../modules/address-book/infrastructure/in-memory-address.repository.js';
import { createAddressBookRouter } from '../modules/address-book/presentation/address-book.controller.js';
import { NotificationRepository } from '../modules/notifications/infrastructure/in-memory-notification.repository.js';
import { createNotificationRouter } from '../modules/notifications/presentation/notification.controller.js';
import { HeuristicAiService } from '../modules/ai-assistant/infrastructure/heuristic-parser.service.js';
import { createAiAssistantRouter } from '../modules/ai-assistant/presentation/ai-assistant.controller.js';

export interface AppRepositories {
  catalog: CatalogRepository;
  pricing: PricingRepository;
  orders: OrderRepository;
  ecom: EcomRepository;
  trouble: TroubleRepository;
  pickup: PickupRepository;
  addressBook: AddressBookRepository;
  notifications: NotificationRepository;
  aiService: HeuristicAiService;
}

export function createModularApi(repos: AppRepositories): Router {
  const api = Router();

  // Root endpoints matching the official API specification
  const pricingRouter = createPricingRouter(repos.pricing);
  const orderRouter = createOrderRouter(repos.orders);

  api.use(pricingRouter); // provides /rates and /pricing/...
  api.use(orderRouter);   // provides /orders, /orders/batch, /orders/:ref, /orders/:ref/label, /drafts...
  api.use('/catalog', createCatalogRouter(repos.catalog));
  api.use('/ecom', createEcomRouter(repos.ecom));
  api.use(createTroubleRouter(repos.trouble)); // provides /troubles
  api.use(createPickupRouter(repos.pickup));   // provides /pickups
  api.use('/addresses', createAddressBookRouter(repos.addressBook));
  api.use(createNotificationRouter(repos.notifications)); // provides /notifications
  api.use('/ai', createAiAssistantRouter(repos.aiService));

  return api;
}
