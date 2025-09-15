'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { translateText } from '@/ai/flows/translator';

type AppSettings = {
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
};

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [isTranslating, setIsTranslating] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const originalTexts = {
    preferencesTitle: 'Preferences',
    preferencesDescription: 'Customize the application to your liking.',
  };

  const [translatedTexts, setTranslatedTexts] = useState(originalTexts);

  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    emailNotifications: true,
    pushNotifications: false,
  });

  useEffect(() => {
    setMounted(true);
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleLanguageChange = async (languageCode: string) => {
    setSettings(s => ({ ...s, language: languageCode }));
    if (languageCode === 'en') {
      setTranslatedTexts(originalTexts);
      return;
    }

    setIsTranslating(true);
    try {
      const targetLanguage = languageCode === 'hi' ? 'Hindi' : 'English';
      
      const [titleResult, descriptionResult] = await Promise.all([
        translateText({ text: originalTexts.preferencesTitle, targetLanguage }),
        translateText({ text: originalTexts.preferencesDescription, targetLanguage }),
      ]);
      
      setTranslatedTexts({
        preferencesTitle: titleResult.translation,
        preferencesDescription: descriptionResult.translation,
      });

    } catch (error) {
      console.error('Translation failed:', error);
      toast({
        title: 'Translation Error',
        description: 'Could not translate the text. Please try again.',
        variant: 'destructive',
      });
      setTranslatedTexts(originalTexts); // Revert on error
    } finally {
      setIsTranslating(false);
    }
  };


  const handleSaveChanges = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    toast({
      title: 'Settings Saved!',
      description: 'Your preferences have been updated.',
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and application settings.
        </p>
      </div>
      <Separator />
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{isTranslating ? 'Translating...' : translatedTexts.preferencesTitle}</CardTitle>
            <CardDescription>
             {isTranslating ? '...' : translatedTexts.preferencesDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={handleLanguageChange}
                disabled={isTranslating}
              >
                <SelectTrigger id="language" className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="es" disabled>Spanish (coming soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Theme</Label>
               <Select
                value={theme}
                onValueChange={setTheme}
               >
                <SelectTrigger id="theme" className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive notifications from AgriVision.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates via email.</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, emailNotifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
               <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Get real-time alerts on your device.</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, pushNotifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
       <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
    </div>
  );
}
