import request from 'supertest';
import { CategoryRepository } from '@fc/micro-videos/category/domain';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { ListCategoriesFixture } from '../../src/categories/fixtures';
import { CategoriesController } from '../../src/categories/categories.controller';
import { instanceToPlain } from 'class-transformer';
import { startApp } from '../../src/@share/testing/helpers';

describe('CategoriesController (e2e)', () => {
  describe('/categories (GET)', () => {
    describe('should return categories sorted by created_at when req query is empty', () => {
      let categoryRepo: CategoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } =
        ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );

        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          // const res = await request(nestApp.app.getHttpServer()).get(
          //   `/categories/?${queryParams}`,
          // );
          // console.log(res.body);
          return request(nestApp.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(CategoriesController.categoryToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });

    describe('should return categories using paginate, filter & sort', () => {
      let categoryRepo: CategoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

      beforeEach(async () => {
        categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );

        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          // const res = await request(nestApp.app.getHttpServer()).get(
          //   `/categories/?${queryParams}`,
          // );
          // console.log(res.body);
          return request(nestApp.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(CategoriesController.categoryToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });

    // it('should return a category', async () => {
    //   const categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
    //     CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    //   );
    //   const category = Category.fake().aCategory().build();
    //   categoryRepo.insert(category);

    //   const res = await request(nestApp.app.getHttpServer())
    //     .get(`/categories/${category.id}`)
    //     .expect(200);
    //   console.log(res.body, Object.keys(res.body.data));
    //   const keyInResponse = CategoryFixture.keysInResponse();
    //   expect(Object.keys(res.body)).toStrictEqual(['data']);
    //   expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

    //   const presenter = CategoriesController.categoryToResponse(
    //     category.toJSON(),
    //   );
    //   const serialized = instanceToPlain(presenter);
    //   // presenter: {... created_at: 2022-10-07T14:03:42.208Z }
    //   // serialized: {... created_at: '2022-10-07T14:03:42.208Z' }
    //   expect(res.body.data).toStrictEqual(serialized);
    // });
  });
});
