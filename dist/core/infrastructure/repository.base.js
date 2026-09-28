export class BaseInMemoryRepository {
    items = new Map();
    async findById(id) {
        const item = this.items.get(id);
        return item ? item : null;
    }
    async findAll() {
        return Array.from(this.items.values());
    }
    async save(entity) {
        entity.updatedAt = new Date();
        this.items.set(entity.id, entity);
    }
    async delete(id) {
        this.items.delete(id);
    }
    async clear() {
        this.items.clear();
    }
    async count() {
        return this.items.size;
    }
}
//# sourceMappingURL=repository.base.js.map