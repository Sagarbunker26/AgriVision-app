'use client';

import { useState, useEffect, useCallback } from 'react';

export type UserProfile = {
  fullName: string;
  email: string;
  farmName: string;
  farmLocation: string;
  avatarUrl: string;
};

const defaultProfile: UserProfile = {
  fullName: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  farmName: 'Sunshine Farms',
  farmLocation: 'Punjab, India',
  avatarUrl: 'https://picsum.photos/seed/profile-avatar/100/100', // Using a seeded picsum URL for a consistent default image
};

const PROFILE_KEY = 'userProfile';

const getInitialProfile = (): UserProfile => {
  if (typeof window !== 'undefined') {
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) {
        return JSON.parse(savedProfile);
      }
    } catch (error) {
      console.error("Failed to parse user profile from localStorage", error);
    }
  }
  return defaultProfile;
};


export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    const initialProfile = getInitialProfile();
    setProfileState(initialProfile);

    // If localStorage is empty, populate it with the default profile
    if (!localStorage.getItem(PROFILE_KEY)) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
    }
  }, []);


  const setProfile = useCallback((value: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    try {
      const newProfile = typeof value === 'function' ? value(getInitialProfile()) : value;
      localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      setProfileState(newProfile);
    } catch (error) {
        console.error("Failed to save user profile to localStorage", error);
    }
  }, []);


  return { profile, setProfile };
}
