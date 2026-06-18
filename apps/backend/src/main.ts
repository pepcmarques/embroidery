import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

let cachedHandler: any;

async function createServer() {
  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  });

  await app.init();

  return serverless(expressApp);
}

export default async function handler(req, res) {
  if (!cachedHandler) {
    cachedHandler = await createServer();
  }
  return cachedHandler(req, res);
}