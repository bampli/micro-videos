import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
    console.log(res.body, res.statusCode);
    // {} 200
  });

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/')
      .expect(200) // if an error occurs here ...
      .expect('Hello World!');
    console.log(res.body, res.statusCode); // ... log is missing
    // {} 200
  });

  it('/ (GET)', (done) => {
    request(app.getHttpServer())
      .get('/')
      .expect(200) // .expect(201) // forces an error
      .expect('Hello World!')
      .end((err, res) => {
        console.log('###', err, res.status); // always shows a log
        // ### null 200
        // ### Error: expected 201 "Created", got 200 "OK"
        if (err) return done(err);
        return done();
      });
  });
});
