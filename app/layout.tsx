import type { Metadata, Viewport } from 'next';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/jetbrains-mono/400.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dhivakar B · Unmasked · AI & Data Science',
  description: 'B.Tech Artificial Intelligence & Data Science student. Strong in SQL, Python, Power BI, Excel, and data analysis.',
  openGraph: {
    title: 'Dhivakar B · AI & Data Science Portfolio',
    description: "Everyone wanted to know what's under the mask. Scroll to explore the data journey.",
    images: ['/stills/face.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#000000', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
