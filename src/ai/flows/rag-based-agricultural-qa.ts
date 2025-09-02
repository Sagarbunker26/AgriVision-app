'use server';
/**
 * @fileOverview An AI agent that answers questions about farming practices using a retrieval-augmented generation approach.
 *
 * - ragBasedAgriculturalQA - A function that answers user queries about farming practices.
 * - RagBasedAgriculturalQAInput - The input type for the ragBasedAgriculturalQA function.
 * - RagBasedAgriculturalQAOutput - The return type for the ragBasedAgriculturalQA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RagBasedAgriculturalQAInputSchema = z.object({
  query: z.string().describe('The question about farming practices.'),
});
export type RagBasedAgriculturalQAInput = z.infer<typeof RagBasedAgriculturalQAInputSchema>;

const RagBasedAgriculturalQAOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about farming practices.'),
});
export type RagBasedAgriculturalQAOutput = z.infer<typeof RagBasedAgriculturalQAOutputSchema>;

export async function ragBasedAgriculturalQA(input: RagBasedAgriculturalQAInput): Promise<RagBasedAgriculturalQAOutput> {
  return ragBasedAgriculturalQAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ragBasedAgriculturalQAPrompt',
  input: {schema: RagBasedAgriculturalQAInputSchema},
  output: {schema: RagBasedAgriculturalQAOutputSchema},
  prompt: `You are an expert agricultural advisor. Answer the following question about farming practices based on your knowledge base.\n\nQuestion: {{{query}}}`,
});

const ragBasedAgriculturalQAFlow = ai.defineFlow(
  {
    name: 'ragBasedAgriculturalQAFlow',
    inputSchema: RagBasedAgriculturalQAInputSchema,
    outputSchema: RagBasedAgriculturalQAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
