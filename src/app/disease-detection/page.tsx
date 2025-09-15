'use client';

import type { ImageBasedDiseaseDetectionInput, ImageBasedDiseaseDetectionOutput } from '@/ai/flows/image-based-disease-detection';
import { imageBasedDiseaseDetection } from '@/ai/flows/image-based-disease-detection';
import { DiseaseDetectionForm } from '@/components/agrivision/disease-detection-form';
import { useLanguage } from '@/hooks/use-language';

export default function DiseaseDetectionPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('disease_detection_page.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('disease_detection_page.description')}
        </p>
      </div>
      <DiseaseDetectionForm getDiseasePrediction={imageBasedDiseaseDetection} />
    </div>
  );
}
