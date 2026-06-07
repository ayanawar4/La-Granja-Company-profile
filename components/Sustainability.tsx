'use client';
import { useTranslations } from 'next-intl';

export default function Sustainability() {
  const t = useTranslations('sustainability');

  const features = [
    { icon: '🌿', title: t('f1title'), text: t('f1text') },
    { icon: '🌾', title: t('f2title'), text: t('f2text') },
    { icon: '💧', title: t('f3title'), text: t('f3text') },
    { icon: '🌳', title: t('f4title'), text: t('f4text') },
  ];

  return (
    <section id="sustainability" className="py-28 relative overflow-hidden" style={{ background: '#1e2a4a' }}>
      <div
        className="absolute top-0 start-0 w-2/3 h-full opacity-15"
        style={{ background: 'radial-gradient(ellipse, rgba(74,124,63,1) 0%, transparent 70%)' }}
      />
      <div className="max-w-6xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="reveal">
              <div className="text-xs tracking-[4px] uppercase font-semibold mb-4" style={{ color: '#7cbf6e' }}>
                {t('tag')}
              </div>
              <h2 className="font-serif-display font-light text-white leading-tight mb-5" style={{ fontSize: 'clamp(36px,5vw,58px)' }}>
                {t('title')} <strong className="font-semibold" style={{ color: '#7cbf6e' }}>{t('titleBold')}</strong>
              </h2>
              <div className="w-16 h-1 rounded" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
            </div>
            <div className="reveal reveal-delay-1 mt-8 space-y-5 text-base text-white/75 leading-loose">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
            </div>
          </div>
          <div className="reveal reveal-delay-2 grid grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div key={i} className="p-7 rounded border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="font-semibold mb-2" style={{ color: '#7cbf6e' }}>{f.title}</div>
                <div className="text-xs text-white/60 leading-relaxed">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
