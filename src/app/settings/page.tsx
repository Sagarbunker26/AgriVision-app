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
import { useLanguage } from '@/hooks/use-language';

type AppSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
};

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // Local state to buffer notification settings
  const [localSettings, setLocalSettings] = useState<AppSettings>({
    emailNotifications: true,
    pushNotifications: false,
  });

  useEffect(() => {
    setMounted(true);
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setLocalSettings({
          emailNotifications: parsedSettings.emailNotifications,
          pushNotifications: parsedSettings.pushNotifications,
        });
      } catch (e) {
        console.error("Failed to parse settings from localStorage", e);
      }
    }
  }, []);

  const handleSaveChanges = () => {
    // Language and Theme are saved by their respective hooks/providers.
    // We only need to save the notification settings here.
    localStorage.setItem('appSettings', JSON.stringify(localSettings));
    toast({
      title: t('settings_page.toast_saved_title'),
      description: t('settings_page.toast_saved_description'),
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('settings_page.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('settings_page.description')}
        </p>
      </div>
      <Separator />
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings_page.preferences.title')}</CardTitle>
            <CardDescription>
             {t('settings_page.preferences.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="language">{t('settings_page.preferences.language')}</Label>
              <Select
                value={language}
                onValueChange={setLanguage}
              >
                <SelectTrigger id="language" className="w-[180px]">
                  <SelectValue placeholder={t('settings_page.preferences.select_language')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('languages.en')}</SelectItem>
                  <SelectItem value="hi">{t('languages.hi')}</SelectItem>
                  <SelectItem value="es" disabled>{t('languages.es')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">{t('settings_page.preferences.theme')}</Label>
               <Select
                value={theme}
                onValueChange={setTheme}
               >
                <SelectTrigger id="theme" className="w-[180px]">
                  <SelectValue placeholder={t('settings_page.preferences.select_theme')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t('themes.light')}</SelectItem>
                  <SelectItem value="dark">{t('themes.dark')}</SelectItem>
                  <SelectItem value="system">{t('themes.system')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('settings_page.notifications.title')}</CardTitle>
            <CardDescription>
              {t('settings_page.notifications.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">{t('settings_page.notifications.email')}</Label>
                <p className="text-xs text-muted-foreground">{t('settings_page.notifications.email_description')}</p>
              </div>
              <Switch
                id="email-notifications"
                checked={localSettings.emailNotifications}
                onCheckedChange={(checked) => setLocalSettings(s => ({ ...s, emailNotifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
               <div>
                <Label htmlFor="push-notifications">{t('settings_page.notifications.push')}</Label>
                <p className="text-xs text-muted-foreground">{t('settings_page.notifications.push_description')}</p>
              </div>
              <Switch
                id="push-notifications"
                checked={localSettings.pushNotifications}
                onCheckedChange={(checked) => setLocalSettings(s => ({ ...s, pushNotifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
       <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>{t('settings_page.save_button')}</Button>
        </div>
    </div>
  );
}
