import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PromptForge - AI Prompt Generator',
  description: 'Build, test, and optimize AI prompts with 24 powerful features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
