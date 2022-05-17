import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import { InMemorySearchableRepository } from "../in-memory.repository";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps>{ }

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {

    sortableFields: string[] = ['name'];

    protected async applyFilter(items: StubEntity[], filter: string): Promise<StubEntity[]> {
        if (!filter) {
            return items;
        }

        return items.filter((i) => {
            return (i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
                i.props.price.toString() === filter
            );
        });
    };
};

describe('InMemorySearchableRepository Unit Tests', () => {
    let repository: StubInMemorySearchableRepository;

    beforeEach(() => (
        repository = new StubInMemorySearchableRepository())
    );

    describe('applyFilter method', () => {
    });

    describe('applySort method', () => {
    });

    describe('applyPaginate method', () => {
    });

    describe('search method', () => {
    });
});