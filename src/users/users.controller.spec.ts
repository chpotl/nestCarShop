import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'a@a.com',
          password: '123',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: '4566' } as User]);
      },
      // remove: () => {},
      // update: () => {},
    };

    fakeAuthService = {
      // signUp: () => {},
      // signIn: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findAllUsers returns a list of users with given email', async () => {
    const users = await controller.findAllUsers('as@dj.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('as@dj.com');
  });
  it('findUser returns a single user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });
  it('findUser throws an error in user id not found', () => {
    fakeUsersService.findOne = () => null;
    expect(controller.findUser('10')).rejects.toThrow(NotFoundException);
  });
});
