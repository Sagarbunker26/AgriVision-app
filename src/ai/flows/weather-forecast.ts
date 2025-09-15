'use server';
/**
 * @fileOverview An AI agent that provides a weather forecast for a given location.
 *
 * - getWeatherForecast - A function that returns the weather forecast.
 * - WeatherForecastInput - The input type for the getWeatherForecast function.
 * - WeatherForecastOutput - The return type for the getWeatherForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherForecastInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});
export type WeatherForecastInput = z.infer<typeof WeatherForecastInputSchema>;

const WeatherForecastOutputSchema = z.object({
    temperature: z.number().describe('The current temperature in Celsius.'),
    conditions: z.string().describe('A brief description of the current weather conditions (e.g., "Sunny with light breeze").'),
    humidity: z.number().describe('The current humidity percentage.'),
    windSpeed: z.number().describe('The current wind speed in km/h.'),
});
export type WeatherForecastOutput = z.infer<typeof WeatherForecastOutputSchema>;

export async function getWeatherForecast(input: WeatherForecastInput): Promise<WeatherForecastOutput> {
  return weatherForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherForecastPrompt',
  input: {schema: WeatherForecastInputSchema},
  output: {schema: WeatherForecastOutputSchema},
  prompt: `You are a weather forecasting service. Provide a realistic and plausible weather forecast for the given location based on its latitude and longitude.

Latitude: {{{latitude}}}
Longitude: {{{longitude}}}

Return the temperature in Celsius, a short description of the conditions, the humidity percentage, and the wind speed in km/h.`,
});

const weatherForecastFlow = ai.defineFlow(
  {
    name: 'weatherForecastFlow',
    inputSchema: WeatherForecastInputSchema,
    outputSchema: WeatherForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
