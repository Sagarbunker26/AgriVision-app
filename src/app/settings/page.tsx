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
  
  const [settings, setSettings] = useState<AppSettings>({
    emailNotifications: true,
    pushNotifications: false,
  });

  useEffect(() => {
    setMounted(true);
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      // only parse notifications, language is handled by its own hook
      const parsedSettings = JSON.parse(savedSettings);
      setSettings({
        emailNotifications: parsedSettings.emailNotifications,
        pushNotifications: parsedSettings.pushNotifications,
      });
    }
  }, []);

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
            <CardTitle>{t('settings.preferences.title')}</CardTitle>
            <CardDescription>
             {t('settings.preferences.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="language">Language</Label>
              <Select
                value={language}
                onValueChange={setLanguage}
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
