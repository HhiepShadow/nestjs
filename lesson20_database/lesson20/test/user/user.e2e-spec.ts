// test/user.e2e-spec.ts
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let db: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    db = moduleFixture.get(DataSource);
  });

  afterAll(async () => {
    await db.query(`DELETE FROM "user"`); // xóa dữ liệu test
    await app.close();
  });

  it('/user (POST)', async () => {
    const user = { name: 'John Doe', email: 'john@gmail.com' };

    const res = await request(app.getHttpServer())
      .post('/user')
      .send(user)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(user.name);
  });

  it('/user (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/user').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
