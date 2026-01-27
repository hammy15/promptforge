'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center neu-shadow animate-float">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
              />
            </svg>
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-2xl bg-teal-500/20 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-3 animate-slide-up">
          <span className="text-teal-400">Prompt</span>
          <span className="text-white">Forge</span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-400 text-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Craft perfect AI prompts
        </p>

        {/* Loading indicator */}
        <div className="mt-12 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Version badge */}
      <div className="absolute bottom-8 text-gray-600 text-sm">
        v1.0.0 • 24 Features
      </div>
    </div>
  );
}
