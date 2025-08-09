import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async create(userId: string, title: string, description?: string) {
    return this.prisma.task.create({ data: { userId, title, description } });
  }

  async updateStatus(id: string, status: TaskStatus) {
    const exists = await this.prisma.task.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Task not found');
    return this.prisma.task.update({ where: { id }, data: { status } });
  }
}


