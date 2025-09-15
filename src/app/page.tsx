import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Sprout, MessageSquare, ArrowRight } from 'lucide-react';
import { WeatherCard } from '@/components/agrivision/weather-card';
import { MarketPriceCard } from '@/components/agrivision/market-price-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to AgriVision
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered assistant for modern farming.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Crop Recommendation</CardTitle>
            </div>
            <CardDescription>
              Get AI-driven suggestions for the best crops to plant based on your farm's data.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/recommendation">
                Find Best Crops <ArrowRight className="ml-2 h-4 w-4" />
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
              <CardTitle>Disease Detection</CardTitle>
            </div>
            <CardDescription>
              Upload an image of a crop leaf to detect diseases early and get treatment advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/disease-detection">
                Analyze Crop Health <ArrowRight className="ml-2 h-4 w-4" />
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
              <CardTitle>Agricultural Q&amp;A</CardTitle>
            </div>
            <CardDescription>
              Ask our AI expert any question about farming practices, and get instant answers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/qa">
                Ask an Expert <ArrowRight className="ml-2 h-4 w-4" />
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
