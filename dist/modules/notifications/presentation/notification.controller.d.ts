import { Router } from 'express';
import { NotificationRepository } from '../infrastructure/in-memory-notification.repository.js';
export declare function createNotificationRouter(repo: NotificationRepository): Router;
