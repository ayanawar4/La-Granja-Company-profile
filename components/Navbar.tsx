'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
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
    // swap locale prefix in path
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || `/${next}`);
  };

  const navLinks = [
    { href: '#about',      label: t('about') },
    { href: '#values',     label: t('values') },
    { href: '#projects',   label: t('projects') },
    { href: '#egypt',      label: t('egypt') },
    { href: '#management', label: t('management') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 transition-all duration-300 ${
        scrolled
          ? 'py-3 border-b border-white/10'
          : 'py-5 border-b border-white/15'
      }`}
      style={{ background: scrolled ? 'rgba(30,42,74,0.97)' : 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-3 no-underline flex-shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#4a7c3f,#7cbf6e)' }}>
          G
        </div>
        <span className="text-white font-semibold text-lg tracking-wide hidden sm:block">
          LA <span style={{ color: '#7cbf6e' }}>GRANJA</span>
        </span>
      </a>

      {/* Nav links - desktop */}
      <div className={`hidden lg:flex items-center gap-7 ${isAr ? 'flex-row-reverse' : ''}`}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href}
            className="text-white/80 hover:text-white text-xs font-medium tracking-widest uppercase transition-colors no-underline relative group">
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
              style={{ background: '#7cbf6e' }} />
          </a>
        ))}
        <a href="#partners"
          className="text-white text-xs font-bold tracking-wider uppercase px-5 py-2 rounded no-underline transition-all duration-300 hover:opacity-90"
          style={{ background: '#4a7c3f' }}>
          {t('partners')}
        </a>

        {/* Lang toggle */}
        <button onClick={switchLocale}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 text-white cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }}
          onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = '#4a7c3f'; (e.currentTarget as HTMLElement).style.borderColor = '#4a7c3f'; }}
          onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}>
          <span>{isAr ? '🇬🇧' : '🇸🇦'}</span>
          <span>{isAr ? 'English' : 'العربية'}</span>
        </button>
      </div>

      {/* Mobile: just lang toggle */}
      <button onClick={switchLocale}
        className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-white cursor-pointer"
        style={{ background: '#4a7c3f' }}>
        <span>{isAr ? '🇬🇧' : '🇸🇦'}</span>
        <span>{isAr ? 'EN' : 'ع'}</span>
      </button>
    </nav>
  );
}
