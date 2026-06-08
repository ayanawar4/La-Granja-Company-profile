'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ValueItem { title: string; text: string; }
interface CardItem { icon: string; title: string; text: string; }
interface Feature { title: string; text: string; }
interface StatItem { num: string; label: string; }
interface LinkItem { label: string; href: string; }

// ─── Animation helpers ───────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ tag, title, bold, light = false }: {
  tag: string; title: string; bold: string; light?: boolean;
}) {
  const textColor = light ? 'text-white/50' : 'text-[#4a7c3f]';
  const titleColor = light ? 'text-white' : 'text-[#1e2a4a]';
  return (
    <div className="mb-14">
      <Reveal>
        <div className={`flex items-center gap-3 text-xs tracking-[4px] uppercase font-semibold mb-4 ${textColor}`}>
          <span className={`w-8 h-px ${light ? 'bg-white/40' : 'bg-[#4a7c3f]'}`} />
          {tag}
        </div>
        <h2 className={`font-display font-light leading-tight ${titleColor}`}
          style={{ fontSize: 'clamp(36px,5vw,60px)' }}>
          {title}{' '}
          <strong className={`font-semibold ${light ? 'text-[#7cbf6e]' : ''}`}>{bold}</strong>
        </h2>
        <div className="w-14 h-[3px] rounded mt-5"
          style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
      </Reveal>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAr = locale === 'ar';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const switchLang = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    const segs = pathname.split('/');
    segs[1] = next;
    router.push(segs.join('/') || `/${next}`);
  };

  const links = [
    { href: '#about', label: t('about') },
    { href: '#values', label: t('values') },
    { href: '#projects', label: t('projects') },
    { href: '#egypt', label: t('egypt') },
    { href: '#management', label: t('management') },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 shadow-2xl' : 'py-5'}`}
      style={{ background: scrolled ? 'rgba(20,28,53,0.97)' : 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg
            transition-transform duration-300 group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg,#4a7c3f,#7cbf6e)' }}>
            G
          </div>
          <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
            LA <span style={{ color: '#7cbf6e' }}>GRANJA</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className={`hidden lg:flex items-center gap-7 ${isAr ? 'flex-row-reverse' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-white/75 hover:text-white text-xs font-medium tracking-[2px] uppercase transition-all duration-300 relative group no-underline">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 bg-[#7cbf6e]" />
            </a>
          ))}
          <a href="#partners"
            className="px-5 py-2 text-white text-xs font-bold tracking-widest uppercase rounded no-underline transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ background: '#4a7c3f' }}>
            {t('partners')}
          </a>
          {/* Lang toggle */}
          <button onClick={switchLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border text-white text-sm font-bold transition-all duration-300 hover:bg-[#4a7c3f] hover:border-[#4a7c3f] cursor-pointer"
            style={{ borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}>
            <span>{isAr ? '🇬🇧' : '🇸🇦'}</span>
            <span>{t('langSwitch')}</span>
          </button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={switchLang}
            className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold text-white cursor-pointer"
            style={{ background: '#4a7c3f' }}>
            {isAr ? '🇬🇧 EN' : '🇸🇦 ع'}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-2 cursor-pointer" aria-label="menu">
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden px-6 pb-4 flex flex-col gap-3"
            style={{ background: 'rgba(20,28,53,0.98)' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white py-2 text-sm font-medium tracking-wider uppercase no-underline">
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0"
        initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }}>
        <Image src="/rw-sunset.jpg" alt="La Granja" fill className="object-cover" priority />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg,rgba(20,28,53,0.9) 0%,rgba(30,42,74,0.65) 50%,rgba(74,124,63,0.3) 100%)' }} />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs tracking-[5px] uppercase font-medium mb-6" style={{ color: '#7cbf6e' }}>
          {t('eyebrow')}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
          className="font-display font-light text-white leading-none mb-4"
          style={{ fontSize: 'clamp(64px,11vw,130px)' }}>
          {t('title1')} <strong style={{ fontWeight: 700, color: '#7cbf6e' }}>{t('title2')}</strong>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="font-display italic text-white/70 mb-12"
          style={{ fontSize: 'clamp(18px,2.5vw,28px)' }}>
          {t('sub')}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="text-white/65 text-base leading-loose mb-12 max-w-xl mx-auto">
          {t('desc')}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
          className="flex gap-4 justify-center flex-wrap">
          <a href="#projects"
            className="px-10 py-4 text-white text-sm font-bold tracking-widest uppercase rounded no-underline transition-all duration-300 hover:scale-105 hover:opacity-90"
            style={{ background: '#4a7c3f', boxShadow: '0 8px 30px rgba(74,124,63,0.4)' }}>
            {t('btn1')}
          </a>
          <a href="#about"
            className="px-10 py-4 text-white text-sm font-medium tracking-widest uppercase rounded no-underline border transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.35)' }}>
            {t('btn2')}
          </a>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-[3px] uppercase">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const t = useTranslations('stats');
  const nums = ['100','94','30','17+','2008'];
  const keys = ['s1','s2','s3','s4','s5'] as const;
  const items = nums.map((n, i) => ({ num: n, label: t(keys[i]) }));
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-5" style={{ background: '#1e2a4a' }}>
      <div className="ticker flex gap-16 whitespace-nowrap">
        {doubled.map((s, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <span className="font-display text-3xl font-semibold" style={{ color: '#7cbf6e' }}>{s.num}</span>
            <span className="text-white/55 text-sm">{s.label}</span>
            <span className="w-px h-6 bg-white/15 ms-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const t = useTranslations('about');
  const bullets = ['b1','b2','b3','b4'] as const;

  return (
    <section id="about" className="py-28" style={{ background: '#fdfcfa' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Images */}
          <Reveal className="relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <Image src="/rw-sunset.jpg" alt="La Granja" fill className="object-cover" />
            </div>
            <motion.div whileHover={{ scale: 1.03 }}
              className="absolute bottom-[-28px] end-[-24px] w-1/2 aspect-square rounded-xl overflow-hidden border-[5px] border-white shadow-xl hidden lg:block">
              <Image src="/rw-family.jpg" alt="Lifestyle" fill className="object-cover" />
            </motion.div>
            <div className="absolute top-8 start-[-16px] text-white p-5 rounded-lg shadow-xl hidden lg:block"
              style={{ background: '#1e2a4a' }}>
              <div className="font-display text-5xl font-bold leading-none" style={{ color: '#7cbf6e' }}>3</div>
              <div className="text-xs tracking-wider opacity-60 mt-1">{t('badge')}</div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
            <Reveal delay={0.1}>
              <p className="text-base leading-loose mb-8" style={{ color: '#3d4460' }}>{t('desc')}</p>
            </Reveal>
            <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-4 list-none">
              {bullets.map((k, i) => (
                <motion.li key={i} variants={fadeUp}
                  className="flex gap-4 items-start text-sm leading-loose p-4 rounded-lg border-s-4 bg-white shadow-sm"
                  style={{ color: '#3d4460', borderColor: '#4a7c3f' }}>
                  <span className="w-2 h-2 rounded-full bg-[#4a7c3f] mt-1.5 flex-shrink-0" />
                  {t(k)}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VISION MISSION ───────────────────────────────────────────────────────────
function VisionMission() {
  const t = useTranslations('vm');
  return (
    <section id="vision" className="py-24" style={{ background: '#1e2a4a' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <Reveal className="mb-12">
          <div className="flex items-center gap-3 text-xs tracking-[4px] uppercase font-semibold mb-4 text-white/40">
            <span className="w-8 h-px bg-white/30" />{t('tag')}
          </div>
          <h2 className="font-display font-light text-white" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>
            {t('title')} <strong style={{ color: '#7cbf6e' }}>{t('amp')}</strong> {t('title2')}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          {[
            { label: t('vlabel'), title: t('vtitle'), text: t('vtext'), bg: 'rgba(255,255,255,0.05)' },
            { label: t('mlabel'), title: t('mtitle'), text: t('mtext'), bg: '#4a7c3f' },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}
                className="p-14 h-full rounded-sm" style={{ background: card.bg }}>
                <div className="text-xs tracking-[4px] uppercase text-white/50 mb-3 font-medium">{card.label}</div>
                <h3 className="font-display text-3xl font-semibold text-white mb-5">{card.title}</h3>
                <p className="text-white/80 leading-loose text-base">{card.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STORY ────────────────────────────────────────────────────────────────────
function Story() {
  const t = useTranslations('story');
  const points = [
    { icon: '🌱', text: t('p1') }, { icon: '🏡', text: t('p2') },
    { icon: '🌾', text: t('p3') }, { icon: '🚀', text: t('p4') },
  ];
  return (
    <section id="story" className="py-28" style={{ background: '#f8f5f0' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-4">
              {points.map((p, i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex gap-4 items-start p-5 bg-white rounded-xl shadow-sm border-s-4 cursor-default"
                  style={{ borderColor: '#4a7c3f' }}>
                  <span className="text-2xl flex-shrink-0">{p.icon}</span>
                  <p className="text-sm leading-loose" style={{ color: '#3d4460' }}>{p.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Reveal delay={0.2} className="grid grid-cols-2 gap-3">
            <div className="col-span-2 h-56 relative rounded-xl overflow-hidden shadow-lg">
              <Image src="/rw-horses.jpg" alt="Rayan West" fill className="object-cover" />
            </div>
            <div className="h-44 relative rounded-xl overflow-hidden shadow-lg">
              <Image src="/rw-family.jpg" alt="Family" fill className="object-cover" />
            </div>
            <div className="h-44 relative rounded-xl overflow-hidden shadow-lg">
              <Image src="/rw-sunset.jpg" alt="Sunset" fill className="object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── VALUES ───────────────────────────────────────────────────────────────────
function Values() {
  const t = useTranslations('values');
  const icons = ['👥','✅','♻️','💰','❤️','💡'];
  const vals = t.raw('v') as ValueItem[];

  return (
    <section id="values" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vals.map((v, i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(30,42,74,0.12)' }}
              transition={{ duration: 0.3 }}
              className="p-8 border rounded-xl cursor-default relative overflow-hidden group"
              style={{ borderColor: '#e8e8f0' }}>
              <div className="absolute top-0 start-0 end-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-start rounded-t"
                style={{ background: 'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
              <div className="text-4xl mb-4">{icons[i]}</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#1e2a4a' }}>{v.title}</h3>
              <p className="text-sm leading-loose" style={{ color: '#6b7280' }}>{v.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── VILLA ────────────────────────────────────────────────────────────────────
function Villa() {
  const t = useTranslations('villa');
  const features = t.raw('f') as Feature[];

  return (
    <section id="villa" className="py-28 relative overflow-hidden" style={{ background: '#141c35' }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(74,124,63,0.5) 0%, transparent 60%)' }} />
      <div className="max-w-6xl mx-auto px-8 lg:px-12 relative z-10">
        {/* Banner */}
        <Reveal className="mb-14 rounded-2xl overflow-hidden relative h-72 shadow-2xl">
          <Image src="/rw-horses.jpg" alt="Rayan West" fill className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(20,28,53,0.85) 0%,transparent 60%)' }} />
          <div className="absolute bottom-7 start-8">
            <div className="text-xs tracking-[3px] uppercase mb-2 font-medium" style={{ color: '#7cbf6e' }}>{t('tag')}</div>
            <div className="font-display text-3xl font-semibold text-white">Andalusian-Inspired Villas</div>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display font-light text-white mb-14 leading-tight" style={{ fontSize: 'clamp(44px,7vw,90px)' }}>
            <span style={{ color: '#7cbf6e', fontWeight: 700 }}>{t('l1')}</span><br />
            <span style={{ color: '#7cbf6e', fontWeight: 700 }}>{t('l2')}</span><br />
            <span style={{ color: '#7cbf6e', fontWeight: 700 }}>{t('l3')}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal delay={0.1} className="space-y-5 text-white/70 text-base leading-loose">
            <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
            <a href="#projects"
              className="inline-block mt-4 px-10 py-4 text-white text-sm font-bold tracking-widest uppercase rounded no-underline transition-all hover:scale-105"
              style={{ background: '#4a7c3f', boxShadow: '0 8px 30px rgba(74,124,63,0.35)' }}>
              {t('btn')}
            </a>
          </Reveal>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-4">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ background: 'rgba(74,124,63,0.2)' }}
                className="flex gap-4 items-start p-5 rounded-xl border transition-colors cursor-default"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className="text-xl flex-shrink-0">🌿</span>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-xs text-white/55 leading-relaxed">{f.text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── MANAGEMENT ───────────────────────────────────────────────────────────────
function Management() {
  const t = useTranslations('management');
  const ahmed = useTranslations('management.ahmed');
  const mohamed = useTranslations('management.mohamed');

  const founders = [
    { data: ahmed, initial: 'A', gradient: 'linear-gradient(135deg,#4a7c3f,#7cbf6e)' },
    { data: mohamed, initial: 'M', gradient: 'linear-gradient(135deg,#1e2a4a,#2d3d6b)' },
  ];

  return (
    <section id="management" className="py-28" style={{ background: '#f8f5f0' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
          <Reveal><p className="text-base max-w-lg mx-auto" style={{ color: '#6b7280' }}>{t('desc')}</p></Reveal>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {founders.map((f, i) => {
            const tags = f.data.raw('tags') as string[];
            const points = f.data.raw('points') as string[];
            return (
              <Reveal key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -8, boxShadow: '0 24px 70px rgba(30,42,74,0.18)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="p-10 flex flex-col items-start" style={{ background: '#1e2a4a' }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-5"
                      style={{ background: f.gradient }}>
                      {f.initial}
                    </div>
                    <div className="font-display text-3xl font-semibold text-white mb-2">{f.data('name')}</div>
                    <div className="text-xs tracking-[2px] uppercase font-medium" style={{ color: '#7cbf6e' }}>{f.data('role')}</div>
                  </div>
                  <div className="p-9 border-t-4" style={{ borderColor: '#4a7c3f' }}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, j) => (
                        <span key={j} className="px-4 py-1 rounded-full text-xs font-semibold border"
                          style={{ background: 'rgba(74,124,63,0.08)', color: '#4a7c3f', borderColor: 'rgba(74,124,63,0.2)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-3 list-none">
                      {points.map((p, j) => (
                        <li key={j} className="flex gap-3 items-start text-sm leading-loose" style={{ color: '#3d4460' }}>
                          <span className="text-[#4a7c3f] mt-0.5 flex-shrink-0 text-xs">▶</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── INVESTMENT ───────────────────────────────────────────────────────────────
function Investment() {
  const t = useTranslations('investment');
  const cards = t.raw('cards') as CardItem[];

  return (
    <section id="investment" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/rw-family.jpg" alt="Investment" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(20,28,53,0.96) 0%,rgba(30,42,74,0.92) 100%)' }} />
      </div>
      <div className="max-w-6xl mx-auto px-8 lg:px-12 relative z-10">
        <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} light />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ y: -8, borderColor: '#7cbf6e', background: 'rgba(74,124,63,0.18)' }}
              transition={{ duration: 0.3 }}
              className="p-9 rounded-xl border cursor-default"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">{c.title}</h3>
              <p className="text-sm leading-loose text-white/65">{c.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const t = useTranslations('projects');
  const [tab, setTab] = useState(0);
  const tabs = t.raw('tabs') as string[];
  const rw = useTranslations('projects.rw');
  const rh = useTranslations('projects.rh');
  const gh = useTranslations('projects.gh');
  const rwStats = rw.raw('stats') as StatItem[];
  const rwFeats = rw.raw('features') as Feature[];

  return (
    <section id="projects" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
          <Reveal><p className="text-base max-w-xl mx-auto" style={{ color: '#6b7280' }}>{t('desc')}</p></Reveal>
        </div>

        {/* Tabs */}
        <Reveal className="flex justify-center mb-12">
          <div className="flex gap-1 p-1.5 rounded-xl" style={{ background: '#f3f4f6' }}>
            {tabs.map((tab_label, i) => (
              <motion.button key={i} onClick={() => setTab(i)}
                className="px-6 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300"
                animate={{ background: tab === i ? '#fff' : 'transparent', color: tab === i ? '#1e2a4a' : '#6b7280',
                  boxShadow: tab === i ? '0 2px 12px rgba(0,0,0,0.08)' : 'none' }}>
                {tab_label}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.div key="rw" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="text-xs tracking-[4px] uppercase font-semibold mb-3" style={{ color: '#4a7c3f' }}>{rw('label')}</div>
                <h3 className="font-display font-bold mb-2" style={{ fontSize: '3rem', color: '#1e2a4a' }}>
                  RAYAN <span style={{ color: '#4a7c3f' }}>WEST</span>
                </h3>
                <p className="text-sm italic mb-6" style={{ color: '#6b7280' }}>{rw('tagline')}</p>
                <p className="text-base leading-loose mb-8" style={{ color: '#3d4460' }}>{rw('desc')}</p>
                <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: '220px' }}>
                  <Image src="/rw-horses.jpg" alt="Rayan West" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-end p-5" style={{ background: 'linear-gradient(to top,rgba(20,28,53,0.8) 0%,transparent 60%)' }}>
                    <div>
                      <div className="font-display text-xl font-bold text-white">Enjoy Life at Rayan West</div>
                      <div className="text-xs" style={{ color: '#7cbf6e' }}>استمتع بالحياة في ريان ويست</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {rwStats.map((s, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.03 }}
                      className="text-center py-5 rounded-xl border-b-4" style={{ background: '#f8f5f0', borderColor: '#4a7c3f' }}>
                      <div className="font-display text-4xl font-bold" style={{ color: '#4a7c3f' }}>{s.num}</div>
                      <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {rwFeats.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-s-4 ps-5 py-1" style={{ borderColor: '#4a7c3f' }}>
                    <div className="font-semibold text-base mb-2" style={{ color: '#1e2a4a' }}>{f.title}</div>
                    <div className="text-sm leading-loose" style={{ color: '#6b7280' }}>{f.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div key="rh" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ComingSoon label={rh('label')} title={rh('title')} sub={rh('sub')} text={rh('text')} badge={rh('badge')} img="/rw-sunset.jpg" />
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="gh" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ComingSoon label={gh('label')} title={gh('title')} sub={gh('sub')} text={gh('text')} badge={gh('badge')} img="/rw-family.jpg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ComingSoon({ label, title, sub, text, badge, img }: {
  label: string; title: string; sub: string; text: string; badge: string; img: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden relative" style={{ minHeight: '400px', background: '#1e2a4a' }}>
      <div className="absolute inset-0 opacity-20">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="relative z-10 p-16 text-center flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
        <div className="text-xs tracking-[4px] uppercase mb-4 font-medium" style={{ color: '#7cbf6e' }}>{label}</div>
        <h3 className="font-display text-5xl font-bold mb-3" style={{ color: '#7cbf6e' }}>{title}</h3>
        <p className="text-white/50 mb-4 text-sm">{sub}</p>
        <p className="text-white/70 max-w-lg mx-auto text-base leading-loose mb-10">{text}</p>
        <motion.span whileHover={{ scale: 1.05 }}
          className="px-8 py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase inline-block"
          style={{ background: '#4a7c3f' }}>
          {badge}
        </motion.span>
      </div>
    </div>
  );
}

// ─── LIFESTYLE STRIP ─────────────────────────────────────────────────────────
function LifestyleStrip() {
  return (
    <div className="relative overflow-hidden" style={{ height: '420px' }}>
      <Image src="/rw-family.jpg" alt="Life at Rayan West" fill className="object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(20,28,53,0.9) 0%,rgba(74,124,63,0.3) 60%,transparent 100%)' }} />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-xs tracking-[4px] uppercase mb-4 font-medium" style={{ color: '#7cbf6e' }}>Life at Rayan West</div>
            <div className="font-display font-light text-white leading-tight mb-2" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              Where <strong style={{ color: '#7cbf6e', fontWeight: 700 }}>Investment</strong>
            </div>
            <div className="font-display text-white leading-tight mb-5" style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 600 }}>
              Meets <strong style={{ color: '#7cbf6e' }}>Comfort</strong>
            </div>
            <div className="text-white/65 text-base mb-6" style={{ fontFamily: 'Cairo, sans-serif' }}>حيث يلتقي الاستثمار بالراحة</div>
            <a href="#projects"
              className="inline-block px-10 py-4 text-white text-sm font-bold tracking-widest uppercase rounded no-underline transition-all hover:scale-105"
              style={{ background: '#4a7c3f' }}>
              Explore Rayan West
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── EGYPT ────────────────────────────────────────────────────────────────────
function Egypt() {
  const t = useTranslations('egypt');
  const stats = t.raw('stats') as StatItem[];

  return (
    <section id="egypt" className="py-28" style={{ background: '#f8f5f0' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
        <Reveal><p className="text-base mb-12 -mt-8" style={{ color: '#3d4460' }}>{t('intro')}</p></Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal delay={0.1}>
            <h3 className="font-display text-2xl font-semibold mb-5 pb-3 border-b-2" style={{ color: '#1e2a4a', borderColor: '#4a7c3f' }}>{t('c1title')}</h3>
            <div className="space-y-4 text-sm leading-loose" style={{ color: '#3d4460' }}>
              <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-display text-2xl font-semibold mb-5 pb-3 border-b-2" style={{ color: '#1e2a4a', borderColor: '#4a7c3f' }}>{t('c2title')}</h3>
            <div className="space-y-4 text-sm leading-loose mb-8" style={{ color: '#3d4460' }}>
              <p>{t('p4')}</p><p>{t('p5')}</p>
            </div>
            <div className="flex gap-5 flex-wrap">
              {stats.map((s, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }}
                  className="text-center px-8 py-5 rounded-xl" style={{ background: '#1e2a4a' }}>
                  <div className="font-display text-3xl font-bold" style={{ color: '#7cbf6e' }}>{s.num}</div>
                  <div className="text-xs text-white/55 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── SUSTAINABILITY ───────────────────────────────────────────────────────────
function Sustainability() {
  const t = useTranslations('sustainability');
  const features = t.raw('features') as Array<{ icon: string; title: string; text: string }>;

  return (
    <section id="sustainability" className="py-28 relative overflow-hidden" style={{ background: '#1e2a4a' }}>
      <div className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 15% 50%, #4a7c3f 0%, transparent 60%)' }} />
      <div className="max-w-6xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} light />
            <Reveal delay={0.1} className="space-y-5 text-white/70 text-base leading-loose mt-2">
              <p>{t('p1')}</p><p>{t('p2')}</p>
            </Reveal>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ scale: 1.03, background: 'rgba(74,124,63,0.2)' }}
                className="p-7 rounded-xl border transition-colors cursor-default"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="font-semibold mb-2" style={{ color: '#7cbf6e' }}>{f.title}</div>
                <div className="text-xs text-white/55 leading-relaxed">{f.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── PARTNERS ─────────────────────────────────────────────────────────────────
function Partners() {
  const t = useTranslations('partners');
  const sg = useTranslations('partners.sg');
  const ef = useTranslations('partners.ef');
  const sgSecs = sg.raw('sections') as Array<{ title: string; text: string }>;
  const efSecs = ef.raw('sections') as Array<{ title: string; text: string }>;

  const partners = [
    { name: sg('name'), emoji: '☀️', sections: sgSecs },
    { name: ef('name'), emoji: '🏗️', sections: efSecs },
  ];

  return (
    <section id="partners" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
          <Reveal><p className="text-base max-w-xl mx-auto" style={{ color: '#6b7280' }}>{t('desc')}</p></Reveal>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {partners.map((p, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
                className="border rounded-2xl overflow-hidden" style={{ borderColor: '#e8e8f0' }}>
                <div className="p-9" style={{ background: '#1e2a4a' }}>
                  <div className="text-2xl font-black text-white tracking-wide">{p.emoji} {p.name}</div>
                </div>
                <div className="p-9 space-y-6">
                  {p.sections.map((s, j) => (
                    <div key={j}>
                      <h4 className="font-display text-lg font-semibold mb-2 pb-2 border-b-2" style={{ color: '#1e2a4a', borderColor: '#4a7c3f' }}>{s.title}</h4>
                      <p className="text-sm leading-loose" style={{ color: '#3d4460' }}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const t = useTranslations('footer');
  const cols = t.raw('cols') as Array<{ title: string; links: LinkItem[] }>;

  return (
    <footer className="py-16" style={{ background: '#141c35' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10 mb-8">
          <div>
            <div className="font-display text-3xl font-semibold text-white mb-2">
              LA <span style={{ color: '#7cbf6e' }}>GRANJA</span>
            </div>
            <div className="text-sm italic text-white/35 mb-4">{t('tagline')}</div>
            <p className="text-xs text-white/35 leading-loose">{t('about')}</p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div className="text-xs tracking-[2px] uppercase font-semibold mb-5" style={{ color: '#7cbf6e' }}>{col.title}</div>
              <ul className="space-y-3 list-none">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href} className="text-sm text-white/45 no-underline hover:text-white transition-colors duration-300">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>{t('copy')}</span>
          <a href="https://lagranjaeg.com" target="_blank" className="no-underline hover:text-white/60 transition-colors" style={{ color: '#7cbf6e' }}>lagranjaeg.com</a>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <VisionMission />
      <Story />
      <Values />
      <Villa />
      <Management />
      <Investment />
      <Projects />
      <LifestyleStrip />
      <Egypt />
      <Sustainability />
      <Partners />
      <Footer />
    </>
  );
}
