import {Category} from './category';
describe('Category Integration Tests', () : void => {
    test('category constructor', () => {
        const category = new Category('Movie');
        expect(category.name).toBe('Movie');
    })
});

// CI does 'unit tests' then 'integration tests'

