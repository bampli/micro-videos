import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface, SearchableRepositoryInterface, SearchParams, SearchResult } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
    implements RepositoryInterface<E>
{
    items: E[] = [];

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async findAll(): Promise<E[]> {
        return this.items;
    }

    async findById(id: string | UniqueEntityId): Promise<E> {
        const _id = `${id}`;
        return this._get(_id);
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

    // To speed up update & delete for big arrays
    // _getIndex option does 'this.items' search just once

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

export abstract class InMemorySearchableRepository<E extends Entity>
    extends InMemoryRepository<E>
    implements SearchableRepositoryInterface<E>{

    async search(props: SearchParams): Promise<SearchResult<E>> {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);
        const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page);

        return new SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter
        });
    }

    protected abstract applyFilter(
        items: E[],
        filter: string | null
    ): Promise<E[]>;

    protected abstract async applySort(
        items: E[],
        sort: string | null,
        sort_dir: string | null
    ): Promise<E[]> { }

    protected abstract async applyPaginate(
        items: E[],
        page: SearchParams["page"],
        per_page: SearchParams["per_page"]
    ): Promise<E[]> { }

    // protected abstract applyFilter(items: E[], filter: SearchParams['filter']): Promise<E[]>;
    // protected abstract applySort(items: E[], sort: SearchParams['sort']): Promise<E[]>;
}

// this extension would also be useful to implement soft delete
// no need to change the existing implementation
// use typescript mixin, like a plug-in?
