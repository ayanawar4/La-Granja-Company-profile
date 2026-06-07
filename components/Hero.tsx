'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 hero-zoom"
        style={{
          backgroundImage: `linear-gradient(160deg, rgba(20,28,53,0.88) 0%, rgba(30,42,74,0.6) 40%, rgba(74,124,63,0.3) 100%), url('/rw-sunset.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="hero-fade-1 text-xs tracking-[4px] uppercase mb-5 font-medium" style={{ color: '#7cbf6e' }}>
          {t('eyebrow')}
        </div>
        <h1 className="hero-fade-2 font-serif-display text-white leading-none mb-3" style={{ fontSize: 'clamp(60px,10vw,120px)', fontWeight: 300 }}>
          {t('title1')} <strong style={{ fontWeight: 700, color: '#7cbf6e' }}>{t('title2')}</strong>
        </h1>
        <p className="hero-fade-3 font-serif-display italic text-white/75 mb-10" style={{ fontSize: 'clamp(18px,2.5vw,28px)' }}>
          {t('sub')}
        </p>
        <p className="hero-fade-3 text-white/70 text-base leading-relaxed mb-12 max-w-xl mx-auto">
          {t('desc')}
        </p>
        <div className="hero-fade-4 flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-10 py-4 text-white text-sm font-bold tracking-widest uppercase rounded no-underline transition-all duration-300"
            style={{ background: '#4a7c3f', boxShadow: '0 8px 30px rgba(74,124,63,0.4)' }}
          >
            {t('btn1')}
          </a>
          <a
            href="#about"
            className="px-10 py-4 text-white text-sm font-medium tracking-widest uppercase rounded no-underline border transition-all duration-300"
            style={{ borderColor: 'rgba(255,255,255,0.4)' }}
          >
            {t('btn2')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-bounce absolute bottom-9 left-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-[2px] uppercase">
        <span>{t('scroll')}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}
