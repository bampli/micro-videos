import { GetCategoryUseCase } from "../../get-category.use-case";
import NotFoundError from "../../../../../@seedwork/domain/errors/not-found.error";
import { Category } from "../../../../domain/entities/category";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe('GetCategoryUseCase Integration Tests', () => {
    let useCase: GetCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] });

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new GetCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity is not found', async () => {
        await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
            new NotFoundError(`Entity not found with ID fake id`)
        );
    });

    it('should return a category', async () => {
        const model = await CategoryModel.factory().create();
        let output = await useCase.execute({ id: model.id });
        expect(output).toStrictEqual({
            id: model.id,
            name: model.name,
            description: model.description,
            is_active: model.is_active,
            created_at: model.created_at
        });
    });
})