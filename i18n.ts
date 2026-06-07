import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'en';
  const validLocales = ['en', 'ar'];
  const finalLocale = validLocales.includes(locale) ? locale : 'en';
  
  return {
    locale: finalLocale,
    messages: (await import(`./messages/${finalLocale}.json`)).default,
  };
});
