'use server';
/**
 * @fileOverview A crop recommendation AI agent that considers sustainability.
 *
 * - recommendCropsWithSustainability - A function that handles the crop recommendation process.
 * - CropRecommendationInput - The input type for the recommendCropsWithSustainability function.
 * - CropRecommendationOutput - The return type for the recommendCropsWithSustainability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationInputSchema = z.object({
  soilPh: z.number().describe('The pH of the soil.'),
  soilNpk: z.string().describe('The NPK values of the soil.'),
  weatherConditions: z.string().describe('The current weather conditions.'),
  marketData: z.string().describe('The current market data for crops.'),
});
export type CropRecommendationInput = z.infer<typeof CropRecommendationInputSchema>;

const CropRecommendationOutputSchema = z.object({
  cropRecommendations: z.array(
    z.object({
      cropName: z.string().describe('The name of the recommended crop.'),
      yieldPrediction: z.number().describe('The predicted yield of the crop.'),
      profitPrediction: z.number().describe('The predicted profit from the crop.'),
      sustainabilityScore: z.number().describe('A score indicating the sustainability of the crop (0-100).'),
      rationale: z.string().describe('Why this crop was recommended'),
    })
  ).describe('A list of crop recommendations.'),
});
export type CropRecommendationOutput = z.infer<typeof CropRecommendationOutputSchema>;

export async function recommendCropsWithSustainability(input: CropRecommendationInput): Promise<CropRecommendationOutput> {
  return recommendCropsWithSustainabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCropsWithSustainabilityPrompt',
  input: {schema: CropRecommendationInputSchema},
  output: {schema: CropRecommendationOutputSchema},
  prompt: `You are an expert agricultural advisor. Given the following soil parameters, weather conditions, and market data, recommend the best crops to grow, considering their sustainability.

Soil pH: {{{soilPh}}}
Soil NPK: {{{soilNpk}}}
Weather Conditions: {{{weatherConditions}}}
Market Data: {{{marketData}}}

Consider the environmental impact of each crop and provide a sustainability score (0-100, higher is better).  Also include a rationale for each recommendation.

Format your response as a JSON object with a 'cropRecommendations' array. Each object in the array should have 'cropName', 'yieldPrediction', 'profitPrediction', 'sustainabilityScore', and 'rationale' fields.`,
});

const recommendCropsWithSustainabilityFlow = ai.defineFlow(
  {
    name: 'recommendCropsWithSustainabilityFlow',
    inputSchema: CropRecommendationInputSchema,
    outputSchema: CropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
