import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CategoryRepository } from '@fc/micro-videos/category/domain';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { CategoryFixture } from '../../src/categories/fixtures';
import { CategoriesController } from '../../src/categories/categories.controller';
import { instanceToPlain } from 'class-transformer';
import { applyGlobalConfig } from '../../src/global-config';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;
  let categoryRepo: CategoryRepository.Repository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // repo does not need to wait for app.init()
    categoryRepo = moduleFixture.get<CategoryRepository.Repository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
    app = moduleFixture.createNestApplication();
    applyGlobalConfig(app);
    await app.init();
  });

  describe('POST /categories', () => {
    describe('should have response 422 with invalid request body', () => {
      const invalidRequest = CategoryFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('when body is $label', async ({ value }) => {
        const res = await request(app.getHttpServer())
          .post('/categories')
          .send(value)
          .expect(422); // see global-config.ts

        console.log(res.body);
        // {
        //   statusCode: 422,
        //   message: [ 'name should not be empty' ],
        //   error: 'Unprocessable Entity'
        // }
        // {
        //   statusCode: 400,
        //   message: [ 'name should not be empty' ],
        //   error: 'Bad Request'
        // }
      });
    });

    describe('should create a category', () => {
      const arrange = CategoryFixture.arrangeForSave();

      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const res = await request(app.getHttpServer())
            .post('/categories')
            .send(send_data)
            .expect(201);
          const keyInResponse = CategoryFixture.keysInResponse();
          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);
          const categoryCreated = await categoryRepo.findById(res.body.data.id);
          const presenter = CategoriesController.categoryToResponse(
            categoryCreated.toJSON(),
          );
          const serialized = instanceToPlain(presenter);
          expect(res.body.data).toStrictEqual(serialized);
          expect(res.body.data).toStrictEqual({
            id: serialized.id,
            created_at: serialized.created_at,
            ...send_data,
            ...expected,
          });
        },
      );
    });
  });

  it('POST /categories without fixture', async () => {
    const res = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Movie' })
      .expect(201);
    expect(Object.keys(res.body.data)).toStrictEqual([
      'id',
      'name',
      'description',
      'is_active',
      'created_at',
    ]);
    const category = await categoryRepo.findById(res.body.data.id);
    expect(res.body.data.id).toBe(category.id);
    expect(res.body.data.created_at).toBe(category.created_at.toISOString());
    expect(res.body.data).toStrictEqual({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at.toISOString(),
    });
  });
});
