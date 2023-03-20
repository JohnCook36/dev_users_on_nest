import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
