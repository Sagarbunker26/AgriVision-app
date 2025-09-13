'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

type UserProfile = {
  fullName: string;
  email: string;
  farmName: string;
  farmLocation: string;
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Alex Vause',
    email: 'alex.vause@example.com',
    farmName: 'Sunshine Farms',
    farmLocation: 'Punjab, India',
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };
  
  const handleSaveChanges = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    toast({
      title: 'Profile Saved!',
      description: 'Your changes have been saved successfully.',
    });
  };

  return (
    <div className="space-y-6">
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
                <AvatarImage src="https://picsum.photos/100" data-ai-hint="person" alt="User Avatar" />
                <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{profile.fullName}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
               <Button variant="outline" className="w-full" onClick={() => toast({ title: 'Coming Soon!', description: 'This feature is not yet implemented.' })}>Change Picture</Button>
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
