import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
  transform(value: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue) || parsedValue <= 0) {
      throw new BadRequestException(
        `Value ${value} is not a valid positive integer`,
      );
    }
    return parsedValue;
  }
}
