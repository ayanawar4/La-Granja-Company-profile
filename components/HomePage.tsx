'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ── tokens ── */
const G = {
  bg:    '#060d06', card:  '#0c1e0c',
  border:'rgba(106,181,74,0.2)', borderH:'rgba(106,181,74,0.5)',
  green: '#4a7c3f', mid:   '#6ab54a', light: '#9de080',
  glow:  'rgba(106,181,74,0.3)',
  text:  '#d4ecd4',   /* ← clearly visible main text */
  sub:   '#a8cfa8',   /* secondary */
  muted: '#7aaa7a',   /* captions */
};
const up = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0} };
const sg = { visible:{transition:{staggerChildren:.1}} };

/* ── Reveal ── */
function Reveal({c,d=0,s={},cn=''}:{c:React.ReactNode;d?:number;s?:React.CSSProperties;cn?:string}) {
  const r=useRef(null), v=useInView(r,{once:true,margin:'-50px'});
  return <motion.div ref={r} variants={up} initial="hidden" animate={v?'visible':'hidden'}
    transition={{duration:.7,delay:d,ease:[.25,.1,.25,1]}} style={s} className={cn}>{c}</motion.div>;
}

/* ── Tag pill ── */
function Tag({t}:{t:string}) {
  return <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:14,
    background:'rgba(106,181,74,0.1)',border:`1px solid ${G.border}`,borderRadius:100,padding:'6px 16px'}}>
    <span style={{width:6,height:6,borderRadius:'50%',background:G.mid,flexShrink:0,boxShadow:`0 0 6px ${G.mid}`}}/>
    <span style={{fontSize:10,letterSpacing:'3px',textTransform:'uppercase',fontWeight:700,color:G.mid}}>{t}</span>
  </div>;
}

/* ── SectionTitle ── */
function ST({title,bold,light=false}:{title:string;bold:string;light?:boolean}) {
  return <>
    <h2 className="fd" style={{fontSize:'clamp(32px,4.5vw,54px)',fontWeight:300,lineHeight:1.1,
      color:G.text,marginBottom:8}}>
      {title} <strong style={{fontWeight:700,color:G.light}}>{bold}</strong>
    </h2>
    <div style={{width:52,height:3,borderRadius:2,marginTop:16,
      background:`linear-gradient(to right,${G.green},${G.light})`}}/>
  </>;
}

/* ── Floating particles ── */
function Particles() {
  const leaves=['🌿','🍃','🌱','✦','🌾','❋'];
  return <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
    {Array.from({length:16}).map((_,i)=>(
      <div key={i} className="ptc" style={{left:`${(i*17+7)%100}%`,fontSize:`${11+(i*7%12)}px`,
        animationDuration:`${13+(i*3%11)}s`,animationDelay:`${(i*1.4)%9}s`}}>
        {leaves[i%leaves.length]}
      </div>
    ))}
  </div>;
}

/* ══════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════ */
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
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,transition:'all .4s',
      background:scrolled?'rgba(6,13,6,0.97)':'rgba(6,13,6,0.25)',
      backdropFilter:'blur(20px)',
      borderBottom:scrolled?`1px solid ${G.border}`:'1px solid transparent'}}>
      <div className="si" style={{display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:scrolled?'10px 40px':'18px 40px',transition:'padding .4s'}}>

        {/* Logo */}
        <a href="#hero" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none',flexShrink:0}}>
          <motion.div whileHover={{scale:1.1,rotate:5}}
            style={{width:40,height:40,borderRadius:'50%',display:'flex',alignItems:'center',
              justifyContent:'center',color:'#fff',fontSize:18,fontWeight:800,
              background:'linear-gradient(135deg,#2d5a1b,#6ab54a)',
              boxShadow:`0 4px 20px ${G.glow}`}}>G</motion.div>
          <span style={{color:'#fff',fontWeight:700,fontSize:17,letterSpacing:1}}>
            LA <span style={{color:G.light}}>GRANJA</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{flexDirection:isAr?'row-reverse':'row'}}>
          {links.map(l=>(
            <a key={l.href} href={l.href}
              style={{color:G.sub,textDecoration:'none',fontSize:12,fontWeight:600,
                letterSpacing:'2px',textTransform:'uppercase',transition:'color .3s',whiteSpace:'nowrap'}}
              onMouseOver={e=>(e.currentTarget.style.color=G.light)}
              onMouseOut={e=>(e.currentTarget.style.color=G.sub)}>{l.l}</a>
          ))}
          <motion.a whileHover={{scale:1.05}} href="#partners"
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,color:'#fff',
              padding:'8px 20px',borderRadius:100,textDecoration:'none',
              fontSize:12,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',
              boxShadow:`0 4px 16px ${G.glow}`,whiteSpace:'nowrap'}}>{t('partners')}</motion.a>
          <motion.button whileHover={{scale:1.05}} onClick={switchLang}
            style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:100,
              border:`1px solid ${G.border}`,background:'rgba(106,181,74,0.08)',
              color:G.light,fontSize:13,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>
            <span>{isAr?'🇬🇧':'🇸🇦'}</span><span>{t('langSwitch')}</span>
          </motion.button>
        </div>

        {/* Mobile nav */}
        <div className="nav-mobile">
          <button onClick={switchLang}
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,color:'#fff',
              border:'none',borderRadius:100,padding:'8px 14px',fontSize:13,fontWeight:700,cursor:'pointer'}}>
            {isAr?'🇬🇧 EN':'🇸🇦 ع'}
          </button>
          <button onClick={()=>setOpen(!open)}
            style={{background:'none',border:'none',cursor:'pointer',padding:8,display:'flex',
              flexDirection:'column',gap:5}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{width:22,height:2,background:G.light,transition:'all .3s',
                transform:open&&i===0?'rotate(45deg) translate(5px,5px)':
                          open&&i===2?'rotate(-45deg) translate(5px,-5px)':'none',
                opacity:open&&i===1?0:1}}/>
            ))}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}
            exit={{opacity:0,height:0}}
            style={{background:'rgba(6,13,6,0.98)',borderTop:`1px solid ${G.border}`,
              padding:'12px 18px 20px',display:'flex',flexDirection:'column',gap:4}}>
            {[...links,{href:'#partners',l:t('partners')}].map(l=>(
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)}
                style={{color:G.text,textDecoration:'none',padding:'11px 0',fontSize:14,
                  fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',
                  borderBottom:`1px solid ${G.border}`}}>{l.l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
function Hero() {
  const t=useTranslations('hero');
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const y=useTransform(scrollYProgress,[0,1],[0,180]);

  return (
    <section ref={ref} id="hero" style={{position:'relative',height:'100vh',
      display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <motion.div style={{position:'absolute',inset:0,y}}>
        <Image src="/img-aerial.jpg" alt="La Granja" fill style={{objectFit:'cover'}} priority/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(160deg,rgba(6,13,6,.93) 0%,rgba(10,26,10,.78) 45%,rgba(6,13,6,.6) 100%)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'radial-gradient(ellipse at 50% 80%,rgba(106,181,74,.12) 0%,transparent 65%)'}}/>
      </motion.div>

      {/* orbs */}
      {[{l:'8%',t:'15%',s:320},{l:'82%',t:'55%',s:220},{l:'48%',t:'75%',s:440}].map((o,i)=>(
        <motion.div key={i} style={{position:'absolute',left:o.l,top:o.t,width:o.s,height:o.s,
          borderRadius:'50%',pointerEvents:'none',
          background:'radial-gradient(circle,rgba(106,181,74,.1) 0%,transparent 70%)'}}
          animate={{scale:[1,1.3,1],opacity:[.3,.7,.3]}}
          transition={{duration:4+i*2,repeat:Infinity,ease:'easeInOut',delay:i*1.5}}/>
      ))}

      <div style={{position:'relative',zIndex:2,textAlign:'center',padding:'0 20px',maxWidth:920,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3}}>
          <Tag t={t('eyebrow')}/>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:.55,duration:1}}
          className="fd" style={{fontSize:'clamp(52px,10vw,128px)',fontWeight:300,
            lineHeight:.95,color:'#fff',marginBottom:18}}>
          {t('title1')}{' '}
          <span className="sh" style={{fontWeight:700}}>{t('title2')}</span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.8}}
          className="fd" style={{fontSize:'clamp(16px,2.5vw,25px)',fontStyle:'italic',
            color:'rgba(212,236,212,0.72)',marginBottom:22}}>
          {t('sub')}
        </motion.p>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}}
          style={{color:G.sub,fontSize:'clamp(13px,1.5vw,15px)',lineHeight:1.85,
            marginBottom:38,maxWidth:560,marginLeft:'auto',marginRight:'auto'}}>
          {t('desc')}
        </motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.2}}
          style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <motion.a whileHover={{scale:1.06}} whileTap={{scale:.97}} href="#projects"
            style={{background:`linear-gradient(135deg,${G.green},${G.mid})`,color:'#fff',
              padding:'14px 34px',borderRadius:100,textDecoration:'none',
              fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
              boxShadow:`0 8px 28px ${G.glow}`}}>
            {t('btn1')}
          </motion.a>
          <motion.a whileHover={{scale:1.04,background:'rgba(106,181,74,.12)'}} whileTap={{scale:.97}}
            href="#about"
            style={{color:G.light,border:`1.5px solid rgba(106,181,74,.4)`,
              padding:'13px 34px',borderRadius:100,textDecoration:'none',
              fontSize:13,fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',
              background:'transparent',transition:'background .3s'}}>
            {t('btn2')}
          </motion.a>
        </motion.div>
      </div>

      <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.4}}
        style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:4,color:'rgba(154,220,100,.4)'}}>
        <div style={{width:1,height:36,background:'linear-gradient(to bottom,transparent,rgba(106,181,74,.6))'}}/>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════════ */
function StatsBar() {
  const t=useTranslations('stats');
  const items=[{n:'100',k:'s1'},{n:'94',k:'s2'},{n:'30',k:'s3'},{n:'17+',k:'s4'},{n:'2008',k:'s5'}] as const;
  const doubled=[...items,...items];
  return (
    <div style={{overflow:'hidden',padding:'16px 0',
      background:'linear-gradient(90deg,rgba(45,90,27,.55),rgba(106,181,74,.35),rgba(45,90,27,.55))',
      borderTop:`1px solid ${G.border}`,borderBottom:`1px solid ${G.border}`}}>
      <div className="tk" style={{display:'flex',gap:52,whiteSpace:'nowrap'}}>
        {doubled.map((s,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
            <span className="fd" style={{fontSize:26,fontWeight:700,color:G.light}}>{s.n}</span>
            <span style={{fontSize:13,color:G.sub}}>{t(s.k)}</span>
            <span style={{width:1,height:18,background:G.border,marginLeft:32,display:'inline-block'}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ABOUT  — 3 cols on desktop: img | img-stack | text
══════════════════════════════════════════════════════ */
function About() {
  const t=useTranslations('about');
  return (
    <section id="about" className="sp abg" style={{position:'relative'}}>
      <Particles/>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <div className="rowAbout">

          {/* img 1 */}
          <Reveal c={
            <motion.div whileHover={{scale:1.015}} className="card"
              style={{height:360,position:'relative',overflow:'hidden',borderRadius:16}}>
              <Image src="/img-aerial.jpg" alt="La Granja aerial" fill
                style={{objectFit:'cover',objectPosition:'center'}}/>
              <div style={{position:'absolute',inset:0,
                background:'linear-gradient(to top,rgba(6,13,6,.7) 0%,transparent 50%)'}}/>
            </motion.div>
          }/>

          {/* img 2 stacked */}
          <Reveal d={.1} c={
            <div style={{display:'flex',flexDirection:'column',gap:12,height:360}}>
              <motion.div whileHover={{scale:1.015}} className="card"
                style={{flex:'1 1 0',position:'relative',overflow:'hidden',borderRadius:14}}>
                <Image src="/img-pergola.jpg" alt="Pool" fill style={{objectFit:'cover'}}/>
              </motion.div>
              <motion.div whileHover={{scale:1.015}} className="card"
                style={{height:132,position:'relative',overflow:'hidden',borderRadius:14}}>
                <Image src="/img-villa-garden.jpg" alt="Garden" fill style={{objectFit:'cover'}}/>
              </motion.div>
            </div>
          }/>

          {/* text */}
          <div>
            <Reveal c={<>
              <Tag t={t('tag')}/>
              <ST title={t('title')} bold={t('bold')}/>
              <p style={{fontSize:15,lineHeight:1.9,color:G.text,marginTop:24,marginBottom:0}}>
                {t('desc')}
              </p>
            </>}/>
            <motion.ul variants={sg} initial="hidden" whileInView="visible" viewport={{once:true}}
              style={{listStyle:'none',marginTop:22,display:'flex',flexDirection:'column',gap:10}}>
              {(['b1','b2','b3','b4'] as const).map((k,i)=>(
                <motion.li key={i} variants={up}
                  whileHover={{x:6,borderColor:G.borderH,background:'rgba(106,181,74,.1)'}}
                  style={{display:'flex',gap:12,alignItems:'flex-start',padding:'12px 15px',
                    borderRadius:10,border:`1px solid ${G.border}`,
                    background:'rgba(106,181,74,.06)',fontSize:13,
                    color:G.text,lineHeight:1.75,cursor:'default',transition:'all .25s'}}>
                  <span style={{color:G.mid,flexShrink:0,marginTop:1}}>🌿</span>
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

/* ══════════════════════════════════════════════════════
   VISION / MISSION  — 2 image-cards in same row
══════════════════════════════════════════════════════ */
function VisionMission() {
  const t=useTranslations('vm');
  const cards=[
    {label:t('vlabel'),title:t('vtitle'),text:t('vtext'),img:'/img-villa-garden.jpg'},
    {label:t('mlabel'),title:t('mtitle'),text:t('mtext'),img:'/img-family-pool.jpg'},
  ];
  return (
    <section id="vision" className="sp" style={{background:'#060d06'}}>
      <div className="si">
        <Reveal d={0} c={<div style={{textAlign:'center',marginBottom:52}}>
          <Tag t={t('tag')}/>
          <h2 className="fd" style={{fontSize:'clamp(32px,4.5vw,54px)',fontWeight:300,color:G.text}}>
            {t('title')} <strong style={{fontWeight:700,color:G.light}}>{t('amp')}</strong> {t('title2')}
          </h2>
          <div style={{width:52,height:3,borderRadius:2,margin:'16px auto 0',
            background:`linear-gradient(to right,${G.green},${G.light})`}}/>
        </div>}/>
        <div className="row2">
          {cards.map((card,i)=>(
            <Reveal key={i} d={i*.15} c={
              <motion.div whileHover={{y:-8}} className="card"
                style={{position:'relative',minHeight:380,overflow:'hidden',borderRadius:18}}>
                <Image src={card.img} alt={card.label} fill style={{objectFit:'cover'}}/>
                <div style={{position:'absolute',inset:0,
                  background:'linear-gradient(to top,rgba(6,13,6,.96) 0%,rgba(6,13,6,.6) 50%,rgba(6,13,6,.2) 100%)'}}/>
                <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'32px 32px 36px'}}>
                  <Tag t={card.label}/>
                  <h3 className="fd" style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:600,
                    color:'#fff',marginBottom:14,lineHeight:1.2}}>{card.title}</h3>
                  <p style={{fontSize:14,color:G.text,lineHeight:1.85}}>{card.text}</p>
                </div>
              </motion.div>
            }/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   STORY  — points left, image mosaic right — same row
══════════════════════════════════════════════════════ */
function Story() {
  const t=useTranslations('story');
  const pts=[{ic:'🌱',k:'p1'},{ic:'🏡',k:'p2'},{ic:'🌾',k:'p3'},{ic:'🚀',k:'p4'}] as const;
  return (
    <section id="story" className="sp" style={{background:'#071207'}}>
      <div className="si">
        <div className="row2L">
          <div>
            <Reveal c={<><Tag t={t('tag')}/><ST title={t('title')} bold={t('bold')}/></>}/>
            <motion.div variants={sg} initial="hidden" whileInView="visible" viewport={{once:true}}
              style={{display:'flex',flexDirection:'column',gap:12,marginTop:28}}>
              {pts.map((p,i)=>(
                <motion.div key={i} variants={up}
                  whileHover={{x:8,borderColor:G.borderH,background:'rgba(106,181,74,.1)'}}
                  className="card"
                  style={{display:'flex',gap:14,alignItems:'flex-start',padding:'16px 18px',
                    cursor:'default',transition:'all .25s'}}>
                  <span style={{fontSize:20,flexShrink:0}}>{p.ic}</span>
                  <p style={{fontSize:14,lineHeight:1.8,color:G.text}}>{t(p.k)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Reveal d={.2} c={
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',
              gridTemplateRows:'220px 180px',gap:12}}>
              <motion.div whileHover={{scale:1.02}} className="card"
                style={{gridColumn:'span 2',position:'relative',overflow:'hidden',borderRadius:14}}>
                <Image src="/img-family-pool.jpg" alt="La Granja" fill style={{objectFit:'cover'}}/>
              </motion.div>
              <motion.div whileHover={{scale:1.02}} className="card"
                style={{position:'relative',overflow:'hidden',borderRadius:12}}>
                <Image src="/img-villa-top.jpg" alt="Villa" fill style={{objectFit:'cover'}}/>
              </motion.div>
              <motion.div whileHover={{scale:1.02}} className="card"
                style={{position:'relative',overflow:'hidden',borderRadius:12}}>
                <Image src="/img-villa-garden.jpg" alt="Garden" fill style={{objectFit:'cover'}}/>
              </motion.div>
            </div>
          }/>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   VALUES  — 3-col card grid
══════════════════════════════════════════════════════ */
function Values() {
  const t=useTranslations('values');
  const icons=['👥','✅','♻️','💰','❤️','💡'];
  const vals=t.raw('v') as Array<{title:string;text:string}>;
  return (
    <section id="values" className="sp" style={{background:'#060d06',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:700,height:700,borderRadius:'50%',pointerEvents:'none',
        background:'radial-gradient(circle,rgba(106,181,74,.05) 0%,transparent 65%)'}}/>
      <div className="si" style={{position:'relative',zIndex:1}}>
        <Reveal d={0} c={<div style={{textAlign:'center',marginBottom:52}}>
          <Tag t={t('tag')}/>
          <ST title={t('title')} bold={t('bold')}/>
        </div>}/>
        <motion.div variants={sg} initial="hidden" whileInView="visible" viewport={{once:true}}
          className="row3">
          {vals.map((v,i)=>(
            <motion.div key={i} variants={up} className="card vc"
              style={{padding:'28px 24px',cursor:'default'}}>
              <div style={{fontSize:34,marginBottom:14}}>{icons[i]}</div>
              <h3 style={{fontSize:16,fontWeight:700,color:G.light,marginBottom:10}}>{v.title}</h3>
              <p style={{fontSize:13,color:G.text,lineHeight:1.78}}>{v.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   VILLA  — banner + 2-col below
══════════════════════════════════════════════════════ */
function Villa() {
  const t=useTranslations('villa');
  const vb=useTranslations('villa_banner');
  const features=t.raw('f') as Array<{title:string;text:string}>;
  const icons=['🌿','💚','♻️','🌾'];
  return (
    <section id="villa" className="sp" style={{background:'#040b04',position:'relative',overflow:'hidden'}}>
      <motion.div animate={{scale:[1,1.2,1],opacity:[.25,.5,.25]}}
        transition={{duration:9,repeat:Infinity,ease:'easeInOut'}}
        style={{position:'absolute',bottom:'-25%',left:'50%',transform:'translateX(-50%)',
          width:900,height:900,borderRadius:'50%',pointerEvents:'none',
          background:'radial-gradient(circle,rgba(106,181,74,.1) 0%,transparent 60%)'}}/>
      <div className="si" style={{position:'relative',zIndex:2}}>
        {/* full-width banner */}
        <Reveal d={0} s={{marginBottom:48}} c={
          <div className="card" style={{position:'relative',height:280,overflow:'hidden',borderRadius:20}}>
            <Image src="/img-family-pool.jpg" alt="La Granja" fill
              style={{objectFit:'cover',objectPosition:'center 30%'}}/>
            <div style={{position:'absolute',inset:0,
              background:'linear-gradient(to right,rgba(4,11,4,.92) 0%,rgba(4,11,4,.3) 60%,transparent 100%)'}}/>
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',
              justifyContent:'center',padding:'0 44px'}}>
              <Tag t={t('tag')}/>
              <div className="fd" style={{fontSize:'clamp(20px,3vw,30px)',fontWeight:600,color:'#fff'}}>
                {vb('subtitle')}
              </div>
            </div>
          </div>
        }/>

        {/* headline */}
        <Reveal c={
          <h2 className="fd" style={{fontSize:'clamp(40px,7vw,88px)',fontWeight:300,
            color:'#fff',lineHeight:1,marginBottom:48}}>
            <span className="sh" style={{fontWeight:700}}>{t('l1')}</span><br/>
            <span className="sh" style={{fontWeight:700}}>{t('l2')}</span><br/>
            <span className="sh" style={{fontWeight:700}}>{t('l3')}</span>
          </h2>
        }/>

        {/* 2-col */}
        <div className="row2L" style={{gap:56}}>
          <Reveal d={.1} c={
            <div style={{display:'flex',flexDirection:'column',gap:16,
              fontSize:15,color:G.text,lineHeight:1.9}}>
              <p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p>
              <motion.a whileHover={{scale:1.05,boxShadow:`0 16px 40px ${G.glow}`}}
                whileTap={{scale:.97}} href="#projects"
                style={{display:'inline-block',marginTop:8,
                  background:`linear-gradient(135deg,${G.green},${G.mid})`,
                  color:'#fff',padding:'13px 34px',borderRadius:100,
                  textDecoration:'none',width:'fit-content',
                  fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
                  boxShadow:`0 8px 28px ${G.glow}`}}>
                {t('btn')}
              </motion.a>
            </div>
          }/>
          <motion.div variants={sg} initial="hidden" whileInView="visible" viewport={{once:true}}
            style={{display:'flex',flexDirection:'column',gap:12}}>
            {features.map((f,i)=>(
              <motion.div key={i} variants={up}
                whileHover={{x:6,borderColor:G.borderH,background:'rgba(106,181,74,.1)'}}
                className="card"
                style={{display:'flex',gap:14,alignItems:'flex-start',padding:'15px 18px',
                  cursor:'default',transition:'all .25s'}}>
                <span style={{fontSize:18,flexShrink:0}}>{icons[i]}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:G.light,marginBottom:3}}>{f.title}</div>
                  <div style={{fontSize:13,color:G.text,lineHeight:1.65}}>{f.text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   MANAGEMENT  — 2 cards in same row
══════════════════════════════════════════════════════ */
function Management() {
  const t=useTranslations('management');
  const ta=useTranslations('management.ahmed');
  const tm=useTranslations('management.mohamed');
  const founders=[
    {d:ta,init:'A',grad:'linear-gradient(135deg,#2d5a1b,#6ab54a)'},
    {d:tm,init:'M',grad:'linear-gradient(135deg,#1a4a2a,#2d6b4a)'},
  ];
  return (
    <section id="management" className="sp" style={{background:'#071207'}}>
      <div className="si">
        <Reveal d={0} c={<div style={{textAlign:'center',marginBottom:48}}>
          <Tag t={t('tag')}/>
          <ST title={t('title')} bold={t('bold')}/>
          <p style={{fontSize:15,color:G.text,maxWidth:520,margin:'20px auto 0'}}>{t('desc')}</p>
        </div>}/>
        <div className="row2">
          {founders.map((f,i)=>{
            const tags=f.d.raw('tags') as string[];
            const pts=f.d.raw('points') as string[];
            return (
              <Reveal key={i} d={i*.15} c={
                <motion.div whileHover={{y:-10}} className="card" style={{overflow:'hidden'}}>
                  <div style={{padding:'36px 32px 24px',
                    background:'linear-gradient(135deg,#061506,#0d2a0d)',
                    display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <div style={{width:68,height:68,borderRadius:'50%',display:'flex',
                      alignItems:'center',justifyContent:'center',color:'#fff',
                      fontSize:30,fontWeight:800,marginBottom:14,background:f.grad,
                      boxShadow:`0 8px 24px ${G.glow}`}}>{f.init}</div>
                    <div className="fd" style={{fontSize:'clamp(20px,3vw,28px)',fontWeight:600,
                      color:'#fff',marginBottom:5}}>{f.d('name')}</div>
                    <div style={{fontSize:11,letterSpacing:'2px',textTransform:'uppercase',
                      fontWeight:700,color:G.mid}}>{f.d('role')}</div>
                  </div>
                  <div style={{padding:'24px 32px 32px',borderTop:`3px solid ${G.green}`}}>
                    <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:18}}>
                      {tags.map((tag,j)=>(
                        <span key={j} style={{padding:'4px 12px',borderRadius:100,fontSize:12,
                          fontWeight:700,background:'rgba(106,181,74,.1)',
                          color:G.light,border:`1px solid rgba(106,181,74,.25)`}}>{tag}</span>
                      ))}
                    </div>
                    <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                      {pts.map((p,j)=>(
                        <li key={j} style={{display:'flex',gap:10,alignItems:'flex-start',
                          fontSize:13,color:G.text,lineHeight:1.75}}>
                          <span style={{color:G.mid,fontSize:11,marginTop:3,flexShrink:0}}>▶</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              }/>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   INVESTMENT  — 3-col card grid over farm bg
══════════════════════════════════════════════════════ */
function Investment() {
  const t=useTranslations('investment');
  const cards=t.raw('cards') as Array<{icon:string;title:string;text:string}>;
  return (
    <section id="investment" className="sp" style={{position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0}}>
        <Image src="/img-farm.jpg" alt="Farm" fill style={{objectFit:'cover',objectPosition:'center'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(160deg,rgba(4,10,4,.97) 0%,rgba(6,18,6,.94) 100%)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'radial-gradient(ellipse at 50% 100%,rgba(106,181,74,.1) 0%,transparent 55%)'}}/>
      </div>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <Reveal d={0} c={<div style={{textAlign:'center',marginBottom:52}}>
          <Tag t={t('tag')}/>
          <ST title={t('title')} bold={t('bold')}/>
        </div>}/>
        <motion.div variants={sg} initial="hidden" whileInView="visible" viewport={{once:true}}
          className="row3">
          {cards.map((c,i)=>(
            <motion.div key={i} variants={up} className="card"
              whileHover={{y:-10,borderColor:G.borderH,background:'rgba(106,181,74,.1)'}}
              style={{padding:'28px 24px',cursor:'default',transition:'all .35s'}}>
              <div style={{fontSize:28,marginBottom:14}}>{c.icon}</div>
              <h3 className="fd" style={{fontSize:'clamp(16px,2vw,20px)',fontWeight:600,
                color:G.light,marginBottom:10}}>{c.title}</h3>
              <p style={{fontSize:13,color:G.text,lineHeight:1.78}}>{c.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════ */
function Projects() {
  const t=useTranslations('projects');
  const rw=useTranslations('projects.rw');
  const rh=useTranslations('projects.rh');
  const gh=useTranslations('projects.gh');
  const vb=useTranslations('villa_banner');
  const [tab,setTab]=useState(0);
  const tabs=t.raw('tabs') as string[];
  const rwS=rw.raw('stats')    as Array<{num:string;label:string}>;
  const rwF=rw.raw('features') as Array<{title:string;text:string}>;

  return (
    <section id="projects" className="sp" style={{background:'#071207'}}>
      <div className="si">
        <Reveal d={0} c={<div style={{textAlign:'center',marginBottom:20}}>
          <Tag t={t('tag')}/>
          <ST title={t('title')} bold={t('bold')}/>
          <p style={{fontSize:15,color:G.text,maxWidth:600,margin:'20px auto 0'}}>{t('desc')}</p>
        </div>}/>

        {/* tabs */}
        <div style={{display:'flex',justifyContent:'center',margin:'40px 0',overflowX:'auto'}}>
          <div style={{display:'flex',gap:4,padding:'6px',borderRadius:100,
            background:'rgba(106,181,74,.08)',border:`1px solid ${G.border}`,flexShrink:0}}>
            {tabs.map((label,i)=>(
              <motion.button key={i} onClick={()=>setTab(i)}
                animate={{background:tab===i?G.green:'transparent',
                  color:tab===i?'#fff':G.sub,
                  boxShadow:tab===i?`0 4px 16px ${G.glow}`:'none'}}
                style={{padding:'9px 20px',borderRadius:100,fontSize:12,fontWeight:700,
                  cursor:'pointer',border:'none',whiteSpace:'nowrap',letterSpacing:'.5px'}}>
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab===0&&(
            <motion.div key="rw" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-20}} className="row2L" style={{gap:52,alignItems:'start'}}>
              <div>
                <Tag t={rw('label')}/>
                <h3 className="fd" style={{fontSize:'clamp(32px,5vw,48px)',fontWeight:700,
                  marginBottom:8,lineHeight:1.1}}>
                  <span style={{color:G.text}}>RAYAN </span>
                  <span className="sh">WEST</span>
                </h3>
                <p style={{fontSize:13,fontStyle:'italic',color:G.sub,marginBottom:16}}>{rw('tagline')}</p>
                <p style={{fontSize:14,lineHeight:1.85,color:G.text,marginBottom:24}}>{rw('desc')}</p>

                <div className="card" style={{position:'relative',height:200,overflow:'hidden',
                  borderRadius:14,marginBottom:24}}>
                  <Image src="/img-villa-top.jpg" alt="Rayan West" fill style={{objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'flex-end',
                    padding:16,background:'linear-gradient(to top,rgba(4,11,4,.88) 0%,transparent 55%)'}}>
                    <div>
                      <div className="fd" style={{fontSize:16,fontWeight:700,color:'#fff'}}>
                        {vb('enjoy')}
                      </div>
                      <div style={{fontSize:11,color:G.light}}>{vb('enjoyAr')}</div>
                    </div>
                  </div>
                </div>

                <div className="row2" style={{gap:12}}>
                  {rwS.map((s,i)=>(
                    <motion.div key={i} whileHover={{scale:1.04}} className="card"
                      style={{textAlign:'center',padding:'16px',borderBottom:`3px solid ${G.green}`,
                        cursor:'default'}}>
                      <div className="fd" style={{fontSize:34,fontWeight:800,color:G.light}}>{s.num}</div>
                      <div style={{fontSize:11,color:G.sub,marginTop:4}}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {rwF.map((f,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
                    transition={{delay:i*.1}}
                    whileHover={{x:6,borderColor:G.borderH,background:'rgba(106,181,74,.1)'}}
                    className="card"
                    style={{padding:'16px 18px',cursor:'default',transition:'all .25s'}}>
                    <div style={{fontSize:14,fontWeight:700,color:G.light,marginBottom:5}}>{f.title}</div>
                    <div style={{fontSize:13,color:G.text,lineHeight:1.72}}>{f.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {tab!==0&&(
            <motion.div key={`cs${tab}`} initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <CSPanel d={tab===1?rh:gh}
                img={tab===1?'/img-villa-garden.jpg':'/img-aerial.jpg'}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CSPanel({d,img}:{d:ReturnType<typeof useTranslations<'projects.rh'>>;img:string}) {
  return (
    <div className="card" style={{position:'relative',minHeight:400,overflow:'hidden',borderRadius:20}}>
      <div style={{position:'absolute',inset:0,opacity:.22}}>
        <Image src={img} alt="" fill style={{objectFit:'cover'}}/>
      </div>
      <div style={{position:'relative',zIndex:2,padding:'64px 40px',textAlign:'center',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:400}}>
        <Tag t={d('label')}/>
        <h3 className="fd sh" style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:700,marginBottom:12}}>
          {d('title')}
        </h3>
        <p style={{fontSize:13,color:G.sub,marginBottom:14}}>{d('sub')}</p>
        <p style={{fontSize:15,color:G.text,maxWidth:520,lineHeight:1.85,marginBottom:32}}>{d('text')}</p>
        <motion.span whileHover={{scale:1.06}}
          style={{display:'inline-block',padding:'12px 36px',borderRadius:100,
            background:`linear-gradient(135deg,${G.green},${G.mid})`,
            color:'#fff',fontSize:13,fontWeight:700,letterSpacing:'2px',
            textTransform:'uppercase',cursor:'default',
            boxShadow:`0 8px 24px ${G.glow}`}}>
          {d('badge')}
        </motion.span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LIFESTYLE STRIP
══════════════════════════════════════════════════════ */
function LifestyleStrip() {
  const t=useTranslations('lifestyle');
  return (
    <div style={{position:'relative',height:420,overflow:'hidden'}}>
      <Image src="/img-pergola.jpg" alt="Life at Rayan West" fill
        style={{objectFit:'cover',objectPosition:'center'}}/>
      <div style={{position:'absolute',inset:0,
        background:'linear-gradient(135deg,rgba(4,11,4,.94) 0%,rgba(15,40,15,.65) 55%,transparent 100%)'}}/>
      <motion.div animate={{opacity:[.3,.6,.3],scale:[1,1.1,1]}}
        transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}
        style={{position:'absolute',bottom:'-30%',left:'20%',width:500,height:500,
          borderRadius:'50%',pointerEvents:'none',
          background:'radial-gradient(circle,rgba(106,181,74,.13) 0%,transparent 60%)'}}/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center'}}>
        <div className="si" style={{width:'100%'}}>
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}}
            viewport={{once:true}} transition={{duration:.9}}>
            <Tag t={t('tag')}/>
            <div className="fd" style={{fontSize:'clamp(30px,5vw,64px)',fontWeight:300,
              color:'#fff',lineHeight:1.05,marginBottom:4}}>
              {t('line1')} <strong className="sh" style={{fontWeight:700}}>{t('line1b')}</strong>
            </div>
            <div className="fd" style={{fontSize:'clamp(30px,5vw,64px)',fontWeight:700,
              color:'#fff',lineHeight:1.05,marginBottom:20}}>
              {t('line2')} <strong className="sh">{t('line2b')}</strong>
            </div>
            <p style={{fontSize:15,color:G.sub,marginBottom:24}}>{t('arabic')}</p>
            <motion.a whileHover={{scale:1.05}} href="#projects"
              style={{display:'inline-block',
                background:`linear-gradient(135deg,${G.green},${G.mid})`,
                color:'#fff',padding:'12px 30px',borderRadius:100,textDecoration:'none',
                fontSize:13,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
                boxShadow:`0 8px 24px ${G.glow}`}}>
              {t('btn')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   EGYPT  — 2-col cards
══════════════════════════════════════════════════════ */
function Egypt() {
  const t=useTranslations('egypt');
  const stats=t.raw('stats') as Array<{num:string;label:string}>;
  return (
    <section id="egypt" className="sp" style={{background:'#050c05'}}>
      <div className="si">
        <Reveal d={0} c={<div style={{marginBottom:44}}>
          <Tag t={t('tag')}/>
          <ST title={t('title')} bold={t('bold')}/>
          <p style={{fontSize:15,color:G.text,marginTop:20}}>{t('intro')}</p>
        </div>}/>
        <div className="row2">
          {[
            {title:t('c1title'),paras:[t('p1'),t('p2'),t('p3')]},
            {title:t('c2title'),paras:[t('p4'),t('p5')]},
          ].map((col,i)=>(
            <Reveal key={i} d={i*.15} c={
              <div className="card" style={{padding:'32px 28px',height:'100%'}}>
                <h3 className="fd" style={{fontSize:'clamp(17px,2.5vw,22px)',fontWeight:600,
                  color:G.light,marginBottom:18,paddingBottom:12,
                  borderBottom:`1px solid ${G.border}`}}>{col.title}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:12,
                  fontSize:14,color:G.text,lineHeight:1.88}}>
                  {col.paras.map((p,j)=><p key={j}>{p}</p>)}
                </div>
                {i===1&&(
                  <div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:28}}>
                    {stats.map((s,j)=>(
                      <motion.div key={j} whileHover={{scale:1.06}} className="card gp"
                        style={{textAlign:'center',padding:'18px 24px',cursor:'default'}}>
                        <div className="fd" style={{fontSize:28,fontWeight:800,color:G.light}}>{s.num}</div>
                        <div style={{fontSize:11,color:G.sub,marginTop:4}}>{s.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            }/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SUSTAINABILITY  — 2-col: text | 2×2 cards
══════════════════════════════════════════════════════ */
function Sustainability() {
  const t=useTranslations('sustainability');
  const feats=t.raw('features') as Array<{icon:string;title:string;text:string}>;
  return (
    <section id="sustainability" className="sp" style={{background:'#071207',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,
        background:'radial-gradient(ellipse at 50% 100%,rgba(106,181,74,.08) 0%,transparent 60%)',
        pointerEvents:'none'}}/>
      <div className="si" style={{position:'relative',zIndex:2}}>
        <div className="row2L">
          <div>
            <Reveal c={<><Tag t={t('tag')}/><ST title={t('title')} bold={t('bold')}/></>}/>
            <Reveal d={.1} c={<div style={{marginTop:22,display:'flex',flexDirection:'column',gap:14,
              fontSize:15,color:G.text,lineHeight:1.88}}>
              <p>{t('p1')}</p><p>{t('p2')}</p>
            </div>}/>
          </div>
          <motion.div variants={sg} initial="hidden" whileInView="visible" viewport={{once:true}}
            className="row2" style={{gap:14,alignItems:'start'}}>
            {feats.map((f,i)=>(
              <motion.div key={i} variants={up}
                whileHover={{scale:1.04,borderColor:G.borderH,background:'rgba(106,181,74,.1)'}}
                className="card"
                style={{padding:'24px 20px',cursor:'default',transition:'all .3s'}}>
                <div style={{fontSize:26,marginBottom:10}}>{f.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:G.light,marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:13,color:G.text,lineHeight:1.65}}>{f.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PARTNERS  — 2 cards in same row
══════════════════════════════════════════════════════ */
function Partners() {
  const t=useTranslations('partners');
  const sg2=useTranslations('partners.sg');
  const ef=useTranslations('partners.ef');
  const partners=[
    {name:sg2('name'),emoji:'☀️',secs:sg2.raw('sections') as Array<{title:string;text:string}>},
    {name:ef('name'), emoji:'🏗️',secs:ef.raw('sections')  as Array<{title:string;text:string}>},
  ];
  return (
    <section id="partners" className="sp" style={{background:'#060d06'}}>
      <div className="si">
        <Reveal d={0} c={<div style={{textAlign:'center',marginBottom:48}}>
          <Tag t={t('tag')}/>
          <ST title={t('title')} bold={t('bold')}/>
          <p style={{fontSize:15,color:G.text,maxWidth:560,margin:'20px auto 0'}}>{t('desc')}</p>
        </div>}/>
        <div className="row2">
          {partners.map((p,i)=>(
            <Reveal key={i} d={i*.15} c={
              <motion.div whileHover={{y:-8}} className="card" style={{overflow:'hidden'}}>
                <div style={{padding:'28px 32px',
                  background:'linear-gradient(135deg,#061506,#0d2a0d)'}}>
                  <div style={{fontSize:20,fontWeight:800,color:'#fff',letterSpacing:1}}>
                    {p.emoji} {p.name}
                  </div>
                </div>
                <div style={{padding:'24px 32px 32px',display:'flex',flexDirection:'column',gap:20}}>
                  {p.secs.map((s,j)=>(
                    <div key={j}>
                      <h4 className="fd" style={{fontSize:17,fontWeight:600,color:G.light,
                        marginBottom:8,paddingBottom:8,borderBottom:`1px solid ${G.border}`}}>{s.title}</h4>
                      <p style={{fontSize:13,color:G.text,lineHeight:1.78}}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            }/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */
function Footer() {
  const t=useTranslations('footer');
  const cols=t.raw('cols') as Array<{title:string;links:Array<{label:string;href:string}>}>;
  return (
    <footer style={{background:'#030803',padding:'60px 0 28px',
      borderTop:`1px solid ${G.border}`}}>
      <div className="si">
        <div className="rowF" style={{paddingBottom:44,borderBottom:`1px solid ${G.border}`,marginBottom:28}}>
          <div>
            <div className="fd" style={{fontSize:30,fontWeight:600,color:'#fff',marginBottom:5}}>
              LA <span className="sh">GRANJA</span>
            </div>
            <div style={{fontSize:13,fontStyle:'italic',color:G.muted,marginBottom:12}}>{t('tagline')}</div>
            <p style={{fontSize:12,color:G.muted,lineHeight:1.78,maxWidth:240}}>{t('about')}</p>
          </div>
          {cols.map((col,i)=>(
            <div key={i}>
              <div style={{fontSize:10,letterSpacing:'2px',textTransform:'uppercase',
                fontWeight:700,color:G.mid,marginBottom:16}}>{col.title}</div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                {col.links.map((l,j)=>(
                  <li key={j}>
                    <a href={l.href} style={{fontSize:12,color:G.muted,textDecoration:'none',transition:'color .3s'}}
                      onMouseOver={e=>(e.currentTarget.style.color=G.light)}
                      onMouseOut={e=>(e.currentTarget.style.color=G.muted)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
          <span style={{fontSize:11,color:G.muted}}>{t('copy')}</span>
          <a href="https://lagranjaeg.com" target="_blank"
            style={{fontSize:11,color:G.mid,textDecoration:'none'}}>lagranjaeg.com</a>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
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
