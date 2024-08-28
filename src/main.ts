import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
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
  // app.setGlobalPrefix('/v2/api');
  await app.listen(process.env.PORT);
}
bootstrap();
