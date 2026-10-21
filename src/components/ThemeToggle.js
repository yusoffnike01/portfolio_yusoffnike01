"use client";
import {useState,useEffect} from 'react';
import {dictionaries} from '../lib/site.mjs';
import styles from './ModernPortfolio.module.css';
export default function ThemeToggle({lang}){
 const [light,setLight]=useState(false);const d=dictionaries[lang];
 useEffect(()=>{let saved='dark';try{saved=localStorage.getItem('portfolio:theme')||'dark';}catch{}const value=saved==='light';document.documentElement.dataset.theme=value?'light':'dark';setLight(value);},[]);
 function toggle(){const value=!light;setLight(value);document.documentElement.dataset.theme=value?'light':'dark';try{localStorage.setItem('portfolio:theme',value?'light':'dark');}catch{}}
 return <button type="button" className={styles.themeButton} data-testid="theme-toggle" onClick={toggle} aria-label={light?d.themeDark:d.themeLight} aria-pressed={light}><span aria-hidden="true">{light?'☾':'☀'}</span></button>;
}
