import { Injectable } from '@nestjs/common';
import { Subscriber } from '@prisma/client';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class SubscriberService {
  constructor(private readonly prisma: PrismaService) {}

  async addSubscriber(email: string): Promise<Subscriber> {
    const existing = await this.prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      if (!existing.isActive) {
        await this.prisma.subscriber.update({ where: { email }, data: { isActive: true } });
        return { ...existing, isActive: true };
      }
      const updatedSubscriber: Subscriber = { ...existing, isActive: true };
      this.prisma.subscriber.update({ where: { email }, data: { isActive: true } });
      return updatedSubscriber;
    }
    return this.prisma.subscriber.create({ data: { email, isActive: true } });
  }

  async unsubscribe(email: string): Promise<Subscriber> {
    const existing = await this.prisma.subscriber.findUnique({ where: { email } });
    if (!existing) {
      throw new Error('email not found');
    }
    return this.prisma.subscriber.update({ where: { email }, data: { isActive: false } });
  }

  async findAll(): Promise<Subscriber[]> {
    return this.prisma.subscriber.findMany();
  }
}