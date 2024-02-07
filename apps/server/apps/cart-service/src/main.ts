import { NestFactory } from '@nestjs/core';
import { CartServiceModule } from './cart-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CartServiceModule);
  app.enableCors();
  await app.listen( 2020);
}
bootstrap();
