/**
 * Base Entity class for domain model entities.
 */
export declare abstract class Entity<T> {
    protected readonly _id: string;
    readonly props: T;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(props: T, id?: string, createdAt?: Date, updatedAt?: Date);
    get id(): string;
    equals(object?: Entity<T>): boolean;
    protected static generateId(): string;
}
/**
 * AggregateRoot class for roots of bounded context aggregates.
 */
export declare abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents;
    get domainEvents(): unknown[];
    protected addDomainEvent(domainEvent: unknown): void;
    clearEvents(): void;
}
