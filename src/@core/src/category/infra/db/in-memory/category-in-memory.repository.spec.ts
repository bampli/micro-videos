import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe('InMemorySearchableCategoryRepository Unit Tests', () => {
    let repository: CategoryInMemoryRepository;
    const today = new Date();

    beforeEach(() => (
        repository = new CategoryInMemoryRepository())
    );

    describe('applyFilter method', () => {
        it('should sort by created_at when filter param is null', async () => {
            const items = [
                new Category({ name: "name value" }),
                new Category({ name: "name value" })
            ];
            const filterSpy = jest.spyOn(items, "filter" as any);
            let itemsFiltered = await repository['applyFilter'](items, null);
            expect(itemsFiltered).toStrictEqual(items);
            expect(filterSpy).not.toHaveBeenCalled();
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

        it('should sort by created_at when sort param is null', async () => {
            const items = [
                new Category({
                    name: "test1",
                    created_at: today
                }),
                new Category({
                    name: "test2",
                    created_at: new Date(today.getTime() + 1000)
                }),
                new Category({
                    name: "test3",
                    created_at: new Date(today.getTime() + 2000)
                }),
            ];
            let itemsSorted = await repository['applySort'](items, null, null);
            expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
        });

        it('should sort with sort/sort_dir params', async () => {
            const items = [
                new Category({ name: "b" }),
                new Category({ name: "a" }),
                new Category({ name: "c" }),
            ];

            let itemsSorted = await repository['applySort'](items, "name", "asc");
            expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

            itemsSorted = await repository['applySort'](items, "name", "desc");
            expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
        });
    });
});