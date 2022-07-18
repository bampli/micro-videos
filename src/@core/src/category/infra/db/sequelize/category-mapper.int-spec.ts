import { Category } from '#category/domain';
import { UniqueEntityId, LoadEntityError, NotFoundError } from "#seedwork/domain";
import { CategorySequelize } from "./category-sequelize";
import { setupSequelize } from "../../../../@seedwork/infra/testing/helpers/db";

const {CategoryModel, CategoryModelMapper} = CategorySequelize;

describe('CategoryModelMapper Unit Tests', () => {

    const sequelize = setupSequelize({
        models: [CategoryModel],
    });
    
    it('should throw error when category is invalid', () => {
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        const model = CategoryModel.build({ id: uuid });
        try {
            CategoryModelMapper.toEntity(model);
            fail('Category is valid, but it was supposed to throw LoadEntityError');
        } catch (e) {
            expect(e).toBeInstanceOf(LoadEntityError);
            expect(e.error).toMatchObject({
                name: [
                    'name should not be empty',
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            })
        }
    });

    it('should throw a generic error', () => {
        const error = new Error("generic Error");
        const spyValidate = jest
            .spyOn(Category, "validate")
            .mockImplementation(() => {
                throw error;
            });

        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        const model = CategoryModel.build({ id: uuid });
        expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
        expect(spyValidate).toHaveBeenCalled();
        spyValidate.mockRestore();  // added here to avoid error at next test
    });

    it('should convert category model to category entity', () => {
        const created_at = new Date();
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        const model = CategoryModel.build({
            id: uuid,
            name: "some name",
            description: "some description",
            is_active: true,
            created_at
        });
        const entity = CategoryModelMapper.toEntity(model);
        expect(entity.toJSON()).toStrictEqual((
            new Category({
                name: "some name",
                description: "some description",
                is_active: true,
                created_at
            },
                new UniqueEntityId(uuid)).toJSON()
        ));
    });

})