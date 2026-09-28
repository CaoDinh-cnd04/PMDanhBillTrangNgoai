import { Entity } from '../domain/entity.base.js';

export interface IRepository<T extends Entity<unknown>> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}

export abstract class BaseInMemoryRepository<T extends Entity<unknown>> implements IRepository<T> {
  protected items: Map<string, T> = new Map();

  async findById(id: string): Promise<T | null> {
    const item = this.items.get(id);
    return item ? item : null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async save(entity: T): Promise<void> {
    entity.updatedAt = new Date();
    this.items.set(entity.id, entity);
  }

  async delete(id: string): Promise<void> {
    this.items.delete(id);
  }

  async clear(): Promise<void> {
    this.items.clear();
  }

  async count(): Promise<number> {
    return this.items.size;
  }
}
