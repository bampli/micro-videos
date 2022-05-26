import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";

describe('CategoryModel Unit Tests', () => {
    let sequelize: Sequelize;

    // init connection, create table before each test & disconnect
    beforeAll(() => sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory',
        logging: true,
        models: [CategoryModel],
    }));

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close()
    });

    it('anything', () => {

    })
});