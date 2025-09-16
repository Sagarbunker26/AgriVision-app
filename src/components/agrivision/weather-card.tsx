'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudSun, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { getWeatherForecast, type WeatherForecastOutput } from '@/ai/flows/weather-forecast';
import { useLanguage } from '@/hooks/use-language';

const CACHE_KEY = 'weatherForecastCache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function WeatherCard() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherForecastOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationAvailable, setLocationAvailable] = useState(false);

  const handleFetchWeather = (forceRefresh = false) => {
    if (!navigator.geolocation) {
      setError(t('weather_card.error_geolocation'));
      return;
    }

    setLoading(true);
    setError(null);
    
    if (!forceRefresh) {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const { timestamp, data } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setWeather(data);
                    setLoading(false);
                    return;
                }
            }
        } catch (e) {
            console.error("Failed to read weather from cache", e);
        }
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const forecast = await getWeatherForecast({ latitude, longitude });
          setWeather(forecast);
          try {
            const cacheEntry = { timestamp: Date.now(), data: forecast };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
          } catch(e) {
            console.error("Failed to write weather to cache", e);
          }
        } catch (err: any) {
          console.error('Failed to get weather forecast:', err);
          if (err.message && (err.message.includes('429') || err.message.includes('quota'))) {
            setError("You've exceeded the daily limit for weather forecasts. Please try again tomorrow.");
          } else if (err.message && err.message.includes('503')) {
            setError("The weather service is currently busy. Please try again in a moment.");
          } else {
            setError(t('weather_card.error_fetch'));
          }
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(t('weather_card.error_permission'));
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.permissions !== 'undefined') {
        navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
            setLocationAvailable(permissionStatus.state === 'granted' || permissionStatus.state === 'prompt');
            if (permissionStatus.state === 'granted') {
                handleFetchWeather();
            }
        });
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CloudSun className="h-6 w-6 text-muted-foreground" />
            <CardTitle>{t('weather_card.title')}</CardTitle>
          </div>
          {weather && (
            <Button variant="ghost" size="icon" onClick={() => handleFetchWeather(true)} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>
        <CardDescription>
          {t('weather_card.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!weather && !loading && !error && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center h-24">
                <p className="text-muted-foreground">{locationAvailable ? t('weather_card.prompt') : t('weather_card.error_geolocation')}</p>
                {locationAvailable && <Button onClick={() => handleFetchWeather(true)}>{t('weather_card.get_weather')}</Button>}
            </div>
        )}
        {loading && (
            <div className="flex items-center justify-center h-24">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="ml-4 text-muted-foreground">{t('weather_card.loading')}</p>
            </div>
        )}
        {error && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center h-24 text-destructive">
                <AlertCircle className="h-8 w-8"/>
                <p>{error}</p>
                <Button onClick={() => handleFetchWeather(true)} variant="outline">{t('weather_card.try_again')}</Button>
            </div>
        )}
        {weather && !loading && !error && (
            <>
                <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold">{weather.temperature}°C</p>
                    <p className="text-muted-foreground">{weather.conditions}</p>
                </div>
                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>{t('weather_card.humidity')}: {weather.humidity}%</span>
                    <span>{t('weather_card.wind')}: {weather.windSpeed} km/h</span>
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
}
