'use client';
import { useTranslations } from 'next-intl';

const icons = ['👥','✅','♻️','💰','❤️','💡'];

export default function Values() {
  const t = useTranslations('values');

  const vals = [
    { title: t('v1title'), text: t('v1text') },
    { title: t('v2title'), text: t('v2text') },
    { title: t('v3title'), text: t('v3text') },
    { title: t('v4title'), text: t('v4text') },
    { title: t('v5title'), text: t('v5text') },
    { title: t('v6title'), text: t('v6text') },
  ];

  return (
    <section id="values" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="reveal text-center mb-16">
          <div className="text-xs tracking-[4px] uppercase font-semibold mb-4" style={{ color: '#4a7c3f' }}>
            {t('tag')}
          </div>
          <h2 className="font-serif-display font-light leading-tight" style={{ fontSize: 'clamp(36px,5vw,58px)', color: '#1e2a4a' }}>
            {t('title')} <strong className="font-semibold">{t('titleBold')}</strong>
          </h2>
          <div className="w-16 h-1 rounded mx-auto mt-5" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {vals.map((v, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} group p-9 border rounded transition-all duration-300 relative overflow-hidden cursor-default`}
              style={{ borderColor: '#e8e8f0' }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(30,42,74,0.12)';
                (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '';
                (e.currentTarget as HTMLElement).style.borderColor = '#e8e8f0';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              <div
                className="absolute top-0 start-0 end-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-start rounded-t"
                style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }}
              />
              <div className="text-4xl mb-5">{icons[i]}</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#1e2a4a' }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
