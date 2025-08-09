import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GmailService } from './gmail.service';

@Controller('gmail')
export class GmailController {
  constructor(private readonly gmail: GmailService) {}

  @Get('profile')
  profile(@Query('userId') userId: string) {
    return this.gmail.getProfile(userId);
  }

  @Get('messages')
  list(@Query('userId') userId: string, @Query('q') q?: string) {
    return this.gmail.listMessages(userId, q);
  }

  @Post('send')
  send(@Body() body: { userId: string; to: string; subject: string; body: string }) {
    return this.gmail.sendEmail(body.userId, body.to, body.subject, body.body);
  }
}


