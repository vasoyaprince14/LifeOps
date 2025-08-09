import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { createGoogleOAuthClient } from './google-oauth.util';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GmailService {
  constructor(private readonly prisma: PrismaService) {}

  private async getAuthed(userId: string) {
    const account = await this.prisma.integrationAccount.findUnique({ where: { userId_provider: { userId, provider: 'GOOGLE' } } });
    if (!account) throw new Error('Google not connected');
    const oauth2 = createGoogleOAuthClient();
    oauth2.setCredentials({ access_token: account.accessToken, refresh_token: account.refreshToken, expiry_date: account.expiresAt?.getTime() });
    return google.gmail({ version: 'v1', auth: oauth2 });
  }

  async getProfile(userId: string) {
    const gmail = await this.getAuthed(userId);
    const res = await gmail.users.getProfile({ userId: 'me' });
    return res.data;
  }

  async listMessages(userId: string, query?: string) {
    const gmail = await this.getAuthed(userId);
    const res = await gmail.users.messages.list({ userId: 'me', q: query, maxResults: 10 });
    return res.data.messages || [];
  }

  async sendEmail(userId: string, to: string, subject: string, body: string) {
    const gmail = await this.getAuthed(userId);
    const raw = Buffer.from(
      [
        `To: ${to}`,
        'Content-Type: text/plain; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        body,
      ].join('\n'),
    ).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const res = await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
    return res.data;
  }
}


