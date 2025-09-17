'use client';

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Leaf, Sun, Droplets } from "lucide-react";
import Image from "next/image";

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
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Hero Section */}
        <div className="lg:flex-1 relative overflow-hidden">
           <Image
            src="https://picsum.photos/seed/farm-hero/1200/800"
            alt="Lush green farm field"
            fill
            className="object-cover"
            data-ai-hint="farm field"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <div className="text-6xl mb-4">🌱</div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">AgriVision</h1>
              <p className="text-lg lg:text-xl opacity-90 mb-6">Smart Farming Solutions</p>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Sprout className="w-5 h-5 mr-2" />
                  <span>Crop Recommendations</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  <span>Disease Diagnosis</span>
                </div>
              </div>
              <div className="flex justify-center space-x-6 text-sm mt-2">
                <div className="flex items-center">
                  <Sun className="w-5 h-5 mr-2" />
                  <span>Weather Insights</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 mr-2" />
                  <span>AI Chat Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="lg:flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" data-testid="tab-login">Sign In</TabsTrigger>
                <TabsTrigger value="register" data-testid="tab-register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl">Welcome Back</CardTitle>
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
                  <CardHeader>
                    <CardTitle className="text-xl">Create Account</CardTitle>
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
