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

// This function now runs on the client-side only
const getInitialProfile = (): UserProfile => {
  if (typeof window === 'undefined') {
    return defaultProfile;
  }
  try {
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
  } catch (error) {
    console.error("Failed to parse user profile from localStorage", error);
  }
  // If nothing is saved, save and return the default profile
  localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
  return defaultProfile;
};


export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile>(getInitialProfile);

  const setProfile = useCallback((value: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setProfileState(prevProfile => {
        const newProfile = typeof value === 'function' ? value(prevProfile) : value;
        try {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
        } catch (error) {
            console.error("Failed to save user profile to localStorage", error);
        }
        return newProfile;
    });
  }, []);


  return { profile, setProfile };
}
