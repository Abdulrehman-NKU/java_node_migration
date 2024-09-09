import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: '*',
      methods: '*',
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          message: 'Request payload validation error',
          errors: errors.map((err) => ({
            field: err.property,
            failed_constraints: err.constraints,
          })),
        });
      },
    }),
  );
  // Serving static files
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setGlobalPrefix('/v2/api');
  await app.listen(process.env.PORT);
}
bootstrap();
