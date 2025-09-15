'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Loader2, AlertCircle, RefreshCw, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { getMarketPrices, type MarketPriceOutput } from '@/ai/flows/market-price-tracking';
import { useLanguage } from '@/hooks/use-language';

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') {
    return <ArrowUp className="h-4 w-4 text-green-500" />;
  }
  if (trend === 'down') {
    return <ArrowDown className="h-4 w-4 text-destructive" />;
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const CACHE_KEY = 'marketPricesCache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function MarketPriceCard() {
  const { t } = useLanguage();
  const [prices, setPrices] = useState<MarketPriceOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPrices = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    if (!forceRefresh) {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { timestamp, data } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setPrices(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to read from cache", e);
      }
    }


    try {
      const data = await getMarketPrices();
      setPrices(data);
      try {
        const cacheEntry = { timestamp: Date.now(), data };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
      } catch (e) {
        console.error("Failed to write to cache", e);
      }
    } catch (err: any) {
      console.error('Failed to get market prices:', err);
      if (err.message && err.message.includes('429')) {
        setError('You have exceeded the API quota. Please try again later.');
      } else if (err.message && err.message.includes('503')) {
        setError("The market service is currently busy. Please try again in a moment.");
      } else {
        setError(t('market_card.error_fetch'));
      }
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
            <CardTitle>{t('market_card.title')}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => handleFetchPrices(true)} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription>
          {t('market_card.description')}
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
                <Button onClick={() => handleFetchPrices(true)} variant="outline">Try Again</Button>
            </div>
        )}
        {!loading && !error && prices && (
             <div className="space-y-2 text-sm">
                {prices.marketPrices.map((item) => (
                    <div key={item.cropName} className="flex justify-between items-center">
                        <span>{item.cropName}</span>
                        <span className="font-medium text-primary inline-flex items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            <span className="text-base font-sans">₹</span>{item.price.toLocaleString()}
                          </span>
                           / quintal
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
