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
  fullName: 'Alex Vause',
  email: 'alex.vause@example.com',
  farmName: 'Sunshine Farms',
  farmLocation: 'Punjab, India',
  avatarUrl: 'https://picsum.photos/seed/123/100/100', // Using a seeded picsum URL for a consistent default image
};

const PROFILE_KEY = 'userProfile';

export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Load initial profile from localStorage
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) {
        setProfileState(JSON.parse(savedProfile));
      } else {
        // If no profile is saved, use the default and save it
        setProfileState(defaultProfile);
        localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
      }
    } catch (error) {
        console.error("Failed to parse user profile from localStorage", error);
        setProfileState(defaultProfile);
    }
  }, []);

  const setProfile = useCallback((value: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    const newProfile = typeof value === 'function' ? value(profile || defaultProfile) : value;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    setProfileState(newProfile);
  }, [profile]);


  return { profile, setProfile };
}
