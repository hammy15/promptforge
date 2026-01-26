// Hammy Design System - Tailwind Configuration
// Features: Turquoise primary, Neumorphism, Dark mode first

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Turquoise Palette
        turquoise: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Primary
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Neumorphic backgrounds
        surface: {
          light: '#e8f4f8',
          DEFAULT: '#1a1f2e',
          dark: '#0f1319',
          elevated: '#242936',
          sunken: '#12161f',
        },
        // Semantic colors
        primary: {
          DEFAULT: '#14b8a6',
          hover: '#0d9488',
          active: '#0f766e',
          subtle: 'rgba(20, 184, 166, 0.1)',
        },
        secondary: {
          DEFAULT: '#64748b',
          hover: '#475569',
        },
        success: {
          DEFAULT: '#22c55e',
          subtle: 'rgba(34, 197, 94, 0.1)',
        },
        warning: {
          DEFAULT: '#f59e0b',
          subtle: 'rgba(245, 158, 11, 0.1)',
        },
        error: {
          DEFAULT: '#ef4444',
          subtle: 'rgba(239, 68, 68, 0.1)',
        },
      },
      boxShadow: {
        // Neumorphic shadows for dark mode
        'neu-flat': '6px 6px 12px #0a0d12, -6px -6px 12px #2a3142',
        'neu-pressed': 'inset 4px 4px 8px #0a0d12, inset -4px -4px 8px #2a3142',
        'neu-raised': '8px 8px 16px #0a0d12, -8px -8px 16px #2a3142',
        'neu-hover': '10px 10px 20px #0a0d12, -10px -10px 20px #2a3142',
        // Light mode neumorphism
        'neu-flat-light': '6px 6px 12px #c5d1d8, -6px -6px 12px #ffffff',
        'neu-pressed-light': 'inset 4px 4px 8px #c5d1d8, inset -4px -4px 8px #ffffff',
        // Glow effects
        'glow-turquoise': '0 0 20px rgba(20, 184, 166, 0.3)',
        'glow-turquoise-lg': '0 0 40px rgba(20, 184, 166, 0.4)',
      },
      backgroundImage: {
        // Gradient backgrounds
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-turquoise': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'gradient-surface': 'linear-gradient(145deg, #1e2433 0%, #161a24 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
      },
      borderRadius: {
        'neu': '16px',
        'neu-sm': '12px',
        'neu-lg': '24px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.5)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    // Custom neumorphic utilities
    function({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        '.neu-card': {
          '@apply bg-surface-elevated rounded-neu shadow-neu-flat transition-shadow duration-200': {},
        },
        '.neu-card-hover': {
          '@apply hover:shadow-neu-hover': {},
        },
        '.neu-button': {
          '@apply bg-surface-elevated rounded-neu-sm shadow-neu-flat active:shadow-neu-pressed transition-all duration-150': {},
        },
        '.neu-input': {
          '@apply bg-surface-sunken rounded-neu-sm shadow-neu-pressed border-none focus:ring-2 focus:ring-turquoise-500/50': {},
        },
        '.neu-pressed': {
          '@apply shadow-neu-pressed': {},
        },
        '.glow-border': {
          '@apply ring-2 ring-turquoise-500/30 shadow-glow-turquoise': {},
        },
      });
    },
  ],
};

export default config;
