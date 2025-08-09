import { Controller, Get, Param } from '@nestjs/common';
import { DigestService } from './digest.service';

@Controller('digest')
export class DigestController {
  constructor(private readonly digest: DigestService) {}

  @Get('morning/:userId')
  morning(@Param('userId') userId: string) {
    return this.digest.morningDigest(userId);
  }
}


