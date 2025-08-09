import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { AssistantModule } from './assistant/assistant.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { DigestModule } from './digest/digest.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET || 'devsecret', signOptions: { expiresIn: '7d' } }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || 6379),
      },
    }),
    PrismaModule,
    HealthModule,
    UsersModule,
    TasksModule,
    AuthModule,
    IntegrationsModule,
    AssistantModule,
    SchedulerModule,
    DigestModule,
    // Feature modules below
  ],
})
export class AppModule {}


