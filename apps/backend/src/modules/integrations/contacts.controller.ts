import { Controller, Get, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contacts: ContactsService) {}

  @Get()
  list(@Query('userId') userId: string) {
    return this.contacts.listConnections(userId);
  }
}


