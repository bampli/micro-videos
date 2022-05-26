import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";

describe('CategoryModel Unit Tests', () => {
    let sequelize: Sequelize;

    // init connection, create table before each test & disconnect
    beforeAll(() => sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory',
        logging: false,         // show db logs at tests
        models: [CategoryModel],
    }));

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close()
    });

    test('create', async () => {
        const arrange = {
            id: '957334c5-91b9-4986-9b43-0d42f2edfbe9',
            name: 'test',
            is_active: true,
            created_at: new Date()
        };
        const category = await CategoryModel.create(arrange);
        expect(category.toJSON()).toStrictEqual(arrange);
    })

    it('anything', () => {

    })
});