import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let app: any;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
  }
  return app;
}

// For local dev
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(app => app.listen(4000));
}

// For Vercel serverless
export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance();
  server(req, res);
}