import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  await app.listen(PORT, () => {
    try {
      console.log(`I listener on port ${PORT}`);
    } catch (e) {
      console.log(e);
    }
  });
}
bootstrap();
