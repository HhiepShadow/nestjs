import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const mockUsers = [
  {
    id: 1,
    name: 'John',
    email: 'john@gmail.com',
  },
  {
    id: 1,
    name: 'Jane',
    email: 'jane@gmail.com',
  },
];

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  const mockRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 1, ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(mockUsers);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const dto = { name: 'Alice' };
      const result = await service.create(dto);
      expect(result).toEqual({ id: 1, name: 'Alice' });
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(dto);
    });
  });
});
