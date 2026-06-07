import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const locales = ['en', 'ar'] as const;
type Locale = typeof locales[number];

export const metadata: Metadata = {
  title: 'La Granja Development',
  description: 'Your Life In The Heart Of Nature',
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages(locale);
  const isAr = locale === 'ar';

  return (
    <html lang={locale} dir={isAr ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cairo:wght@300;400;500;600;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: isAr ? "\'Cairo\', sans-serif" : "\'Outfit\', sans-serif" }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
