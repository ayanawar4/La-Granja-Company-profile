'use client';
import { useTranslations } from 'next-intl';

export default function Management() {
  const t = useTranslations('management');
  const ta = useTranslations('management.ahmed');
  const tm = useTranslations('management.mohamed');

  const founders = [
    {
      name: ta('name'),
      role: ta('role'),
      initial: 'A',
      tags: [ta('t1'), ta('t2'), ta('t3')],
      points: [ta('p1'), ta('p2'), ta('p3'), ta('p4')],
      color: 'linear-gradient(135deg, #4a7c3f, #7cbf6e)',
    },
    {
      name: tm('name'),
      role: tm('role'),
      initial: 'M',
      tags: [tm('t1'), tm('t2'), tm('t3')],
      points: [tm('p1'), tm('p2'), tm('p3'), tm('p4')],
      color: 'linear-gradient(135deg, #1e2a4a, #2d3d6b)',
    },
  ];

  return (
    <section id="management" className="py-28" style={{ background: '#f8f5f0' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="reveal text-center mb-16">
          <div className="text-xs tracking-[4px] uppercase font-semibold mb-4" style={{ color: '#4a7c3f' }}>
            {t('tag')}
          </div>
          <h2 className="font-serif-display font-light leading-tight" style={{ fontSize: 'clamp(36px,5vw,58px)', color: '#1e2a4a' }}>
            {t('title')} <strong className="font-semibold">{t('titleBold')}</strong>
          </h2>
          <div className="w-16 h-1 rounded mx-auto mt-5" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#6b7280' }}>{t('desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {founders.map((f, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-400`}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 70px rgba(30,42,74,0.2)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              {/* Header */}
              <div className="p-10 flex flex-col items-start" style={{ background: '#1e2a4a' }}>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-5"
                  style={{ background: f.color }}
                >
                  {f.initial}
                </div>
                <div className="font-serif-display text-3xl font-semibold text-white mb-2">{f.name}</div>
                <div className="text-xs tracking-[2px] uppercase font-medium" style={{ color: '#7cbf6e' }}>{f.role}</div>
              </div>

              {/* Body */}
              <div className="p-9 border-t-4" style={{ borderColor: '#4a7c3f' }}>
                <div className="flex flex-wrap gap-2 mb-6">
                  {f.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-4 py-1 rounded-full text-xs font-semibold border"
                      style={{ background: 'rgba(74,124,63,0.1)', color: '#4a7c3f', borderColor: 'rgba(74,124,63,0.25)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ul className="flex flex-col gap-4">
                  {f.points.map((p, j) => (
                    <li key={j} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: '#3d4460' }}>
                      <span className="mt-1 flex-shrink-0 text-xs" style={{ color: '#4a7c3f' }}>▶</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
