import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import dataSource from './data-source';
import { QueryExceptionFilter } from './filters/query-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryExceptionFilter());
  await dataSource.initialize();
  await app.listen(process.env.PORT || 3000);
}

bootstrap().then();
