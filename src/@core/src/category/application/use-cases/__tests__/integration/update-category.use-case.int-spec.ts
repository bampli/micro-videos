import { UpdateCategoryUseCase } from "../../update-category.use-case";
import NotFoundError from "../../../../../@seedwork/domain/errors/not-found.error";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

const { CategoryRepository, CategoryModel, CategoryModelMapper } = CategorySequelize;

describe('UpdateCategoryUseCase Integration Tests', () => {
    let useCase: UpdateCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] });

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new UpdateCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity is not found', async () => {
        await expect(() => useCase.execute({ id: 'fake id', name: 'fake' }))
            .rejects.toThrow(
                new NotFoundError(`Entity not found with ID fake id`)
            );
    });

    it('should update a category', async () => {
        const model = await CategoryModel.factory().create();
        
        let output = await useCase.execute({ id: model.id, name: "test" });
        expect(output).toStrictEqual({
            id: model.id,
            name: "test",
            description: null,
            is_active: true,
            created_at: model.created_at
        });

        type Arrange = {
            input: { id: string, name: string, description?: null | string, is_active?: boolean },
            expected: { id: string, name: string, description: null | string, is_active: boolean, created_at: Date },
        }

        const arrange: Arrange[] = [
            {
                input: {
                    id: model.id,
                    name: "test",
                    description: "some description"
                },
                expected: {
                    id: model.id,
                    name: "test",
                    description: "some description",    // changed description
                    is_active: true,
                    created_at: model.created_at
                }
            },
            {
                input: {
                    id: model.id,
                    name: "test",
                },
                expected: {
                    id: model.id,
                    name: "test",
                    description: null,      // description should be null again!
                    is_active: true,
                    created_at: model.created_at
                }
            },
            {
                input: {
                    id: model.id,
                    name: "test",
                    is_active: false
                },
                expected: {
                    id: model.id,
                    name: "test",
                    description: null,
                    is_active: false,       // should deactivate!
                    created_at: model.created_at
                }
            },
            {
                input: {
                    id: model.id,
                    name: "test",
                },
                expected: {
                    id: model.id,
                    name: "test",
                    description: null,
                    is_active: false,       // should keep false!
                    created_at: model.created_at
                }
            },
            {
                input: {
                    id: model.id,
                    name: "test",
                    is_active: true
                },
                expected: {
                    id: model.id,
                    name: "test",
                    description: null,
                    is_active: true,       // should activate!
                    created_at: model.created_at
                }
            },
            {
                input: {
                    id: model.id,
                    name: "test",
                    description: "some description",
                    is_active: false
                },
                expected: {
                    id: model.id,
                    name: "test",
                    description: "some description",
                    is_active: false,       // should deactivate!
                    created_at: model.created_at
                }
            }
        ];

        for (const i of arrange) {
            output = await useCase.execute(i.input);
            expect(output).toStrictEqual(i.expected);
        }
    });
})

// is_active: testing nasty bugs to handle in the future