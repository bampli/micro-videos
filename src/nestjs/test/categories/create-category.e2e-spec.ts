import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CategoryRepository } from '@fc/micro-videos/category/domain';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';

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

  it('POST /categories', async () => {
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
    // .expect('Hello World!')
    // .end((err, res) => {
    //   console.log('###', err, res.status); // always shows a log
    //   // ### null 200
    //   // ### Error: expected 201 "Created", got 200 "OK"
    //   if (err) return done(err);
    //   return done();
    // });
  });
});
