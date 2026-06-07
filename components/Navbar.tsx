'use client';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isAr = locale === 'ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    // Replace /en/ or /ar/ prefix
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#values', label: t('values') },
    { href: '#projects', label: t('projects') },
    { href: '#egypt', label: t('egypt') },
    { href: '#management', label: t('management') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 transition-all duration-400 ${
        scrolled
          ? 'bg-navy/97 backdrop-blur-md py-3 border-b border-white/10'
          : 'bg-white/5 backdrop-blur-sm py-5 border-b border-white/15'
      }`}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-3 no-underline">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ background: 'linear-gradient(135deg, #4a7c3f, #7cbf6e)' }}
        >
          G
        </div>
        <span className="text-white font-semibold text-lg tracking-wide">
          LA <span style={{ color: '#7cbf6e' }}>GRANJA</span>
        </span>
      </a>

      {/* Nav links */}
      <div className={`hidden lg:flex items-center gap-8 ${isAr ? 'flex-row-reverse' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white/80 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors duration-300 no-underline relative group"
          >
            {link.label}
            <span
              className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
              style={{ background: '#7cbf6e' }}
            />
          </a>
        ))}

        {/* Partners CTA */}
        <a
          href="#partners"
          className="text-white text-sm font-semibold tracking-wider uppercase px-5 py-2 rounded no-underline transition-all duration-300"
          style={{ background: '#4a7c3f' }}
          onMouseOver={e => (e.currentTarget.style.background = '#6aaa5b')}
          onMouseOut={e => (e.currentTarget.style.background = '#4a7c3f')}
        >
          {t('partners')}
        </a>

        {/* Language toggle */}
        <button
          onClick={switchLocale}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border"
          style={{
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.3)',
            color: 'white',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#4a7c3f';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#4a7c3f';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
          }}
        >
          <span>{isAr ? '🇬🇧' : '🇸🇦'}</span>
          <span>{isAr ? 'English' : 'العربية'}</span>
        </button>
      </div>

      {/* Mobile lang toggle */}
      <button
        onClick={switchLocale}
        className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold border text-white"
        style={{ background: '#4a7c3f', borderColor: '#4a7c3f' }}
      >
        <span>{isAr ? '🇬🇧' : '🇸🇦'}</span>
        <span>{isAr ? 'EN' : 'ع'}</span>
      </button>
    </nav>
  );
}
