'use client';

import { recommendCropsWithSustainability } from '@/ai/flows/crop-recommendation-with-sustainability';
import type { CropRecommendationInput, CropRecommendationOutput } from '@/ai/flows/crop-recommendation-with-sustainability';
import { RecommendationForm } from '@/components/agrivision/recommendation-form';
import { useLanguage } from '@/hooks/use-language';

export default function RecommendationPage() {
  const { t } = useLanguage();

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
          {t('recommendation_page.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('recommendation_page.description')}
        </p>
      </div>
      <RecommendationForm getRecommendations={getRecommendations} />
    </div>
  );
}
