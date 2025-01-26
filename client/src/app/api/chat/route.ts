import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, notes } = await req.json();
  
  const systemPrompt = `You are a helpful assistant with access to sensor data and these notes:
  ${notes || 'No additional notes provided'}
  
  Consider this context when providing responses about the system or conditions.`;

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}