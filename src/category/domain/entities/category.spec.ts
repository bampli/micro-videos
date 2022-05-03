import {Category} from './category';
import {omit} from 'lodash';

describe('Category Unit Tests', () => {
    test('category constructor', () => {
        let category: Category = new Category({name: 'Movie'});
        let props = omit(category.props, 'created_at');
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
            is_active: false
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
});

// CI does:
//  'unit tests'
//  'integration tests'
//  'end to end tests'

// end to end API REST file.e2e.ts
// since client request until UI answer

