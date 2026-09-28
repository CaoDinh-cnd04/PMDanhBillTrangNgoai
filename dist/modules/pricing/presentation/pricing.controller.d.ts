import { Router } from 'express';
import { PricingRepository } from '../infrastructure/in-memory-pricing.repository.js';
export declare function createPricingRouter(repo: PricingRepository): Router;
