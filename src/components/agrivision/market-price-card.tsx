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
      className="h-4 w-4 inline-block"
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


export function MarketPriceCard() {
  const { t } = useLanguage();
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
      setError(t('market_card.error_fetch'));
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
          <Button variant="ghost" size="icon" onClick={handleFetchPrices} disabled={loading}>
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
            </div>
        )}
        {prices && (
             <div className="space-y-2 text-sm">
                {prices.marketPrices.map((item) => (
                    <div key={item.cropName} className="flex justify-between items-center">
                        <span>{item.cropName}</span>
                        <span className="font-medium text-primary inline-flex items-center gap-2">
                          <RupeeIcon /> {item.price.toLocaleString()} / quintal
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
