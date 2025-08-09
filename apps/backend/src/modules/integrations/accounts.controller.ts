import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { createGoogleOAuthClient, GOOGLE_SCOPES } from './google-oauth.util';
import { GmailService } from './gmail.service';
import { ContactsService } from './contacts.service';
import { google } from 'googleapis';

@Controller('integrations')
export class AccountsController {
  constructor(private readonly prisma: PrismaService, private readonly gmail: GmailService, private readonly contacts: ContactsService) {}

  @Get('google/oauth-url')
  async getGoogleOAuthUrl(@Query('userId') userId: string) {
    const oauth2Client = createGoogleOAuthClient();
    const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: GOOGLE_SCOPES, prompt: 'consent', state: userId });
    return { url };
  }

  @Get('google/callback')
  async googleCallback(@Query('code') code: string, @Query('state') userId: string, @Res() res: Response) {
    const oauth2Client = createGoogleOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Try to resolve user identity via Google userinfo (email/profile)
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const profile = await oauth2.userinfo.get().then(r => r.data).catch(() => ({} as any));
    const email = profile?.email as string | undefined;
    const name = (profile?.name || profile?.given_name || profile?.email || 'Google User') as string;

    let user = null;
    if (email) {
      user = await this.prisma.user.upsert({
        where: { email },
        update: { name },
        create: { email, name },
      });
    } else if (userId) {
      user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        // As a last resort, create a user with placeholder email
        user = await this.prisma.user.create({ data: { email: `google_${Date.now()}@placeholder.local`, name } });
      }
    } else {
      return res.status(400).send('Unable to determine user identity. Ensure email scope is granted.');
    }
    await this.prisma.integrationAccount.upsert({
      where: { userId_provider: { userId: user.id, provider: 'GOOGLE' } },
      create: {
        userId: user.id,
        provider: 'GOOGLE',
        accessToken: tokens.access_token || '',
        refreshToken: tokens.refresh_token || null,
        expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        scope: tokens.scope,
        metadata: tokens as any,
      },
      update: {
        accessToken: tokens.access_token || '',
        refreshToken: tokens.refresh_token || null,
        expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        scope: tokens.scope,
        metadata: tokens as any,
      },
    });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectTo = `${frontendUrl}/google?connected=google&userId=${encodeURIComponent(user.id)}`;
    return res.redirect(302, redirectTo);
  }

  @Get('google/check')
  async googleCheck(@Query('userId') userId: string) {
    const profile = await this.gmail.getProfile(userId).catch((e) => ({ error: String(e) }));
    const contacts = await this.contacts.listConnections(userId).catch((e) => ({ error: String(e) }));
    return { profile, contactsCount: Array.isArray(contacts) ? contacts.length : 0 };
  }
}


