import { Router } from 'express';
import { CatalogRepository } from '../modules/catalog/infrastructure/in-memory-catalog.repository.js';
import { PricingRepository } from '../modules/pricing/infrastructure/in-memory-pricing.repository.js';
import { OrderRepository } from '../modules/orders/infrastructure/in-memory-order.repository.js';
import { EcomRepository } from '../modules/ecommerce/infrastructure/in-memory-ecom.repository.js';
import { TroubleRepository } from '../modules/trouble/infrastructure/in-memory-trouble.repository.js';
import { PickupRepository } from '../modules/pickup/infrastructure/in-memory-pickup.repository.js';
import { AddressBookRepository } from '../modules/address-book/infrastructure/in-memory-address.repository.js';
import { NotificationRepository } from '../modules/notifications/infrastructure/in-memory-notification.repository.js';
import { HeuristicAiService } from '../modules/ai-assistant/infrastructure/heuristic-parser.service.js';
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
export declare function createModularApi(repos: AppRepositories): Router;
