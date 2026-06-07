'use client';
import { useTranslations } from 'next-intl';

export default function Choosing() {
  const t = useTranslations('choosing');

  const items = [
    { title: t('c1title'), desc: t('c1desc') },
    { title: t('c2title'), desc: t('c2desc') },
    { title: t('c3title'), desc: t('c3desc') },
    { title: t('c4title'), desc: t('c4desc') },
    { title: t('c5title'), desc: t('c5desc') },
  ];

  return (
    <section id="choosing" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="reveal">
              <div className="text-xs tracking-[4px] uppercase font-semibold mb-4 flex items-center section-tag-line" style={{ color: '#4a7c3f' }}>
                {t('tag')}
              </div>
              <h2 className="font-serif-display font-light leading-tight mb-5" style={{ fontSize: 'clamp(36px,5vw,52px)', color: '#1e2a4a' }}>
                {t('title')} <strong className="font-semibold">{t('titleBold')}</strong>
              </h2>
              <div className="w-16 h-1 rounded" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
              <p className="mt-6 text-base leading-loose" style={{ color: '#3d4460' }}>{t('desc')}</p>
              <p className="mt-3 text-sm leading-loose" style={{ color: '#6b7280' }}>{t('desc2')}</p>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="flex flex-col divide-y" style={{ borderColor: '#ddd' }}>
              {items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 gap-0 transition-colors duration-200 cursor-default"
                  onMouseOver={e => (e.currentTarget.style.background = 'white')}
                  onMouseOut={e => (e.currentTarget.style.background = '')}
                >
                  <div className="py-5 pe-6 font-semibold text-sm flex items-center gap-3 border-e" style={{ color: '#1e2a4a', borderColor: '#ddd' }}>
                    <span style={{ color: '#4a7c3f', fontSize: '18px' }}>→</span>
                    {item.title}
                  </div>
                  <div className="py-5 ps-6 text-sm leading-relaxed flex items-center" style={{ color: '#6b7280' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
