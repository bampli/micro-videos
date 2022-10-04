import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CategoryRepository } from '@fc/micro-videos/category/domain';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { CategoryFixture } from '../../src/categories/fixtures';

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
    await app.init();
  });

  describe('POST /categories', () => {
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
          expect(Object.keys(res.body)).toStrictEqual(keyInResponse);
          const category = await categoryRepo.findById(res.body.id);
          expect(res.body.id).toBe(category.id);
          expect(res.body.created_at).toBe(category.created_at.toISOString());
          expect(res.body).toStrictEqual({
            id: category.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
            created_at: category.created_at.toISOString(),
          });
          expect(res.body).toStrictEqual({
            id: res.body.id,
            created_at: res.body.created_at,
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
    expect(Object.keys(res.body)).toStrictEqual([
      'id',
      'name',
      'description',
      'is_active',
      'created_at',
    ]);
    const category = await categoryRepo.findById(res.body.id);
    expect(res.body.id).toBe(category.id);
    expect(res.body.created_at).toBe(category.created_at.toISOString());
    expect(res.body).toStrictEqual({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at.toISOString(),
    });
  });
});
