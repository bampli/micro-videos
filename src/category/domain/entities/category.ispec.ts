import {Category} from './category';
describe('Category Integration Tests', () : void => {
    test('category constructor', () => {
        const props = {
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at: new Date,
        };
        // Act
        const category: Category = new Category(props);
        expect(category.name).toBe('Movie');
    })
});

// CI does 'unit tests' then 'integration tests'

