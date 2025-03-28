import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider";
import Script from 'next/script';
import CookieConsent from '@/components/cookie-consent';

export const metadata: Metadata = {
  title: 'Hawkins Consciousness Scale',
  description: 'Explore the levels of consciousness as described by Dr. David R. Hawkins',
  generator: 'v0.dev',
  icons: {
    icon: '/hawkings.png',
    apple: '/hawkings.png',
  },
  openGraph: {
    title: 'Hawkins Consciousness Scale',
    description: 'Discover your consciousness level based on Dr. David R. Hawkins\' scale of consciousness.',
    images: [
      {
        url: '/hawkings.png',
        width: 800,
        height: 800,
        alt: 'Hawkins Consciousness Scale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hawkins Consciousness Scale',
    description: 'Discover your consciousness level based on Dr. David R. Hawkins\' scale of consciousness.',
    images: ['/hawkings.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prata&family=Young+Serif&display=swap" rel="stylesheet" />
        <style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prata&family=Young+Serif&display=swap');
</style>
        {/* Google Analytics - Modified for GDPR compliance */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-06E454G91R`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Disable GA by default until consent is given
              window['ga-disable-G-06E454G91R'] = true;
              
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
              
              gtag('config', 'G-06E454G91R', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
              });
              
              // Check if consent was previously given
              if (typeof localStorage !== 'undefined' && localStorage.getItem('cookieConsent') === 'accepted') {
                window['ga-disable-G-06E454G91R'] = false;
                gtag('consent', 'update', {
                  'analytics_storage': 'granted'
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-poppins font-light bg-[#f8f7f2] text-[#2a2a2a]">
        <ThemeProvider
          attribute="class"
          defaultTheme="zen"
          enableSystem
          themes={["light", "dark", "zen"]}
        >
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
