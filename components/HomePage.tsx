'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ── colour tokens ─────────────────────────────────────────────────────────── */
const C = {
  navy:       '#1e2a4a',
  navyDeep:   '#141c35',
  green:      '#4a7c3f',
  greenLight: '#6aaa5b',
  greenAcc:   '#7cbf6e',
  cream:      '#f8f5f0',
  warmWhite:  '#fdfcfa',
  textMid:    '#3d4460',
  textLight:  '#6b7280',
};

/* ── animation variants ─────────────────────────────────────────────────────── */
const fadeUp  = { hidden:{ opacity:0, y:40 }, visible:{ opacity:1, y:0 } };
const fadeIn  = { hidden:{ opacity:0      }, visible:{ opacity:1      } };
const stagger = { visible:{ transition:{ staggerChildren:0.1 } } };

/* ── Reveal wrapper ─────────────────────────────────────────────────────────── */
function Reveal({ children, delay=0, style={} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration:0.7, delay, ease:[0.25,0.1,0.25,1] }}
      style={style}>
      {children}
    </motion.div>
  );
}

/* ── Section header ─────────────────────────────────────────────────────────── */
function SectionHeader({ tag, title, bold, light=false }: {
  tag:string; title:string; bold:string; light?:boolean;
}) {
  return (
    <div style={{ marginBottom:56 }}>
      <Reveal>
        <div style={{ display:'flex', alignItems:'center', gap:12,
          fontSize:11, letterSpacing:'4px', textTransform:'uppercase', fontWeight:600,
          color: light ? 'rgba(255,255,255,0.45)' : C.green, marginBottom:16 }}>
          <span style={{ width:32, height:1, background: light ? 'rgba(255,255,255,0.3)' : C.green, display:'block' }} />
          {tag}
        </div>
        <h2 className="font-display" style={{ fontSize:'clamp(34px,5vw,58px)', fontWeight:300, lineHeight:1.1,
          color: light ? '#fff' : C.navy }}>
          {title}{' '}
          <strong style={{ fontWeight:700, color: light ? C.greenAcc : C.navy }}>{bold}</strong>
        </h2>
        <div style={{ width:56, height:3, borderRadius:2, marginTop:20,
          background:'linear-gradient(to right,#4a7c3f,#7cbf6e)' }} />
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════════════ */
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
    { href:'#about',      label:t('about')      },
    { href:'#values',     label:t('values')     },
    { href:'#projects',   label:t('projects')   },
    { href:'#egypt',      label:t('egypt')      },
    { href:'#management', label:t('management') },
  ];

  const navBg = scrolled ? 'rgba(20,28,53,0.97)' : 'rgba(255,255,255,0.06)';

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background:navBg, backdropFilter:'blur(20px)',
      padding: scrolled ? '12px 0' : '20px 0',
      transition:'all 0.4s ease',
      borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px',
        display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        {/* Logo */}
        <a href="#hero" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
          <div style={{ width:40, height:40, borderRadius:'50%', display:'flex',
            alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:18,
            background:'linear-gradient(135deg,#4a7c3f,#7cbf6e)',
            boxShadow:'0 4px 20px rgba(74,124,63,0.4)' }}>
            G
          </div>
          <span style={{ color:'#fff', fontWeight:700, fontSize:18, letterSpacing:1 }}>
            LA <span style={{ color:C.greenAcc }}>GRANJA</span>
          </span>
        </a>

        {/* Desktop */}
        <div style={{ display:'flex', alignItems:'center', gap:28,
          flexDirection: isAr ? 'row-reverse' : 'row' }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color:'rgba(255,255,255,0.75)',
              textDecoration:'none', fontSize:12, fontWeight:500,
              letterSpacing:'2px', textTransform:'uppercase',
              transition:'color 0.3s' }}
              onMouseOver={e=>(e.currentTarget.style.color='#fff')}
              onMouseOut={e=>(e.currentTarget.style.color='rgba(255,255,255,0.75)')}>
              {l.label}
            </a>
          ))}
          <a href="#partners" style={{ background:C.green, color:'#fff',
            padding:'9px 22px', borderRadius:4, textDecoration:'none',
            fontSize:12, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
            transition:'opacity 0.3s' }}
            onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
            onMouseOut={e=>(e.currentTarget.style.opacity='1')}>
            {t('partners')}
          </a>
          {/* Lang */}
          <button onClick={switchLang} style={{ display:'flex', alignItems:'center', gap:8,
            padding:'8px 18px', borderRadius:100, border:'1.5px solid rgba(255,255,255,0.3)',
            background:'rgba(255,255,255,0.08)', color:'#fff', fontSize:13, fontWeight:700,
            cursor:'pointer', transition:'all 0.3s' }}
            onMouseOver={e=>{ const b=e.currentTarget as HTMLElement; b.style.background=C.green; b.style.borderColor=C.green; }}
            onMouseOut={e=>{ const b=e.currentTarget as HTMLElement; b.style.background='rgba(255,255,255,0.08)'; b.style.borderColor='rgba(255,255,255,0.3)'; }}>
            <span>{isAr ? '🇬🇧' : '🇸🇦'}</span>
            <span>{t('langSwitch')}</span>
          </button>
        </div>

        {/* Mobile lang only */}
        <button onClick={switchLang} style={{ background:C.green, color:'#fff',
          border:'none', borderRadius:100, padding:'8px 16px', fontSize:13,
          fontWeight:700, cursor:'pointer', display:'none' }} className="mobile-only">
          {isAr ? '🇬🇧 EN' : '🇸🇦 ع'}
        </button>
      </div>

      <style>{`
        @media (max-width:1024px) { .hidden-mobile { display:none !important; } .mobile-only { display:flex !important; } }
      `}</style>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const t = useTranslations('hero');
  return (
    <section id="hero" style={{ position:'relative', height:'100vh',
      display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      <motion.div style={{ position:'absolute', inset:0 }}
        initial={{ scale:1.08 }} animate={{ scale:1 }} transition={{ duration:2.5, ease:'easeOut' }}>
        <Image src="/rw-sunset.jpg" alt="La Granja" fill style={{ objectFit:'cover' }} priority />
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(160deg,rgba(20,28,53,0.92) 0%,rgba(30,42,74,0.7) 45%,rgba(74,124,63,0.25) 100%)' }} />
      </motion.div>

      <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 24px', maxWidth:900, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:25 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.8 }}
          style={{ fontSize:11, letterSpacing:'5px', textTransform:'uppercase',
            color:C.greenAcc, fontWeight:600, marginBottom:24 }}>
          {t('eyebrow')}
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6, duration:1 }}
          className="font-display" style={{ fontSize:'clamp(64px,11vw,130px)',
            fontWeight:300, color:'#fff', lineHeight:0.95, marginBottom:16 }}>
          {t('title1')}{' '}
          <strong style={{ fontWeight:700, color:C.greenAcc }}>{t('title2')}</strong>
        </motion.h1>

        <motion.p initial={{ opacity:0, y:25 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85, duration:0.8 }}
          className="font-display" style={{ fontSize:'clamp(18px,2.5vw,26px)',
            fontStyle:'italic', color:'rgba(255,255,255,0.65)', marginBottom:32 }}>
          {t('sub')}
        </motion.p>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.05, duration:0.8 }}
          style={{ color:'rgba(255,255,255,0.6)', fontSize:16, lineHeight:1.8,
            marginBottom:40, maxWidth:560, marginLeft:'auto', marginRight:'auto' }}>
          {t('desc')}
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.25, duration:0.7 }}
          style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#projects" style={{ background:C.green, color:'#fff',
            padding:'16px 40px', borderRadius:4, textDecoration:'none',
            fontSize:13, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase',
            boxShadow:'0 8px 32px rgba(74,124,63,0.45)', transition:'transform 0.3s,opacity 0.3s' }}
            onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.transform=''; }}>
            {t('btn1')}
          </a>
          <a href="#about" style={{ color:'#fff', border:'1.5px solid rgba(255,255,255,0.35)',
            padding:'15px 40px', borderRadius:4, textDecoration:'none',
            fontSize:13, fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase',
            transition:'background 0.3s' }}
            onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.08)'; }}
            onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.background=''; }}>
            {t('btn2')}
          </a>
        </motion.div>
      </div>

      <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2.2 }}
        style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          color:'rgba(255,255,255,0.35)', fontSize:10, letterSpacing:'3px', textTransform:'uppercase' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS TICKER
═══════════════════════════════════════════════════════════════════════════ */
function StatsBar() {
  const t = useTranslations('stats');
  const items = [
    { num:'100', label:t('s1') }, { num:'94',   label:t('s2') },
    { num:'30',  label:t('s3') }, { num:'17+',  label:t('s4') },
    { num:'2008',label:t('s5') },
  ];
  const doubled = [...items,...items];
  return (
    <div style={{ background:C.navy, padding:'20px 0', overflow:'hidden' }}>
      <div className="ticker-anim" style={{ display:'flex', gap:64, whiteSpace:'nowrap' }}>
        {doubled.map((s,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
            <span className="font-display" style={{ fontSize:30, fontWeight:600, color:C.greenAcc }}>{s.num}</span>
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.5)' }}>{s.label}</span>
            <span style={{ width:1, height:24, background:'rgba(255,255,255,0.15)', display:'inline-block', marginLeft:32 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════════════ */
function About() {
  const t = useTranslations('about');
  return (
    <section id="about" style={{ padding:'112px 0', background:C.warmWhite }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          {/* Images */}
          <Reveal>
            <div style={{ position:'relative', paddingBottom:'20px' }}>
              <div style={{ position:'relative', borderRadius:16, overflow:'hidden',
                boxShadow:'0 30px 80px rgba(30,42,74,0.2)', aspectRatio:'4/5' }}>
                <Image src="/rw-sunset.jpg" alt="La Granja" fill style={{ objectFit:'cover' }} />
              </div>
              <motion.div whileHover={{ scale:1.03 }}
                style={{ position:'absolute', bottom:-32, right:-24, width:'52%', aspectRatio:'1',
                  borderRadius:12, overflow:'hidden', border:'5px solid #fff',
                  boxShadow:'0 16px 48px rgba(0,0,0,0.18)' }}>
                <Image src="/rw-family.jpg" alt="Lifestyle" fill style={{ objectFit:'cover' }} />
              </motion.div>
              <div style={{ position:'absolute', top:28, left:-16, background:C.navy,
                padding:'20px 24px', borderRadius:8, boxShadow:'0 12px 40px rgba(20,28,53,0.35)' }}>
                <div className="font-display" style={{ fontSize:44, fontWeight:700, color:C.greenAcc, lineHeight:1 }}>3</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.55)', marginTop:4, letterSpacing:1 }}>{t('badge')}</div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
            <Reveal delay={0.1}>
              <p style={{ fontSize:16, lineHeight:1.85, color:C.textMid, marginBottom:28 }}>{t('desc')}</p>
            </Reveal>
            <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:12 }}>
              {(['b1','b2','b3','b4'] as const).map((k,i) => (
                <motion.li key={i} variants={fadeUp}
                  style={{ display:'flex', gap:16, alignItems:'flex-start', padding:'16px 20px',
                    background:'#fff', borderRadius:8, borderLeft:`4px solid ${C.green}`,
                    boxShadow:'0 2px 12px rgba(0,0,0,0.05)', fontSize:14, color:C.textMid, lineHeight:1.7 }}>
                  <span style={{ width:7, height:7, borderRadius:'50%', background:C.green,
                    marginTop:6, flexShrink:0 }} />
                  {t(k)}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ #about [style*="grid-template-columns"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VISION MISSION
═══════════════════════════════════════════════════════════════════════════ */
function VisionMission() {
  const t = useTranslations('vm');
  return (
    <section id="vision" style={{ padding:'96px 0', background:C.navy }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <Reveal style={{ marginBottom:48 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, fontSize:11,
            letterSpacing:'4px', textTransform:'uppercase', fontWeight:600,
            color:'rgba(255,255,255,0.4)', marginBottom:16 }}>
            <span style={{ width:32, height:1, background:'rgba(255,255,255,0.25)', display:'block' }} />
            {t('tag')}
          </div>
          <h2 className="font-display" style={{ fontSize:'clamp(36px,5vw,58px)', fontWeight:300, color:'#fff' }}>
            {t('title')} <strong style={{ fontWeight:700, color:C.greenAcc }}>{t('amp')}</strong> {t('title2')}
          </h2>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3 }}>
          {[
            { label:t('vlabel'), title:t('vtitle'), text:t('vtext'), bg:'rgba(255,255,255,0.05)' },
            { label:t('mlabel'), title:t('mtitle'), text:t('mtext'), bg:C.green },
          ].map((card,i) => (
            <Reveal key={i} delay={i*0.15}>
              <motion.div whileHover={{ scale:1.01 }} transition={{ duration:0.3 }}
                style={{ padding:'64px 56px', background:card.bg, borderTop:`3px solid rgba(255,255,255,0.15)` }}>
                <div style={{ fontSize:11, letterSpacing:'4px', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.5)', marginBottom:12, fontWeight:500 }}>{card.label}</div>
                <h3 className="font-display" style={{ fontSize:36, fontWeight:600, color:'#fff', marginBottom:20 }}>{card.title}</h3>
                <p style={{ fontSize:16, color:'rgba(255,255,255,0.8)', lineHeight:1.85 }}>{card.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ #vision [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STORY
═══════════════════════════════════════════════════════════════════════════ */
function Story() {
  const t = useTranslations('story');
  const pts = [{ icon:'🌱', k:'p1' },{ icon:'🏡', k:'p2' },{ icon:'🌾', k:'p3' },{ icon:'🚀', k:'p4' }] as const;
  return (
    <section id="story" style={{ padding:'112px 0', background:C.cream }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80 }}>
          <div>
            <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {pts.map((p,i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ x:6 }} transition={{ duration:0.2 }}
                  style={{ display:'flex', gap:16, alignItems:'flex-start',
                    padding:'18px 20px', background:'#fff', borderRadius:10,
                    borderLeft:`4px solid ${C.green}`, cursor:'default' }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{p.icon}</span>
                  <p style={{ fontSize:14, lineHeight:1.75, color:C.textMid }}>{t(p.k)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Reveal delay={0.2}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'240px 192px', gap:12 }}>
              <div style={{ gridColumn:'span 2', position:'relative', borderRadius:16, overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,0.12)' }}>
                <Image src="/rw-horses.jpg" alt="Rayan West" fill style={{ objectFit:'cover' }} />
              </div>
              <div style={{ position:'relative', borderRadius:12, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
                <Image src="/rw-family.jpg" alt="Family" fill style={{ objectFit:'cover' }} />
              </div>
              <div style={{ position:'relative', borderRadius:12, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
                <Image src="/rw-sunset.jpg" alt="Sunset" fill style={{ objectFit:'cover' }} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:900px){ #story [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VALUES
═══════════════════════════════════════════════════════════════════════════ */
function Values() {
  const t = useTranslations('values');
  const icons = ['👥','✅','♻️','💰','❤️','💡'];
  const vals = t.raw('v') as Array<{ title:string; text:string }>;
  return (
    <section id="values" style={{ padding:'112px 0', background:'#fff' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ textAlign:'center' }}><SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} /></div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {vals.map((v,i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ y:-8, boxShadow:'0 24px 56px rgba(30,42,74,0.12)' }}
              transition={{ duration:0.3 }}
              style={{ padding:'36px 32px', border:'1px solid #e8e8f0', borderRadius:12,
                cursor:'default', position:'relative', overflow:'hidden', transition:'box-shadow 0.3s' }}
              className="value-card">
              <div style={{ fontSize:36, marginBottom:16 }}>{icons[i]}</div>
              <h3 style={{ fontSize:17, fontWeight:600, color:C.navy, marginBottom:10 }}>{v.title}</h3>
              <p style={{ fontSize:14, color:C.textLight, lineHeight:1.75 }}>{v.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        .value-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(to right,#4a7c3f,#7cbf6e); transform:scaleX(0); transition:transform 0.3s; transform-origin:left; border-radius:2px; }
        .value-card:hover::before { transform:scaleX(1); }
        @media(max-width:900px){ #values [style*="repeat(3,1fr)"] { grid-template-columns:1fr !important; } }
        @media(min-width:600px) and (max-width:900px){ #values [style*="repeat(3,1fr)"] { grid-template-columns:1fr 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VILLA
═══════════════════════════════════════════════════════════════════════════ */
function Villa() {
  const t = useTranslations('villa');
  const features = t.raw('f') as Array<{ title:string; text:string }>;
  const icons = ['🌿','❤️','♻️','💰'];
  return (
    <section id="villa" style={{ padding:'112px 0', background:C.navyDeep, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 15% 50%, rgba(74,124,63,0.18) 0%, transparent 55%)' }} />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:2 }}>
        {/* banner */}
        <Reveal style={{ marginBottom:56 }}>
          <div style={{ borderRadius:20, overflow:'hidden', position:'relative', height:280, boxShadow:'0 24px 64px rgba(0,0,0,0.3)' }}>
            <Image src="/rw-horses.jpg" alt="Rayan West" fill style={{ objectFit:'cover', objectPosition:'center 40%' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(20,28,53,0.88) 0%,transparent 55%)' }} />
            <div style={{ position:'absolute', bottom:28, left:32 }}>
              <div style={{ fontSize:11, letterSpacing:'3px', textTransform:'uppercase',
                color:C.greenAcc, marginBottom:8, fontWeight:600 }}>{t('tag')}</div>
              <div className="font-display" style={{ fontSize:30, fontWeight:600, color:'#fff' }}>Andalusian-Inspired Villas</div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display" style={{ fontSize:'clamp(44px,7vw,90px)', fontWeight:300, color:'#fff', lineHeight:1.1, marginBottom:56 }}>
            <span style={{ fontWeight:700, color:C.greenAcc }}>{t('l1')}</span><br/>
            <span style={{ fontWeight:700, color:C.greenAcc }}>{t('l2')}</span><br/>
            <span style={{ fontWeight:700, color:C.greenAcc }}>{t('l3')}</span>
          </h2>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64 }}>
          <Reveal delay={0.1}>
            <div style={{ display:'flex', flexDirection:'column', gap:20, color:'rgba(255,255,255,0.7)', fontSize:16, lineHeight:1.85 }}>
              <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
              <a href="#projects" style={{ display:'inline-block', marginTop:8, background:C.green, color:'#fff',
                padding:'16px 40px', borderRadius:4, textDecoration:'none',
                fontSize:13, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase',
                boxShadow:'0 8px 30px rgba(74,124,63,0.4)', transition:'transform 0.3s', width:'fit-content' }}
                onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform='translateY(-2px)'}
                onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=''}>
                {t('btn')}
              </a>
            </div>
          </Reveal>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
            style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {features.map((f,i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ background:'rgba(74,124,63,0.18)' }}
                style={{ display:'flex', gap:16, alignItems:'flex-start', padding:'18px 22px',
                  borderRadius:10, border:'1px solid rgba(255,255,255,0.08)',
                  background:'rgba(255,255,255,0.05)', cursor:'default', transition:'background 0.3s' }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{icons[i]}</span>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:'#fff', marginBottom:4 }}>{f.title}</div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>{f.text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ #villa [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MANAGEMENT
═══════════════════════════════════════════════════════════════════════════ */
function Management() {
  const t = useTranslations('management');
  const ta = useTranslations('management.ahmed');
  const tm = useTranslations('management.mohamed');
  const founders = [
    { d:ta, initial:'A', grad:'linear-gradient(135deg,#4a7c3f,#7cbf6e)' },
    { d:tm, initial:'M', grad:'linear-gradient(135deg,#1e2a4a,#2d3d6b)' },
  ];
  return (
    <section id="management" style={{ padding:'112px 0', background:C.cream }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ textAlign:'center', marginBottom:16 }}>
          <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
          <Reveal><p style={{ fontSize:16, color:C.textLight, maxWidth:520, margin:'0 auto -32px' }}>{t('desc')}</p></Reveal>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
          {founders.map((f,i) => {
            const tags  = f.d.raw('tags')   as string[];
            const pts   = f.d.raw('points') as string[];
            return (
              <Reveal key={i} delay={i*0.15}>
                <motion.div whileHover={{ y:-10, boxShadow:'0 28px 72px rgba(30,42,74,0.2)' }}
                  transition={{ duration:0.3 }}
                  style={{ background:'#fff', borderRadius:20, overflow:'hidden',
                    boxShadow:'0 8px 40px rgba(0,0,0,0.08)' }}>
                  <div style={{ padding:'40px 40px 32px', background:C.navy, display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
                    <div style={{ width:76, height:76, borderRadius:'50%', display:'flex',
                      alignItems:'center', justifyContent:'center', color:'#fff',
                      fontSize:36, fontWeight:700, marginBottom:16, background:f.grad }}>
                      {f.initial}
                    </div>
                    <div className="font-display" style={{ fontSize:30, fontWeight:600, color:'#fff', marginBottom:6 }}>{f.d('name')}</div>
                    <div style={{ fontSize:11, letterSpacing:'2px', textTransform:'uppercase',
                      fontWeight:500, color:C.greenAcc }}>{f.d('role')}</div>
                  </div>
                  <div style={{ padding:'32px 40px 40px', borderTop:`4px solid ${C.green}` }}>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
                      {tags.map((tag,j) => (
                        <span key={j} style={{ padding:'4px 14px', borderRadius:100, fontSize:12, fontWeight:600,
                          background:'rgba(74,124,63,0.08)', color:C.green, border:`1px solid rgba(74,124,63,0.2)` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:12 }}>
                      {pts.map((p,j) => (
                        <li key={j} style={{ display:'flex', gap:12, alignItems:'flex-start',
                          fontSize:14, color:C.textMid, lineHeight:1.7 }}>
                          <span style={{ color:C.green, fontSize:10, marginTop:4, flexShrink:0 }}>▶</span>{p}
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
      <style>{`@media(max-width:900px){ #management [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   INVESTMENT
═══════════════════════════════════════════════════════════════════════════ */
function Investment() {
  const t = useTranslations('investment');
  const cards = t.raw('cards') as Array<{ icon:string; title:string; text:string }>;
  return (
    <section id="investment" style={{ padding:'112px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0 }}>
        <Image src="/rw-family.jpg" alt="Investment" fill style={{ objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(160deg,rgba(20,28,53,0.96) 0%,rgba(30,42,74,0.93) 100%)' }} />
      </div>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:2 }}>
        <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} light />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {cards.map((c,i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ y:-8, borderColor:C.greenAcc, background:'rgba(74,124,63,0.18)' }}
              transition={{ duration:0.3 }}
              style={{ padding:'36px 30px', borderRadius:14, border:'1px solid rgba(255,255,255,0.1)',
                background:'rgba(255,255,255,0.05)', cursor:'default', transition:'all 0.3s' }}>
              <div style={{ fontSize:30, marginBottom:16 }}>{c.icon}</div>
              <h3 className="font-display" style={{ fontSize:22, fontWeight:600, color:'#fff', marginBottom:12 }}>{c.title}</h3>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.62)', lineHeight:1.75 }}>{c.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`@media(max-width:900px){ #investment [style*="repeat(3,1fr)"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════════════════════════════ */
function Projects() {
  const t = useTranslations('projects');
  const [tab, setTab] = useState(0);
  const tabs   = t.raw('tabs')   as string[];
  const rw     = useTranslations('projects.rw');
  const rh     = useTranslations('projects.rh');
  const gh     = useTranslations('projects.gh');
  const rwStats = rw.raw('stats')    as Array<{ num:string; label:string }>;
  const rwFeats = rw.raw('features') as Array<{ title:string; text:string }>;

  return (
    <section id="projects" style={{ padding:'112px 0', background:'#fff' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ textAlign:'center', marginBottom:16 }}>
          <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
          <Reveal><p style={{ fontSize:16, color:C.textLight, maxWidth:600, margin:'0 auto -32px' }}>{t('desc')}</p></Reveal>
        </div>
        {/* Tabs */}
        <Reveal style={{ display:'flex', justifyContent:'center', marginBottom:48 }}>
          <div style={{ display:'flex', gap:4, padding:'6px', borderRadius:12, background:'#f3f4f6' }}>
            {tabs.map((label,i) => (
              <motion.button key={i} onClick={() => setTab(i)}
                animate={{ background: tab===i ? '#fff' : 'transparent',
                  color: tab===i ? C.navy : C.textLight,
                  boxShadow: tab===i ? '0 2px 12px rgba(0,0,0,0.08)' : 'none' }}
                style={{ padding:'11px 26px', borderRadius:8, fontSize:13,
                  fontWeight:500, cursor:'pointer', border:'none' }}>
                {label}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {tab===0 && (
            <motion.div key="rw" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
              style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64 }}>
              <div>
                <div style={{ fontSize:11, letterSpacing:'4px', textTransform:'uppercase',
                  fontWeight:600, color:C.green, marginBottom:12 }}>{rw('label')}</div>
                <h3 className="font-display" style={{ fontSize:52, fontWeight:700, color:C.navy, marginBottom:8 }}>
                  RAYAN <span style={{ color:C.green }}>WEST</span>
                </h3>
                <p style={{ fontSize:14, fontStyle:'italic', color:C.textLight, marginBottom:20 }}>{rw('tagline')}</p>
                <p style={{ fontSize:15, lineHeight:1.8, color:C.textMid, marginBottom:28 }}>{rw('desc')}</p>
                <div style={{ borderRadius:16, overflow:'hidden', marginBottom:28, position:'relative', height:220 }}>
                  <Image src="/rw-horses.jpg" alt="Rayan West" fill style={{ objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(20,28,53,0.8) 0%,transparent 55%)',
                    display:'flex', alignItems:'flex-end', padding:20 }}>
                    <div>
                      <div className="font-display" style={{ fontSize:20, fontWeight:700, color:'#fff' }}>Enjoy Life at Rayan West</div>
                      <div style={{ fontSize:12, color:C.greenAcc }}>استمتع بالحياة في ريان ويست</div>
                    </div>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {rwStats.map((s,i) => (
                    <motion.div key={i} whileHover={{ scale:1.04 }}
                      style={{ textAlign:'center', padding:'20px', borderRadius:10,
                        background:C.cream, borderBottom:`4px solid ${C.green}` }}>
                      <div className="font-display" style={{ fontSize:40, fontWeight:700, color:C.green }}>{s.num}</div>
                      <div style={{ fontSize:12, color:C.textLight, marginTop:4 }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {rwFeats.map((f,i) => (
                  <motion.div key={i} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:i*0.1 }}
                    style={{ borderLeft:`4px solid ${C.green}`, paddingLeft:20, paddingTop:4, paddingBottom:4 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:C.navy, marginBottom:6 }}>{f.title}</div>
                    <div style={{ fontSize:14, color:C.textLight, lineHeight:1.7 }}>{f.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {tab!==0 && (
            <motion.div key={`cs${tab}`} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <ComingSoon d={tab===1 ? rh : gh} img={tab===1 ? '/rw-sunset.jpg' : '/rw-family.jpg'} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`@media(max-width:900px){ #projects [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

function ComingSoon({ d, img }: { d: ReturnType<typeof useTranslations<'projects.rh'>>; img: string }) {
  return (
    <div style={{ borderRadius:20, overflow:'hidden', position:'relative', minHeight:400, background:C.navy }}>
      <div style={{ position:'absolute', inset:0, opacity:0.18 }}>
        <Image src={img} alt="" fill style={{ objectFit:'cover' }} />
      </div>
      <div style={{ position:'relative', zIndex:2, padding:80, textAlign:'center',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400 }}>
        <div style={{ fontSize:11, letterSpacing:'4px', textTransform:'uppercase',
          fontWeight:600, color:C.greenAcc, marginBottom:16 }}>{d('label')}</div>
        <h3 className="font-display" style={{ fontSize:56, fontWeight:700, color:C.greenAcc, marginBottom:12 }}>{d('title')}</h3>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', marginBottom:16 }}>{d('sub')}</p>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.7)', maxWidth:560, lineHeight:1.8, marginBottom:36 }}>{d('text')}</p>
        <motion.span whileHover={{ scale:1.06 }}
          style={{ display:'inline-block', padding:'12px 36px', borderRadius:100,
            background:C.green, color:'#fff', fontSize:13, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' }}>
          {d('badge')}
        </motion.span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LIFESTYLE STRIP
═══════════════════════════════════════════════════════════════════════════ */
function LifestyleStrip() {
  return (
    <div style={{ position:'relative', height:440, overflow:'hidden' }}>
      <Image src="/rw-family.jpg" alt="Life at Rayan West" fill style={{ objectFit:'cover', objectPosition:'center 30%' }} />
      <div style={{ position:'absolute', inset:0,
        background:'linear-gradient(135deg,rgba(20,28,53,0.92) 0%,rgba(74,124,63,0.28) 60%,transparent 100%)' }} />
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', width:'100%' }}>
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.9 }}>
            <div style={{ fontSize:11, letterSpacing:'4px', textTransform:'uppercase',
              fontWeight:600, color:C.greenAcc, marginBottom:16 }}>Life at Rayan West</div>
            <div className="font-display" style={{ fontSize:'clamp(36px,5vw,68px)', fontWeight:300, color:'#fff', lineHeight:1.1, marginBottom:4 }}>
              Where <strong style={{ color:C.greenAcc, fontWeight:700 }}>Investment</strong>
            </div>
            <div className="font-display" style={{ fontSize:'clamp(36px,5vw,68px)', fontWeight:700, color:'#fff', lineHeight:1.1, marginBottom:20 }}>
              Meets <strong style={{ color:C.greenAcc }}>Comfort</strong>
            </div>
            <div style={{ fontSize:16, color:'rgba(255,255,255,0.6)', marginBottom:28, fontFamily:'Cairo,sans-serif' }}>
              حيث يلتقي الاستثمار بالراحة
            </div>
            <a href="#projects" style={{ display:'inline-block', background:C.green, color:'#fff',
              padding:'14px 36px', borderRadius:4, textDecoration:'none',
              fontSize:13, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase',
              transition:'transform 0.3s' }}
              onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform='translateY(-2px)'}
              onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=''}>
              Explore Rayan West
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EGYPT
═══════════════════════════════════════════════════════════════════════════ */
function Egypt() {
  const t = useTranslations('egypt');
  const stats = t.raw('stats') as Array<{ num:string; label:string }>;
  return (
    <section id="egypt" style={{ padding:'112px 0', background:C.cream }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
        <Reveal><p style={{ fontSize:16, color:C.textMid, marginBottom:48, marginTop:-32 }}>{t('intro')}</p></Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64 }}>
          <Reveal delay={0.1}>
            <h3 className="font-display" style={{ fontSize:24, fontWeight:600, color:C.navy,
              marginBottom:20, paddingBottom:12, borderBottom:`2px solid ${C.green}` }}>{t('c1title')}</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:14, fontSize:14, color:C.textMid, lineHeight:1.85 }}>
              <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-display" style={{ fontSize:24, fontWeight:600, color:C.navy,
              marginBottom:20, paddingBottom:12, borderBottom:`2px solid ${C.green}` }}>{t('c2title')}</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:14, fontSize:14, color:C.textMid, lineHeight:1.85, marginBottom:28 }}>
              <p>{t('p4')}</p><p>{t('p5')}</p>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {stats.map((s,i) => (
                <motion.div key={i} whileHover={{ scale:1.05 }}
                  style={{ textAlign:'center', padding:'20px 28px', borderRadius:12, background:C.navy }}>
                  <div className="font-display" style={{ fontSize:32, fontWeight:700, color:C.greenAcc }}>{s.num}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:4 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:900px){ #egypt [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUSTAINABILITY
═══════════════════════════════════════════════════════════════════════════ */
function Sustainability() {
  const t = useTranslations('sustainability');
  const feats = t.raw('features') as Array<{ icon:string; title:string; text:string }>;
  return (
    <section id="sustainability" style={{ padding:'112px 0', background:C.navy, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 15% 50%, rgba(74,124,63,0.18) 0%, transparent 55%)' }} />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:2 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          <div>
            <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} light />
            <Reveal delay={0.1}>
              <div style={{ display:'flex', flexDirection:'column', gap:16,
                fontSize:15, color:'rgba(255,255,255,0.7)', lineHeight:1.85, marginTop:-20 }}>
                <p>{t('p1')}</p><p>{t('p2')}</p>
              </div>
            </Reveal>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {feats.map((f,i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ scale:1.03, background:'rgba(74,124,63,0.2)' }}
                style={{ padding:'28px 24px', borderRadius:14,
                  border:'1px solid rgba(255,255,255,0.08)',
                  background:'rgba(255,255,255,0.05)', cursor:'default', transition:'all 0.3s' }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontSize:15, fontWeight:600, color:C.greenAcc, marginBottom:8 }}>{f.title}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>{f.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ #sustainability [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTNERS
═══════════════════════════════════════════════════════════════════════════ */
function Partners() {
  const t  = useTranslations('partners');
  const sg = useTranslations('partners.sg');
  const ef = useTranslations('partners.ef');
  const partners = [
    { name:sg('name'), emoji:'☀️', secs: sg.raw('sections') as Array<{ title:string; text:string }> },
    { name:ef('name'), emoji:'🏗️', secs: ef.raw('sections') as Array<{ title:string; text:string }> },
  ];
  return (
    <section id="partners" style={{ padding:'112px 0', background:'#fff' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ textAlign:'center', marginBottom:16 }}>
          <SectionHeader tag={t('tag')} title={t('title')} bold={t('bold')} />
          <Reveal><p style={{ fontSize:16, color:C.textLight, maxWidth:560, margin:'0 auto -32px' }}>{t('desc')}</p></Reveal>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
          {partners.map((p,i) => (
            <Reveal key={i} delay={i*0.15}>
              <motion.div whileHover={{ y:-8, boxShadow:'0 24px 56px rgba(0,0,0,0.1)' }}
                transition={{ duration:0.3 }}
                style={{ border:'1px solid #e8e8f0', borderRadius:20, overflow:'hidden',
                  boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ padding:'36px 40px', background:C.navy }}>
                  <div style={{ fontSize:22, fontWeight:800, color:'#fff', letterSpacing:1 }}>
                    {p.emoji} {p.name}
                  </div>
                </div>
                <div style={{ padding:'32px 40px 40px', display:'flex', flexDirection:'column', gap:24 }}>
                  {p.secs.map((s,j) => (
                    <div key={j}>
                      <h4 className="font-display" style={{ fontSize:19, fontWeight:600, color:C.navy,
                        marginBottom:8, paddingBottom:8, borderBottom:`2px solid ${C.green}` }}>{s.title}</h4>
                      <p style={{ fontSize:14, color:C.textMid, lineHeight:1.75 }}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ #partners [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const t   = useTranslations('footer');
  const cols = t.raw('cols') as Array<{ title:string; links:Array<{ label:string; href:string }> }>;
  return (
    <footer style={{ background:C.navyDeep, padding:'64px 0 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:48,
          paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:32 }}>
          <div>
            <div className="font-display" style={{ fontSize:32, fontWeight:600, color:'#fff', marginBottom:6 }}>
              LA <span style={{ color:C.greenAcc }}>GRANJA</span>
            </div>
            <div style={{ fontSize:13, fontStyle:'italic', color:'rgba(255,255,255,0.3)', marginBottom:16 }}>{t('tagline')}</div>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)', lineHeight:1.7, maxWidth:260 }}>{t('about')}</p>
          </div>
          {cols.map((col,i) => (
            <div key={i}>
              <div style={{ fontSize:11, letterSpacing:'2px', textTransform:'uppercase',
                fontWeight:600, color:C.greenAcc, marginBottom:20 }}>{col.title}</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {col.links.map((l,j) => (
                  <li key={j}>
                    <a href={l.href} style={{ fontSize:13, color:'rgba(255,255,255,0.4)',
                      textDecoration:'none', transition:'color 0.3s' }}
                      onMouseOver={e=>(e.currentTarget.style.color='#fff')}
                      onMouseOut={e=>(e.currentTarget.style.color='rgba(255,255,255,0.4)')}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>{t('copy')}</span>
          <a href="https://lagranjaeg.com" target="_blank"
            style={{ fontSize:12, color:C.greenAcc, textDecoration:'none' }}>lagranjaeg.com</a>
        </div>
      </div>
      <style>{`@media(max-width:900px){ footer [style*="grid-template-columns"] { grid-template-columns:1fr 1fr !important; } }`}</style>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
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
