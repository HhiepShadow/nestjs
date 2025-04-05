import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';

@Controller('users')
@UseFilters(CustomException, HttpException)
export class UsersController {
  @Get('exception')
  throwException() {
    throw new HttpException('Custom error message', HttpStatus.BAD_REQUEST);
  }

  @Get('exceptionJSON')
  throwExceptionJSON() {
    throw new HttpException(
      { error: 'Bad Request', message: 'Invalid input data' },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get('customException')
  throwCustomException() {
    throw new CustomException('Custom exception message');
  }
}
