import type { ImageBasedDiseaseDetectionInput, ImageBasedDiseaseDetectionOutput } from '@/ai/flows/image-based-disease-detection';
import { imageBasedDiseaseDetection } from '@/ai/flows/image-based-disease-detection';
import { DiseaseDetectionForm } from '@/components/agrivision/disease-detection-form';

export default function DiseaseDetectionPage() {
  async function getDiseasePrediction(
    input: ImageBasedDiseaseDetectionInput
  ): Promise<ImageBasedDiseaseDetectionOutput> {
    'use server';
    return await imageBasedDiseaseDetection(input);
  }

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Image-Based Disease Detection
        </h1>
        <p className="text-muted-foreground">
          Upload a photo of a crop leaf to get an instant AI-powered health analysis.
        </p>
      </div>
      <DiseaseDetectionForm getDiseasePrediction={getDiseasePrediction} />
    </div>
  );
}
