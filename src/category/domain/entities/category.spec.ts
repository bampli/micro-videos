import {Category} from './category';
describe('Category Tests', () : void => {
    test('category constructor', () => {
        const category = new Category('Movie');
        expect(category.name).toBe('Movie');
    })
});

