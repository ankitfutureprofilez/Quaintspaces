import React from 'react';
import { useFonts } from '@next/react-font-loader';
import '../styles/globals.css'; // Import global styles here

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load the Inter font with Latin subset
  const [fontsLoaded] = useFonts({
    Inter: {
      subsets: ['latin'],
    },
  });

  return (
    <html lang="en">
      <head>
        <style jsx global>{`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </head>
      <body>{fontsLoaded && children}</body>
    </html>
  );
}
