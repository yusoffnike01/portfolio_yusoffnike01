"use client";
import {useState,useEffect,useRef} from 'react';
import {dictionaries} from '../lib/site.mjs';
import styles from './ModernPortfolio.module.css';
export default function WorkspaceScene({lang}){
 const d=dictionaries[lang];const [active,setActive]=useState(false),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[rotating,setRotating]=useState(false);const frame=useRef(null);
 useEffect(()=>{function receive(event){if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;const data=event.data;if(data?.type==='workspace:ready'){setReady(true);setFailed(false);}if(data?.type==='workspace:error'){setReady(false);setFailed(true);}if(data?.type==='workspace:rotation')setRotating(Boolean(data.rotating));}window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);},[]);
 useEffect(()=>{setActive(true);},[]);
 useEffect(()=>{if(!active||ready||failed)return;const timer=setTimeout(()=>setFailed(true),15000);return()=>clearTimeout(timer);},[active,ready,failed]);
 function command(value){frame.current?.contentWindow?.postMessage({type:'workspace:command',command:value},location.origin);}
 function activate(){setFailed(false);setReady(false);setActive(true);}
 return <section className={styles.workspace} aria-label={d.interactive3d}>
 <div className={styles.workspaceStage} data-testid="workspace-scene" data-mode={ready?'interactive':'fallback'}><img className={styles.workspaceImage} src="/images/workspace.webp" width="1600" height="1100" alt={d.sceneAlt} loading="eager" decoding="async"/>{active&&!failed&&<iframe ref={frame} className={styles.workspaceFrame} src={`/workspace/index.html?lang=${lang}`} title={d.interactive3d} allow="" sandbox="allow-scripts allow-same-origin"/>}</div>
 <div className={styles.workspaceControls}>{!ready&&<button type="button" onClick={activate} disabled={active&&!failed}>{active&&!failed?d.loading3d:d.activate3d}</button>}{ready&&<><button type="button" aria-pressed={rotating} onClick={()=>command('rotate')}>{d.rotateScene}</button><button type="button" onClick={()=>command('reset')}>{d.resetScene}</button></>}</div><p className={styles.workspaceStatus} data-testid="workspace-status" role="status">{failed?d.sceneUnavailable:ready?d.sceneHint:d.interactive3d}</p>
 </section>;
}
