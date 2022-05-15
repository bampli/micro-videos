import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import InMemoryRepository from "./in-memory.repository";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps>{

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {

}

describe('InMemoryRepository Unit Tests', () => {

    let repository: StubInMemoryRepository;
    beforeEach(() => (repository = new StubInMemoryRepository));
    
    it('should inserts a new entity', async () => {
        const entity = new StubEntity({name: "name value", price: 5});
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it('should throw errors when entity is not found', () => {
        expect(repository.findById('fake id')).rejects.toThrow(
            new NotFoundError('Entity not found with ID fake id')
        );
    });

    it('should throw errors when entity is not found', () => {
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        expect(repository.findById(uuid)).rejects.toThrow(
            new NotFoundError(`Entity not found with ID ${uuid}`)
        );
    });
});