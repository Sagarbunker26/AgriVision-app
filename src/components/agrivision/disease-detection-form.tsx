'use client';
import { useState, useRef, type ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { UploadCloud, CheckCircle, AlertCircle, Leaf } from 'lucide-react';
import Image from 'next/image';
import type { ImageBasedDiseaseDetectionInput, ImageBasedDiseaseDetectionOutput } from '@/ai/flows/image-based-disease-detection';

type DiseaseDetectionFormProps = {
  getDiseasePrediction: (input: ImageBasedDiseaseDetectionInput) => Promise<ImageBasedDiseaseDetectionOutput>;
};

export function DiseaseDetectionForm({ getDiseasePrediction }: DiseaseDetectionFormProps) {
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
      setError('An error occurred while analyzing the image. Please try again.');
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

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Leaf Image</CardTitle>
          <CardDescription>Select an image of a crop leaf for analysis.</CardDescription>
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
                <p className="mt-2">Click or drag file to this area to upload</p>
                <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>

          <Button onClick={handleSubmit} disabled={!file || loading} className="w-full">
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>The AI's diagnosis of the crop leaf.</CardDescription>
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
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!loading && !result && !error && (
            <div className="text-center text-muted-foreground py-10">
              Your analysis result will appear here.
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <Alert variant={result.diseaseName.toLowerCase() === 'healthy' ? 'default' : 'destructive'} className={result.diseaseName.toLowerCase() === 'healthy' ? 'bg-green-50 border-green-200' : ''}>
                 {result.diseaseName.toLowerCase() === 'healthy' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle className="capitalize text-lg">{result.diseaseName}</AlertTitle>
              </Alert>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Confidence</label>
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
                    Treatment Advice
                </h3>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {result.treatmentAdvice || "No treatment necessary."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
