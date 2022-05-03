import {Category} from './category';
describe('Category Unit Tests', () : void => {
    test('category constructor', () => {
        const created_at = new Date;
        const category: Category = new Category({
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at,
        });

        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at,
        });
    })
});

// CI does:
//  'unit tests'
//  'integration tests'
//  'end to end tests'

// end to end API REST file.e2e.ts
// since client request until UI answer

