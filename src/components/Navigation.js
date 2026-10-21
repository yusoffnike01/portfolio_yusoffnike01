"use client";
import {useState} from 'react';
import {dictionaries,sections,route} from '../lib/site.mjs';
import ThemeToggle from './ThemeToggle';
import styles from './ModernPortfolio.module.css';
export default function Navigation({lang,section=''}){
 const [open,setOpen]=useState(false);const d=dictionaries[lang];
 const links=sections.map((s,i)=><a key={s} href={route(lang,s)} aria-current={section===s?'page':undefined} onClick={()=>setOpen(false)}>{d.nav[i]}</a>);
 return <header className={styles.header}><a className={styles.brand} href={route(lang)} aria-label="Tengku Yusoff">Tengku Yusoff<span className={styles.brandDot} aria-hidden="true">.</span></a><nav className={styles.desktopNav} aria-label={d.menu}>{links}</nav><div className={styles.headerActions}><div className={styles.languages} aria-label={d.language}>{['ms','en'].map(l=><a key={l} lang={l} hrefLang={l} href={route(l,section)} aria-current={lang===l?'true':undefined}>{l==='ms'?'BM':'EN'}</a>)}</div><ThemeToggle lang={lang}/><button className={styles.menuButton} type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{d.menu}<span aria-hidden="true"> {open?'−':'+'}</span></button></div><nav id="mobile-navigation" className={styles.mobileNav} hidden={!open} aria-label={d.menu}>{links}</nav><noscript><nav className={styles.noscriptNav} aria-label={lang==='ms'?'Semua halaman':'All pages'}>{links}</nav></noscript></header>;
}
