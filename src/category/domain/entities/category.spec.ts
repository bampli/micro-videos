import { Category, CategoryProperties } from './category';
import { omit } from 'lodash';
import UniqueEntityId from '#seedwork/domain/value-objects/unique-entity-id.vo';

describe('Category Unit Tests', () => {
    beforeEach(() => {
        Category.validate = jest.fn();  // mock validate at unit tests
    });
    test('category constructor', () => {
        let category: Category = new Category({ name: 'Movie' });
        let props = omit(category.props, 'created_at');
        expect(Category.validate).toHaveBeenCalled();
        expect(props).toStrictEqual({
            name: 'Movie',
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({
            name: 'Movie',
            description: "some description",
            is_active: false,
            created_at
        });
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: "some description",
            is_active: false,
            created_at
        });

        category = new Category({
            name: 'Movie',
            description: "other description",
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: "other description",
        });
        category = new Category({
            name: 'Movie',
            is_active: true,
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            is_active: true,
        });
        created_at = new Date();
        category = new Category({
            name: 'Movie',
            created_at
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            created_at
        });
    });

    test('id prop', () => {
        type CategoryData = {props: CategoryProperties, id?: UniqueEntityId};
        const data: CategoryData[] = [
            { props: { name: 'Movie' } },
            { props: { name: 'Movie' }, id: null },
            { props: { name: 'Movie' }, id: undefined },
            { props: { name: 'Movie' }, id: new UniqueEntityId() },
        ];

        data.forEach(i => {
            const category = new Category(i.props, i.id);
            expect(category.id).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        });
    });

    test('getter & setter name prop', () => {
        const category = new Category({ name: 'Movie' });
        expect(category.name).toBe('Movie');

        category["name"] = "another name";
        expect(category.name).toBe("another name");
    });

    test('getter & setter description prop', () => {
        let category = new Category({ name: 'Movie' });
        expect(category.description).toBeNull();

        category = new Category({ name: 'Movie', description: 'some description' });
        expect(category.description).toBe('some description');

        category = new Category({ name: 'Movie' });

        category['description'] = "aaaaaa";
        expect(category.description).toBe('aaaaaa');

        category['description'] = undefined;
        expect(category.description).toBeNull();
    });

    test('getter & setter is_active prop', () => {
        let category = new Category({ name: 'Movie' });

        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: 'Movie',
            is_active: true
        });
        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: 'Movie',
            is_active: false
        });
        expect(category.is_active).toBeFalsy();
    });

    test('getter & setter created_at prop', () => {
        let category = new Category({ name: 'Movie' });

        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({
            name: 'Movie',
            created_at
        });
        expect(category.created_at).toBe(created_at);
    });

    it('should activate a category', () => {
        const category = new Category({
            name: 'Movie',
            is_active: false,
        });
        category.activate();
        expect(category.is_active).toBeTruthy();
    });

    it('should deactivate a category', () => {
        const category = new Category({
            name: 'Movie',
            is_active: true,
        });
        category.deactivate();
        expect(category.is_active).toBeFalsy();
    });

    it('should update a category', () => {
        const category = new Category({ name: 'Movie' });
        category.update("Documentary", "some description");
        expect(Category.validate).toHaveBeenCalledTimes(2); // at constructor & update
        expect(category.name).toBe("Documentary");
        expect(category.description).toBe("some description");
    })
});

// CI does:
//  'unit tests'
//  'integration tests'
//  'end to end tests'

// end to end API REST file.e2e.ts
// since client request until UI answer

// Test tools
//  - stub: fake object
//  - spyOn: spy a variable, class or method
//  - mock: fake object with expectations