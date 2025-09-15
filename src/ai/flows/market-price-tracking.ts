'use server';
/**
 * @fileOverview An AI agent that provides market price information for crops.
 *
 * - getMarketPrices - A function that returns market prices for a list of crops.
 * - MarketPriceOutput - The return type for the getMarketPrices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketPriceOutputSchema = z.object({
  marketPrices: z.array(
    z.object({
      cropName: z.string().describe('The name of the crop.'),
      price: z.number().describe('The current market price per quintal.'),
      trend: z.enum(['up', 'down', 'stable']).describe('The price trend.'),
    })
  ).describe('A list of market prices for various crops.'),
});
export type MarketPriceOutput = z.infer<typeof MarketPriceOutputSchema>;

export async function getMarketPrices(): Promise<MarketPriceOutput> {
  return marketPriceFlow();
}

const prompt = ai.definePrompt({
  name: 'marketPricePrompt',
  output: {schema: MarketPriceOutputSchema},
  prompt: `You are an agricultural market data provider. Provide a realistic and plausible list of current market prices for 5 common crops in India (like Wheat, Rice, Corn, Sugarcane, Cotton). 
  
  Return the price per quintal and indicate if the trend is 'up', 'down', or 'stable'.
  
  Format your response as a JSON object with a 'marketPrices' array.`,
});

const marketPriceFlow = ai.defineFlow(
  {
    name: 'marketPriceFlow',
    outputSchema: MarketPriceOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
