'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { CropRecommendationInput, CropRecommendationOutput } from '@/ai/flows/crop-recommendation-with-sustainability';

const formSchema = z.object({
  soilPh: z.number().min(0).max(14),
  soilNpk: z.string().min(1, 'NPK values are required.'),
  weatherConditions: z.string().min(1, 'Weather conditions are required.'),
  marketData: z.string().min(1, 'Market data is required.'),
});

type RecommendationFormProps = {
  getRecommendations: (input: CropRecommendationInput) => Promise<CropRecommendationOutput>;
};

const RupeeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 inline-block mr-1"
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 13h12" />
    <path d="M14.5 8a5.5 5.5 0 0 1 -5.5 5.5h-1a5.5 5.5 0 0 0 0 11" />
  </svg>
);

export function RecommendationForm({ getRecommendations }: RecommendationFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropRecommendationOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soilPh: 7.0,
      soilNpk: '12-10-12',
      weatherConditions: 'Sunny, 25°C, moderate rainfall expected',
      marketData: 'Stable prices for grains, high demand for vegetables',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await getRecommendations(values);
      setResult(response);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      // Here you would show an error toast
    } finally {
      setLoading(false);
    }
  }

  const getSustainabilityBadge = (score: number) => {
    if (score > 75) return <Badge className="bg-green-600 text-white">High</Badge>;
    if (score > 40) return <Badge className="bg-yellow-500 text-white">Medium</Badge>;
    return <Badge variant="destructive">Low</Badge>;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Farm Inputs</CardTitle>
          <CardDescription>Enter your farm's data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="soilPh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil pH: {field.value.toFixed(1)}</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={14}
                        step={0.1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soilNpk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil NPK</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 12-10-12" {...field} />
                    </FormControl>
                    <FormDescription>Nitrogen-Phosphorus-Potassium values.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Conditions</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sunny, 25°C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Data</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., High demand for vegetables" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Our AI has analyzed your data and suggests the following crops.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex items-center justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
            {!loading && !result && (
              <div className="text-center text-muted-foreground py-10">
                Your crop recommendations will appear here.
              </div>
            )}
            {result && result.cropRecommendations && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop</TableHead>
                      <TableHead>Yield (kg/ha)</TableHead>
                      <TableHead>Profit (est.)</TableHead>
                      <TableHead>Sustainability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.cropRecommendations.map((rec) => (
                      <TableRow key={rec.cropName}>
                        <TableCell className="font-medium">{rec.cropName}</TableCell>
                        <TableCell>{rec.yieldPrediction.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center"><RupeeIcon />{rec.profitPrediction.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          {getSustainabilityBadge(rec.sustainabilityScore)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
