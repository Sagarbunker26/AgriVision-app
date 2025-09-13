import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
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
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Alex Vause</h2>
                <p className="text-muted-foreground">alex.vause@example.com</p>
              </div>
               <Button variant="outline" className="w-full">Change Picture</Button>
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
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Alex Vause" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex.vause@example.com" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="farm-name">Farm Name</Label>
                    <Input id="farm-name" defaultValue="Sunshine Farms" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="farm-location">Farm Location</Label>
                    <Input id="farm-location" defaultValue="Punjab, India" />
                </div>
                 <div className="flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
