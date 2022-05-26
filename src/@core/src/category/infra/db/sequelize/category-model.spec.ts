import { DataType, Sequelize } from "sequelize-typescript";
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

    test('mapping props', async () => {
        const attributesMap = CategoryModel.getAttributes();
        //console.log(attributesMap);
        const attributes = Object.keys(CategoryModel.getAttributes());
        expect(attributes).toStrictEqual([
            'id',
            'name',
            'description',
            'is_active',
            'created_at'
        ]);

        const idAttr = attributesMap.id;
        expect(idAttr).toMatchObject({
            field: 'id',
            fieldName: 'id',
            primaryKey: true,
            type: DataType.UUID()
        });

        const nameAttr = attributesMap.name;
        expect(nameAttr).toMatchObject({
            field: 'name',
            fieldName: 'name',
            allowNull: false,
            type: DataType.STRING(255)
        });

        const descriptionAttr = attributesMap.description;
        expect(descriptionAttr).toMatchObject({
            field: 'description',
            fieldName: 'description',
            allowNull: true,
            type: DataType.TEXT()
        });

        const isActiveAttr = attributesMap.is_active;
        expect(isActiveAttr).toMatchObject({
            field: 'is_active',
            fieldName: 'is_active',
            allowNull: false,
            type: DataType.BOOLEAN()
        });

        const createdAtAttr = attributesMap.created_at;
        expect(createdAtAttr).toMatchObject({
            field: 'created_at',
            fieldName: 'created_at',
            allowNull: false,
            type: DataType.DATE()
        });
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
    });
});

// console.log(attributesMap);
// {
//     id: {
//       type: UUID {},
//       primaryKey: true,
//       Model: CategoryModel,
//       fieldName: 'id',
//       _modelAttribute: true,
//       field: 'id'
//     },
//     name: {
//       allowNull: false,
//       type: STRING { options: [Object], _binary: undefined, _length: 255 },
//       Model: CategoryModel,
//       fieldName: 'name',
//       _modelAttribute: true,
//       field: 'name'
//     },
//     description: {
//       allowNull: true,
//       type: TEXT { options: [Object], _length: '' },
//       Model: CategoryModel,
//       fieldName: 'description',
//       _modelAttribute: true,
//       field: 'description'
//     },
//     is_active: {
//       allowNull: false,
//       type: BOOLEAN {},
//       Model: CategoryModel,
//       fieldName: 'is_active',
//       _modelAttribute: true,
//       field: 'is_active'
//     },
//     created_at: {
//       allowNull: false,
//       type: DATE { options: [Object], _length: '' },
//       Model: CategoryModel,
//       fieldName: 'created_at',
//       _modelAttribute: true,
//       field: 'created_at'
//     }
//   }