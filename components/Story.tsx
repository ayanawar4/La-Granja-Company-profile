'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Story() {
  const t = useTranslations('story');

  const points = [
    { icon: '🌱', text: t('p1') },
    { icon: '🏡', text: t('p2') },
    { icon: '🌾', text: t('p3') },
    { icon: '🚀', text: t('p4') },
  ];

  return (
    <section id="story" className="py-28" style={{ background: '#f8f5f0' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="reveal">
              <div className="text-xs tracking-[4px] uppercase font-semibold mb-4 flex items-center section-tag-line" style={{ color: '#4a7c3f' }}>
                {t('tag')}
              </div>
              <h2 className="font-serif-display font-light leading-tight mb-5" style={{ fontSize: 'clamp(36px,5vw,58px)', color: '#1e2a4a' }}>
                {t('title')} <strong className="font-semibold">{t('titleBold')}</strong>
              </h2>
              <div className="w-16 h-1 rounded" style={{ background: 'linear-gradient(to right, #4a7c3f, #7cbf6e)' }} />
            </div>
            <div className="mt-10 flex flex-col gap-5">
              {points.map((p, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 1} flex gap-5 items-start p-6 bg-white rounded border-s-4 shadow-sm transition-all duration-300`}
                  style={{ borderColor: '#4a7c3f' }}
                >
                  <span className="text-2xl flex-shrink-0">{p.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: '#3d4460' }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="reveal reveal-delay-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 h-60 relative rounded overflow-hidden">
                <Image src="/rw-horses.jpg" alt="Rayan West" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="h-48 relative rounded overflow-hidden">
                <Image src="/rw-family.jpg" alt="La Granja Family" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="h-48 relative rounded overflow-hidden">
                <Image src="/rw-sunset.jpg" alt="La Granja Sunset" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
