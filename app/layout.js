import './globals.css';

const SITE = 'https://arshad-ahmed-portfolio.vercel.app';

const DESC =
  'Arshad Ahmed — Senior Video Editor in Bengaluru. 7+ years cutting performance ads for fintech and small-business apps, and 900+ YouTube Shorts for finance, business and farming channels.';

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Arshad Ahmed — Senior Video Editor',
    template: '%s · Arshad Ahmed',
  },
  description: DESC,
  keywords: [
    'video editor',
    'senior video editor',
    'Bengaluru',
    'performance ads',
    'YouTube Shorts editor',
    'After Effects',
    'Premiere Pro',
    'motion graphics',
  ],
  authors: [{ name: 'Arshad Ahmed' }],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Arshad Ahmed',
    title: 'Arshad Ahmed — Senior Video Editor',
    description: DESC,
    images: [{ url: '/media/showreel-poster.jpg', width: 1280, height: 720 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arshad Ahmed — Senior Video Editor',
    description: DESC,
    images: ['/media/showreel-poster.jpg'],
  },
};

export const viewport = {
  themeColor: '#f1eee5',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
