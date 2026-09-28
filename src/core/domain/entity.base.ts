/**
 * Base Entity class for domain model entities.
 */
export abstract class Entity<T> {
  protected readonly _id: string;
  public readonly props: T;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: T, id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id ?? Entity.generateId();
    this.props = props;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    return this._id === object._id;
  }

  protected static generateId(): string {
    return 'id_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  }
}

/**
 * AggregateRoot class for roots of bounded context aggregates.
 */
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: unknown[] = [];

  get domainEvents(): unknown[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: unknown): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
