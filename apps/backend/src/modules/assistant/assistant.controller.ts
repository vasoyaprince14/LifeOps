import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { IsOptional, IsString } from 'class-validator';

class ChatDto {
  @IsString()
  userId!: string;
  @IsOptional()
  @IsString()
  text?: string;
  @IsOptional()
  @IsString()
  audioBase64?: string;
}

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistant: AssistantService) {}

  @Post('chat')
  chat(@Body() body: ChatDto) {
    return this.assistant.chat(body.userId, { text: body.text, audioBase64: body.audioBase64 });
  }
}


