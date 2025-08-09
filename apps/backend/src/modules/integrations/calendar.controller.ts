import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendar: GoogleCalendarService) {}

  @Get('events')
  list(@Query('userId') userId: string) {
    return this.calendar.listEvents(userId);
  }

  @Post('events')
  create(@Body() body: { userId: string; title: string; startsAt: string; endsAt: string; location?: string }) {
    return this.calendar.createEvent(body.userId, { title: body.title, startsAt: new Date(body.startsAt), endsAt: new Date(body.endsAt), location: body.location });
  }
}


