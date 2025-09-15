'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Sprout, MessageSquare, ArrowRight } from 'lucide-react';
import { WeatherCard } from '@/components/agrivision/weather-card';
import { MarketPriceCard } from '@/components/agrivision/market-price-card';
import { useLanguage } from '@/hooks/use-language';

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('dashboard.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('dashboard.description')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t('dashboard.recommendation.title')}</CardTitle>
            </div>
            <CardDescription>
              {t('dashboard.recommendation.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/recommendation">
                {t('dashboard.recommendation.button')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t('dashboard.disease_detection.title')}</CardTitle>
            </div>
            <CardDescription>
              {t('dashboard.disease_detection.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/disease-detection">
                {t('dashboard.disease_detection.button')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t('dashboard.qa.title')}</CardTitle>
            </div>
            <CardDescription>
              {t('dashboard.qa.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/qa">
                {t('dashboard.qa.button')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <WeatherCard />
        <MarketPriceCard />
      </div>
    </div>
  );
}
