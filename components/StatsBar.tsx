'use client';
import { useTranslations } from 'next-intl';

export default function StatsBar() {
  const t = useTranslations('stats');

  const stats = [
    { num: '100', label: t('s1') },
    { num: '94', label: t('s2') },
    { num: '30', label: t('s3') },
    { num: '17+', label: t('s4') },
    { num: '2008', label: t('s5') },
  ];

  const doubled = [...stats, ...stats];

  return (
    <div className="overflow-hidden py-5" style={{ background: '#1e2a4a' }}>
      <div className="ticker-track flex gap-20 whitespace-nowrap">
        {doubled.map((s, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <span className="font-serif-display text-3xl font-semibold" style={{ color: '#7cbf6e' }}>
              {s.num}
            </span>
            <span className="text-sm text-white/60">{s.label}</span>
            {i < doubled.length - 1 && (
              <span className="ms-10 inline-block w-px h-6 bg-white/15" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
