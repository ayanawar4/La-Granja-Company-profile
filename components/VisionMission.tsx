'use client';
import { useTranslations } from 'next-intl';

export default function VisionMission() {
  const t = useTranslations('vm');

  return (
    <section id="vision" className="py-24" style={{ background: '#1e2a4a' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="reveal mb-12">
          <div className="text-xs tracking-[4px] uppercase font-semibold mb-4" style={{ color: '#7cbf6e' }}>
            {t('tag')}
          </div>
          <h2 className="font-serif-display font-light text-white" style={{ fontSize: 'clamp(36px,5vw,58px)' }}>
            {t('title')} <strong className="font-semibold" style={{ color: '#7cbf6e' }}>{t('amp')}</strong> {t('title2')}
          </h2>
        </div>
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-1">
          {/* Vision */}
          <div className="p-16 relative" style={{ background: 'rgba(255,255,255,0.04)', borderTop: '3px solid rgba(255,255,255,0.15)' }}>
            <div className="text-xs tracking-[4px] uppercase mb-3 font-medium text-white/50">{t('visionLabel')}</div>
            <h3 className="font-serif-display text-4xl font-semibold text-white mb-6">{t('visionTitle')}</h3>
            <p className="text-base text-white/80 leading-loose">{t('visionText')}</p>
          </div>
          {/* Mission */}
          <div className="p-16 relative" style={{ background: '#4a7c3f', borderTop: '3px solid rgba(255,255,255,0.25)' }}>
            <div className="text-xs tracking-[4px] uppercase mb-3 font-medium text-white/70">{t('missionLabel')}</div>
            <h3 className="font-serif-display text-4xl font-semibold text-white mb-6">{t('missionTitle')}</h3>
            <p className="text-base text-white/85 leading-loose">{t('missionText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
