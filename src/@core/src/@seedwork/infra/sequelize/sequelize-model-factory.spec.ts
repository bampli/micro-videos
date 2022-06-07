import { Column, DataType, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { SequelizeModelFactory } from './sequelize-model-factory';
import _chance from 'chance';
import { validate as uuidValidate } from 'uuid';

const chance = _chance();

@Table({})
class StubModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name;

    static mockFactory = jest.fn(() => ({
        id: chance.guid({ version: 4 }),
        name: chance.word(),
    }));

    static factory() {
        //const chance: Chance.Chance = require('chance')();
        return new SequelizeModelFactory(StubModel, StubModel.mockFactory);
    }
}

describe('SequelizeModelFactory Unit Tests', () => {

    let sequelize: Sequelize;

    beforeAll(() => sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory',
        logging: false,         // show db logs at tests
        models: [StubModel],
    }));

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close()
    });


    test('create method', async () => {
        let model = await StubModel.factory().create();
        expect(uuidValidate(model.id)).toBeTruthy();
        expect(model.name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();
        // get model from DB
        let modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);
        
        // repeat with custom data
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        model = await StubModel.factory().create({
            id: uuid,
            name: 'test'
        });
        expect(model.id).toBe(uuid);
        expect(model.name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
        modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);
    });
});