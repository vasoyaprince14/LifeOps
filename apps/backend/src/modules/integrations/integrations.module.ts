import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { UberService } from './uber.service';
import { GoogleCalendarService } from './google-calendar.service';
import { ZomatoService } from './zomato.service';
import { SwiggyService } from './swiggy.service';
import { ZeptoService } from './zepto.service';
import { AccountsController } from './accounts.controller';
import { GmailService } from './gmail.service';
import { ContactsService } from './contacts.service';
import { CalendarController } from './calendar.controller';
import { GmailController } from './gmail.controller';
import { ContactsController } from './contacts.controller';

@Module({
  providers: [
    UberService,
    GoogleCalendarService,
    ZomatoService,
    SwiggyService,
    ZeptoService,
    GmailService,
    ContactsService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AccountsController, CalendarController, GmailController, ContactsController],
  exports: [UberService, GoogleCalendarService, ZomatoService, SwiggyService, ZeptoService, GmailService, ContactsService],
})
export class IntegrationsModule {}


