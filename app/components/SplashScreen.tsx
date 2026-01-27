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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1a3352 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* Subtle animated chart lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 400 100" preserveAspectRatio="none">
          <path
            d="M0,80 Q50,70 100,60 T200,50 T300,40 T400,30"
            fill="none"
            stroke="#d4a853"
            strokeWidth="1"
            className="animate-chart-draw"
            style={{ strokeDasharray: '100', animationDelay: '0.5s' }}
          />
          <path
            d="M0,90 Q80,80 150,75 T280,60 T400,45"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="1"
            className="animate-chart-draw"
            style={{ strokeDasharray: '100', animationDelay: '0.8s' }}
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center neu-shadow animate-float">
            {/* Finance chart icon */}
            <svg
              className="w-14 h-14 text-[#0a1929]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
          </div>
          {/* Glow ring */}
          <div
            className="absolute inset-0 w-24 h-24 rounded-2xl animate-ping"
            style={{
              background: 'rgba(212, 168, 83, 0.2)',
              animationDuration: '2s'
            }}
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-3 animate-slide-up">
          <span style={{ color: '#d4a853' }}>Prompt</span>
          <span className="text-white">Forge</span>
        </h1>

        {/* Tagline */}
        <p className="text-[#94a3b8] text-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
          AI-Powered Financial Analysis
        </p>

        {/* Subtitle badge */}
        <div className="mt-4 px-4 py-1.5 rounded-full border animate-slide-up" style={{
          borderColor: 'rgba(212, 168, 83, 0.3)',
          background: 'rgba(212, 168, 83, 0.1)',
          animationDelay: '0.2s'
        }}>
          <span className="text-sm" style={{ color: '#d4a853' }}>
            For Finance Professionals
          </span>
        </div>

        {/* Loading indicator */}
        <div className="mt-12 flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#d4a853', animationDelay: '0s' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#d4a853', animationDelay: '0.2s' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#d4a853', animationDelay: '0.4s' }}
          />
        </div>
      </div>

      {/* Version badge */}
      <div className="absolute bottom-8 text-[#64748b] text-sm">
        v2.0.0 • 18 Finance Templates
      </div>
    </div>
  );
}
