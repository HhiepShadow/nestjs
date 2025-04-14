import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Server } from 'http';
import { ProductsService } from '../src/products/products.service';
import { ProductsController } from '../src/products/products.controller';

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let productRepository: Repository<Product>;

  const testProduct = {
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 10,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Product],
          synchronize: true,
          logging: false, // Disable logging for cleaner test output
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      providers: [ProductsService],
      controllers: [ProductsController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the repository instance for direct database operations
    productRepository = moduleFixture.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  beforeEach(async () => {
    // Clear the database before each test
    await productRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/products (POST)', () => {
    it('should create a product', async () => {
      const response = await request(app.getHttpServer() as Server)
        .post('/products')
        .send(testProduct)
        .expect(201);

      const body: ProductResponse = response.body as ProductResponse;

      expect(body).toEqual({
        id: expect.any(Number) as number, // Correctly match any number
        name: testProduct.name,
        description: testProduct.description,
        price: testProduct.price,
        stock: testProduct.stock,
        createdAt: expect.any(String) as string, // Match any string for createdAt
        updatedAt: expect.any(String) as string, // Match any string for updatedAt
      });

      // Verify the product was actually saved to the database
      const dbProduct = await productRepository.findOneBy({ id: body.id });
      expect(dbProduct).toBeDefined();
      expect(dbProduct?.name).toBe(testProduct.name);
    });

    it('should return 400 for invalid data', async () => {
      await request(app.getHttpServer() as Server)
        .post('/products')
        .send({ ...testProduct, price: 'invalid' }) // Invalid price
        .expect(400);
    });
  });

  describe('/products (GET)', () => {
    it('should return an array of products', async () => {
      // Create test data directly in the database
      await productRepository.save([
        productRepository.create(testProduct),
        productRepository.create({
          ...testProduct,
          name: 'Second Product',
        }),
      ]);

      const response = await request(app.getHttpServer() as Server)
        .get('/products')
        .expect(200);

      const body: ProductResponse[] = response.body as ProductResponse[];

      expect(body).toHaveLength(2);
      expect(body[0].name).toBe(testProduct.name);
      expect(body[1].name).toBe('Second Product');
    });

    it('should return empty array when no products exist', async () => {
      const response = await request(app.getHttpServer() as Server)
        .get('/products')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('/products/:id (GET)', () => {
    it('should return a single product', async () => {
      const savedProduct = await productRepository.save(
        productRepository.create(testProduct),
      );

      const response = await request(app.getHttpServer() as Server)
        .get(`/products/${savedProduct.id}`)
        .expect(200);

      const body: ProductResponse = response.body as ProductResponse;
      expect(body.id).toBe(savedProduct.id);
      expect(body.name).toBe(savedProduct.name);
    });

    it('should return 404 for non-existent product', async () => {
      await request(app.getHttpServer() as Server)
        .get('/products/999')
        .expect(404);
    });
  });
});
