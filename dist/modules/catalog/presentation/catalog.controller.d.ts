import { Router } from 'express';
import { CatalogRepository } from '../infrastructure/in-memory-catalog.repository.js';
export declare function createCatalogRouter(repo: CatalogRepository): Router;
