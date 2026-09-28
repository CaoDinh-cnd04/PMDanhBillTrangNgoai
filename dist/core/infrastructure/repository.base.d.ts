import { Entity } from '../domain/entity.base.js';
export interface IRepository<T extends Entity<unknown>> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
}
export declare abstract class BaseInMemoryRepository<T extends Entity<unknown>> implements IRepository<T> {
    protected items: Map<string, T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
    clear(): Promise<void>;
    count(): Promise<number>;
}
