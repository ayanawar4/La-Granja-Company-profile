'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function LifestyleStrip() {
  return (
    <div className="relative overflow-hidden" style={{ height: '420px' }}>
      <Image src="/rw-family.jpg" alt="Life at Rayan West" fill className="object-cover object-center" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,28,53,0.88) 0%, rgba(74,124,63,0.35) 60%, transparent 100%)' }} />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 w-full">
          <div className="text-xs tracking-[4px] uppercase mb-4 font-medium" style={{ color: '#7cbf6e' }}>
            Life at Rayan West
          </div>
          <div className="font-serif-display font-light text-white leading-tight mb-3" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            Where <strong style={{ color: '#7cbf6e', fontWeight: 700 }}>Investment</strong>
          </div>
          <div className="font-serif-display font-semibold text-white leading-tight mb-4" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            Meets <strong style={{ color: '#7cbf6e' }}>Comfort</strong>
          </div>
          <div className="text-white/75 text-base mb-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
            حيث يلتقي الاستثمار بالراحة
          </div>
          <a
            href="#projects"
            className="inline-block px-10 py-4 text-white text-sm font-bold tracking-widest uppercase rounded no-underline"
            style={{ background: '#4a7c3f' }}
          >
            Explore Rayan West
          </a>
        </div>
      </div>
    </div>
  );
}
