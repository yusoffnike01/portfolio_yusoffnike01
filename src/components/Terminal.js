"use client";
import { useState, useEffect, useRef } from 'react';
import { COMMANDS, initialState, executeCommand } from '../lib/terminal.mjs';
import { dictionaries, profile, skills, projects, route } from '../lib/site.mjs';
import ContactEmail from './ContactEmail';
import styles from './Portfolio.module.css';
function Result({ entry, lang, run, quiet, setQuiet }) {
  const d = dictionaries[lang];
  if (entry.status === 'unknown') return <p className={styles.error}>{d.unknown}</p>;
  if (entry.status === 'too-long') return <p className={styles.error}>{d.tooLong}</p>;
  const link = (section, label) => <a href={route(lang,section)}>{label} <span aria-hidden="true">↗</span></a>;
  switch (entry.command) {
    case 'help': return <div className={styles.helpGrid}>{COMMANDS.map(c => <div key={c}><button type="button" onClick={()=>run(c)}>{c}</button><span>{d.help[c]}</span></div>)}</div>;
    case 'whoami': return <><p>{profile.fullName}</p><p>{d.role}</p><p>{d.experienceSummary}</p></>;
    case 'about': return <><p>{d.aboutBody}</p>{link('about',d.nav[1])}</>;
    case 'skills': return <><p>{skills.map(s=>s.name + (s.status === 'exploring' ? ` (${d.exploringLabel})` : '')).join(' / ')}</p><p>{d.skillsNote}</p></>;
    case 'projects': return <ul>{projects.map(p=><li key={p.slug}>{link('projects/'+p.slug,p[lang].title)} <small>— {d.demo}</small></li>)}</ul>;
    case 'experience': return <><p>{d.experienceSummary}</p>{link('experience',d.nav[3])}</>;
    case 'ai-lab': return <><p>{d.aiApproach}</p><p>{d.labNote}</p>{link('ai-lab','AI Lab')}</>;
    case 'resume': return <p>{d.resume}</p>;
    case 'contact': case 'sudo hire-me': return <><p>{d.contactEmpty}</p><ContactEmail lang={lang}/><div>{link('contact',d.nav[5])}</div></>;
    case 'history': return entry.history.length ? <ol>{entry.history.map((h,i)=><li key={i}>{h}</li>)}</ol> : <p>{d.noHistory}</p>;
    case 'theme': return <div className={styles.themeChoices}><span>{d.effects}:</span><button type="button" aria-pressed={!quiet} onClick={()=>setQuiet(false)}>{d.matrix}</button><button type="button" aria-pressed={quiet} onClick={()=>setQuiet(true)}>{d.quiet}</button></div>;
    default: return null;
  }
}
export default function Terminal({lang}) {
  const d = dictionaries[lang];
  const [state,setState] = useState(initialState);
  const [input,setInput] = useState('');
  const [index,setIndex] = useState(null);
  const [quiet,setQuiet] = useState(false);
  const [reduced,setReduced] = useState(false);
  const [skipped,setSkipped] = useState(false);
  const output = useRef(null);
  useEffect(()=>{
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = ()=>setReduced(media.matches); update();
    media.addEventListener('change',update); return ()=>media.removeEventListener('change',update);
  },[]);
  useEffect(()=>{ if (output.current) output.current.scrollTop = output.current.scrollHeight; },[state.sequence]);
  function run(raw) { setState(s=>executeCommand(s,raw)); setInput(''); setIndex(null); }
  function onKeyDown(event) {
    if (!['ArrowUp','ArrowDown'].includes(event.key) || !state.history.length) return;
    event.preventDefault();
    const next = event.key === 'ArrowUp' ? Math.max(0,(index ?? state.history.length)-1) : Math.min(state.history.length,(index ?? state.history.length)+1);
    setIndex(next); setInput(state.history[next] ?? '');
  }
  return <section className={styles.terminal} aria-label={d.terminalTitle} data-testid="terminal" data-effects={quiet || reduced ? 'off' : 'on'}>
    <div className={styles.terminalBar}><span className={styles.windowDots} aria-hidden="true"><i/><i/><i/></span><span>portfolio — terminal</span><span className={styles.terminalVersion}>bash / ui</span></div>
    <div className={styles.terminalBody}>
      <div className={styles.terminalBoot}><span aria-hidden="true">❯</span> ./welcome.sh <span className={styles.muted}>[ok]</span></div>
      <p className={`${styles.welcome} ${skipped ? styles.skipped : ''}`}>{d.terminalWelcome}</p>
      {!skipped && !reduced && !quiet && <button type="button" className={styles.skipAnimation} onClick={()=>setSkipped(true)}>{d.skipAnimation} ↵</button>}
      <p className={styles.terminalHint}>{d.terminalHint}</p>
      <div ref={output} className={styles.terminalOutput} role="region" aria-label={d.output} tabIndex={0}>
        {state.output.map(entry=><div className={styles.terminalEntry} key={entry.id} data-testid="terminal-entry"><p className={styles.echo}><span aria-hidden="true">$ </span>{entry.status === 'too-long' ? '…' : entry.raw}</p><Result entry={entry} lang={lang} run={run} quiet={quiet || reduced} setQuiet={setQuiet}/></div>)}
      </div>
      <div className={styles.quickCommands}>{['help','skills','projects','contact'].map(c=><button key={c} type="button" onClick={()=>run(c)}>{c} <span aria-hidden="true">↵</span></button>)}</div>
      <form className={styles.terminalForm} onSubmit={event=>{event.preventDefault();run(input);}}>
        <label htmlFor="terminal-command" className={styles.prompt}><span aria-hidden="true">visitor<span className={styles.muted}>@</span>portfolio:~$</span><span className="sr-only">{d.input}</span></label>
        <div className={styles.inputRow}><input id="terminal-command" aria-label={d.input} value={input} onChange={e=>{setInput(e.target.value);setIndex(null);}} onKeyDown={onKeyDown} placeholder={d.placeholder} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-describedby="input-limit"/><button type="submit">{d.send} <span aria-hidden="true">↵</span></button></div>
        <span id="input-limit" className="sr-only">{d.tooLong}</span>
      </form>
    </div>
    <div className={styles.terminalStatus}><span><i aria-hidden="true"/> {d.safe}</span><span>UTF-8 <span aria-hidden="true">·</span> {lang.toUpperCase()}</span></div>
    <span className="sr-only" role="status">{state.sequence ? `${d.status}: ${state.sequence}` : ''}</span>
  </section>;
}
