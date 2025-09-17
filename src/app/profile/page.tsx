'use client';

import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useProfile, type UserProfile } from '@/hooks/use-profile';
import { useLanguage } from '@/hooks/use-language';

export default function ProfilePage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { profile, setProfile } = useProfile();
  
  // Local state to buffer changes
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Initialize local state when the main profile loads
    if (profile) {
      setLocalProfile(profile);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!localProfile) return;
    const { id, value } = e.target;
    setLocalProfile((prevProfile) => ({ ...prevProfile!, [id]: value }));
  };

  const handleSaveChanges = (e: FormEvent) => {
    e.preventDefault();
    if (localProfile) {
      setProfile(localProfile); // This now saves to localStorage
      toast({
        title: t('profile_page.toast_saved_title'),
        description: t('profile_page.toast_saved_description'),
      });
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && localProfile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result as string;
        // Update local state first
        setLocalProfile(prev => ({ ...prev!, avatarUrl: newAvatarUrl }));
        // Immediately save profile picture change
        setProfile(prev => ({ ...prev!, avatarUrl: newAvatarUrl })); 
        toast({
          title: t('profile_page.toast_picture_title'),
          description: t('profile_page.toast_picture_description'),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!localProfile) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-6">
      <input
        type="file"
        id="file-upload"
        onChange={handlePictureChange}
        className="hidden"
        accept="image/*"
      />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('profile_page.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('profile_page.description')}
        </p>
      </div>
      <Separator />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={localProfile.avatarUrl} data-ai-hint="person" alt="User Avatar" />
                <AvatarFallback>{localProfile.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{localProfile.fullName}</h2>
                <p className="text-muted-foreground">{localProfile.email}</p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <label htmlFor="file-upload" className="cursor-pointer">
                  {t('profile_page.change_picture')}
                </label>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <form onSubmit={handleSaveChanges}>
              <CardHeader>
                <CardTitle>{t('profile_page.account_details_title')}</CardTitle>
                <CardDescription>{t('profile_page.account_details_description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('profile_page.full_name')}</Label>
                    <Input id="fullName" value={localProfile.fullName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('profile_page.email')}</Label>
                    <Input id="email" type="email" value={localProfile.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmName">{t('profile_page.farm_name')}</Label>
                  <Input id="farmName" value={localProfile.farmName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmLocation">{t('profile_page.farm_location')}</Label>
                  <Input id="farmLocation" value={localProfile.farmLocation} onChange={handleInputChange} />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">{t('profile_page.save_button')}</Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
