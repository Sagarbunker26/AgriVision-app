import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Sprout, MessageSquare, CloudSun, LineChart, ArrowRight } from 'lucide-react';

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
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <CloudSun className="h-6 w-6 text-muted-foreground" />
              <CardTitle>Localized Weather Forecast</CardTitle>
            </div>
            <CardDescription>
              Real-time weather updates for your farm's location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold">24°C</p>
              <p className="text-muted-foreground">Sunny with light breeze</p>
            </div>
            <div className="mt-4 flex justify-between text-sm text-muted-foreground">
              <span>Humidity: 65%</span>
              <span>Wind: 10 km/h</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <LineChart className="h-6 w-6 text-muted-foreground" />
              <CardTitle>Market Price Tracking</CardTitle>
            </div>
            <CardDescription>
              Current market prices for your crops to help you sell at the right time.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Wheat</span>
                    <span className="font-medium text-primary">&#8377;2,275 / quintal</span>
                </div>
                 <div className="flex justify-between">
                    <span>Rice</span>
                    <span className="font-medium text-primary">&#8377;2,183 / quintal</span>
                </div>
                 <div className="flex justify-between">
                    <span>Corn</span>
                    <span className="font-medium text-destructive">&#8377;2,050 / quintal ▼</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
