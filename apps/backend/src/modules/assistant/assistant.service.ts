import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { UberService } from '../integrations/uber.service';
import { GoogleCalendarService } from '../integrations/google-calendar.service';

@Injectable()
export class AssistantService {
  private readonly openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

  constructor(
    private readonly uber: UberService,
    private readonly calendar: GoogleCalendarService,
  ) {}

  async chat(userId: string, input: { text?: string; audioBase64?: string }) {
    // MVP: use text; audio STT can be added later
    const prompt = input.text || '[voice message received]';
    // Call LLM to parse intent (mock prompt for now)
    let text = 'Acknowledged.';
    if (this.openai) {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are LifeOps, an execution-first assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      });
      text = response.choices[0]?.message?.content || text;
    } else {
      // Fallback response if no key configured
      text = `Received: ${prompt}. (LLM disabled)`;
    }
    // TODO: parse tool calls from LLM and trigger services (uber/calendar/etc)
    return { reply: text };
  }
}


