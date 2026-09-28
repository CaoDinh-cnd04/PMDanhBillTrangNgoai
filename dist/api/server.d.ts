import { Express } from 'express';
import { AppRepositories } from './routes.js';
export declare function createApp(): {
    app: Express;
    repos: AppRepositories;
};
