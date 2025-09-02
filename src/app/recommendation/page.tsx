import { recommendCropsWithSustainability } from '@/ai/flows/crop-recommendation-with-sustainability';
import type { CropRecommendationInput, CropRecommendationOutput } from '@/ai/flows/crop-recommendation-with-sustainability';
import { RecommendationForm } from '@/components/agrivision/recommendation-form';

export default function RecommendationPage() {
  async function getRecommendations(
    input: CropRecommendationInput
  ): Promise<CropRecommendationOutput> {
    'use server';
    return await recommendCropsWithSustainability(input);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Crop Recommendation
        </h1>
        <p className="text-muted-foreground">
          Fill in the details below to get personalized, sustainable crop recommendations from our AI.
        </p>
      </div>
      <RecommendationForm getRecommendations={getRecommendations} />
    </div>
  );
}
