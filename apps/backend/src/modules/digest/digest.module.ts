import { Module } from '@nestjs/common';
import { DigestService } from './digest.service';
import { DigestController } from './digest.controller';
import { GoogleCalendarService } from '../integrations/google-calendar.service';

@Module({
  providers: [DigestService, GoogleCalendarService],
  controllers: [DigestController],
})
export class DigestModule {}


