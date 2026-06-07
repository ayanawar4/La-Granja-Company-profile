'use client';
import { useTranslations } from 'next-intl';

export default function Egypt() {
  const t = useTranslations('egypt');

  return (
    <section id="egypt" className="py-28" style={{ background: '#f8f5f0' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="reveal mb-12">
          <div className="text-xs tracking-[4px] uppercase font-semibold mb-4 flex items-center section-tag-line" style={{ color: '#4a7c3f' }}>
            {t('tag')}
          </div>
          <h2 className="font-serif-display font-light leading-tight" style={{ fontSize: 'clamp(36px,5vw,58px)', color: '#1e2a4a' }}>
            {t('title')} <strong className="font-semibold">{t('titleBold')}</strong>
          </h2>
          <div className="w-16 h-1 rounded mt-5" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
          <p className="mt-4 text-base" style={{ color: '#3d4460' }}>{t('intro')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal reveal-delay-1">
            <h3 className="font-serif-display text-2xl font-semibold mb-6 pb-4 border-b-2" style={{ color: '#1e2a4a', borderColor: '#4a7c3f' }}>
              {t('col1title')}
            </h3>
            <div className="space-y-4 text-sm leading-loose" style={{ color: '#3d4460' }}>
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <h3 className="font-serif-display text-2xl font-semibold mb-6 pb-4 border-b-2" style={{ color: '#1e2a4a', borderColor: '#4a7c3f' }}>
              {t('col2title')}
            </h3>
            <div className="space-y-4 text-sm leading-loose mb-8" style={{ color: '#3d4460' }}>
              <p>{t('p4')}</p>
              <p>{t('p5')}</p>
            </div>
            <div className="flex gap-5 flex-wrap">
              {[{ num: '17.5B', label: t('stat1') }, { num: '12M', label: t('stat2') }].map((s, i) => (
                <div key={i} className="text-center px-8 py-5 rounded" style={{ background: '#1e2a4a' }}>
                  <div className="font-serif-display text-3xl font-semibold" style={{ color: '#7cbf6e' }}>{s.num}</div>
                  <div className="text-xs text-white/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
