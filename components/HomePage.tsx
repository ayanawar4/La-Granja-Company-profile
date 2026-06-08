'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ─── tokens ───────────────────────────────── */
const G = {
  dark:   '#060d06',
  card:   '#0a1a0a',
  cardB:  '#0d2a0d',
  border: 'rgba(74,180,63,0.18)',
  green:  '#4a7c3f',
  mid:    '#6ab54a',
  light:  '#9de080',
  glow:   'rgba(74,180,63,0.35)',
  text:   '#c8e6c8',
  muted:  'rgba(200,230,200,0.55)',
};
const fadeUp  = {hidden:{opacity:0,y:48},visible:{opacity:1,y:0}};
const fadeIn  = {hidden:{opacity:0},visible:{opacity:1}};
const stagger = {visible:{transition:{staggerChildren:.12}}};

/* ─── floating particles ───────────────────── */
function Particles() {
  const items = ['🌿','🍃','🌱','✦','❋','🌾'];
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
      {Array.from({length:18}).map((_,i)=>(
        <div key={i} className="particle" style={{
          left:`${(i*17+7)%100}%`,
          fontSize:`${12+((i*7)%14)}px`,
          animationDuration:`${14+((i*3)%12)}s`,
          animationDelay:`${(i*1.3)%10}s`,
        }}>{items[i%items.length]}</div>
      ))}
    </div>
  );
}

/* ─── reveal ───────────────────────────────── */
function Reveal({children,delay=0,style={},className=''}:{
  children:React.ReactNode;delay?:number;style?:React.CSSProperties;className?:string}) {
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:'-60px'});
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView?'visible':'hidden'}
      transition={{duration:.75,delay,ease:[.25,.1,.25,1]}}
      style={style} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── section label ────────────────────────── */
function Label({text,light=false}:{text:string;light?:boolean}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,
      fontSize:11,letterSpacing:'4px',textTransform:'uppercase',
      fontWeight:700,color:light?G.muted:G.mid,marginBottom:18}}>
      <span style={{width:28,height:1,background:light?G.muted:G.mid,display:'block',flexShrink:0}}/>
      {text}
    </div>
  );
}

/* ─── section heading ──────────────────────── */
function H2({title,bold,light=false}:{title:string;bold:string;light?:boolean}) {
  return (
    <h2 className="font-display" style={{
      fontSize:'clamp(34px,4.5vw,58px)',fontWeight:300,lineHeight:1.1,
      color:light?G.text:'#1a3a1a',marginBottom:8}}>
      {title}{' '}
      <strong style={{fontWeight:700,color:light?G.light:G.green}}>{bold}</strong>
    </h2>
  );
}

/* ─── divider ──────────────────────────────── */
function GreenDivider({flip=false}:{flip?:boolean}) {
  return (
    <div style={{lineHeight:0,transform:flip?'scaleY(-1)':'none',background:'transparent'}}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{display:'block',width:'100%',height:60}}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#060d06"/>
      </svg>
    </div>
  );
}

/* ═══════════════════ NAVBAR ════════════════════════════════════ */
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

  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,
      transition:'all .4s',
      background:scrolled?'rgba(6,13,6,0.97)':'rgba(6,13,6,0.2)',
      backdropFilter:'blur(20px)',
      borderBottom:scrolled?`1px solid ${G.border}`:'1px solid transparent'}}>
      <div className="si" style={{display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:scrolled?'12px 56px':'20px 56px',transition:'padding .4s'}}>

        {/* logo */}
        <a href="#hero" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}>
          <motion.div whileHover={{scale:1.1,rotate:5}}
            style={{width:42,height:42,borderRadius:'50%',display:'flex',
              alignItems:'center',justifyContent:'center',color:'#fff',
              fontSize:18,fontWeight:800,
              background:'linear-gradient(135deg,#2d5a1b,#6ab54a)',
              boxShadow:`0 4px 24px ${G.glow}`}}>G</motion.div>
          <span style={{color:'#fff',fontWeight:700,fontSize:18,letterSpacing:1,fontFamily:'Outfit,sans-serif'}}>
            LA <span style={{color:G.light}}>GRANJA</span>
          </span>
        </a>

        {/* desktop */}
        <div className="hide-lg" style={{display:'flex',alignItems:'center',gap:24,
          flexDirection:isAr?'row-reverse':'row'}}>
          {links.map(l=>(
            <a key={l.href} href={l.href} style={{color:G.muted,textDecoration:'none',
              fontSize:12,fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',transition:'color .3s'}}
              onMouseOver={e=>(e.currentTarget.style.color=G.light)}
              onMouseOut={e=>(e.currentTarget.style.color=G.muted)}>{l.l}</a>
          ))}
          <motion.a whileHover={{scale:1.05}} href="#partners"
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,color:'#fff',
              padding:'9px 22px',borderRadius:100,textDecoration:'none',
              fontSize:12,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',
              boxShadow:`0 4px 20px ${G.glow}`}}>{t('partners')}</motion.a>
          <motion.button whileHover={{scale:1.05}} onClick={switchLang}
            style={{display:'flex',alignItems:'center',gap:8,padding:'9px 18px',
              borderRadius:100,border:`1px solid ${G.border}`,
              background:'rgba(74,180,63,0.08)',color:G.light,
              fontSize:13,fontWeight:700,cursor:'pointer'}}>
            <span>{isAr?'🇬🇧':'🇸🇦'}</span><span>{t('langSwitch')}</span>
          </motion.button>
        </div>

        {/* mobile */}
        <div style={{display:'flex',gap:10}}>
          <button className="show-lg" onClick={switchLang}
            style={{display:'none',background:`linear-gradient(135deg,${G.green},${G.mid})`,
              color:'#fff',border:'none',borderRadius:100,padding:'8px 16px',
              fontSize:13,fontWeight:700,cursor:'pointer'}}>
            {isAr?'🇬🇧 EN':'🇸🇦 ع'}
          </button>
          <button className="show-lg" onClick={()=>setOpen(!open)}
            style={{display:'none',background:'none',border:'none',cursor:'pointer',padding:8}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{width:22,height:2,background:G.light,marginBottom:i<2?5:0,
                transition:'all .3s',
                transform:open&&i===0?'rotate(45deg) translate(5px,5px)':
                          open&&i===2?'rotate(-45deg) translate(5px,-5px)':'none',
                opacity:open&&i===1?0:1}}/>
            ))}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            style={{background:'rgba(6,13,6,0.98)',borderTop:`1px solid ${G.border}`,
              padding:'16px 20px 24px',display:'flex',flexDirection:'column',gap:4}}>
            {[...links,{href:'#partners',l:t('partners')}].map(l=>(
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)}
                style={{color:G.muted,textDecoration:'none',padding:'12px 0',
                  fontSize:14,fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',
                  borderBottom:`1px solid ${G.border}`}}>{l.l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════ HERO ════════════════════════════════════ */
function Hero() {
  const t=useTranslations('hero');
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const y=useTransform(scrollYProgress,[0,1],[0,200]);

  return (
    <section ref={ref} id="hero" style={{position:'relative',height:'100vh',
      display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>

      {/* parallax bg */}
      <motion.div style={{position:'absolute',inset:0,y}}>
        <Image src="/img-aerial.jpg" alt="La Granja" fill
          style={{objectFit:'cover',objectPosition:'center'}} priority/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(160deg,rgba(6,13,6,0.92) 0%,rgba(10,26,10,0.78) 40%,rgba(6,13,6,0.6) 100%)'}}/>
        {/* green vignette */}
        <div style={{position:'absolute',inset:0,
          background:'radial-gradient(ellipse at center bottom,rgba(74,180,63,0.15) 0%,transparent 70%)'}}/>
      </motion.div>

      {/* animated green orbs */}
      {[{x:'10%',y:'20%',s:300},{x:'85%',y:'60%',s:200},{x:'50%',y:'80%',s:400}].map((o,i)=>(
        <motion.div key={i} style={{position:'absolute',left:o.x,top:o.y,
          width:o.s,height:o.s,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(74,180,63,0.12) 0%,transparent 70%)',
          pointerEvents:'none'}}
          animate={{scale:[1,1.3,1],opacity:[0.4,0.8,0.4]}}
          transition={{duration:4+i*2,repeat:Infinity,ease:'easeInOut',delay:i*1.5}}/>
      ))}

      <div style={{position:'relative',zIndex:2,textAlign:'center',padding:'0 20px',maxWidth:960,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3}}
          style={{display:'inline-flex',alignItems:'center',gap:10,
            background:'rgba(74,180,63,0.12)',border:`1px solid rgba(74,180,63,0.3)`,
            borderRadius:100,padding:'8px 20px',marginBottom:28}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:G.mid,display:'block',
            boxShadow:`0 0 8px ${G.mid}`}}/>
          <span style={{fontSize:11,letterSpacing:'4px',textTransform:'uppercase',
            fontWeight:700,color:G.light}}>{t('eyebrow')}</span>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:.5,duration:1}}
          className="font-display h1"
          style={{fontSize:'clamp(56px,10vw,130px)',fontWeight:300,lineHeight:.95,
            color:'#fff',marginBottom:20}}>
          {t('title1')}{' '}
          <span className="shimmer" style={{fontWeight:700}}>{t('title2')}</span>
        </motion.h1>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.8}}
          className="font-display"
          style={{fontSize:'clamp(17px,2.5vw,26px)',fontStyle:'italic',
            color:'rgba(200,230,200,0.7)',marginBottom:24}}>
          {t('sub')}
        </motion.p>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
          style={{color:G.muted,fontSize:'clamp(13px,1.4vw,16px)',lineHeight:1.85,
            marginBottom:40,maxWidth:580,marginLeft:'auto',marginRight:'auto'}}>
          {t('desc')}
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.2}}
          style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <motion.a whileHover={{scale:1.06,boxShadow:`0 16px 40px ${G.glow}`}}
            whileTap={{scale:.97}} href="#projects"
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,color:'#fff',
              padding:'15px 36px',borderRadius:100,textDecoration:'none',
              fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
              boxShadow:`0 8px 32px ${G.glow}`}}>
            {t('btn1')}
          </motion.a>
          <motion.a whileHover={{scale:1.04,background:'rgba(74,180,63,0.12)'}}
            whileTap={{scale:.97}} href="#about"
            style={{color:G.light,border:`1.5px solid rgba(74,180,63,0.4)`,
              padding:'14px 36px',borderRadius:100,textDecoration:'none',
              fontSize:13,fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',
              background:'transparent',transition:'background .3s'}}>
            {t('btn2')}
          </motion.a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.4}}
        style={{position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:6,
          color:'rgba(155,220,100,0.4)'}}>
        <div style={{width:1,height:40,background:'linear-gradient(to bottom,transparent,rgba(74,180,63,0.6))'}}/>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}

/* ═══════════════════ STATS ════════════════════════════════════ */
function StatsBar() {
  const t=useTranslations('stats');
  const items=[
    {num:'100',k:'s1'},{num:'94',k:'s2'},{num:'30',k:'s3'},{num:'17+',k:'s4'},{num:'2008',k:'s5'}
  ] as const;
  const doubled=[...items,...items];
  return (
    <div style={{overflow:'hidden',padding:'18px 0',
      background:'linear-gradient(90deg,rgba(45,90,27,0.6),rgba(106,181,74,0.4),rgba(45,90,27,0.6))',
      borderTop:`1px solid ${G.border}`,borderBottom:`1px solid ${G.border}`,
      backdropFilter:'blur(10px)'}}>
      <div className="ticker-anim" style={{display:'flex',gap:48,whiteSpace:'nowrap'}}>
        {doubled.map((s,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
            <span className="sn" style={{fontSize:28,fontWeight:700}}>{s.num}</span>
            <span style={{fontSize:13,color:G.muted}}>{t(s.k)}</span>
            <span style={{width:1,height:20,background:G.border,marginLeft:32,display:'inline-block'}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ ABOUT ════════════════════════════════════ */
function About() {
  const t=useTranslations('about');
  return (
    <section id="about" className="sp animated-bg" style={{position:'relative'}}>
      <Particles/>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <div className="g2">
          <Reveal>
            <div style={{position:'relative',paddingBottom:24}}>
              <motion.div whileHover={{scale:1.02}}
                style={{position:'relative',borderRadius:20,overflow:'hidden',aspectRatio:'4/5',
                  boxShadow:`0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${G.border}`}}>
                <Image src="/img-aerial.jpg" alt="La Granja" fill
                  style={{objectFit:'cover',objectPosition:'center'}}/>
                <div style={{position:'absolute',inset:0,
                  background:'linear-gradient(to top,rgba(6,13,6,0.7) 0%,transparent 50%)'}}/>
              </motion.div>
              {/* accent img */}
              <motion.div whileHover={{scale:1.04}} className="hide-lg"
                style={{position:'absolute',bottom:-24,right:-20,width:'48%',aspectRatio:'1',
                  borderRadius:16,overflow:'hidden',
                  border:`3px solid rgba(74,180,63,0.5)`,
                  boxShadow:`0 16px 48px rgba(0,0,0,0.5), 0 0 20px ${G.glow}`}}>
                <Image src="/img-pergola.jpg" alt="Pool" fill style={{objectFit:'cover'}}/>
              </motion.div>
              {/* badge */}
              <div className="hide-lg" style={{position:'absolute',top:28,left:-16,
                padding:'20px 22px',borderRadius:12,
                background:'linear-gradient(135deg,#0d2a0d,#153a15)',
                border:`1px solid ${G.border}`,
                boxShadow:`0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${G.glow}`}}>
                <div className="sn" style={{fontSize:44,fontWeight:700,lineHeight:1}}>3</div>
                <div style={{fontSize:11,color:G.muted,marginTop:4,letterSpacing:1}}>{t('badge')}</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Label text={t('tag')} light/>
              <H2 title={t('title')} bold={t('bold')} light/>
              <div style={{width:56,height:3,borderRadius:2,marginTop:20,marginBottom:32,
                background:`linear-gradient(to right,${G.green},${G.light})`}}/>
              <p style={{fontSize:16,lineHeight:1.9,color:G.muted}}>{t('desc')}</p>
            </Reveal>
            <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
              style={{listStyle:'none',marginTop:28,display:'flex',flexDirection:'column',gap:12}}>
              {(['b1','b2','b3','b4'] as const).map((k,i)=>(
                <motion.li key={i} variants={fadeUp}
                  whileHover={{x:8,background:'rgba(74,180,63,0.12)'}}
                  transition={{duration:.2}}
                  style={{display:'flex',gap:14,alignItems:'flex-start',padding:'14px 18px',
                    borderRadius:10,borderLeft:`3px solid ${G.mid}`,
                    background:'rgba(74,180,63,0.06)',
                    border:`1px solid ${G.border}`,fontSize:14,color:G.text,lineHeight:1.75,cursor:'default'}}>
                  <span style={{color:G.mid,marginTop:3,flexShrink:0,fontSize:14}}>🌿</span>
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

/* ═══════════════════ VISION/MISSION ═══════════════════════════ */
function VisionMission() {
  const t=useTranslations('vm');
  return (
    <section id="vision" style={{position:'relative',overflow:'hidden'}}>
      <div style={{position:'relative',zIndex:1}}>
        <div className="gvm">
          {[
            {label:t('vlabel'),title:t('vtitle'),text:t('vtext'),
             bg:'linear-gradient(135deg,#061506 0%,#0a2a0a 100%)',img:'/img-villa-garden.jpg'},
            {label:t('mlabel'),title:t('mtitle'),text:t('mtext'),
             bg:'linear-gradient(135deg,#0d3a0d 0%,#1a5a1a 100%)',img:'/img-family-pool.jpg'},
          ].map((card,i)=>(
            <div key={i} style={{position:'relative',minHeight:480,overflow:'hidden'}}>
              <Image src={card.img} alt={card.label} fill style={{objectFit:'cover',objectPosition:'center'}}/>
              <div style={{position:'absolute',inset:0,background:card.bg,opacity:.88}}/>
              <div style={{position:'absolute',inset:0,padding:'64px 56px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*.2}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:8,
                    background:'rgba(74,180,63,0.15)',border:`1px solid rgba(74,180,63,0.3)`,
                    borderRadius:100,padding:'6px 16px',marginBottom:20}}>
                    <span style={{fontSize:10,letterSpacing:'4px',textTransform:'uppercase',
                      fontWeight:700,color:G.light}}>{card.label}</span>
                  </div>
                  <h3 className="font-display" style={{fontSize:'clamp(26px,3vw,36px)',
                    fontWeight:600,color:'#fff',marginBottom:20,lineHeight:1.2}}>{card.title}</h3>
                  <p style={{fontSize:15,color:'rgba(200,230,200,0.82)',lineHeight:1.9}}>{card.text}</p>
                  <div style={{marginTop:28,width:48,height:2,
                    background:`linear-gradient(to right,${G.mid},${G.light})`,borderRadius:1}}/>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ STORY ════════════════════════════════════ */
function Story() {
  const t=useTranslations('story');
  const pts=[{icon:'🌱',k:'p1'},{icon:'🏡',k:'p2'},{icon:'🌾',k:'p3'},{icon:'🚀',k:'p4'}] as const;
  return (
    <section id="story" className="sp" style={{background:'#071207'}}>
      <div className="si">
        <div className="g2" style={{alignItems:'start'}}>
          <div>
            <Reveal><Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
              <div style={{width:56,height:3,borderRadius:2,marginTop:20,marginBottom:32,
                background:`linear-gradient(to right,${G.green},${G.light})`}}/>
            </Reveal>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
              style={{display:'flex',flexDirection:'column',gap:12}}>
              {pts.map((p,i)=>(
                <motion.div key={i} variants={fadeUp}
                  whileHover={{x:8,boxShadow:`0 0 0 1px ${G.mid}, 0 12px 32px rgba(74,180,63,0.15)`}}
                  transition={{duration:.2}}
                  className="farm-card"
                  style={{display:'flex',gap:16,alignItems:'flex-start',padding:'18px 20px',
                    borderRadius:12,background:'rgba(74,180,63,0.06)',
                    border:`1px solid ${G.border}`,cursor:'default'}}>
                  <span style={{fontSize:22,flexShrink:0}}>{p.icon}</span>
                  <p style={{fontSize:14,lineHeight:1.8,color:G.text}}>{t(p.k)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Reveal delay={.2}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'240px 200px',gap:12}}>
              <div style={{gridColumn:'span 2',position:'relative',borderRadius:20,overflow:'hidden',
                boxShadow:`0 0 0 1px ${G.border},0 20px 60px rgba(0,0,0,0.5)`}}>
                <Image src="/img-family-pool.jpg" alt="La Granja" fill style={{objectFit:'cover'}}/>
              </div>
              <div style={{position:'relative',borderRadius:14,overflow:'hidden',
                boxShadow:`0 0 0 1px ${G.border}`}}>
                <Image src="/img-villa-top.jpg" alt="Villa" fill style={{objectFit:'cover'}}/>
              </div>
              <div style={{position:'relative',borderRadius:14,overflow:'hidden',
                boxShadow:`0 0 0 1px ${G.border}`}}>
                <Image src="/img-villa-garden.jpg" alt="Garden" fill style={{objectFit:'cover'}}/>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ VALUES ════════════════════════════════════ */
function Values() {
  const t=useTranslations('values');
  const icons=['👥','✅','♻️','💰','❤️','💡'];
  const vals=t.raw('v') as Array<{title:string;text:string}>;
  return (
    <section id="values" className="sp" style={{position:'relative',overflow:'hidden',background:'#060d06'}}>
      {/* bg orb */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:800,height:800,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(74,180,63,0.06) 0%,transparent 70%)',
        pointerEvents:'none'}}/>
      <div className="si" style={{position:'relative',zIndex:1}}>
        <div style={{textAlign:'center',marginBottom:64}}>
          <Reveal><Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
            <div style={{width:56,height:3,borderRadius:2,margin:'20px auto 0',
              background:`linear-gradient(to right,${G.green},${G.light})`}}/></Reveal>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
          className="g3">
          {vals.map((v,i)=>(
            <motion.div key={i} variants={fadeUp}
              whileHover={{y:-12,boxShadow:`0 0 0 1px ${G.mid}, 0 24px 60px rgba(74,180,63,0.2)`}}
              transition={{duration:.3}}
              className="vc farm-card"
              style={{padding:'32px 28px',borderRadius:16,cursor:'default',
                background:'rgba(74,180,63,0.05)',
                border:`1px solid ${G.border}`,position:'relative',overflow:'hidden'}}>
              {/* glow corner */}
              <div style={{position:'absolute',top:-20,right:-20,width:80,height:80,borderRadius:'50%',
                background:`radial-gradient(circle,rgba(74,180,63,0.12) 0%,transparent 70%)`}}/>
              <div style={{fontSize:36,marginBottom:16}}>{icons[i]}</div>
              <h3 style={{fontSize:17,fontWeight:700,color:G.light,marginBottom:10}}>{v.title}</h3>
              <p style={{fontSize:14,color:G.muted,lineHeight:1.78}}>{v.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════ VILLA ════════════════════════════════════ */
function Villa() {
  const t=useTranslations('villa');
  const vb=useTranslations('villa_banner');
  const features=t.raw('f') as Array<{title:string;text:string}>;
  const icons=['🌿','💚','♻️','🌾'];
  return (
    <section id="villa" className="sp" style={{background:'#040b04',position:'relative',overflow:'hidden'}}>
      {/* animated radial */}
      <motion.div animate={{scale:[1,1.2,1],opacity:[.3,.6,.3]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}
        style={{position:'absolute',bottom:'-20%',left:'50%',transform:'translateX(-50%)',
          width:1000,height:1000,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(74,180,63,0.1) 0%,transparent 60%)',
          pointerEvents:'none'}}/>
      <div className="si" style={{position:'relative',zIndex:2}}>
        {/* banner image */}
        <Reveal style={{marginBottom:56}}>
          <div style={{borderRadius:24,overflow:'hidden',position:'relative',height:300,
            boxShadow:`0 0 0 1px ${G.border},0 32px 80px rgba(0,0,0,0.6)`}}>
            <Image src="/img-family-pool.jpg" alt="La Granja" fill
              style={{objectFit:'cover',objectPosition:'center 30%'}}/>
            <div style={{position:'absolute',inset:0,
              background:'linear-gradient(to right,rgba(4,11,4,.92) 0%,rgba(4,11,4,.3) 60%,transparent 100%)'}}/>
            <div style={{position:'absolute',inset:0,padding:'0 48px',
              display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontSize:11,letterSpacing:'4px',textTransform:'uppercase',
                fontWeight:700,color:G.light,marginBottom:12}}>{t('tag')}</div>
              <div className="font-display" style={{fontSize:'clamp(20px,3vw,32px)',fontWeight:600,color:'#fff'}}>
                {vb('subtitle')}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display" style={{fontSize:'clamp(44px,7vw,96px)',fontWeight:300,
            color:'#fff',lineHeight:1,marginBottom:56}}>
            <span className="shimmer" style={{fontWeight:700}}>{t('l1')}</span><br/>
            <span className="shimmer" style={{fontWeight:700}}>{t('l2')}</span><br/>
            <span className="shimmer" style={{fontWeight:700}}>{t('l3')}</span>
          </h2>
        </Reveal>

        <div className="g2" style={{gap:60}}>
          <Reveal delay={.1}>
            <div style={{display:'flex',flexDirection:'column',gap:18,
              fontSize:15,color:G.muted,lineHeight:1.9}}>
              <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
              <motion.a whileHover={{scale:1.05,boxShadow:`0 16px 40px ${G.glow}`}}
                whileTap={{scale:.97}} href="#projects"
                style={{display:'inline-block',marginTop:8,
                  background:`linear-gradient(135deg,${G.green},${G.mid})`,
                  color:'#fff',padding:'14px 36px',borderRadius:100,
                  textDecoration:'none',width:'fit-content',
                  fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
                  boxShadow:`0 8px 30px ${G.glow}`}}>
                {t('btn')}
              </motion.a>
            </div>
          </Reveal>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
            style={{display:'flex',flexDirection:'column',gap:14}}>
            {features.map((f,i)=>(
              <motion.div key={i} variants={fadeUp}
                whileHover={{x:8,background:'rgba(74,180,63,0.1)',boxShadow:`0 0 0 1px ${G.mid}`}}
                transition={{duration:.2}}
                style={{display:'flex',gap:14,alignItems:'flex-start',padding:'16px 20px',
                  borderRadius:12,border:`1px solid ${G.border}`,
                  background:'rgba(74,180,63,0.05)',cursor:'default',transition:'all .3s'}}>
                <span style={{fontSize:20,flexShrink:0}}>{icons[i]}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:G.light,marginBottom:4}}>{f.title}</div>
                  <div style={{fontSize:13,color:G.muted,lineHeight:1.65}}>{f.text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ MANAGEMENT ═══════════════════════════════ */
function Management() {
  const t=useTranslations('management');
  const ta=useTranslations('management.ahmed');
  const tm=useTranslations('management.mohamed');
  const founders=[
    {d:ta,initial:'A',grad:'linear-gradient(135deg,#2d5a1b,#6ab54a)'},
    {d:tm,initial:'M',grad:'linear-gradient(135deg,#1a3a2a,#2d6b4a)'},
  ];
  return (
    <section id="management" className="sp" style={{background:'#071207'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:16}}>
          <Reveal><Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
            <div style={{width:56,height:3,borderRadius:2,margin:'20px auto 0',
              background:`linear-gradient(to right,${G.green},${G.light})`}}/>
          </Reveal>
          <Reveal delay={.1}><p style={{fontSize:16,color:G.muted,maxWidth:520,margin:'20px auto 0'}}>{t('desc')}</p></Reveal>
        </div>
        <div className="g2s" style={{marginTop:16}}>
          {founders.map((f,i)=>{
            const tags=f.d.raw('tags') as string[];
            const pts=f.d.raw('points') as string[];
            return (
              <Reveal key={i} delay={i*.15}>
                <motion.div
                  whileHover={{y:-10,boxShadow:`0 0 0 1px ${G.mid},0 32px 80px rgba(74,180,63,0.2)`}}
                  transition={{duration:.3}}
                  style={{borderRadius:20,overflow:'hidden',
                    border:`1px solid ${G.border}`,
                    background:'rgba(74,180,63,0.04)'}}>
                  <div style={{padding:'40px 36px 28px',
                    background:'linear-gradient(135deg,#061506,#0d2a0d)',
                    display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <div style={{width:76,height:76,borderRadius:'50%',display:'flex',
                      alignItems:'center',justifyContent:'center',color:'#fff',
                      fontSize:34,fontWeight:800,marginBottom:16,background:f.grad,
                      boxShadow:`0 8px 24px ${G.glow}`}}>{f.initial}</div>
                    <div className="font-display" style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:600,
                      color:'#fff',marginBottom:6}}>{f.d('name')}</div>
                    <div style={{fontSize:11,letterSpacing:'2px',textTransform:'uppercase',
                      fontWeight:700,color:G.mid}}>{f.d('role')}</div>
                  </div>
                  <div style={{padding:'28px 36px 36px',borderTop:`3px solid ${G.green}`}}>
                    <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20}}>
                      {tags.map((tag,j)=>(
                        <span key={j} style={{padding:'5px 14px',borderRadius:100,fontSize:12,
                          fontWeight:700,background:'rgba(74,180,63,0.1)',
                          color:G.light,border:`1px solid rgba(74,180,63,0.25)`}}>{tag}</span>
                      ))}
                    </div>
                    <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:12}}>
                      {pts.map((p,j)=>(
                        <li key={j} style={{display:'flex',gap:10,alignItems:'flex-start',
                          fontSize:14,color:G.text,lineHeight:1.75}}>
                          <span style={{color:G.mid,fontSize:12,marginTop:3,flexShrink:0}}>▶</span>{p}
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

/* ═══════════════════ INVESTMENT ════════════════════════════════ */
function Investment() {
  const t=useTranslations('investment');
  const cards=t.raw('cards') as Array<{icon:string;title:string;text:string}>;
  return (
    <section id="investment" className="sp" style={{position:'relative',overflow:'hidden',background:'#050c05'}}>
      <div style={{position:'absolute',inset:0}}>
        <Image src="/img-farm.jpg" alt="Farm" fill style={{objectFit:'cover',objectPosition:'center'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(160deg,rgba(4,10,4,.97) 0%,rgba(6,18,6,.94) 100%)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'radial-gradient(ellipse at 50% 100%,rgba(74,180,63,0.12) 0%,transparent 60%)'}}/>
      </div>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <Reveal style={{marginBottom:56}}>
          <Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
          <div style={{width:56,height:3,borderRadius:2,marginTop:20,
            background:`linear-gradient(to right,${G.green},${G.light})`}}/>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
          className="g3">
          {cards.map((c,i)=>(
            <motion.div key={i} variants={fadeUp}
              whileHover={{y:-12,
                background:'rgba(74,180,63,0.12)',
                boxShadow:`0 0 0 1px ${G.mid},0 24px 60px rgba(74,180,63,0.2)`}}
              transition={{duration:.3}}
              className="farm-card"
              style={{padding:'32px 26px',borderRadius:16,
                border:`1px solid ${G.border}`,
                background:'rgba(74,180,63,0.05)',cursor:'default',transition:'all .35s'}}>
              <div style={{fontSize:32,marginBottom:16}}>{c.icon}</div>
              <h3 className="font-display" style={{fontSize:'clamp(17px,2vw,21px)',fontWeight:600,
                color:G.light,marginBottom:10}}>{c.title}</h3>
              <p style={{fontSize:13,color:G.muted,lineHeight:1.78}}>{c.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROJECTS ══════════════════════════════════ */
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
    <section id="projects" className="sp" style={{background:'#071207'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:20}}>
          <Reveal><Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
            <div style={{width:56,height:3,borderRadius:2,margin:'20px auto 0',
              background:`linear-gradient(to right,${G.green},${G.light})`}}/>
          </Reveal>
          <Reveal delay={.1}><p style={{fontSize:16,color:G.muted,maxWidth:600,margin:'16px auto 0'}}>{t('desc')}</p></Reveal>
        </div>

        {/* tabs */}
        <Reveal style={{display:'flex',justifyContent:'center',margin:'44px 0',overflowX:'auto'}}>
          <div style={{display:'flex',gap:4,padding:'6px',borderRadius:100,
            background:'rgba(74,180,63,0.08)',border:`1px solid ${G.border}`,flexShrink:0}}>
            {tabs.map((label,i)=>(
              <motion.button key={i} onClick={()=>setTab(i)}
                animate={{
                  background:tab===i?G.green:'transparent',
                  color:tab===i?'#fff':G.muted,
                  boxShadow:tab===i?`0 4px 20px ${G.glow}`:'none'}}
                style={{padding:'10px 22px',borderRadius:100,fontSize:13,
                  fontWeight:700,cursor:'pointer',border:'none',whiteSpace:'nowrap',
                  letterSpacing:'.5px'}}>
                {label}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {tab===0&&(
            <motion.div key="rw" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-24}}
              className="g2" style={{gap:56,alignItems:'start'}}>
              <div>
                <div style={{display:'inline-flex',alignItems:'center',gap:8,
                  background:'rgba(74,180,63,0.1)',border:`1px solid ${G.border}`,
                  borderRadius:100,padding:'5px 14px',marginBottom:16}}>
                  <span style={{fontSize:10,letterSpacing:'3px',textTransform:'uppercase',
                    fontWeight:700,color:G.light}}>{rw('label')}</span>
                </div>
                <h3 className="font-display" style={{fontSize:'clamp(36px,5vw,52px)',
                  fontWeight:700,marginBottom:8,lineHeight:1.1}}>
                  <span style={{color:'#fff'}}>RAYAN </span>
                  <span className="shimmer">WEST</span>
                </h3>
                <p style={{fontSize:14,fontStyle:'italic',color:G.muted,marginBottom:18}}>{rw('tagline')}</p>
                <p style={{fontSize:15,lineHeight:1.85,color:G.text,marginBottom:28}}>{rw('desc')}</p>

                {/* image with caption */}
                <div style={{borderRadius:16,overflow:'hidden',marginBottom:28,
                  position:'relative',height:210,
                  boxShadow:`0 0 0 1px ${G.border},0 20px 50px rgba(0,0,0,0.5)`}}>
                  <Image src="/img-villa-top.jpg" alt="Rayan West" fill style={{objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'flex-end',padding:18,
                    background:'linear-gradient(to top,rgba(4,11,4,.85) 0%,transparent 55%)'}}>
                    <div>
                      <div className="font-display" style={{fontSize:18,fontWeight:700,color:'#fff'}}>{vb('enjoy')}</div>
                      <div style={{fontSize:12,color:G.light}}>{vb('enjoyAr')}</div>
                    </div>
                  </div>
                </div>

                {/* stats */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  {rwStats.map((s,i)=>(
                    <motion.div key={i} whileHover={{scale:1.04,boxShadow:`0 0 0 1px ${G.mid},0 8px 24px ${G.glow}`}}
                      style={{textAlign:'center',padding:'18px',borderRadius:12,
                        background:'rgba(74,180,63,0.07)',border:`1px solid ${G.border}`,
                        borderBottom:`3px solid ${G.green}`,cursor:'default',transition:'all .3s'}}>
                      <div className="sn" style={{fontSize:38,fontWeight:800}}>{s.num}</div>
                      <div style={{fontSize:12,color:G.muted,marginTop:4}}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={{display:'flex',flexDirection:'column',gap:18}}>
                {rwFeats.map((f,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:24}} animate={{opacity:1,x:0}}
                    transition={{delay:i*.1}}
                    whileHover={{x:8,background:'rgba(74,180,63,0.08)'}}
                    style={{borderLeft:`3px solid ${G.mid}`,paddingLeft:20,paddingTop:6,paddingBottom:6,
                      transition:'all .25s',cursor:'default'}}>
                    <div style={{fontSize:15,fontWeight:700,color:G.light,marginBottom:6}}>{f.title}</div>
                    <div style={{fontSize:14,color:G.muted,lineHeight:1.72}}>{f.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {tab!==0&&(
            <motion.div key={`cs${tab}`} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <CSPanel d={tab===1?rh:gh} img={tab===1?'/img-villa-garden.jpg':'/img-aerial.jpg'}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CSPanel({d,img}:{d:ReturnType<typeof useTranslations<'projects.rh'>>;img:string}) {
  return (
    <div style={{borderRadius:24,overflow:'hidden',position:'relative',minHeight:420,
      background:'#061506',border:`1px solid ${G.border}`}}>
      <div style={{position:'absolute',inset:0,opacity:.22}}>
        <Image src={img} alt="" fill style={{objectFit:'cover'}}/>
      </div>
      <div style={{position:'relative',zIndex:2,padding:'72px 40px',textAlign:'center',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:420}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,
          background:'rgba(74,180,63,0.12)',border:`1px solid ${G.border}`,
          borderRadius:100,padding:'6px 18px',marginBottom:20}}>
          <span style={{fontSize:10,letterSpacing:'4px',textTransform:'uppercase',
            fontWeight:700,color:G.light}}>{d('label')}</span>
        </div>
        <h3 className="font-display shimmer" style={{fontSize:'clamp(36px,5vw,56px)',fontWeight:700,marginBottom:12}}>{d('title')}</h3>
        <p style={{fontSize:14,color:G.muted,marginBottom:16}}>{d('sub')}</p>
        <p style={{fontSize:16,color:G.text,maxWidth:540,lineHeight:1.85,marginBottom:36}}>{d('text')}</p>
        <motion.span whileHover={{scale:1.06,boxShadow:`0 12px 32px ${G.glow}`}}
          style={{display:'inline-block',padding:'12px 36px',borderRadius:100,
            background:`linear-gradient(135deg,${G.green},${G.mid})`,
            color:'#fff',fontSize:13,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',
            cursor:'default'}}>
          {d('badge')}
        </motion.span>
      </div>
    </div>
  );
}

/* ═══════════════════ LIFESTYLE STRIP ══════════════════════════ */
function LifestyleStrip() {
  const t=useTranslations('lifestyle');
  return (
    <div style={{position:'relative',height:440,overflow:'hidden'}}>
      <Image src="/img-pergola.jpg" alt="Life at Rayan West" fill style={{objectFit:'cover',objectPosition:'center'}}/>
      <div style={{position:'absolute',inset:0,
        background:'linear-gradient(135deg,rgba(4,11,4,.94) 0%,rgba(15,45,15,.7) 55%,transparent 100%)'}}/>
      {/* animated green pulse */}
      <motion.div animate={{opacity:[.3,.7,.3],scale:[1,1.1,1]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}
        style={{position:'absolute',bottom:'-30%',left:'20%',width:600,height:600,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(74,180,63,0.15) 0%,transparent 60%)',
          pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center'}}>
        <div className="si" style={{width:'100%'}}>
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}}
            viewport={{once:true}} transition={{duration:.9}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,
              background:'rgba(74,180,63,0.12)',border:`1px solid rgba(74,180,63,0.3)`,
              borderRadius:100,padding:'6px 16px',marginBottom:20}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:G.mid,boxShadow:`0 0 8px ${G.mid}`}}/>
              <span style={{fontSize:11,letterSpacing:'4px',textTransform:'uppercase',fontWeight:700,color:G.light}}>
                {t('tag')}
              </span>
            </div>
            <div className="font-display" style={{fontSize:'clamp(32px,5vw,68px)',fontWeight:300,
              color:'#fff',lineHeight:1.05,marginBottom:4}}>
              {t('line1')} <strong className="shimmer" style={{fontWeight:700}}>{t('line1b')}</strong>
            </div>
            <div className="font-display" style={{fontSize:'clamp(32px,5vw,68px)',fontWeight:700,
              color:'#fff',lineHeight:1.05,marginBottom:24}}>
              {t('line2')} <strong className="shimmer">{t('line2b')}</strong>
            </div>
            <p style={{fontSize:16,color:G.muted,marginBottom:28}}>{t('arabic')}</p>
            <motion.a whileHover={{scale:1.05,boxShadow:`0 16px 40px ${G.glow}`}}
              whileTap={{scale:.97}} href="#projects"
              style={{display:'inline-block',
                background:`linear-gradient(135deg,${G.green},${G.mid})`,
                color:'#fff',padding:'13px 32px',borderRadius:100,textDecoration:'none',
                fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase'}}>
              {t('btn')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ EGYPT ════════════════════════════════════ */
function Egypt() {
  const t=useTranslations('egypt');
  const stats=t.raw('stats') as Array<{num:string;label:string}>;
  return (
    <section id="egypt" className="sp" style={{background:'#050c05'}}>
      <div className="si">
        <Reveal style={{marginBottom:48}}>
          <Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
          <div style={{width:56,height:3,borderRadius:2,marginTop:20,
            background:`linear-gradient(to right,${G.green},${G.light})`}}/>
          <p style={{fontSize:16,color:G.muted,marginTop:20}}>{t('intro')}</p>
        </Reveal>
        <div className="g2">
          <Reveal delay={.1}>
            <h3 className="font-display" style={{fontSize:'clamp(18px,2.5vw,24px)',fontWeight:600,
              color:G.light,marginBottom:20,paddingBottom:12,
              borderBottom:`1px solid ${G.border}`}}>{t('c1title')}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:14,
              fontSize:14,color:G.text,lineHeight:1.88}}>
              <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
            </div>
          </Reveal>
          <Reveal delay={.2}>
            <h3 className="font-display" style={{fontSize:'clamp(18px,2.5vw,24px)',fontWeight:600,
              color:G.light,marginBottom:20,paddingBottom:12,
              borderBottom:`1px solid ${G.border}`}}>{t('c2title')}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:14,
              fontSize:14,color:G.text,lineHeight:1.88,marginBottom:28}}>
              <p>{t('p4')}</p><p>{t('p5')}</p>
            </div>
            <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
              {stats.map((s,i)=>(
                <motion.div key={i} whileHover={{scale:1.06,boxShadow:`0 0 0 1px ${G.mid},0 12px 32px ${G.glow}`}}
                  transition={{duration:.25}}
                  style={{textAlign:'center',padding:'20px 28px',borderRadius:14,
                    background:'rgba(74,180,63,0.08)',border:`1px solid ${G.border}`,cursor:'default'}}>
                  <div className="sn" style={{fontSize:32,fontWeight:800}}>{s.num}</div>
                  <div style={{fontSize:12,color:G.muted,marginTop:4}}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ SUSTAINABILITY ═══════════════════════════ */
function Sustainability() {
  const t=useTranslations('sustainability');
  const feats=t.raw('features') as Array<{icon:string;title:string;text:string}>;
  return (
    <section id="sustainability" className="sp" style={{position:'relative',overflow:'hidden',background:'#071207'}}>
      <div style={{position:'absolute',inset:0,
        background:'radial-gradient(ellipse at 50% 100%,rgba(74,180,63,0.1) 0%,transparent 60%)',
        pointerEvents:'none'}}/>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <div className="g2">
          <div>
            <Reveal><Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
              <div style={{width:56,height:3,borderRadius:2,marginTop:20,
                background:`linear-gradient(to right,${G.green},${G.light})`}}/>
            </Reveal>
            <Reveal delay={.1} style={{marginTop:24,display:'flex',flexDirection:'column',gap:14,
              fontSize:15,color:G.muted,lineHeight:1.88}}>
              <p>{t('p1')}</p><p>{t('p2')}</p>
            </Reveal>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}}
            style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            {feats.map((f,i)=>(
              <motion.div key={i} variants={fadeUp}
                whileHover={{scale:1.04,background:'rgba(74,180,63,0.12)',boxShadow:`0 0 0 1px ${G.mid}`}}
                transition={{duration:.25}}
                style={{padding:'26px 22px',borderRadius:14,
                  border:`1px solid ${G.border}`,
                  background:'rgba(74,180,63,0.06)',cursor:'default',transition:'all .3s'}}>
                <div style={{fontSize:28,marginBottom:10}}>{f.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:G.light,marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:13,color:G.muted,lineHeight:1.65}}>{f.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PARTNERS ══════════════════════════════════ */
function Partners() {
  const t=useTranslations('partners');
  const sg=useTranslations('partners.sg');
  const ef=useTranslations('partners.ef');
  const partners=[
    {name:sg('name'),emoji:'☀️',secs:sg.raw('sections') as Array<{title:string;text:string}>},
    {name:ef('name'),emoji:'🏗️',secs:ef.raw('sections') as Array<{title:string;text:string}>},
  ];
  return (
    <section id="partners" className="sp" style={{background:'#060d06'}}>
      <div className="si">
        <div style={{textAlign:'center',marginBottom:20}}>
          <Reveal><Label text={t('tag')} light/><H2 title={t('title')} bold={t('bold')} light/>
            <div style={{width:56,height:3,borderRadius:2,margin:'20px auto 0',
              background:`linear-gradient(to right,${G.green},${G.light})`}}/>
          </Reveal>
          <Reveal delay={.1}><p style={{fontSize:16,color:G.muted,maxWidth:560,margin:'16px auto 0'}}>{t('desc')}</p></Reveal>
        </div>
        <div className="g2s">
          {partners.map((p,i)=>(
            <Reveal key={i} delay={i*.15}>
              <motion.div whileHover={{y:-10,boxShadow:`0 0 0 1px ${G.mid},0 32px 80px rgba(74,180,63,0.2)`}}
                transition={{duration:.3}}
                style={{borderRadius:20,overflow:'hidden',
                  border:`1px solid ${G.border}`,background:'rgba(74,180,63,0.04)'}}>
                <div style={{padding:'32px 36px',
                  background:'linear-gradient(135deg,#061506,#0d2a0d)'}}>
                  <div style={{fontSize:22,fontWeight:800,color:'#fff',letterSpacing:1}}>
                    {p.emoji} {p.name}
                  </div>
                </div>
                <div style={{padding:'28px 36px 36px',display:'flex',flexDirection:'column',gap:22}}>
                  {p.secs.map((s,j)=>(
                    <div key={j}>
                      <h4 className="font-display" style={{fontSize:18,fontWeight:600,color:G.light,
                        marginBottom:8,paddingBottom:8,borderBottom:`1px solid ${G.border}`}}>{s.title}</h4>
                      <p style={{fontSize:14,color:G.text,lineHeight:1.78}}>{s.text}</p>
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

/* ═══════════════════ FOOTER ════════════════════════════════════ */
function Footer() {
  const t=useTranslations('footer');
  const cols=t.raw('cols') as Array<{title:string;links:Array<{label:string;href:string}>}>;
  return (
    <footer style={{background:'#030803',padding:'64px 0 32px',
      borderTop:`1px solid ${G.border}`}}>
      <div className="si">
        <div className="gf" style={{paddingBottom:48,borderBottom:`1px solid ${G.border}`,marginBottom:32}}>
          <div>
            <div className="font-display" style={{fontSize:32,fontWeight:600,color:'#fff',marginBottom:6}}>
              LA <span className="shimmer">GRANJA</span>
            </div>
            <div style={{fontSize:13,fontStyle:'italic',color:G.muted,marginBottom:14}}>{t('tagline')}</div>
            <p style={{fontSize:12,color:'rgba(155,210,100,0.35)',lineHeight:1.78,maxWidth:260}}>{t('about')}</p>
          </div>
          {cols.map((col,i)=>(
            <div key={i}>
              <div style={{fontSize:11,letterSpacing:'2px',textTransform:'uppercase',
                fontWeight:700,color:G.mid,marginBottom:18}}>{col.title}</div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                {col.links.map((l,j)=>(
                  <li key={j}>
                    <a href={l.href} style={{fontSize:13,color:'rgba(155,210,100,0.35)',
                      textDecoration:'none',transition:'color .3s'}}
                      onMouseOver={e=>(e.currentTarget.style.color=G.light)}
                      onMouseOut={e=>(e.currentTarget.style.color='rgba(155,210,100,0.35)')}>
                      {l.l??l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <span style={{fontSize:12,color:'rgba(155,210,100,0.3)'}}>{t('copy')}</span>
          <a href="https://lagranjaeg.com" target="_blank"
            style={{fontSize:12,color:G.mid,textDecoration:'none'}}>lagranjaeg.com</a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ PAGE ═════════════════════════════════════ */
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
