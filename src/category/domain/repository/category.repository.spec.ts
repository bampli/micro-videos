import { Category } from "../entities/category";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import { SearchParams, SearchResult } from "../../../@seedwork/domain/repository/repository-contracts";

// exercise to evaluate mixing parameters
// apply sort by 'created_at' when filter param is null

class StubInMemorySearchableCategoryRepository extends InMemorySearchableRepository<Category> {

    sortableFields: string[] = ['name', 'created_at'];

    protected async applyFilter(
        items: Category[],
        filter: string | null
    ): Promise<Category[]> {
        if (!filter) {
            return this.applySort(items, 'created_at', 'desc');
        }

        return items.filter((i) => {
            return (i.props.name.toLowerCase().includes(filter.toLowerCase()));
        });
    };
};

describe('InMemorySearchableCategoryRepository Unit Tests', () => {
    let repository: StubInMemorySearchableCategoryRepository;
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    beforeEach(() => (
        repository = new StubInMemorySearchableCategoryRepository())
    );

    describe('applyFilter method', () => {
        it('should sort by created_at when filter param is null', async () => {
            const items = [
                new Category({ name: "name value", created_at: yesterday }),
                new Category({ name: "name value", created_at: today })
            ];
            const itemsFiltered = await repository['applyFilter'](items, null);
            expect(itemsFiltered).toStrictEqual([items[1], items[0]]);
        });

        it('should filter by a filter param', async () => {
            const items = [
                new Category({ name: "test" }),
                new Category({ name: "TEST" }),
                new Category({ name: "fake" }),
            ];
            const spyFilterMethod = jest.spyOn(items, 'filter' as any);

            let itemsFiltered = await repository['applyFilter'](items, 'TEST');
            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);

            itemsFiltered = await repository['applyFilter'](items, 'no-filter');
            expect(itemsFiltered).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);
        });
    });
});