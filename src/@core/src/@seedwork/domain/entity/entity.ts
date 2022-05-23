import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export default abstract class Entity<Props = any>{
    public readonly uniqueEntityId: UniqueEntityId;

    constructor(public readonly props: Props, id?: UniqueEntityId) {
        this.uniqueEntityId = id || new UniqueEntityId();
    };

    get id(): string {
        return this.uniqueEntityId.value;
    }

    toJSON(): Required<{ id: string } & Props> {
        return {
            id: this.id,
            ...this.props,
        } as Required<{ id: string } & Props>;
    }
}

// Props should be explicitly declared 'any': Entity<Props = any>
// if 'any' is missing, 'consumer' classes would require Props type declaration
//  1: export interface RepositoryInterface<E extends Entity> 
//  2: export default abstract class InMemoryRepository<E extends Entity>
// error:  Generic type 'Entity<Props>' requires 1 type argument(s).
// solution: with any, compilers do not complain about Props type
