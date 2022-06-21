import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Sequelize,
    Table
} from "sequelize-typescript";
import { SequelizeModelFactory } from './sequelize-model-factory';
import _chance from 'chance';
import { validate as uuidValidate } from 'uuid';
import { setupSequelize } from "../../../@seedwork/infra/testing/helpers/db";

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
        return new SequelizeModelFactory<
            StubModel,
            {id: string; name: string}
        >(StubModel, StubModel.mockFactory);
    }
}

describe('SequelizeModelFactory Unit Tests', () => {

    const sequelize = setupSequelize({
        models: [StubModel],
    });

    test('create method', async () => {
        let model = await StubModel.factory().create();
        expect(uuidValidate(model.id)).toBeTruthy();
        expect(model.id).not.toBeNull();
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

    test('make method', async () => {
        let model = StubModel.factory().make();
        expect(uuidValidate(model.id)).toBeTruthy();
        expect(model.id).not.toBeNull();
        expect(model.name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();

        // repeat with custom data
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        model = StubModel.factory().make({
            id: uuid,
            name: 'test'
        });
        expect(model.id).toBe(uuid);
        expect(model.name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    });

    test('bulkCreate method using count = 1', async () => {
        let models = await StubModel.factory().bulkCreate();
        expect(models).toHaveLength(1);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();
        // get model from DB
        let modelFound = await StubModel.findByPk(models[0].id);
        expect(models[0].id).toBe(modelFound.id);
        expect(models[0].name).toBe(modelFound.name);

        // repeat with custom data
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        models = await StubModel.factory().bulkCreate(() => ({
            id: uuid,
            name: 'test'
        }));
        expect(models).toHaveLength(1);
        expect(models[0].id).toBe(uuid);
        expect(models[0].name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
        modelFound = await StubModel.findByPk(models[0].id);
        expect(models[0].id).toBe(modelFound.id);
        expect(models[0].name).toBe(modelFound.name);
    });

    test('bulkCreate method using count > 1', async () => {
        let models = await StubModel.factory().count(2).bulkCreate();
        expect(models).toHaveLength(2);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(models[1].id).not.toBeNull();
        expect(models[1].name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
        // get model from DB
        let modelFound = await StubModel.findByPk(models[0].id);
        expect(models[0].id).toBe(modelFound.id);
        expect(models[0].name).toBe(modelFound.name);
        modelFound = await StubModel.findByPk(models[1].id);
        expect(models[1].id).toBe(modelFound.id);
        expect(models[1].name).toBe(modelFound.name);

        // repeat with custom data
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        models = await StubModel.factory().count(2).bulkCreate(() => ({
            id: chance.guid({ version: 4 }),
            name: 'test'
        }));
        expect(models).toHaveLength(2);
        expect(models[0].id).not.toBe(models[1].id);
        expect(models[0].name).toBe('test');
        expect(models[1].name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

        modelFound = await StubModel.findByPk(models[0].id);
        expect(models[0].id).toBe(modelFound.id);
        expect(models[0].name).toBe(modelFound.name);
        modelFound = await StubModel.findByPk(models[1].id);
        expect(models[1].id).toBe(modelFound.id);
        expect(models[1].name).toBe(modelFound.name);
    });

    test('bulkMake method using count = 1', async () => {
        let models = StubModel.factory().bulkMake();
        expect(models).toHaveLength(1);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();

        // repeat with custom data
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        models = StubModel.factory().bulkMake(() => ({
            id: uuid,
            name: 'test'
        }));
        expect(models).toHaveLength(1);
        expect(models[0].id).toBe(uuid);
        expect(models[0].name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    });

    test('bulkMake method using count > 1', async () => {
        let models = StubModel.factory().count(2).bulkMake();
        expect(models).toHaveLength(2);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(models[1].id).not.toBeNull();
        expect(models[1].name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

        // repeat with custom data
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        models = StubModel.factory().count(2).bulkMake(() => ({
            id: chance.guid({ version: 4 }),
            name: 'test'
        }));
        expect(models[0].id).not.toBe(models[1].id);
        expect(models[0].name).toBe('test');
        expect(models[1].name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
    });
});