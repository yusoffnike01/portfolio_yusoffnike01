"use client";
import { useState } from 'react';
import { dictionaries, sections, route } from '../lib/site.mjs';
import styles from './Portfolio.module.css';
export default function Navigation({ lang, section = '' }) {
  const [open, setOpen] = useState(false);
  const d = dictionaries[lang];
  return <header className={styles.header}>
    <a className={styles.brand} href={route(lang)} aria-label="Tengku Yusoff"><span aria-hidden="true">&gt;_</span> TY<span className={styles.brandDot}>.</span></a>
    <nav className={styles.desktopNav} aria-label={d.menu}>{sections.map((s,i) => <a key={s} href={route(lang,s)} aria-current={section === s ? 'page' : undefined}>{d.nav[i]}</a>)}</nav>
    <div className={styles.headerActions}><div className={styles.languages} aria-label={d.language}>{['ms','en'].map(l => <a key={l} lang={l} hrefLang={l} href={route(l,section)} aria-current={lang === l ? 'true' : undefined}>{l === 'ms' ? 'BM' : 'EN'}</a>)}</div>
    <button className={styles.menuButton} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{d.menu} <span aria-hidden="true">{open ? '−' : '+'}</span></button></div>
    <nav id="mobile-navigation" className={styles.mobileNav} hidden={!open} aria-label={d.menu}>{sections.map((s,i) => <a key={s} href={route(lang,s)} aria-current={section === s ? 'page' : undefined} onClick={()=>setOpen(false)}>{d.nav[i]}</a>)}</nav>
  </header>;
}
