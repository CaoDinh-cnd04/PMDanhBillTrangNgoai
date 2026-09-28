import { Router } from 'express';
import { OrderRepository } from '../infrastructure/in-memory-order.repository.js';
export declare function createOrderRouter(repo: OrderRepository): Router;
