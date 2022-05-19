import GetCategoryUseCase from "../get-category.use-case";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import { Category } from "../../../domain/entities/category";

describe('GetCategoryUseCase Unit Tests', () => {
    let useCase: GetCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryUseCase(repository);
    });

    it('should throw error when entity is not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
            new NotFoundError(`Entity not found with ID fake id`)
        );
    });

    it('should return a category', async () => {
        const items = [
            new Category({name: 'Movie'})
        ];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, "findById");
        let output = await useCase.execute({id: items[0].id});
        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: items[0].id,
            name: "Movie",
            description: null,
            is_active: true,
            created_at: items[0].created_at
        });
    });
})