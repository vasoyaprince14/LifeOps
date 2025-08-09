import { Injectable } from '@nestjs/common';
import { GoogleCalendarService } from '../integrations/google-calendar.service';

@Injectable()
export class DigestService {
  constructor(private readonly calendar: GoogleCalendarService) {}

  async morningDigest(userId: string) {
    const events = await this.calendar.listEvents(userId);
    // TODO: add weather, bills, traffic, etc.
    return {
      greeting: 'Good morning',
      calendar: events,
      tips: [
        'Leave 15 minutes earlier due to traffic',
        'You have 2 pending tasks',
      ],
    };
  }
}


