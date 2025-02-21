import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { latestReading, notes } = await req.json();
  // console.log(latestReading, notes);

  const prompt = `Analyze this sensor data and provide a brief summary of current conditions and wildfire risk:
  Temperature: ${latestReading.Temperature}°C
  Humidity: ${latestReading.Humidity}%
  Soil Moisture Level: ${latestReading.SoilMoisture}%

  Additional Notes:
  ${notes || 'No additional notes provided'}

  Provide a 2-3 sentence summary including:
  1. Current conditions
  2. Risk level for wildfires (low, moderate, high, or extreme)
  3. Any recommendations if risk is elevated
  4. Consider any relevant information from the notes`;

  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: prompt,
  });

  return NextResponse.json({ text });
}