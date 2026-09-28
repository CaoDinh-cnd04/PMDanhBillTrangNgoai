import { Router } from 'express';
import { PickupRepository } from '../infrastructure/in-memory-pickup.repository.js';
export declare function createPickupRouter(repo: PickupRepository): Router;
