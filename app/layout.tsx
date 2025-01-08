import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] });
const GA_TRACKING_ID = 'G-55XB6PC1CC';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Ai Toolbox</title>
        <meta name="description" content="Created by Lanny.dev with NextJs" />
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </Head>
      <UserProvider>
        <body className={inter.className}>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {children}
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
