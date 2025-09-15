import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Sprout, MessageSquare, LineChart, ArrowRight } from 'lucide-react';
import { WeatherCard } from '@/components/agrivision/weather-card';

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
    <path d="M15 8.5a4 4 0 1 0-8 0" />
    <path d="M6.5 14H18" />
    <path d="M8 18h10" />
    <path d="M6 18h.01" />
  </svg>
);


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
                    <span className="font-medium text-primary inline-flex items-center"><RupeeIcon />2,275 / quintal</span>
                </div>
                 <div className="flex justify-between">
                    <span>Rice</span>
                    <span className="font-medium text-primary inline-flex items-center"><RupeeIcon />2,183 / quintal</span>
                </div>
                 <div className="flex justify-between">
                    <span>Corn</span>
                    <span className="font-medium text-destructive inline-flex items-center"><RupeeIcon />2,050 / quintal ▼</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
