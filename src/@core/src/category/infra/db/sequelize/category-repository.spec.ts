import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { CategorySequelizeRepository } from "./category-repository";
import { Category, CategoryRepository } from '#category/domain';
import { UniqueEntityId, NotFoundError } from "#seedwork/domain";
import { setupSequelize } from "../../../../@seedwork/infra/testing/helpers/db";
import _chance from 'chance';
import { CategoryModelMapper } from "./category-mapper";

const chance = _chance();

describe('CategorySequelizeRepository Unit Tests', () => {

    setupSequelize({ models: [CategoryModel] });
    let repository: CategorySequelizeRepository;

    beforeEach(async () => {
        repository = new CategorySequelizeRepository(CategoryModel);
    });

    it('should insert a new entity', async () => {
        let category = new Category({ name: "Movie" });
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
    });

    it('should throw error when entity is not found', async () => {
        await expect(repository.findById('fake id')).rejects.toThrow(
            new NotFoundError('Entity not found with ID fake id')
        );

        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        await expect(repository.findById(uuid)).rejects.toThrow(
            new NotFoundError(`Entity not found with ID ${uuid}`)
        );
    });

    it('should find an entity by id', async () => {
        const entity = new Category({ name: "Movie" });
        await repository.insert(entity);

        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    it('should return all categories', async () => {
        const entity = new Category({ name: "Movie" });
        await repository.insert(entity);

        const entities = await repository.findAll();
        expect(entities).toHaveLength(1);
        expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
    });

    describe('search method tests', () => {
        it('should apply paginate when search params are null', async () => {
            const created_at = new Date();
            await CategoryModel.factory()
                .count(16)
                .bulkCreate(() => ({
                    id: chance.guid({ version: 4 }),
                    name: 'Movie',
                    description: null,
                    is_active: true,
                    created_at
                }));
            const spyToEntity = jest.spyOn(CategoryModelMapper, 'toEntity');

            const searchOutput = await repository.search(
                new CategoryRepository.SearchParams()
            );
            expect(searchOutput).toBeInstanceOf(CategoryRepository.SearchResult);
            expect(spyToEntity).toHaveBeenCalledTimes(15);
            expect(searchOutput.toJSON()).toMatchObject({
                total: 16,
                current_page: 1,
                last_page: 2,
                per_page: 15,
                sort: null,
                sort_dir: null,
                filter: null
            });
            searchOutput.items.forEach(item => {
                expect(item).toBeInstanceOf(Category);
                expect(item.id).toBeDefined();
            });
            const items = searchOutput.items.map((item) => item.toJSON());
            expect(items).toMatchObject(
                new Array(15).fill({
                    name: 'Movie',
                    description: null,
                    is_active: true,
                    created_at
                })
            );
        });

        it('should order by created_at DESC when search params are null', async () => {
            const created_at = new Date();
            await CategoryModel.factory()
                .count(16)
                .bulkCreate((index) => ({
                    id: chance.guid({ version: 4 }),
                    name: `Movie${index}`,
                    description: null,
                    is_active: true,
                    created_at: new Date(created_at.getTime() + 100 * index)
                }));
            const searchOutput = await repository.search(
                new CategoryRepository.SearchParams()
            );
            searchOutput.items.reverse().forEach((item, index) => {
                expect(`${item.name}${index + 1}`);
            });

            // option to avoid typescript errors
            // const items = searchOutput.items;
            // [...items].reverse().forEach((item, index) => {
            //     expect(`${item.name}${index + 1}`);
            // });
        });

        it('should combine paginate and filter', async () => {
            const defaultProps = {
                description: null,
                is_active: true,
                created_at: new Date()
            };

            const categoriesProp = [
                { id: chance.guid({ version: 4 }), name: "test", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "a", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "TEST", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "TeSt", ...defaultProps },
            ];
            const categories = await CategoryModel.bulkCreate(categoriesProp);

            let searchOutput = await repository.search(
                new CategoryRepository.SearchParams({ page: 1, per_page: 2, filter: 'TEST' })
            );
            expect(searchOutput.toJSON(true)).toMatchObject(
                new CategoryRepository.SearchResult({
                    items: [
                        CategoryModelMapper.toEntity(categories[0]),
                        CategoryModelMapper.toEntity(categories[2])
                    ],
                    total: 3,
                    current_page: 1,
                    per_page: 2,
                    sort: null,
                    sort_dir: null,
                    filter: 'TEST',
                }).toJSON(true)
            );

            searchOutput = await repository.search(
                new CategoryRepository.SearchParams({ page: 2, per_page: 2, filter: 'TEST' })
            );
            expect(searchOutput.toJSON(true)).toMatchObject(
                new CategoryRepository.SearchResult({
                    items: [CategoryModelMapper.toEntity(categories[3])],
                    total: 3,
                    current_page: 2,
                    per_page: 2,
                    sort: null,
                    sort_dir: null,
                    filter: 'TEST'
                }).toJSON(true)
            );
        });

        it('should combine paginate and sort', async () => {
            expect(repository.sortableFields).toStrictEqual(["name", "created_at"]);
            const defaultProps = {
                description: null,
                is_active: true,
                created_at: new Date()
            };

            const categoriesProp = [
                { id: chance.guid({ version: 4 }), name: "b", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "a", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "d", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "e", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "c", ...defaultProps },
            ];
            const categories = await CategoryModel.bulkCreate(categoriesProp);

            const arrange = [
                {
                    params: new CategoryRepository.SearchParams({ page: 1, per_page: 2, sort: 'name' }),
                    result: new CategoryRepository.SearchResult({
                        items: [
                            CategoryModelMapper.toEntity(categories[1]),
                            CategoryModelMapper.toEntity(categories[0]),
                        ],
                        total: 5,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: null
                    })
                },
                {
                    params: new CategoryRepository.SearchParams({ page: 2, per_page: 2, sort: 'name' }),
                    result: new CategoryRepository.SearchResult({
                        items: [
                            CategoryModelMapper.toEntity(categories[4]),
                            CategoryModelMapper.toEntity(categories[2]),
                        ],
                        total: 5,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: null
                    })
                },
                {
                    params: new CategoryRepository.SearchParams({ page: 1, per_page: 2, sort: 'name', sort_dir: "desc" }),
                    result: new CategoryRepository.SearchResult({
                        items: [
                            CategoryModelMapper.toEntity(categories[3]),
                            CategoryModelMapper.toEntity(categories[2]),
                        ],
                        total: 5,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'desc',
                        filter: null
                    })
                },
                {
                    params: new CategoryRepository.SearchParams({ page: 2, per_page: 2, sort: 'name', sort_dir: "desc" }),
                    result: new CategoryRepository.SearchResult({
                        items: [
                            CategoryModelMapper.toEntity(categories[4]),
                            CategoryModelMapper.toEntity(categories[0]),
                        ],
                        total: 5,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'desc',
                        filter: null
                    })
                },
            ];

            for (const i of arrange) {
                let searchOutput = await repository.search(new CategoryRepository.SearchParams(i.params));
                expect(searchOutput.toJSON(true)).toMatchObject(i.result.toJSON(true))
            }
        });

        it('should combine paginate, sort and filter', async () => {
            const defaultProps = {
                description: null,
                is_active: true,
                created_at: new Date()
            };

            const categoriesProp = [
                { id: chance.guid({ version: 4 }), name: "test", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "a", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "TEST", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "e", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "TeSt", ...defaultProps },
            ];
            const categories = await CategoryModel.bulkCreate(categoriesProp);

            const arrange = [
                {
                    params: new CategoryRepository.SearchParams({ page: 1, per_page: 2, sort: 'name', filter: 'TEST' }),
                    result: new CategoryRepository.SearchResult({
                        items: [
                            CategoryModelMapper.toEntity(categories[2]),
                            CategoryModelMapper.toEntity(categories[4])
                        ],
                        total: 3,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                },
                {
                    params: new CategoryRepository.SearchParams({ page: 2, per_page: 2, sort: 'name', filter: 'TEST' }),
                    result: new CategoryRepository.SearchResult({
                        items: [CategoryModelMapper.toEntity(categories[0])],
                        total: 3,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                },
            ];

            for (const i of arrange) {
                let result = await repository.search(new CategoryRepository.SearchParams(i.params));
                expect(result.toJSON(true)).toMatchObject(i.result.toJSON(true))
            }
        });

        describe('should combine paginate, sort and filter with test.each()', () => {
            const defaultProps = {
                description: null,
                is_active: true,
                created_at: new Date()
            };
            const categoriesProps = [
                { id: chance.guid({ version: 4 }), name: "test", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "a", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "TEST", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "e", ...defaultProps },
                { id: chance.guid({ version: 4 }), name: "TeSt", ...defaultProps },
            ];
            let arrange = [
                {
                    search_params: new CategoryRepository.SearchParams({
                        page: 1,
                        per_page: 2,
                        sort: 'name',
                        filter: 'TEST'
                    }),
                    search_result: new CategoryRepository.SearchResult({
                        items: [
                            new Category(categoriesProps[2]), 
                            new Category(categoriesProps[4])
                        ],
                        total: 3,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                },
                {
                    search_params: new CategoryRepository.SearchParams({ page: 2, per_page: 2, sort: 'name', filter: 'TEST' }),
                    search_result: new CategoryRepository.SearchResult({
                        items: [new Category(categoriesProps[0])],
                        total: 3,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                },
            ];

            beforeEach(async () => {
                await CategoryModel.bulkCreate(categoriesProps);
            });

            test.each(arrange)(
                'when values is %j',        // 'when values is $search_params'
                async ({ search_params, search_result }) => {
                    let result = await repository.search(search_params);
                    expect(result.toJSON(true)).toMatchObject(search_result.toJSON(true))
                })
        });

    });
});