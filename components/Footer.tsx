'use client';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const links = useTranslations('footer.links');

  return (
    <footer className="py-16" style={{ background: '#141c35' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            <div className="font-serif-display text-3xl font-semibold text-white mb-2">
              LA <span style={{ color: '#7cbf6e' }}>GRANJA</span>
            </div>
            <div className="text-sm italic text-white/40 mb-4">{t('tagline')}</div>
            <p className="text-xs text-white/40 leading-loose max-w-xs">{t('about')}</p>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs tracking-[2px] uppercase font-semibold mb-5" style={{ color: '#7cbf6e' }}>{t('colCompany')}</div>
            <ul className="space-y-3 list-none">
              {(['about','team','vision','values','story'] as const).map((k) => (
                <li key={k}>
                  <a href={`#${k}`} className="text-sm text-white/55 no-underline hover:text-white transition-colors duration-300">
                    {links(k)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <div className="text-xs tracking-[2px] uppercase font-semibold mb-5" style={{ color: '#7cbf6e' }}>{t('colProjects')}</div>
            <ul className="space-y-3 list-none">
              {(['rw','rh','gh','inv','egypt'] as const).map((k) => (
                <li key={k}>
                  <a href="#projects" className="text-sm text-white/55 no-underline hover:text-white transition-colors duration-300">
                    {links(k)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs tracking-[2px] uppercase font-semibold mb-5" style={{ color: '#7cbf6e' }}>{t('colContact')}</div>
            <ul className="space-y-3 list-none text-sm text-white/55">
              <li><a href="tel:01145006672" className="no-underline hover:text-white transition-colors duration-300 text-white/55">01145006672</a></li>
              <li><a href="mailto:info@lagranjaeg.com" className="no-underline hover:text-white transition-colors duration-300 text-white/55">info@lagranjaeg.com</a></li>
              <li><a href="https://lagranjaeg.com" target="_blank" className="no-underline hover:text-white transition-colors duration-300 text-white/55">lagranjaeg.com</a></li>
              <li className="text-white/30 text-xs leading-relaxed">{t('address')}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <span>{t('copy')}</span>
          <a href="https://lagranjaeg.com" target="_blank" className="no-underline text-white/35 hover:text-white/60" style={{ color: '#7cbf6e' }}>
            lagranjaeg.com
          </a>
        </div>
      </div>
    </footer>
  );
}
