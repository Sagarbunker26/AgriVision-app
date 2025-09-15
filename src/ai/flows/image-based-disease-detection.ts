'use server';
/**
 * @fileOverview Analyzes uploaded crop leaf images to predict potential plant diseases.
 *
 * - imageBasedDiseaseDetection - A function that handles the image-based disease detection process.
 * - ImageBasedDiseaseDetectionInput - The input type for the imageBasedDiseaseDetection function.
 * - ImageBasedDiseaseDetectionOutput - The return type for the imageBasedDiseaseDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageBasedDiseaseDetectionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageBasedDiseaseDetectionInput = z.infer<typeof ImageBasedDiseaseDetectionInputSchema>;

const ImageBasedDiseaseDetectionOutputSchema = z.object({
  isPlantLeaf: z.boolean().describe('Whether the image appears to be a plant leaf.'),
  diseaseName: z.string().describe('The predicted disease name, or "healthy" if no disease is detected.'),
  confidence: z.number().describe('The confidence level of the disease prediction (0-1).'),
  treatmentAdvice: z.string().describe('Advice on how to treat the disease, if applicable.'),
});
export type ImageBasedDiseaseDetectionOutput = z.infer<typeof ImageBasedDiseaseDetectionOutputSchema>;

export async function imageBasedDiseaseDetection(input: ImageBasedDiseaseDetectionInput): Promise<ImageBasedDiseaseDetectionOutput> {
  return imageBasedDiseaseDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageBasedDiseaseDetectionPrompt',
  input: {schema: ImageBasedDiseaseDetectionInputSchema},
  output: {schema: ImageBasedDiseaseDetectionOutputSchema},
  prompt: `You are an expert in plant pathology. Analyze the provided image.

  First, determine if the image is a clear picture of a single plant leaf. Set 'isPlantLeaf' to true or false.
  
  If it is a plant leaf, predict any potential diseases. Provide the disease name and a confidence level (0-1). If no disease is detected, return \"healthy\" as the disease name. Also provide treatment advice.
  
  If it is not a plant leaf, return default values for the other fields.

  Image: {{media url=photoDataUri}}
  `,
});

const imageBasedDiseaseDetectionFlow = ai.defineFlow(
  {
    name: 'imageBasedDiseaseDetectionFlow',
    inputSchema: ImageBasedDiseaseDetectionInputSchema,
    outputSchema: ImageBasedDiseaseDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
