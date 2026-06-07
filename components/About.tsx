'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');

  const bullets = [t('b1'), t('b2'), t('b3'), t('b4')];

  return (
    <section id="about" className="py-28" style={{ background: '#fdfcfa' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image side */}
          <div className="reveal relative">
            <div className="relative aspect-[4/5] rounded overflow-hidden shadow-2xl">
              <Image src="/rw-sunset.jpg" alt="La Granja" fill className="object-cover" />
            </div>
            <div
              className="absolute bottom-[-32px] end-[-32px] w-[55%] aspect-square rounded overflow-hidden border-[6px] border-white shadow-xl hidden lg:block"
            >
              <Image src="/rw-family.jpg" alt="La Granja Lifestyle" fill className="object-cover" />
            </div>
            <div
              className="absolute top-8 start-[-20px] text-white p-5 rounded shadow-xl hidden lg:block"
              style={{ background: '#1e2a4a' }}
            >
              <div className="font-serif-display text-5xl font-semibold leading-none" style={{ color: '#7cbf6e' }}>3</div>
              <div className="text-xs tracking-wider opacity-70 mt-1">{t('badge')}</div>
            </div>
          </div>

          {/* Text side */}
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

            <p className="reveal reveal-delay-1 mt-8 text-base leading-relaxed" style={{ color: '#3d4460' }}>
              {t('desc')}
            </p>

            <ul className="reveal reveal-delay-2 mt-8 flex flex-col gap-5 list-none">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-4 items-start text-sm leading-relaxed" style={{ color: '#3d4460' }}>
                  <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4a7c3f' }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
