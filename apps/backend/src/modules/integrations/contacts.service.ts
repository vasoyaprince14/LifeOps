import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { createGoogleOAuthClient } from './google-oauth.util';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  private async getAuthed(userId: string) {
    const account = await this.prisma.integrationAccount.findUnique({ where: { userId_provider: { userId, provider: 'GOOGLE' } } });
    if (!account) throw new Error('Google not connected');
    const oauth2 = createGoogleOAuthClient();
    oauth2.setCredentials({ access_token: account.accessToken, refresh_token: account.refreshToken, expiry_date: account.expiresAt?.getTime() });
    return google.people({ version: 'v1', auth: oauth2 });
  }

  async listConnections(userId: string) {
    const people = await this.getAuthed(userId);
    const res = await people.people.connections.list({ resourceName: 'people/me', pageSize: 10, personFields: 'names,emailAddresses' });
    return res.data.connections || [];
  }
}


