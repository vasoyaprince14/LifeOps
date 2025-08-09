import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { createGoogleOAuthClient } from './google-oauth.util';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoogleCalendarService {
  constructor(private readonly prisma: PrismaService) {}

  private async getAuthedClient(userId: string) {
    const account = await this.prisma.integrationAccount.findUnique({ where: { userId_provider: { userId, provider: 'GOOGLE' } } });
    if (!account) throw new Error('Google not connected');
    const oauth2 = createGoogleOAuthClient();
    oauth2.setCredentials({ access_token: account.accessToken, refresh_token: account.refreshToken, expiry_date: account.expiresAt?.getTime() });
    return google.calendar({ version: 'v3', auth: oauth2 });
  }

  async listEvents(userId: string) {
    const calendar = await this.getAuthedClient(userId);
    const now = new Date();
    const res = await calendar.events.list({ calendarId: 'primary', timeMin: now.toISOString(), maxResults: 10, singleEvents: true, orderBy: 'startTime' });
    return res.data.items || [];
  }

  async createEvent(userId: string, event: { title: string; startsAt: Date; endsAt: Date; location?: string }) {
    const calendar = await this.getAuthedClient(userId);
    const res = await calendar.events.insert({ calendarId: 'primary', requestBody: { summary: event.title, start: { dateTime: event.startsAt.toISOString() }, end: { dateTime: event.endsAt.toISOString() }, location: event.location } });
    return res.data;
  }
}


