import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
  constructor(@InjectQueue('lifeops-jobs') private readonly queue: Queue) {}

  async schedule(name: string, payload: any, runAt: Date) {
    return this.queue.add(name, payload, { delay: Math.max(0, runAt.getTime() - Date.now()) });
  }
}


