'use client';

import { useRef, type ChangeEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/use-profile';

export default function ProfilePage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, setProfile } = useProfile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };
  
  const handleSaveChanges = () => {
    // The useProfile hook handles saving to localStorage automatically
    toast({
      title: 'Profile Saved!',
      description: 'Your changes have been saved successfully.',
    });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, avatarUrl: reader.result as string }));
        toast({
            title: 'Picture Updated!',
            description: 'Your new avatar is now active.',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (!profile) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-6">
       <input
        type="file"
        ref={fileInputRef}
        onChange={handlePictureChange}
        className="hidden"
        accept="image/*"
      />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          User Profile
        </h1>
        <p className="text-muted-foreground">
          View and manage your personal and farm details.
        </p>
      </div>
      <Separator />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center space-y-4">
               <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatarUrl} data-ai-hint="person" alt="User Avatar" />
                <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{profile.fullName}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
               <Button variant="outline" className="w-full" onClick={triggerFileUpload}>Change Picture</Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Update your personal and farm information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={profile.fullName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={profile.email} onChange={handleInputChange} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input id="farmName" value={profile.farmName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="farmLocation">Farm Location</Label>
                    <Input id="farmLocation" value={profile.farmLocation} onChange={handleInputChange} />
                </div>
                 <div className="flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
