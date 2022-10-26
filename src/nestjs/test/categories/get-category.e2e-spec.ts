import request from 'supertest';
import { Category, CategoryRepository } from '@fc/micro-videos/category/domain';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { CategoryFixture } from '../../src/categories/fixtures';
import { CategoriesController } from '../../src/categories/categories.controller';
import { instanceToPlain } from 'class-transformer';
import { startApp } from '../../src/@share/testing/helpers';

describe('CategoriesController (e2e)', () => {
  const nestApp = startApp();

  describe('/categories/:id (GET)', () => {
    describe('should handle response when id is invalid or not found', () => {
      const arrange = [
        {
          id: '957334c5-91b9-4986-9b43-0d42f2edfbe9',
          expected: {
            message:
              'Entity not found with ID 957334c5-91b9-4986-9b43-0d42f2edfbe9',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake-id',
          expected: {
            message: 'Validation failed (uuid  is expected)', // unexpected double space!?
            statusCode: 422,
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)('when id is $id', async ({ id, expected }) => {
        return request(nestApp.app.getHttpServer())
          .get(`/categories/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should return a category', async () => {
      const categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const category = Category.fake().aCategory().build();
      categoryRepo.insert(category);

      const res = await request(nestApp.app.getHttpServer())
        .get(`/categories/${category.id}`)
        .expect(200);
      console.log(res.body, Object.keys(res.body.data));
      const keyInResponse = CategoryFixture.keysInResponse();
      expect(Object.keys(res.body)).toStrictEqual(['data']);
      expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

      const presenter = CategoriesController.categoryToResponse(
        category.toJSON(),
      );
      const serialized = instanceToPlain(presenter);
      // presenter: {... created_at: 2022-10-07T14:03:42.208Z }
      // serialized: {... created_at: '2022-10-07T14:03:42.208Z' }
      expect(res.body.data).toStrictEqual(serialized);
    });
  });
});
