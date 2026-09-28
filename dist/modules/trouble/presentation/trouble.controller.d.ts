import { Router } from 'express';
import { TroubleRepository } from '../infrastructure/in-memory-trouble.repository.js';
export declare function createTroubleRouter(repo: TroubleRepository): Router;
