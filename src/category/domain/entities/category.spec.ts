import {Category} from './category';
describe('Category Unit Tests', () : void => {
    test('category constructor', () => {
        const category = new Category('Movie');
        expect(category.name).toBe('Movie');
    })
});

// CI does:
//  'unit tests'
//  'integration tests'
//  'end to end tests'

// end to end API REST file.e2e.ts
// since client request until UI answer

