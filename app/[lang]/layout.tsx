import '@/app/globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Geist_Mono } from 'next/font/google';
import { getAppDirection } from '@/lib/helper';
import { appConfig } from '@/core/constants/app';
import { I18nProvider } from '@/core/i18n/I18nProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getLanguage, Locale } from '@/core/i18n/languages';

const fontSans = 'SF Pro Display, system-ui, -apple-system, sans-serif';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${appConfig.name} | E-Commerce Store`,
  description: `Shop the latest products at ${appConfig.name} — a modern e-commerce store with great deals.`,
};

export async function generateStaticParams() {
  return appConfig.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const locale = langParam as Locale;
  const lang = await getLanguage(locale);
  const dir = getAppDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistMono.variable} h-full antialiased`}
      style={{ fontFamily: fontSans }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider locale={locale} lang={lang}>
          <TooltipProvider>
            <Navbar />
            {children}
          </TooltipProvider>
        </I18nProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
