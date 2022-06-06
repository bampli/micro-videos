import { CategoryModel } from "./category-model";
import { Sequelize } from "sequelize-typescript";
import { CategorySequelizeRepository } from "./category-repository";
import { Category } from '#category/domain';
import { UniqueEntityId, LoadEntityError, NotFoundError } from "#seedwork/domain";
import { CategoryModelMapper } from "./category-mapper";


describe('CategoryModelMapper Unit Tests', () => {
    let sequelize: Sequelize;

    beforeAll(() => sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory',
        logging: false,         // show db logs at tests
        models: [CategoryModel],
    }));

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close()
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
    })

})