'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Investment() {
  const t = useTranslations('investment');

  const cards = [
    { icon: '🌱', title: t('i1title'), text: t('i1text') },
    { icon: '♻️', title: t('i2title'), text: t('i2text') },
    { icon: '📈', title: t('i3title'), text: t('i3text') },
    { icon: '📍', title: t('i4title'), text: t('i4text') },
    { icon: '🏛️', title: t('i5title'), text: t('i5text') },
    { icon: '🤝', title: t('i6title'), text: t('i6text') },
  ];

  return (
    <section id="investment" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/rw-family.jpg" alt="Investment" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(20,28,53,0.94) 0%,rgba(30,42,74,0.88) 100%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="reveal mb-12">
          <div className="text-xs tracking-[4px] uppercase font-semibold mb-4" style={{ color: '#7cbf6e' }}>
            {t('tag')}
          </div>
          <h2 className="font-serif-display font-light text-white leading-tight" style={{ fontSize: 'clamp(36px,5vw,58px)' }}>
            {t('title')} <strong className="font-semibold" style={{ color: '#7cbf6e' }}>{t('titleBold')}</strong>
          </h2>
          <div className="w-16 h-1 rounded mt-5" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} p-10 rounded border transition-all duration-300`}
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(74,124,63,0.2)';
                (e.currentTarget as HTMLElement).style.borderColor = '#7cbf6e';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              <div className="text-3xl mb-5">{c.icon}</div>
              <h3 className="font-serif-display text-xl font-semibold text-white mb-3">{c.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
