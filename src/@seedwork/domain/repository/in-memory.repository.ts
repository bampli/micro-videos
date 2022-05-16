import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository-contracts";

export default abstract class InMemoryRepository<E extends Entity>
    implements RepositoryInterface<E>
{
    items: E[] = [];

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async findById(id: string | UniqueEntityId): Promise<E> {
        const _id = `${id}`;
        return this._get(_id);
    }

    async findAll(): Promise<E[]> {
        return this.items;
    }

    async update(entity: E): Promise<void> {
        await this._get(entity.id);
        const indexFound = this.items.findIndex(i => i.id === entity.id);
        this.items[indexFound] = entity;
    }

    async delete(id: string | UniqueEntityId): Promise<void> {
        const _id = `${id}`;
        await this._get(_id);
        const indexFound = this.items.findIndex(i => i.id === _id);
        this.items.splice(indexFound, 1);
    }

    protected async _get(id: string): Promise<E> {
        const item = this.items.find(i => i.id === id);
        if (!item) {
            throw new NotFoundError(`Entity not found with ID ${id}`);
        }
        return item;
    }

    // async findById(id: string | UniqueEntityId): Promise<E> {
    //     const _id = `${id}`;
    //     const indexFound = await this._getIndex(_id);
    //     return this.items[indexFound];
    // }

    // async update(entity: E): Promise<void> {        
    //     const indexFound = await this._getIndex(entity.id);
    //     this.items[indexFound] = entity;
    // }

    // async delete(id: string | UniqueEntityId): Promise<void> {
    //     const _id = `${id}`;
    //     const indexFound = await this._getIndex(_id);
    //     this.items.splice(indexFound, 1);
    // }

    // protected async _getIndex(id: string): Promise<number> {
    //     const indexFound = this.items.findIndex(i => i.id === id);
    //     if (!this.items[indexFound]) {
    //         throw new NotFoundError(`Entity not found with ID ${id}`);
    //     }
    //     return indexFound;
    // }
}

// Option with _getIndex does 'this.items' search just once in update & delete
// Same tests timing for both:
// InMemoryRepository Unit Tests
// ✓ should insert a new entity (6 ms)
// ✓ should throw errors when entity is not found (11 ms)
// ✓ should throw errors when entity is not found (2 ms)
// ✓ should find an entity by id (2 ms)
// ✓ should return all entities (1 ms)
// ✓ should throw errors on update when entity is not found (2 ms)
// ✓ should update an entity (2 ms)
// ✓ should throw errors on delete when entity is not found (2 ms)
// ✓ should delete an entity (3 ms)
