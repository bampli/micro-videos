import { CategoryPresenter } from './category.presenter';
import { instanceToPlain } from 'class-transformer';
// import {
//   CategoryCollectionPresenter,
//   CollectionPresenter,
// } from '../../@share/presenters/collection.presenter';
// import { PaginationPresenter } from '../../@share/presenters/pagination.presenter';

describe('CategoryPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at,
      });

      expect(presenter.id).toBe('61ba6882-2097-4fd5-8a35-0771bec620e8');
      expect(presenter.name).toBe('movie');
      expect(presenter.description).toBe('some description');
      expect(presenter.is_active).toBeTruthy();
      expect(presenter.created_at).toBe(created_at);
    });

    it('should set presenter', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at,
      });

      const data = instanceToPlain(presenter);
      expect(data).toStrictEqual({
        id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at: created_at.toISOString(),
      });
    });
  });
});

// describe('PaginationPresenter Unit Tests', () => {
//   describe('constructor', () => {
//     it('should set values', () => {
//       const presenter = new PaginationPresenter({
//         current_page: 1,
//         per_page: 2,
//         last_page: 3,
//         total: 4,
//       });

//       expect(presenter.current_page).toBe(1);
//       expect(presenter.per_page).toBe(2);
//       expect(presenter.last_page).toBe(3);
//       expect(presenter.total).toBe(4);
//     });

//     it('should set string number values', () => {
//       const presenter = new PaginationPresenter({
//         current_page: '1' as any,
//         per_page: '2' as any,
//         last_page: '3' as any,
//         total: '4' as any,
//       });

//       expect(presenter.current_page).toBe('1');
//       expect(presenter.per_page).toBe('2');
//       expect(presenter.last_page).toBe('3');
//       expect(presenter.total).toBe('4');
//     });
//   });

//   it('should convert data', () => {
//     let presenter = new PaginationPresenter({
//       current_page: 1,
//       per_page: 2,
//       last_page: 3,
//       total: 4,
//     });

//     expect(instanceToPlain(presenter)).toStrictEqual({
//       current_page: 1,
//       per_page: 2,
//       last_page: 3,
//       total: 4,
//     });

//     presenter = new PaginationPresenter({
//       current_page: '1' as any,
//       per_page: '2' as any,
//       last_page: '3' as any,
//       total: '4' as any,
//     });

//     expect(instanceToPlain(presenter)).toStrictEqual({
//       current_page: 1,
//       per_page: 2,
//       last_page: 3,
//       total: 4,
//     });
//   });
// });

// class StubCollectionPresenter extends CollectionPresenter {
//   data = [1, 2, 3];
// }

// describe('CollectionPresenter Unit Tests', () => {
//   describe('constructor', () => {
//     it('should set values', () => {
//       const presenter = new StubCollectionPresenter({
//         current_page: 1,
//         per_page: 2,
//         last_page: 3,
//         total: 4,
//       });

//       expect(presenter['paginationPresenter']).toBeInstanceOf(
//         PaginationPresenter,
//       );
//       expect(presenter['paginationPresenter'].current_page).toBe(1);
//       expect(presenter['paginationPresenter'].per_page).toBe(2);
//       expect(presenter['paginationPresenter'].last_page).toBe(3);
//       expect(presenter['paginationPresenter'].total).toBe(4);
//       expect(presenter.meta).toEqual(presenter['paginationPresenter']);
//     });
//   });

//   it('should convert data', () => {
//     let presenter = new StubCollectionPresenter({
//       current_page: 1,
//       per_page: 2,
//       last_page: 3,
//       total: 4,
//     });

//     expect(instanceToPlain(presenter)).toStrictEqual({
//       data: [1, 2, 3],
//       meta: {
//         current_page: 1,
//         per_page: 2,
//         last_page: 3,
//         total: 4,
//       },
//     });

//     presenter = new StubCollectionPresenter({
//       current_page: '1' as any,
//       per_page: '2' as any,
//       last_page: '3' as any,
//       total: '4' as any,
//     });

//     expect(instanceToPlain(presenter)).toStrictEqual({
//       data: [1, 2, 3],
//       meta: {
//         current_page: 1,
//         per_page: 2,
//         last_page: 3,
//         total: 4,
//       },
//     });
//   });
// });

// describe('CategoryCollectionPresenter Unit Tests', () => {
//   describe('constructor', () => {
//     it('should set values', () => {
//       const created_at = new Date();
//       const presenter = new CategoryCollectionPresenter({
//         items: [
//           {
//             id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
//             name: 'movie',
//             description: 'some description',
//             is_active: true,
//             created_at,
//           },
//         ],
//         current_page: 1,
//         per_page: 2,
//         last_page: 3,
//         total: 4,
//       });

//       expect(presenter.meta).toBeInstanceOf(PaginationPresenter);
//       expect(presenter.meta).toEqual(
//         new PaginationPresenter({
//           current_page: 1,
//           per_page: 2,
//           last_page: 3,
//           total: 4,
//         }),
//       );
//       expect(presenter.data).toEqual([
//         new CategoryPresenter({
//           id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
//           name: 'movie',
//           description: 'some description',
//           is_active: true,
//           created_at,
//         }),
//       ]);
//     });
//   });

//   it('should convert data', () => {
//     const created_at = new Date();
//     let presenter = new CategoryCollectionPresenter({
//       items: [
//         {
//           id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
//           name: 'movie',
//           description: 'some description',
//           is_active: true,
//           created_at,
//         },
//       ],
//       current_page: 1,
//       per_page: 2,
//       last_page: 3,
//       total: 4,
//     });

//     expect(instanceToPlain(presenter)).toStrictEqual({
//       meta: {
//         current_page: 1,
//         per_page: 2,
//         last_page: 3,
//         total: 4,
//       },
//       data: [
//         {
//           id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
//           name: 'movie',
//           description: 'some description',
//           is_active: true,
//           created_at: created_at.toISOString(),
//         },
//       ],
//     });

//     presenter = new CategoryCollectionPresenter({
//       items: [
//         {
//           id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
//           name: 'movie',
//           description: 'some description',
//           is_active: true,
//           created_at,
//         },
//       ],
//       current_page: '1' as any,
//       per_page: '2' as any,
//       last_page: '3' as any,
//       total: '4' as any,
//     });

//     expect(instanceToPlain(presenter)).toStrictEqual({
//       meta: {
//         current_page: 1,
//         per_page: 2,
//         last_page: 3,
//         total: 4,
//       },
//       data: [
//         {
//           id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
//           name: 'movie',
//           description: 'some description',
//           is_active: true,
//           created_at: created_at.toISOString(),
//         },
//       ],
//     });
//   });
// });
