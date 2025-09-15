'use client';
import { useState, useRef, type ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { UploadCloud, CheckCircle, AlertCircle, Leaf, Ban } from 'lucide-react';
import Image from 'next/image';
import type { ImageBasedDiseaseDetectionInput, ImageBasedDiseaseDetectionOutput } from '@/ai/flows/image-based-disease-detection';
import { useLanguage } from '@/hooks/use-language';

type DiseaseDetectionFormProps = {
  getDiseasePrediction: (input: ImageBasedDiseaseDetectionInput) => Promise<ImageBasedDiseaseDetectionOutput>;
};

export function DiseaseDetectionForm({ getDiseasePrediction }: DiseaseDetectionFormProps) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageBasedDiseaseDetectionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!previewUrl) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await getDiseasePrediction({ photoDataUri: previewUrl });
      setResult(response);
    } catch (err) {
      setError(t('disease_detection_page.results.error_description'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-green-600';
    if (confidence > 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isHealthy = result && result.diseaseName.toLowerCase() === 'healthy';

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t('disease_detection_page.form.title')}</CardTitle>
          <CardDescription>{t('disease_detection_page.form.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            {previewUrl ? (
              <Image src={previewUrl} alt="Preview" width={200} height={200} className="rounded-lg object-cover h-48 w-48" />
            ) : (
              <div className="text-center text-muted-foreground">
                <UploadCloud className="mx-auto h-12 w-12" />
                <p className="mt-2">{t('disease_detection_page.form.upload_area_title')}</p>
                <p className="text-xs">{t('disease_detection_page.form.upload_area_description')}</p>
              </div>
            )}
          </div>

          <Button onClick={handleSubmit} disabled={!file || loading} className="w-full">
            {loading ? t('disease_detection_page.form.loading_button') : t('disease_detection_page.form.button')}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('disease_detection_page.results.title')}</CardTitle>
          <CardDescription>{t('disease_detection_page.results.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
             <div className="flex items-center justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
             </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('disease_detection_page.results.error_title')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!loading && !result && !error && (
            <div className="text-center text-muted-foreground py-10">
              {t('disease_detection_page.results.placeholder')}
            </div>
          )}
          {result && !result.isPlantLeaf && (
            <Alert variant="destructive">
              <Ban className="h-4 w-4" />
              <AlertTitle>{t('disease_detection_page.results.not_a_leaf')}</AlertTitle>
              <AlertDescription>{t('disease_detection_page.results.not_a_leaf_description')}</AlertDescription>
            </Alert>
          )}
          {result && result.isPlantLeaf && (
            <div className="space-y-4">
              <Alert variant={isHealthy ? 'default' : 'destructive'} className={isHealthy ? 'bg-green-50 border-green-200' : ''}>
                 {isHealthy ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle className="capitalize text-lg">{result.diseaseName}</AlertTitle>
              </Alert>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t('disease_detection_page.results.confidence')}</label>
                <div className="flex items-center gap-2">
                  <Progress value={result.confidence * 100} className="w-full" />
                  <span className={`font-bold ${getConfidenceColor(result.confidence)}`}>
                    {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary"/>
                    {t('disease_detection_page.results.advice')}
                </h3>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {result.treatmentAdvice || t('disease_detection_page.results.no_treatment')}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
