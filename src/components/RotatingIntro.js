'use client';
import {useEffect,useRef,useState} from 'react';
import {dictionaries} from '../lib/site.mjs';
import styles from './RotatingIntro.module.css';

export default function RotatingIntro({lang}){
 const copy=dictionaries[lang].rotatingIntro,phrases=copy.phrases;
 const root=useRef(null);
 const [frame,setFrame]=useState({index:0,length:phrases[0].length,phase:'hold'});
 const [reduced,setReduced]=useState(true),[visible,setVisible]=useState(false),[hidden,setHidden]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion=()=>setReduced(media.matches),visibility=()=>setHidden(document.hidden);
  motion();visibility();media.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility);
  const observer='IntersectionObserver' in window?new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting)):null;
  if(observer)observer.observe(root.current);else setVisible(true);
  return()=>{media.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility);observer?.disconnect();};
 },[]);
 const active=!reduced&&visible&&!hidden;
 useEffect(()=>{
  if(!active)return;
  const delay=frame.phase==='hold'?2400:frame.phase==='gap'?260:frame.phase==='delete'?30:65;
  const timer=setTimeout(()=>setFrame(current=>{
   if(current.phase==='hold')return {...current,phase:'delete'};
   if(current.phase==='delete')return current.length>0?{...current,length:current.length-1}:{...current,phase:'gap'};
   if(current.phase==='gap')return {index:(current.index+1)%phrases.length,length:0,phase:'type'};
   const length=current.length+1;
   return {...current,length,phase:length>=phrases[current.index].length?'hold':'type'};
  }),delay);
  return()=>clearTimeout(timer);
 },[active,frame,phrases]);

 const text=reduced?phrases[0]:phrases[frame.index].slice(0,frame.length);
 return <div ref={root} role="group" aria-label={copy.label} className={styles.intro} data-testid="rotating-intro" data-active={active} data-reduced={reduced} data-index={reduced?0:frame.index} data-phase={reduced?'static':frame.phase}>
  <p className="sr-only">{phrases.join(' ')}</p>
  <div className={styles.line} aria-hidden="true">
   <span className={styles.mark}>&gt;_</span>
   <span className={styles.words}>
    {phrases.map(phrase=><span className={styles.sizer} key={phrase}>{phrase}<span className={styles.caretSpace}/></span>)}
    <span className={styles.text} data-testid="rotating-intro-text">{text}<span className={styles.caret}/></span>
   </span>
  </div>

 </div>;
}
