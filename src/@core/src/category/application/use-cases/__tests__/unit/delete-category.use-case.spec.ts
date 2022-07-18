import { DeleteCategoryUseCase } from "../../delete-category.use-case";
import CategoryInMemoryRepository from "../../../../infra/db/in-memory/category-in-memory.repository";
import NotFoundError from "../../../../../@seedwork/domain/errors/not-found.error";
import { Category } from "../../../../domain/entities/category";

describe('DeleteCategoryUseCase Unit Tests', () => {
    let useCase: DeleteCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity is not found', async () => {
        await expect(() => useCase.execute({ id: 'fake id' }))
            .rejects.toThrow(
                new NotFoundError(`Entity not found with ID fake id`)
            );
    });

    it('should delete a category', async () => {
        const spyUpdate = jest.spyOn(repository, "delete");
        const entity = new Category({ name: 'Movie' });
        repository.items = [entity];
        await useCase.execute({ id: entity.id });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(repository.items).toHaveLength(0);
    });
})
