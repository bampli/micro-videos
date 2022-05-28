import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { CategorySequelizeRepository } from "./category-repository";
import { Category } from '#category/domain';

describe('CategorySequelizeRepository Unit Tests', () => {
    let sequelize: Sequelize;
    let repository: CategorySequelizeRepository;

    // init connection, create table before each test & disconnect
    beforeAll(() => sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory',
        logging: false,         // show db logs at tests
        models: [CategoryModel],
    }));

    beforeEach(async () => {
        repository = new CategorySequelizeRepository(CategoryModel);
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close()
    });

    it('should insert a new entity', async () => {
        let category = new Category({name: "Movie"});
        await repository.insert(category);
        let model = await CategoryModel.findByPk(category.id);
        expect(model.toJSON()).toStrictEqual(category.toJSON());

        category = new Category({
            name: "Movie",
            description: "some description",
            is_active: false
        });
        await repository.insert(category);
        model = await CategoryModel.findByPk(category.id);
        expect(model.toJSON()).toStrictEqual(category.toJSON());
    })
});