import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'This action returns all users';
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'John',
        email: 'john@gmail.com',
        posts: [
          {
            title: 'Post 1',
            content: 'Content 1',
          },
          {
            title: 'Post 2',
            content: 'Content 2',
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUsersPostsComments() {
    return [
      {
        id: 1,
        title: 'Post 1',
        comments: [
          {
            id: 1,
            content: 'Comment 1',
          },
          {
            id: 2,
            content: 'Comment 2',
          },
        ],
      },
    ];
  }

  @Post()
  createUser(@Req() req: Request, @Res() res: Response) {
    try {
      const body = req.body as CreateUserDTO;
      return res.status(201).json({
        message: 'User created',
        body,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Post('create')
  createPost(@Body() body: CreateUserDTO) {
    return {
      message: 'Post created',
      body,
    };
  }
}
