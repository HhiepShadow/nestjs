import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
