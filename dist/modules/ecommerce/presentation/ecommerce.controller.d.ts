import { Router } from 'express';
import { EcomRepository } from '../infrastructure/in-memory-ecom.repository.js';
export declare function createEcomRouter(repo: EcomRepository): Router;
