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
import { useLanguage } from '@/hooks/use-language';

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
      <path d="M15 8.5a2.5 2.5 0 0 0-5 0V9h5v0z" />
      <path d="M12 16.5a2.5 2.5 0 0 1-5 0V16h5v.5z" />
      <path d="M10 9.5a2.5 2.5 0 0 1 5 0V10h-5v-.5z" />
      <path d="M15 15.5a2.5 2.5 0 0 0-5 0V16h5v-.5z" />
      <path d="M5 6h14" />
      <path d="M5 18h14" />
      <path d="M12 6V5" />
      <path d="M12 19v-1" />
    </svg>
  );

export function RecommendationForm({ getRecommendations }: RecommendationFormProps) {
  const { t } = useLanguage();
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
    if (score > 75) return <Badge className="bg-green-600 text-white">{t('recommendation_page.results.sustainability_high')}</Badge>;
    if (score > 40) return <Badge className="bg-yellow-500 text-white">{t('recommendation_page.results.sustainability_medium')}</Badge>;
    return <Badge variant="destructive">{t('recommendation_page.results.sustainability_low')}</Badge>;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>{t('recommendation_page.form.title')}</CardTitle>
          <CardDescription>{t('recommendation_page.form.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="soilPh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('recommendation_page.form.soil_ph')}: {field.value.toFixed(1)}</FormLabel>
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
                    <FormLabel>{t('recommendation_page.form.soil_npk')}</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 12-10-12" {...field} />
                    </FormControl>
                    <FormDescription>{t('recommendation_page.form.npk_description')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('recommendation_page.form.weather')}</FormLabel>
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
                    <FormLabel>{t('recommendation_page.form.market')}</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., High demand for vegetables" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? t('recommendation_page.form.loading_button') : t('recommendation_page.form.button')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('recommendation_page.results.title')}</CardTitle>
            <CardDescription>
              {t('recommendation_page.results.description')}
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
                {t('recommendation_page.results.placeholder')}
              </div>
            )}
            {result && result.cropRecommendations && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('recommendation_page.results.crop')}</TableHead>
                      <TableHead>{t('recommendation_page.results.yield')}</TableHead>
                      <TableHead>{t('recommendation_page.results.profit')}</TableHead>
                      <TableHead>{t('recommendation_page.results.sustainability')}</TableHead>
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
