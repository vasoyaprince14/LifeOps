import { OAuth2Client } from 'google-auth-library';

export function createGoogleOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth env vars missing');
  }
  return new OAuth2Client({ clientId, clientSecret, redirectUri });
}

export const GOOGLE_SCOPES = [
  // Calendar
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  // Gmail
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  // People/Contacts
  'https://www.googleapis.com/auth/contacts.readonly',
  // Basic profile/email for user bootstrap
  'openid',
  'email',
  'profile',
];


