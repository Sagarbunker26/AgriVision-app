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

// Custom event to notify other components of profile changes
const PROFILE_CHANGE_EVENT = 'profileChange';

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

    // Listen for custom event to sync across components
    const handleProfileChange = () => {
      const updatedProfile = localStorage.getItem(PROFILE_KEY);
      if (updatedProfile) {
        setProfileState(JSON.parse(updatedProfile));
      }
    };
    
    window.addEventListener(PROFILE_CHANGE_EVENT, handleProfileChange);

    return () => {
      window.removeEventListener(PROFILE_CHANGE_EVENT, handleProfileChange);
    };
  }, []);

  const setProfile = useCallback((value: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setProfileState(currentProfile => {
        const newProfile = typeof value === 'function' ? value(currentProfile || defaultProfile) : value;
        localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
        // Dispatch event to notify other hooks/components
        window.dispatchEvent(new Event(PROFILE_CHANGE_EVENT));
        return newProfile;
    });
  }, []);

  return { profile, setProfile };
}
