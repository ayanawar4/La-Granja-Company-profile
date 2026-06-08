'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ── Design tokens ─────────────────────────────────────────── */
const G = {
  bg:     '#060d06',
  card:   '#0c1e0c',
  border: 'rgba(106,181,74,0.2)',
  borderH:'rgba(106,181,74,0.5)',
  green:  '#4a7c3f',
  mid:    '#6ab54a',
  light:  '#9de080',
  glow:   'rgba(106,181,74,0.3)',
  text:   '#d4ecd4',      /* MAIN text — clearly visible */
  sub:    '#a8cfa8',      /* secondary text */
  muted:  '#7aaa7a',      /* muted / captions */
};

const fadeUp  = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0} };
const stagger = { visible:{transition:{staggerChildren:.1}} };

/* ── Helpers ─────────────────────────────────────────────── */
function Reveal({children,delay=0,style={},className=''}:{
  children:React.ReactNode;delay?:number;style?:React.CSSProperties;className?:string}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:'-50px'});
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={v?'visible':'hidden'}
      transition={{duration:.7,delay,ease:[.25,.1,.25,1]}}
      style={style} className={className}>
      {children}
    </motion.div>
  );
}

function Tag({text}:{text:string}) {
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:14,
      background:'rgba(106,181,74,0.1)',border:`1px solid ${G.border}`,
      borderRadius:100,padding:'6px 16px'}}>
      <span style={{width:6,height:6,borderRadius:'50%',background:G.mid,flexShrink:0,
        boxShadow:`0 0 6px ${G.mid}`}}/>
      <span style={{fontSize:10,letterSpacing:'3px',textTransform:'uppercase',
        fontWeight:700,color:G.mid}}>{text}</span>
    </div>
  );
}

function SectionTitle({title,bold,center=false,size='large'}:{
  title:string;bold:string;center?:boolean;size?:'large'|'medium'}) {
  const fs = size==='large' ? 'clamp(32px,4vw,54px)' : 'clamp(26px,3vw,40px)';
  return (
    <div style={{textAlign:center?'center':'start'}}>
      <h2 className="font-display" style={{fontSize:fs,fontWeight:300,lineHeight:1.1,color:'#fff'}}>
        {title}{' '}
        <strong style={{fontWeight:700,color:G.light}}>{bold}</strong>
      </h2>
      <div style={{width:48,height:3,borderRadius:2,marginTop:16,
        background:`linear-gradient(to right,${G.green},${G.light})`,
        marginLeft:center?'auto':'0',marginRight:center?'auto':'0'}}/>
    </div>
  );
}

/* Card container – used for ALL section cards */
function Card({children,hover=true,style={},className=''}:{
  children:React.ReactNode;hover?:boolean;style?:React.CSSProperties;className?:string}) {
  return (
    <motion.div
      whileHover={hover?{y:-8,boxShadow:`0 0 0 1px ${G.borderH},0 24px 60px rgba(0,0,0,0.5),0 0 40px rgba(74,180,63,0.1)`}:{}}
      transition={{duration:.3}}
      className={`farm-card ${className}`}
      style={{
        background:G.card,
        border:`1px solid ${G.border}`,
        borderRadius:16,
        overflow:'hidden',
        cursor:hover?'default':'auto',
        ...style,
      }}>
      {children}
    </motion.div>
  );
}

/* Particles */
function Particles() {
  const items=['🌿','🍃','🌱','🌾','✦','❋'];
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
      {Array.from({length:14}).map((_,i)=>(
        <div key={i} className="particle" style={{
          left:`${(i*17+7)%100}%`,
          fontSize:`${10+((i*5)%12)}px`,
          animationDuration:`${16+((i*3)%12)}s`,
          animationDelay:`${(i*1.4)%10}s`,
        }}>{items[i%items.length]}</div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════ NAVBAR ═══════════════════════════════ */
function Navbar() {
  const t=useTranslations('nav');
  const locale=useLocale();
  const router=useRouter();
  const pathname=usePathname();
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  const isAr=locale==='ar';

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60);
    window.addEventListener('scroll',fn);
    return ()=>window.removeEventListener('scroll',fn);
  },[]);

  const switchLang=()=>{
    const next=locale==='en'?'ar':'en';
    const s=pathname.split('/');s[1]=next;
    router.push(s.join('/')||`/${next}`);
  };

  const links=[
    {href:'#about',l:t('about')},{href:'#values',l:t('values')},
    {href:'#projects',l:t('projects')},{href:'#egypt',l:t('egypt')},
    {href:'#management',l:t('management')},
  ];

  const navBg = scrolled ? 'rgba(6,13,6,0.97)' : 'rgba(6,13,6,0.15)';

  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,
      background:navBg,backdropFilter:'blur(20px)',transition:'background .4s',
      borderBottom:scrolled?`1px solid ${G.border}`:'1px solid transparent'}}>
      <div className="si" style={{display:'flex',alignItems:'center',
        justifyContent:'space-between',padding:scrolled?'12px 40px':'18px 40px',transition:'padding .4s'}}>

        {/* Logo */}
        <a href="#hero" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none',flexShrink:0}}>
          <motion.div whileHover={{scale:1.1,rotate:5}}
            style={{width:38,height:38,borderRadius:'50%',display:'flex',alignItems:'center',
              justifyContent:'center',color:'#fff',fontSize:16,fontWeight:800,
              background:`linear-gradient(135deg,#2d5a1b,${G.mid})`,
              boxShadow:`0 4px 20px ${G.glow}`}}>G</motion.div>
          <span style={{color:'#fff',fontWeight:700,fontSize:17,letterSpacing:.5}}>
            LA <span style={{color:G.light}}>GRANJA</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{alignItems:'center',gap:24,
          flexDirection:isAr?'row-reverse':'row'}}>
          {links.map(l=>(
            <a key={l.href} href={l.href} style={{color:G.sub,textDecoration:'none',
              fontSize:12,fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',transition:'color .2s'}}
              onMouseOver={e=>(e.currentTarget.style.color=G.light)}
              onMouseOut={e=>(e.currentTarget.style.color=G.sub)}>{l.l}</a>
          ))}
          <motion.a whileHover={{scale:1.05}} href="#partners"
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,color:'#fff',
              padding:'8px 20px',borderRadius:100,textDecoration:'none',
              fontSize:12,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',
              boxShadow:`0 4px 16px ${G.glow}`}}>{t('partners')}</motion.a>
          <motion.button whileHover={{scale:1.05}} onClick={switchLang}
            style={{display:'flex',alignItems:'center',gap:7,padding:'8px 16px',
              borderRadius:100,border:`1px solid ${G.border}`,
              background:'rgba(106,181,74,0.08)',color:G.light,
              fontSize:13,fontWeight:700,cursor:'pointer'}}>
            <span>{isAr?'🇬🇧':'🇸🇦'}</span><span>{t('langSwitch')}</span>
          </motion.button>
        </div>

        {/* Mobile controls */}
        <div className="nav-mobile" style={{alignItems:'center',gap:8}}>
          <button onClick={switchLang}
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,
              color:'#fff',border:'none',borderRadius:100,padding:'7px 14px',
              fontSize:12,fontWeight:700,cursor:'pointer'}}>
            {isAr?'🇬🇧 EN':'🇸🇦 ع'}
          </button>
          <button onClick={()=>setOpen(!open)}
            style={{background:'none',border:`1px solid ${G.border}`,
              borderRadius:8,cursor:'pointer',padding:'8px 10px',
              display:'flex',flexDirection:'column',gap:4,alignItems:'center'}}>
            {[0,1,2].map(i=>(
              <span key={i} style={{width:20,height:2,background:G.light,display:'block',
                transition:'all .3s',
                transform:open&&i===0?'rotate(45deg) translate(4px,4px)':
                          open&&i===2?'rotate(-45deg) translate(4px,-4px)':'none',
                opacity:open&&i===1?0:1}}/>
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}
            exit={{opacity:0,height:0}} style={{overflow:'hidden',
              background:'rgba(6,13,6,0.98)',borderTop:`1px solid ${G.border}`}}>
            <div style={{padding:'16px 18px 20px',display:'flex',flexDirection:'column',gap:2}}>
              {[...links,{href:'#partners',l:t('partners')}].map(l=>(
                <a key={l.href} href={l.href} onClick={()=>setOpen(false)}
                  style={{color:G.sub,textDecoration:'none',padding:'12px 8px',
                    fontSize:14,fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',
                    borderBottom:`1px solid rgba(106,181,74,0.08)`}}>{l.l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════ HERO ═════════════════════════════════ */
function Hero() {
  const t=useTranslations('hero');
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const y=useTransform(scrollYProgress,[0,1],[0,180]);

  return (
    <section ref={ref} id="hero" style={{position:'relative',height:'100vh',
      display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <motion.div style={{position:'absolute',inset:0,y}}>
        <Image src="/img-aerial.jpg" alt="La Granja" fill
          style={{objectFit:'cover',objectPosition:'center'}} priority/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(160deg,rgba(6,13,6,0.92) 0%,rgba(9,22,9,0.78) 45%,rgba(6,13,6,0.6) 100%)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'radial-gradient(ellipse at 50% 80%,rgba(74,180,63,0.12) 0%,transparent 65%)'}}/>
      </motion.div>

      {/* Animated orbs */}
      {[{l:'8%',t:'15%',s:320,d:0},{l:'80%',t:'55%',s:220,d:2},{l:'45%',t:'75%',s:440,d:4}].map((o,i)=>(
        <motion.div key={i} style={{position:'absolute',left:o.l,top:o.t,
          width:o.s,height:o.s,borderRadius:'50%',pointerEvents:'none',
          background:`radial-gradient(circle,rgba(74,180,63,0.1) 0%,transparent 70%)`}}
          animate={{scale:[1,1.3,1],opacity:[.3,.7,.3]}}
          transition={{duration:5+i*2,repeat:Infinity,ease:'easeInOut',delay:o.d}}/>
      ))}

      <div style={{position:'relative',zIndex:2,textAlign:'center',padding:'0 20px',maxWidth:900,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3}}
          style={{display:'inline-flex',alignItems:'center',gap:8,
            background:'rgba(106,181,74,0.12)',border:`1px solid rgba(106,181,74,0.3)`,
            borderRadius:100,padding:'7px 18px',marginBottom:28}}>
          <span style={{width:7,height:7,borderRadius:'50%',background:G.mid,
            boxShadow:`0 0 8px ${G.mid}`,display:'block'}}/>
          <span style={{fontSize:10,letterSpacing:'4px',textTransform:'uppercase',
            fontWeight:700,color:G.light}}>{t('eyebrow')}</span>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:.5,duration:1}}
          className="font-display h1"
          style={{fontSize:'clamp(52px,10vw,128px)',fontWeight:300,lineHeight:.95,
            color:'#fff',marginBottom:20}}>
          {t('title1')}{' '}
          <span className="shimmer" style={{fontWeight:700}}>{t('title2')}</span>
        </motion.h1>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.8}}
          className="font-display"
          style={{fontSize:'clamp(16px,2.5vw,25px)',fontStyle:'italic',
            color:'rgba(212,236,212,0.75)',marginBottom:22}}>
          {t('sub')}
        </motion.p>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
          style={{color:G.sub,fontSize:'clamp(13px,1.4vw,16px)',lineHeight:1.85,
            marginBottom:40,maxWidth:560,marginLeft:'auto',marginRight:'auto'}}>
          {t('desc')}
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.2}}
          style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <motion.a whileHover={{scale:1.06}} whileTap={{scale:.97}} href="#projects"
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,color:'#fff',
              padding:'14px 34px',borderRadius:100,textDecoration:'none',
              fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
              boxShadow:`0 8px 28px ${G.glow}`}}>{t('btn1')}</motion.a>
          <motion.a whileHover={{scale:1.04,background:'rgba(106,181,74,0.1)'}}
            whileTap={{scale:.97}} href="#about"
            style={{color:G.light,border:`1.5px solid rgba(106,181,74,0.35)`,
              padding:'13px 34px',borderRadius:100,textDecoration:'none',
              fontSize:13,fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',
              background:'transparent',transition:'background .3s'}}>{t('btn2')}</motion.a>
        </motion.div>
      </div>

      <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.4}}
        style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
        <div style={{width:1,height:36,background:`linear-gradient(to bottom,transparent,${G.mid})`}}/>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G.mid} strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════ STATS ════════════════════════════════ */
function StatsBar() {
  const t=useTranslations('stats');
  const items=[{n:'100',k:'s1'},{n:'94',k:'s2'},{n:'30',k:'s3'},{n:'17+',k:'s4'},{n:'2008',k:'s5'}] as const;
  return (
    <div style={{overflow:'hidden',padding:'16px 0',
      borderTop:`1px solid ${G.border}`,borderBottom:`1px solid ${G.border}`,
      background:'rgba(106,181,74,0.06)'}}>
      <div className="ticker-anim" style={{display:'flex',gap:48,whiteSpace:'nowrap'}}>
        {[...items,...items].map((s,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
            <span className="sn" style={{fontSize:26,fontWeight:800}}>{s.n}</span>
            <span style={{fontSize:12,color:G.sub}}>{t(s.k)}</span>
            <span style={{width:1,height:18,background:G.border,marginLeft:32,display:'inline-block'}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════ ABOUT ════════════════════════════════ */
function About() {
  const t=useTranslations('about');
  return (
    <section id="about" className="sp animated-bg" style={{position:'relative'}}>
      <Particles/>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <div style={{display:'grid',gridTemplateColumns:'220px 160px 1fr',gap:28,alignItems:'start'}}>

          {/* Image 1 */}
          <Reveal>
            <motion.div whileHover={{scale:1.02}}
              style={{borderRadius:14,overflow:'hidden',height:340,
                border:`1px solid ${G.border}`,
                boxShadow:'0 20px 50px rgba(0,0,0,0.5)'}}>
              <Image src="/img-aerial.jpg" alt="La Granja" fill
                style={{objectFit:'cover',objectPosition:'center'}}/>
            </motion.div>
          </Reveal>

          {/* Images 2+3 stacked */}
          <Reveal delay={.1}>
            <div style={{display:'flex',flexDirection:'column',gap:10,height:340}}>
              <motion.div whileHover={{scale:1.02}}
                style={{borderRadius:12,overflow:'hidden',flex:'1 1 0',
                  border:`1px solid ${G.border}`}}>
                <Image src="/img-pergola.jpg" alt="Pool" fill style={{objectFit:'cover'}}/>
              </motion.div>
              <motion.div whileHover={{scale:1.02}}
                style={{borderRadius:12,overflow:'hidden',height:120,
                  border:`1px solid ${G.border}`}}>
                <Image src="/img-villa-garden.jpg" alt="Garden" fill style={{objectFit:'cover'}}/>
              </motion.div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={.15}>
            <Tag text={t('tag')}/>
            <SectionTitle title={t('title')} bold={t('bold')}/>
            <p style={{fontSize:15,lineHeight:1.9,color:G.text,marginTop:20,marginBottom:24}}>
              {t('desc')}
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {(['b1','b2','b3','b4'] as const).map((k,i)=>(
                <motion.div key={i}
                  whileHover={{x:6,background:'rgba(106,181,74,0.12)',borderColor:G.borderH}}
                  transition={{duration:.2}}
                  style={{display:'flex',gap:10,alignItems:'flex-start',padding:'11px 14px',
                    borderRadius:10,border:`1px solid ${G.border}`,
                    background:'rgba(106,181,74,0.05)',fontSize:13,
                    color:G.text,lineHeight:1.75,cursor:'default',transition:'all .2s'}}>
                  <span style={{color:G.mid,flexShrink:0,marginTop:2}}>🌿</span>
                  {t(k)}
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:1000px){
          #about .si > div{grid-template-columns:1fr 1fr!important}
          #about .si > div > div:nth-child(3){grid-column:span 2!important}
        }
        @media(max-width:620px){
          #about .si > div{grid-template-columns:1fr!important}
          #about .si > div > div:nth-child(3){grid-column:span 1!important}
          #about .si > div > div:nth-child(1) > div{height:220px!important}
          #about .si > div > div:nth-child(2){height:180px!important;flex-direction:row!important}
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════ VISION/MISSION ═══════════════════════ */
function VisionMission() {
  const t=useTranslations('vm');
  return (
    <section id="vision" className="sp" style={{background:'#070f07'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:56}}>
          <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('title2')} center/></Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          {[
            {label:t('vlabel'),title:t('vtitle'),text:t('vtext'),img:'/img-villa-garden.jpg'},
            {label:t('mlabel'),title:t('mtitle'),text:t('mtext'),img:'/img-family-pool.jpg'},
          ].map((c,i)=>(
            <Reveal key={i} delay={i*.15}>
              <Card style={{height:'100%'}}>
                <div style={{position:'relative',height:200,overflow:'hidden'}}>
                  <Image src={c.img} alt={c.label} fill style={{objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,
                    background:'linear-gradient(to top,rgba(12,30,12,1) 0%,rgba(12,30,12,0.3) 60%,transparent 100%)'}}/>
                </div>
                <div style={{padding:'28px 28px 32px'}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:8,
                    background:'rgba(106,181,74,0.1)',border:`1px solid ${G.border}`,
                    borderRadius:100,padding:'5px 14px',marginBottom:16}}>
                    <span style={{fontSize:10,letterSpacing:'3px',textTransform:'uppercase',
                      fontWeight:700,color:G.light}}>{c.label}</span>
                  </div>
                  <h3 className="font-display" style={{fontSize:'clamp(22px,2.5vw,30px)',
                    fontWeight:600,color:'#fff',marginBottom:14,lineHeight:1.2}}>{c.title}</h3>
                  <p style={{fontSize:14,color:G.text,lineHeight:1.88}}>{c.text}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:680px){#vision .si > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════ STORY ════════════════════════════════ */
function Story() {
  const t=useTranslations('story');
  const pts=[{e:'🌱',k:'p1'},{e:'🏡',k:'p2'},{e:'🌾',k:'p3'},{e:'🚀',k:'p4'}] as const;
  return (
    <section id="story" className="sp" style={{background:G.bg}}>
      <div className="si">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'start'}}>
          <div>
            <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')}/></Reveal>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
              style={{marginTop:28,display:'flex',flexDirection:'column',gap:12}}>
              {pts.map((p,i)=>(
                <motion.div key={i} variants={fadeUp}
                  whileHover={{x:6,background:'rgba(106,181,74,0.1)',borderColor:G.borderH}}
                  transition={{duration:.2}}
                  style={{display:'flex',gap:14,alignItems:'flex-start',padding:'14px 18px',
                    borderRadius:12,border:`1px solid ${G.border}`,
                    background:'rgba(106,181,74,0.05)',cursor:'default',transition:'all .25s'}}>
                  <span style={{fontSize:20,flexShrink:0}}>{p.e}</span>
                  <p style={{fontSize:14,lineHeight:1.8,color:G.text}}>{t(p.k)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Reveal delay={.2}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div style={{gridColumn:'span 2',position:'relative',height:220,
                borderRadius:16,overflow:'hidden',border:`1px solid ${G.border}`}}>
                <Image src="/img-family-pool.jpg" alt="La Granja" fill style={{objectFit:'cover'}}/>
              </div>
              <div style={{position:'relative',height:170,borderRadius:12,
                overflow:'hidden',border:`1px solid ${G.border}`}}>
                <Image src="/img-villa-top.jpg" alt="Villa" fill style={{objectFit:'cover'}}/>
              </div>
              <div style={{position:'relative',height:170,borderRadius:12,
                overflow:'hidden',border:`1px solid ${G.border}`}}>
                <Image src="/img-villa-garden.jpg" alt="Garden" fill style={{objectFit:'cover'}}/>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:740px){#story .si > div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════ VALUES ═══════════════════════════════ */
function Values() {
  const t=useTranslations('values');
  const icons=['👥','✅','♻️','💰','❤️','💡'];
  const vals=t.raw('v') as Array<{title:string;text:string}>;
  return (
    <section id="values" className="sp" style={{background:'#070f07'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:56}}>
          <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')} center/></Reveal>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
          style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {vals.map((v,i)=>(
            <motion.div key={i} variants={fadeUp}>
              <Card className="vc" style={{padding:'28px 24px',height:'100%'}}>
                <div style={{fontSize:34,marginBottom:14}}>{icons[i]}</div>
                <h3 style={{fontSize:16,fontWeight:700,color:G.light,marginBottom:10}}>{v.title}</h3>
                <p style={{fontSize:13,color:G.text,lineHeight:1.8}}>{v.text}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media(max-width:860px){#values .si > div:last-child{grid-template-columns:1fr 1fr!important}}
        @media(max-width:500px){#values .si > div:last-child{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════ VILLA ════════════════════════════════ */
function Villa() {
  const t=useTranslations('villa');
  const vb=useTranslations('villa_banner');
  const features=t.raw('f') as Array<{title:string;text:string}>;
  const icons=['🌿','💚','♻️','🌾'];
  return (
    <section id="villa" className="sp" style={{background:G.bg}}>
      <div className="si">
        {/* Full-width banner card */}
        <Reveal style={{marginBottom:40}}>
          <Card hover={false} style={{overflow:'hidden',borderRadius:20}}>
            <div style={{position:'relative',height:280}}>
              <Image src="/img-family-pool.jpg" alt="La Granja" fill
                style={{objectFit:'cover',objectPosition:'center 30%'}}/>
              <div style={{position:'absolute',inset:0,
                background:'linear-gradient(to right,rgba(6,13,6,.92) 0%,rgba(6,13,6,.4) 55%,transparent 100%)'}}/>
              <div style={{position:'absolute',inset:0,padding:'0 40px',display:'flex',
                flexDirection:'column',justifyContent:'center'}}>
                <Tag text={t('tag')}/>
                <div className="font-display" style={{fontSize:'clamp(20px,3vw,32px)',
                  fontWeight:600,color:'#fff'}}>{vb('subtitle')}</div>
              </div>
            </div>
          </Card>
        </Reveal>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'start'}}>
          {/* Headlines + text */}
          <Reveal>
            <h2 className="font-display" style={{fontSize:'clamp(40px,6vw,88px)',fontWeight:300,
              color:'#fff',lineHeight:1,marginBottom:32}}>
              <span className="shimmer" style={{fontWeight:700,display:'block'}}>{t('l1')}</span>
              <span className="shimmer" style={{fontWeight:700,display:'block'}}>{t('l2')}</span>
              <span className="shimmer" style={{fontWeight:700,display:'block'}}>{t('l3')}</span>
            </h2>
            <p style={{fontSize:15,color:G.text,lineHeight:1.9,marginBottom:12}}>{t('p1')}</p>
            <p style={{fontSize:15,color:G.text,lineHeight:1.9,marginBottom:12}}>{t('p2')}</p>
            <p style={{fontSize:15,color:G.text,lineHeight:1.9,marginBottom:28}}>{t('p3')}</p>
            <motion.a whileHover={{scale:1.05}} href="#projects"
              style={{display:'inline-block',background:`linear-gradient(135deg,${G.green},${G.mid})`,
                color:'#fff',padding:'13px 32px',borderRadius:100,textDecoration:'none',
                fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
                boxShadow:`0 8px 24px ${G.glow}`}}>{t('btn')}</motion.a>
          </Reveal>

          {/* Feature cards 2×2 */}
          <Reveal delay={.1}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {features.map((f,i)=>(
                <Card key={i} style={{padding:'20px 18px'}}>
                  <div style={{fontSize:22,marginBottom:10}}>{icons[i]}</div>
                  <div style={{fontSize:13,fontWeight:700,color:G.light,marginBottom:6}}>{f.title}</div>
                  <div style={{fontSize:12,color:G.text,lineHeight:1.65}}>{f.text}</div>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:740px){#villa .si > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════ MANAGEMENT ═══════════════════════════ */
function Management() {
  const t=useTranslations('management');
  const ta=useTranslations('management.ahmed');
  const tm=useTranslations('management.mohamed');
  const founders=[
    {d:ta,i:'A',g:`linear-gradient(135deg,#2d5a1b,${G.mid})`},
    {d:tm,i:'M',g:'linear-gradient(135deg,#1a3a2a,#2d6b4a)'},
  ];
  return (
    <section id="management" className="sp" style={{background:'#070f07'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:48}}>
          <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')} center/></Reveal>
          <Reveal delay={.1}><p style={{fontSize:15,color:G.sub,maxWidth:500,margin:'14px auto 0'}}>{t('desc')}</p></Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          {founders.map((f,idx)=>{
            const tags=f.d.raw('tags') as string[];
            const pts=f.d.raw('points') as string[];
            return (
              <Reveal key={idx} delay={idx*.15}>
                <Card style={{overflow:'hidden'}}>
                  {/* Header */}
                  <div style={{padding:'32px 32px 24px',
                    background:'linear-gradient(135deg,#061506,#0d2a0d)',
                    display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <div style={{width:68,height:68,borderRadius:'50%',display:'flex',
                      alignItems:'center',justifyContent:'center',color:'#fff',
                      fontSize:30,fontWeight:800,marginBottom:14,background:f.g,
                      boxShadow:`0 6px 20px ${G.glow}`}}>{f.i}</div>
                    <div className="font-display" style={{fontSize:'clamp(20px,2.5vw,28px)',
                      fontWeight:600,color:'#fff',marginBottom:4}}>{f.d('name')}</div>
                    <div style={{fontSize:10,letterSpacing:'2px',textTransform:'uppercase',
                      fontWeight:700,color:G.mid}}>{f.d('role')}</div>
                  </div>
                  {/* Body */}
                  <div style={{padding:'22px 32px 30px',borderTop:`3px solid ${G.green}`}}>
                    <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:18}}>
                      {tags.map((tag,j)=>(
                        <span key={j} style={{padding:'4px 12px',borderRadius:100,fontSize:11,
                          fontWeight:700,background:'rgba(106,181,74,0.1)',
                          color:G.light,border:`1px solid ${G.border}`}}>{tag}</span>
                      ))}
                    </div>
                    <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                      {pts.map((p,j)=>(
                        <li key={j} style={{display:'flex',gap:9,alignItems:'flex-start',
                          fontSize:13,color:G.text,lineHeight:1.75}}>
                          <span style={{color:G.mid,fontSize:10,marginTop:4,flexShrink:0}}>▶</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:680px){#management .si > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════ INVESTMENT ═══════════════════════════ */
function Investment() {
  const t=useTranslations('investment');
  const cards=t.raw('cards') as Array<{icon:string;title:string;text:string}>;
  return (
    <section id="investment" className="sp" style={{position:'relative',overflow:'hidden',background:G.bg}}>
      <div style={{position:'absolute',inset:0}}>
        <Image src="/img-farm.jpg" alt="Farm" fill style={{objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(160deg,rgba(6,13,6,.97) 0%,rgba(7,16,7,.94) 100%)'}}/>
      </div>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')} center/></Reveal>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
          style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {cards.map((c,i)=>(
            <motion.div key={i} variants={fadeUp}>
              <Card style={{padding:'28px 22px',height:'100%'}}>
                <div style={{fontSize:30,marginBottom:14}}>{c.icon}</div>
                <h3 className="font-display" style={{fontSize:'clamp(16px,1.8vw,20px)',
                  fontWeight:600,color:G.light,marginBottom:10}}>{c.title}</h3>
                <p style={{fontSize:13,color:G.text,lineHeight:1.8}}>{c.text}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media(max-width:860px){#investment .si > div:last-child{grid-template-columns:1fr 1fr!important}}
        @media(max-width:500px){#investment .si > div:last-child{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════ PROJECTS ═════════════════════════════ */
function Projects() {
  const t=useTranslations('projects');
  const rw=useTranslations('projects.rw');
  const rh=useTranslations('projects.rh');
  const gh=useTranslations('projects.gh');
  const vb=useTranslations('villa_banner');
  const [tab,setTab]=useState(0);
  const tabs=t.raw('tabs') as string[];
  const rwStats=rw.raw('stats') as Array<{num:string;label:string}>;
  const rwFeats=rw.raw('features') as Array<{title:string;text:string}>;

  return (
    <section id="projects" className="sp" style={{background:'#070f07'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:20}}>
          <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')} center/></Reveal>
          <Reveal delay={.1}><p style={{fontSize:15,color:G.sub,maxWidth:560,margin:'14px auto 0'}}>{t('desc')}</p></Reveal>
        </div>

        {/* Tabs */}
        <Reveal style={{display:'flex',justifyContent:'center',margin:'36px 0',overflowX:'auto'}}>
          <div style={{display:'inline-flex',gap:4,padding:'5px',borderRadius:100,
            background:'rgba(106,181,74,0.07)',border:`1px solid ${G.border}`,flexShrink:0}}>
            {tabs.map((label,i)=>(
              <motion.button key={i} onClick={()=>setTab(i)}
                animate={{background:tab===i?G.green:'transparent',
                  color:tab===i?'#fff':G.sub,
                  boxShadow:tab===i?`0 4px 16px ${G.glow}`:'none'}}
                style={{padding:'9px 20px',borderRadius:100,fontSize:12,
                  fontWeight:700,cursor:'pointer',border:'none',whiteSpace:'nowrap',
                  letterSpacing:'.5px'}}>
                {label}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {tab===0&&(
            <motion.div key="rw" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}>
              <Card hover={false} style={{padding:'36px 32px'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'start'}}>
                  <div>
                    <div style={{display:'inline-flex',alignItems:'center',gap:8,
                      background:'rgba(106,181,74,0.1)',border:`1px solid ${G.border}`,
                      borderRadius:100,padding:'5px 14px',marginBottom:14}}>
                      <span style={{fontSize:10,letterSpacing:'3px',textTransform:'uppercase',
                        fontWeight:700,color:G.light}}>{rw('label')}</span>
                    </div>
                    <h3 className="font-display" style={{fontSize:'clamp(32px,4vw,48px)',
                      fontWeight:700,marginBottom:6,lineHeight:1.1}}>
                      <span style={{color:'#fff'}}>RAYAN </span>
                      <span className="shimmer">WEST</span>
                    </h3>
                    <p style={{fontSize:13,fontStyle:'italic',color:G.muted,marginBottom:14}}>{rw('tagline')}</p>
                    <p style={{fontSize:14,lineHeight:1.85,color:G.text,marginBottom:22}}>{rw('desc')}</p>
                    <div style={{borderRadius:12,overflow:'hidden',marginBottom:22,
                      position:'relative',height:190,border:`1px solid ${G.border}`}}>
                      <Image src="/img-villa-top.jpg" alt="Rayan West" fill style={{objectFit:'cover'}}/>
                      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'flex-end',
                        padding:16,background:'linear-gradient(to top,rgba(6,13,6,.85) 0%,transparent 55%)'}}>
                        <div>
                          <div className="font-display" style={{fontSize:17,fontWeight:700,color:'#fff'}}>{vb('enjoy')}</div>
                          <div style={{fontSize:11,color:G.light}}>{vb('enjoyAr')}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                      {rwStats.map((s,i)=>(
                        <motion.div key={i} whileHover={{scale:1.04}}
                          style={{textAlign:'center',padding:'16px',borderRadius:10,
                            background:'rgba(106,181,74,0.07)',border:`1px solid ${G.border}`,
                            borderBottom:`3px solid ${G.green}`,cursor:'default'}}>
                          <div className="sn" style={{fontSize:34,fontWeight:800}}>{s.num}</div>
                          <div style={{fontSize:11,color:G.sub,marginTop:4}}>{s.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:16}}>
                    {rwFeats.map((f,i)=>(
                      <motion.div key={i} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
                        transition={{delay:i*.08}}
                        whileHover={{x:6,background:'rgba(106,181,74,0.08)'}}
                        style={{borderLeft:`3px solid ${G.mid}`,paddingLeft:16,paddingBlock:4,
                          transition:'all .25s',cursor:'default'}}>
                        <div style={{fontSize:14,fontWeight:700,color:G.light,marginBottom:5}}>{f.title}</div>
                        <div style={{fontSize:13,color:G.text,lineHeight:1.72}}>{f.text}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          {tab!==0&&(
            <motion.div key={`cs${tab}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <CSPanel d={tab===1?rh:gh} img={tab===1?'/img-villa-garden.jpg':'/img-aerial.jpg'}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        @media(max-width:740px){
          #projects .si > div:last-child > div > div > div[style*="grid-template-columns:1fr 1fr"]{
            grid-template-columns:1fr!important
          }
        }
      `}</style>
    </section>
  );
}

function CSPanel({d,img}:{d:ReturnType<typeof useTranslations<'projects.rh'>>;img:string}) {
  return (
    <Card hover={false} style={{minHeight:380,overflow:'hidden',position:'relative'}}>
      <div style={{position:'absolute',inset:0,opacity:.2}}>
        <Image src={img} alt="" fill style={{objectFit:'cover'}}/>
      </div>
      <div style={{position:'relative',zIndex:2,padding:'64px 32px',textAlign:'center',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:380}}>
        <Tag text={d('label')}/>
        <h3 className="font-display shimmer" style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:700,marginBottom:10}}>{d('title')}</h3>
        <p style={{fontSize:13,color:G.muted,marginBottom:14}}>{d('sub')}</p>
        <p style={{fontSize:15,color:G.text,maxWidth:520,lineHeight:1.85,marginBottom:32}}>{d('text')}</p>
        <motion.span whileHover={{scale:1.05}}
          style={{display:'inline-block',padding:'11px 32px',borderRadius:100,
            background:`linear-gradient(135deg,${G.green},${G.mid})`,
            color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',cursor:'default'}}>
          {d('badge')}
        </motion.span>
      </div>
    </Card>
  );
}

/* ═══════════════════════════════ LIFESTYLE STRIP ══════════════════════ */
function LifestyleStrip() {
  const t=useTranslations('lifestyle');
  return (
    <div style={{position:'relative',height:400,overflow:'hidden'}}>
      <Image src="/img-pergola.jpg" alt="Life at Rayan West" fill
        style={{objectFit:'cover',objectPosition:'center'}}/>
      <div style={{position:'absolute',inset:0,
        background:'linear-gradient(135deg,rgba(6,13,6,.94) 0%,rgba(15,40,15,.65) 55%,transparent 100%)'}}/>
      <motion.div animate={{opacity:[.3,.6,.3],scale:[1,1.1,1]}}
        transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}
        style={{position:'absolute',bottom:'-30%',left:'15%',width:500,height:500,
          borderRadius:'50%',pointerEvents:'none',
          background:`radial-gradient(circle,rgba(74,180,63,.12) 0%,transparent 60%)`}}/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center'}}>
        <div className="si" style={{width:'100%'}}>
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}}
            viewport={{once:true}} transition={{duration:.9}}>
            <Tag text={t('tag')}/>
            <div className="font-display" style={{fontSize:'clamp(28px,5vw,64px)',
              fontWeight:300,color:'#fff',lineHeight:1.05,marginBottom:4}}>
              {t('line1')} <strong className="shimmer" style={{fontWeight:700}}>{t('line1b')}</strong>
            </div>
            <div className="font-display" style={{fontSize:'clamp(28px,5vw,64px)',
              fontWeight:700,color:'#fff',lineHeight:1.05,marginBottom:20}}>
              {t('line2')} <strong className="shimmer">{t('line2b')}</strong>
            </div>
            <p style={{fontSize:15,color:G.sub,marginBottom:24}}>{t('arabic')}</p>
            <motion.a whileHover={{scale:1.05}} href="#projects"
              style={{display:'inline-block',
                background:`linear-gradient(135deg,${G.green},${G.mid})`,
                color:'#fff',padding:'12px 30px',borderRadius:100,textDecoration:'none',
                fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase'}}>
              {t('btn')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════ EGYPT ════════════════════════════════ */
function Egypt() {
  const t=useTranslations('egypt');
  const stats=t.raw('stats') as Array<{num:string;label:string}>;
  return (
    <section id="egypt" className="sp" style={{background:'#070f07'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:48}}>
          <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')} center/>
            <p style={{fontSize:15,color:G.sub,marginTop:16}}>{t('intro')}</p>
          </Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          <Reveal delay={.1}>
            <Card style={{padding:'28px 26px',height:'100%'}}>
              <h3 className="font-display" style={{fontSize:'clamp(17px,2vw,22px)',fontWeight:600,
                color:G.light,marginBottom:18,paddingBottom:12,borderBottom:`1px solid ${G.border}`}}>
                {t('c1title')}</h3>
              <div style={{display:'flex',flexDirection:'column',gap:12,
                fontSize:14,color:G.text,lineHeight:1.88}}>
                <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={.2}>
            <Card style={{padding:'28px 26px',height:'100%'}}>
              <h3 className="font-display" style={{fontSize:'clamp(17px,2vw,22px)',fontWeight:600,
                color:G.light,marginBottom:18,paddingBottom:12,borderBottom:`1px solid ${G.border}`}}>
                {t('c2title')}</h3>
              <div style={{display:'flex',flexDirection:'column',gap:12,
                fontSize:14,color:G.text,lineHeight:1.88,marginBottom:22}}>
                <p>{t('p4')}</p><p>{t('p5')}</p>
              </div>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                {stats.map((s,i)=>(
                  <motion.div key={i} whileHover={{scale:1.05,borderColor:G.borderH}}
                    style={{textAlign:'center',padding:'16px 22px',borderRadius:12,
                      background:'rgba(106,181,74,0.08)',border:`1px solid ${G.border}`,
                      cursor:'default',transition:'all .25s'}}>
                    <div className="sn" style={{fontSize:28,fontWeight:800}}>{s.num}</div>
                    <div style={{fontSize:11,color:G.sub,marginTop:4}}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:680px){#egypt .si > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════ SUSTAINABILITY ═══════════════════════ */
function Sustainability() {
  const t=useTranslations('sustainability');
  const feats=t.raw('features') as Array<{icon:string;title:string;text:string}>;
  return (
    <section id="sustainability" className="sp" style={{background:G.bg}}>
      <div className="si">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'start'}}>
          <div>
            <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')}/>
              <p style={{fontSize:15,color:G.text,marginTop:20,lineHeight:1.88}}>{t('p1')}</p>
              <p style={{fontSize:15,color:G.text,marginTop:12,lineHeight:1.88}}>{t('p2')}</p>
            </Reveal>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
            style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            {feats.map((f,i)=>(
              <motion.div key={i} variants={fadeUp}>
                <Card style={{padding:'24px 20px',height:'100%'}}>
                  <div style={{fontSize:26,marginBottom:10}}>{f.icon}</div>
                  <div style={{fontSize:13,fontWeight:700,color:G.light,marginBottom:6}}>{f.title}</div>
                  <div style={{fontSize:12,color:G.text,lineHeight:1.65}}>{f.text}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:740px){#sustainability .si > div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════ PARTNERS ════════════════════════════= */
function Partners() {
  const t=useTranslations('partners');
  const sg=useTranslations('partners.sg');
  const ef=useTranslations('partners.ef');
  const partners=[
    {name:sg('name'),emoji:'☀️',secs:sg.raw('sections') as Array<{title:string;text:string}>},
    {name:ef('name'),emoji:'🏗️',secs:ef.raw('sections') as Array<{title:string;text:string}>},
  ];
  return (
    <section id="partners" className="sp" style={{background:'#070f07'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:48}}>
          <Reveal><Tag text={t('tag')}/><SectionTitle title={t('title')} bold={t('bold')} center/></Reveal>
          <Reveal delay={.1}><p style={{fontSize:15,color:G.sub,maxWidth:520,margin:'14px auto 0'}}>{t('desc')}</p></Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          {partners.map((p,i)=>(
            <Reveal key={i} delay={i*.15}>
              <Card style={{overflow:'hidden',height:'100%'}}>
                <div style={{padding:'26px 28px',
                  background:'linear-gradient(135deg,#061506,#0d2a0d)'}}>
                  <div style={{fontSize:20,fontWeight:800,color:'#fff',letterSpacing:.5}}>
                    {p.emoji} {p.name}
                  </div>
                </div>
                <div style={{padding:'22px 28px 28px',display:'flex',flexDirection:'column',gap:20}}>
                  {p.secs.map((s,j)=>(
                    <div key={j}>
                      <h4 className="font-display" style={{fontSize:16,fontWeight:600,color:G.light,
                        marginBottom:7,paddingBottom:7,borderBottom:`1px solid ${G.border}`}}>{s.title}</h4>
                      <p style={{fontSize:13,color:G.text,lineHeight:1.78}}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:680px){#partners .si > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════ FOOTER ═══════════════════════════════ */
function Footer() {
  const t=useTranslations('footer');
  const cols=t.raw('cols') as Array<{title:string;links:Array<{label:string;href:string}>}>;
  return (
    <footer style={{background:'#030803',padding:'56px 0 28px',
      borderTop:`1px solid ${G.border}`}}>
      <div className="si">
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr 1fr 1fr',gap:40,
          paddingBottom:40,borderBottom:`1px solid rgba(106,181,74,0.1)`,marginBottom:28}}>
          <div>
            <div className="font-display" style={{fontSize:28,fontWeight:600,color:'#fff',marginBottom:4}}>
              LA <span className="shimmer">GRANJA</span>
            </div>
            <div style={{fontSize:12,fontStyle:'italic',color:G.muted,marginBottom:12}}>{t('tagline')}</div>
            <p style={{fontSize:12,color:'rgba(170,210,120,0.35)',lineHeight:1.75,maxWidth:240}}>{t('about')}</p>
          </div>
          {cols.map((col,i)=>(
            <div key={i}>
              <div style={{fontSize:10,letterSpacing:'2px',textTransform:'uppercase',
                fontWeight:700,color:G.mid,marginBottom:16}}>{col.title}</div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {col.links.map((l,j)=>(
                  <li key={j}>
                    <a href={l.href} style={{fontSize:12,color:'rgba(170,210,120,0.4)',
                      textDecoration:'none',transition:'color .25s'}}
                      onMouseOver={e=>(e.currentTarget.style.color=G.light)}
                      onMouseOut={e=>(e.currentTarget.style.color='rgba(170,210,120,0.4)')}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
          flexWrap:'wrap',gap:10}}>
          <span style={{fontSize:11,color:'rgba(170,210,120,0.3)'}}>{t('copy')}</span>
          <a href="https://lagranjaeg.com" target="_blank"
            style={{fontSize:11,color:G.mid,textDecoration:'none'}}>lagranjaeg.com</a>
        </div>
      </div>
      <style>{`@media(max-width:860px){footer .si > div:first-child{grid-template-columns:1fr 1fr!important;gap:28px!important}}
              @media(max-width:500px){footer .si > div:first-child{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

/* ═══════════════════════════════ PAGE ═════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Particles/>
      <Navbar/>
      <Hero/>
      <StatsBar/>
      <About/>
      <VisionMission/>
      <Story/>
      <Values/>
      <Villa/>
      <Management/>
      <Investment/>
      <Projects/>
      <LifestyleStrip/>
      <Egypt/>
      <Sustainability/>
      <Partners/>
      <Footer/>
    </>
  );
}
