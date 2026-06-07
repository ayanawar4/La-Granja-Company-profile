'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Villa() {
  const t = useTranslations('villa');

  const features = [
    { icon: '🌿', title: t('f1title'), text: t('f1text') },
    { icon: '❤️', title: t('f2title'), text: t('f2text') },
    { icon: '♻️', title: t('f3title'), text: t('f3text') },
    { icon: '💰', title: t('f4title'), text: t('f4text') },
  ];

  return (
    <section id="villa" className="py-28 relative overflow-hidden" style={{ background: '#141c35' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(74,124,63,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(30,42,74,0.5) 0%, transparent 50%)',
        }}
      />
      <div className="max-w-6xl mx-auto px-8 lg:px-12 relative z-10">
        {/* Hero image banner */}
        <div className="reveal mb-16 rounded-lg overflow-hidden relative h-72 shadow-2xl">
          <Image src="/rw-horses.jpg" alt="Rayan West Lifestyle" fill className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(20,28,53,0.8) 0%, transparent 60%)' }} />
          <div className="absolute bottom-7 start-9">
            <div className="text-xs tracking-[3px] uppercase mb-2 font-medium" style={{ color: '#7cbf6e' }}>
              {t('tag')}
            </div>
            <div className="font-serif-display text-3xl font-semibold text-white">Andalusian-Inspired Villas</div>
          </div>
        </div>

        <div className="reveal">
          <h2 className="font-serif-display font-light text-white mb-16 leading-tight" style={{ fontSize: 'clamp(48px,7vw,90px)' }}>
            <span style={{ color: '#7cbf6e', fontWeight: 700 }}>{t('l1')}</span><br />
            <span style={{ color: '#7cbf6e', fontWeight: 700 }}>{t('l2')}</span><br />
            <span style={{ color: '#7cbf6e', fontWeight: 700 }}>{t('l3')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal reveal-delay-1 text-white/75 text-base leading-loose space-y-5">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
            <a
              href="#projects"
              className="inline-block mt-4 px-10 py-4 text-white text-sm font-bold tracking-widest uppercase rounded no-underline"
              style={{ background: '#4a7c3f', boxShadow: '0 8px 30px rgba(74,124,63,0.4)' }}
            >
              {t('btn')}
            </a>
          </div>

          <div className="reveal reveal-delay-2 flex flex-col gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-5 rounded border transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(74,124,63,0.2)')}
                onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-xs text-white/60 leading-relaxed">{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
