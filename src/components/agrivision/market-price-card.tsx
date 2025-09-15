'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Loader2, AlertCircle, RefreshCw, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { getMarketPrices, type MarketPriceOutput } from '@/ai/flows/market-price-tracking';

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') {
    return <ArrowUp className="h-4 w-4 text-green-500" />;
  }
  if (trend === 'down') {
    return <ArrowDown className="h-4 w-4 text-destructive" />;
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

export function MarketPriceCard() {
  const [prices, setPrices] = useState<MarketPriceOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarketPrices();
      setPrices(data);
    } catch (err) {
      console.error('Failed to get market prices:', err);
      setError('Could not fetch market data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPrices();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LineChart className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Market Price Tracking</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={handleFetchPrices} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription>
          AI-generated market prices for your crops to help you sell at the right time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && !prices && (
            <div className="flex items-center justify-center h-24">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        )}
        {error && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center h-24 text-destructive">
                <AlertCircle className="h-8 w-8"/>
                <p>{error}</p>
            </div>
        )}
        {prices && (
             <div className="space-y-2 text-sm">
                {prices.marketPrices.map((item) => (
                    <div key={item.cropName} className="flex justify-between items-center">
                        <span>{item.cropName}</span>
                        <span className="font-medium text-primary inline-flex items-center gap-2">
                          {item.price.toLocaleString()} / quintal
                          <TrendIcon trend={item.trend} />
                        </span>
                    </div>
                ))}
             </div>
        )}
      </CardContent>
    </Card>
  );
}
