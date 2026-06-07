'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Projects() {
  const t = useTranslations('projects');
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [t('tab1'), t('tab2'), t('tab3')];

  return (
    <section id="projects" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="text-xs tracking-[4px] uppercase font-semibold mb-4" style={{ color: '#4a7c3f' }}>{t('tag')}</div>
          <h2 className="font-serif-display font-light leading-tight" style={{ fontSize: 'clamp(36px,5vw,58px)', color: '#1e2a4a' }}>
            {t('title')} <strong className="font-semibold">{t('titleBold')}</strong>
          </h2>
          <div className="w-16 h-1 rounded mx-auto mt-5" style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#6b7280' }}>{t('desc')}</p>
        </div>

        {/* Tabs */}
        <div className="reveal flex justify-center mb-14">
          <div className="flex gap-1 p-1.5 rounded-lg" style={{ background: '#f8f5f0' }}>
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="px-7 py-3 rounded-md text-sm font-medium transition-all duration-300"
                style={{
                  background: activeTab === i ? 'white' : 'transparent',
                  color: activeTab === i ? '#1e2a4a' : '#6b7280',
                  boxShadow: activeTab === i ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Panel 0 – Rayan West */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs tracking-[4px] uppercase font-semibold mb-3" style={{ color: '#4a7c3f' }}>{t('rw.label')}</div>
              <h3 className="font-serif-display font-bold mb-2" style={{ fontSize: '3rem', color: '#1e2a4a' }}>
                RAYAN <span style={{ color: '#4a7c3f' }}>WEST</span>
              </h3>
              <p className="text-sm italic mb-6" style={{ color: '#6b7280' }}>{t('rw.tagline')}</p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#3d4460' }}>{t('rw.desc')}</p>

              {/* Image */}
              <div className="relative rounded-lg overflow-hidden mb-8" style={{ height: '240px' }}>
                <Image src="/rw-horses.jpg" alt="Rayan West" fill className="object-cover" />
                <div className="absolute inset-0 flex items-end p-5" style={{ background: 'linear-gradient(to top,rgba(20,28,53,0.7) 0%,transparent 60%)' }}>
                  <div className="text-white">
                    <div className="text-lg font-bold font-serif-display">Enjoy Life at Rayan West</div>
                    <div className="text-xs" style={{ color: '#7cbf6e' }}>استمتع بالحياة في ريان ويست</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '100', label: t('rw.stat1label') },
                  { num: '94', label: t('rw.stat2label') },
                  { num: '30', label: t('rw.stat3label') },
                  { num: '1h', label: t('rw.stat4label') },
                ].map((s, i) => (
                  <div key={i} className="text-center py-6 rounded border-b-4" style={{ background: '#f8f5f0', borderColor: '#4a7c3f' }}>
                    <div className="font-serif-display text-4xl font-semibold" style={{ color: '#4a7c3f' }}>{s.num}</div>
                    <div className="text-xs mt-2" style={{ color: '#6b7280' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-5">
              {[
                { title: t('rw.f1title'), text: t('rw.f1text') },
                { title: t('rw.f2title'), text: t('rw.f2text') },
                { title: t('rw.f3title'), text: t('rw.f3text') },
                { title: t('rw.f4title'), text: t('rw.f4text') },
              ].map((f, i) => (
                <div key={i} className="border-s-4 ps-5" style={{ borderColor: '#4a7c3f' }}>
                  <div className="font-semibold text-base mb-2" style={{ color: '#1e2a4a' }}>{f.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{f.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel 1 – Rayan Hills */}
        {activeTab === 1 && (
          <ComingSoonPanel
            label={t('rh.label')}
            title={t('rh.title')}
            subtitle={t('rh.subtitle')}
            text={t('rh.text')}
            badge={t('rh.badge')}
            img="/rw-sunset.jpg"
          />
        )}

        {/* Panel 2 – Ghernata */}
        {activeTab === 2 && (
          <ComingSoonPanel
            label={t('gh.label')}
            title={t('gh.title')}
            subtitle={t('gh.subtitle')}
            text={t('gh.text')}
            badge={t('gh.badge')}
            img="/rw-family.jpg"
          />
        )}
      </div>
    </section>
  );
}

function ComingSoonPanel({ label, title, subtitle, text, badge, img }: {
  label: string; title: string; subtitle: string; text: string; badge: string; img: string;
}) {
  return (
    <div className="rounded-lg overflow-hidden relative" style={{ background: '#1e2a4a', minHeight: '400px' }}>
      <div className="absolute inset-0 opacity-20">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="relative z-10 p-16 text-center flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
        <div className="text-xs tracking-[4px] uppercase mb-4 font-medium" style={{ color: '#7cbf6e' }}>{label}</div>
        <h3 className="font-serif-display text-5xl font-bold text-white mb-3">
          <span style={{ color: '#7cbf6e' }}>{title}</span>
        </h3>
        <p className="text-white/60 mb-6 text-sm">{subtitle}</p>
        <p className="text-white/75 max-w-lg mx-auto text-base leading-relaxed mb-10">{text}</p>
        <span className="px-8 py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase" style={{ background: '#4a7c3f' }}>
          {badge}
        </span>
      </div>
    </div>
  );
}
