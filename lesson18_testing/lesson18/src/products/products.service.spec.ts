import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      const product = new Product();
      Object.assign(product, {
        ...createProductDto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Sử dụng arrow function để tránh vấn đề 'this'
      jest.spyOn(productRepository, 'create').mockImplementation((dto) => {
        const newProduct = new Product();
        Object.assign(newProduct, dto);
        return newProduct;
      });

      // Sử dụng mockResolvedValue thay vì mockImplementation khi không cần logic phức tạp
      jest.spyOn(productRepository, 'save').mockResolvedValue(product);

      const result = await service.create(createProductDto);

      expect(result).toEqual(product);
      expect(() => productRepository.create(createProductDto)).not.toThrow();
      expect(() => productRepository.save(product)).not.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [new Product(), new Product()];
      jest.spyOn(productRepository, 'find').mockResolvedValue(products);

      const result = await service.findAll();
      expect(result).toEqual(products);
    });
  });
});
