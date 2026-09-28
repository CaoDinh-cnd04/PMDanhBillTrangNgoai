/**
 * Base Entity class for domain model entities.
 */
export class Entity {
    _id;
    props;
    createdAt;
    updatedAt;
    constructor(props, id, createdAt, updatedAt) {
        this._id = id ?? Entity.generateId();
        this.props = props;
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }
    get id() {
        return this._id;
    }
    equals(object) {
        if (object == null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        return this._id === object._id;
    }
    static generateId() {
        return 'id_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    }
}
/**
 * AggregateRoot class for roots of bounded context aggregates.
 */
export class AggregateRoot extends Entity {
    _domainEvents = [];
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
    }
    clearEvents() {
        this._domainEvents = [];
    }
}
//# sourceMappingURL=entity.base.js.map