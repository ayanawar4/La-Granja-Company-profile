'use client';
import { useTranslations } from 'next-intl';

export default function Partners() {
  const t = useTranslations('partners');
  const sg = useTranslations('partners.sg');
  const ef = useTranslations('partners.ef');

  const partners = [
    {
      logo: '☀️ SUN GATE',
      logoColor: '#f59e0b',
      sections: [
        { title: sg('s1'), text: sg('t1') },
        { title: sg('s2'), text: sg('t2') },
        { title: sg('s3'), text: sg('t3') },
      ],
    },
    {
      logo: '🏗️ EL FATH',
      logoColor: '#7cbf6e',
      sections: [
        { title: ef('s1'), text: ef('t1') },
        { title: ef('s2'), text: ef('t2') },
        { title: ef('s3'), text: ef('t3') },
      ],
    },
  ];

  return (
    <section id="partners" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="reveal text-center mb-16">
          <div className="text-xs tracking-[4px] uppercase font-semibold mb-4" style={{ color: '#4a7c3f' }}>{t('tag')}</div>
          <h2 className="font-serif-display font-light leading-tight" style={{ fontSize: 'clamp(36px,5vw,58px)', color: '#1e2a4a' }}>
            {t('title')} <strong className="font-semibold">{t('titleBold')}</strong>
          </h2>
          <div className="w-16 h-1 rounded mx-auto mt-5" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#6b7280' }}>{t('desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {partners.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} border rounded overflow-hidden transition-all duration-300`}
              style={{ borderColor: '#e8e8f0' }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(0,0,0,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              {/* Header */}
              <div className="p-9" style={{ background: '#1e2a4a' }}>
                <div className="text-2xl font-black text-white tracking-wide">{p.logo}</div>
              </div>
              {/* Body */}
              <div className="p-9 space-y-6">
                {p.sections.map((s, j) => (
                  <div key={j}>
                    <h4 className="font-serif-display text-lg font-semibold mb-2 pb-2 border-b-2" style={{ color: '#1e2a4a', borderColor: '#4a7c3f' }}>
                      {s.title}
                    </h4>
                    <p className="text-sm leading-loose" style={{ color: '#3d4460' }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
