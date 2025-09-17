
'use client';

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Leaf, Sun, Droplets } from "lucide-react";

const Logo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 110"
      className="h-20 w-20"
    >
      <path
        d="M50 10 C10 20, 10 70, 50 100 C90 70, 90 20, 50 10 Z"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="4"
      />
      <g transform="translate(25, 28) scale(0.5)">
        <path
          d="M50,85 C50,85 50,65 30,55 C40,65 45,75 50,85 M50,85 C50,85 50,65 70,55 C60,65 55,75 50,85"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M50,55 C40,45 30,30 30,15 C45,25 50,40 50,55 M50,55 C60,45 70,30 70,15 C55,25 50,40 50,55"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="4"
          fill="hsl(var(--primary-foreground))"
        />
        <path
          d="M40,50 C35,40 25,20 25,5 C35,20 40,35 40,50"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="4"
          fill="hsl(var(--primary-foreground))"
        />
        <path
          d="M60,50 C65,40 75,20 75,5 C65,20 60,35 60,50"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="4"
          fill="hsl(var(--primary-foreground))"
        />
      </g>
    </svg>
  );
  

export default function AuthPage() {
  const { login, register, loginMutation, registerMutation } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    location: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(registerData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground flex flex-col items-center justify-center p-8">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <Logo />
                </div>
              <h1 className="text-4xl font-bold">AgriVision</h1>
              <p className="text-xl opacity-90">AI-Powered Agricultural Advisor</p>
              <div className="pt-6 space-y-2 text-sm max-w-sm mx-auto">
                <div className="flex items-start gap-3">
                  <Sprout className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>Get intelligent crop recommendations based on soil, weather, and market data.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>Upload leaf photos to instantly detect diseases and get treatment advice.</span>
                </div>
                <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 mt-0.5 shrink-0" />
                    <span>Access localized weather forecasts to make timely farming decisions.</span>
                </div>
              </div>
            </div>
        </div>

        {/* Auth Forms */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" data-testid="tab-login">Sign In</TabsTrigger>
                <TabsTrigger value="register" data-testid="tab-register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="border-0 shadow-none">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                    <CardDescription>Sign in to access your dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          data-testid="input-login-email"
                          type="email"
                          placeholder="farmer@example.com"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({ ...loginData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          data-testid="input-login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({ ...loginData, password: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        data-testid="button-login"
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card className="border-0 shadow-none">
                   <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create an Account</CardTitle>
                     <CardDescription>Join our community of smart farmers.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input
                          id="register-name"
                          data-testid="input-register-name"
                          type="text"
                          placeholder="Rajesh Kumar"
                          value={registerData.name}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          data-testid="input-register-email"
                          type="email"
                          placeholder="rajesh@example.com"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-location">Location</Label>
                        <Input
                          id="register-location"
                          data-testid="input-register-location"
                          type="text"
                          placeholder="Pune, Maharashtra"
                          value={registerData.location}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, location: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          data-testid="input-register-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, password: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        data-testid="button-register"
                        className="w-full"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
