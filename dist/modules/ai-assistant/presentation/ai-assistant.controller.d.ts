import { Router } from 'express';
import { HeuristicAiService } from '../infrastructure/heuristic-parser.service.js';
export declare function createAiAssistantRouter(service: HeuristicAiService): Router;
