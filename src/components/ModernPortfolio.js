import Navigation from './Navigation';
import Terminal from './Terminal';
import WorkspaceScene from './WorkspaceScene';
import ProfilePhoto from './ProfilePhoto';
import RotatingIntro from './RotatingIntro';
import ContactEmail from './ContactEmail';
import SkillIcon from './SkillIcon';
import {dictionaries,profile,skills,projects,route,getPage,siteOrigin} from '../lib/site.mjs';
import styles from './ModernPortfolio.module.css';

export function SkillList({lang}){
 const d=dictionaries[lang];
 return <section className={styles.section} aria-labelledby="skills-title"><h2 id="skills-title" className={styles.sectionTitle}>{d.skills}</h2><div className={styles.skillsGrid}>{skills.map(s=><div className={styles.skill} key={s.name}><div className={styles.skillBody}><SkillIcon skill={s}/><div className={styles.skillCopy}><strong>{s.name}</strong><span>{s.status==='exploring'?d.exploringLabel:s.status==='skill'?d.skillLabel:d.coreLabel}</span></div></div></div>)}</div><p className={styles.skillsNote}>{d.skillsNote}</p></section>;
}
export function ExperienceSummary({lang}){
 const d=dictionaries[lang];
 return <div className={styles.experienceGrid} data-testid="experience-summary"><section className={styles.experienceCard}><h2>{d.developmentLabel}</h2><strong>{profile.experienceYears} {d.yearsLabel}</strong><p>{d.developmentSummary}</p></section><section className={styles.experienceCard}><h2>{d.freelanceLabel}</h2><strong>{profile.freelanceYears} {d.yearsLabel}</strong><p>{d.freelanceSummary}</p></section></div>;
}
export function ProjectCards({lang}){
 const d=dictionaries[lang];
 return <div className={styles.projectList}>{projects.map(p=><article className={styles.projectCard} key={p.slug}><span className={styles.demoBadge}>{d.demo}</span><h2>{p[lang].title}</h2><p>{p[lang].summary}</p><div className={styles.tags}>{p.stack.map(t=><span key={t}>{t}</span>)}</div><a className={styles.projectLink} href={route(lang,'projects/'+p.slug)}>{d.detail}<span aria-hidden="true">↗</span><span className="sr-only"> — {p[lang].title}</span></a></article>)}</div>;
}
function Learning({lang}){const d=dictionaries[lang];return <><section className={styles.notePanel}><h2>{d.learningTitle}</h2><p>{d.learningNote}</p></section><section className={styles.notePanel}><h2>{d.approachTitle}</h2><p>{d.aiApproach}</p></section></>;}
export default function Portfolio({lang='ms',section=''}){
 const d=dictionaries[lang],page=getPage(lang,section),origin=siteOrigin(process.env.SITE_URL),project=page.project;
 return <><a className="skip-link" href="#main-content">{d.skip}</a><Navigation lang={lang} section={section}/><main id="main-content" className={styles.main}>
 {!section?<><WorkspaceScene lang={lang}/><div className={styles.reading} data-testid="portfolio-content">
 <p className={styles.greeting}>{d.greeting}</p>
 <div className={styles.introGrid}>
  <div className={styles.introCopy}>
   <section className={styles.identity}><div><h1>Tengku Yusoff<span className={styles.headingDot} aria-hidden="true"/></h1><RotatingIntro key={lang} lang={lang}/></div></section>
   <section className={styles.section}><h2 className={styles.sectionTitle}>{d.nav[1]}</h2><p className={styles.bodyText} data-testid="portfolio-intro">{d.intro}</p><ExperienceSummary lang={lang}/><div className={styles.actions}><a href={route(lang,'projects')} className={styles.primaryButton}>{d.viewProjects}<span aria-hidden="true">↗</span></a><a href={route(lang,'contact')} className={styles.secondaryButton}>{d.contact}</a></div><p className={styles.resume}>{d.resume}</p></section>
  </div>
  <div className={styles.introPortrait}><ProfilePhoto lang={lang}/></div>
 </div>
 <SkillList lang={lang}/><section className={styles.section}><h2 className={styles.sectionTitle}>{d.featured}</h2><p className={styles.sectionDescription}>{d.projectsNote}</p><ProjectCards lang={lang}/><a className={styles.textLink} href={route(lang,'projects')}>{d.allProjects} ↗</a></section><Learning lang={lang}/><section className={styles.section}><h2 className={styles.sectionTitle}>{d.nav[4]}</h2><p className={styles.bodyText}>{d.contactEmpty}</p><p className={styles.bodyText}>{d.contactNote}</p><ContactEmail lang={lang}/><div><a className={styles.textLink} href={route(lang,'contact')}>{d.contact} ↗</a></div></section><details className={styles.terminalDetails} data-testid="optional-terminal"><summary>{d.optionalTerminal}</summary><div className={styles.terminalInner}><Terminal lang={lang}/></div></details></div></>:<div className={styles.reading} data-testid="portfolio-content"><div className={styles.breadcrumb}><a href={route(lang)}>{d.nav[0]}</a><span aria-hidden="true">/</span><span>{page.title}</span></div><section className={styles.pageIntro}><h1>{page.title}<span className={styles.headingDot} aria-hidden="true"/></h1><p data-testid="page-description">{page.description}</p></section>
 {section==='about'&&<><div className={styles.aboutBlock}><ProfilePhoto lang={lang} variant="about"/><div><h2>{profile.fullName}</h2><p>{d.aboutBody}</p><p>{d.role}</p></div></div><ExperienceSummary lang={lang}/><Learning lang={lang}/><SkillList lang={lang}/></>}
 {section==='projects'&&<><p className={styles.notice}>{d.demoNote}</p><ProjectCards lang={lang}/></>}
 {project&&<><p className={styles.notice}>{d.demo} — {d.demoNote}</p><div className={styles.tags}>{project.stack.map(t=><span key={t}>{t}</span>)}</div><div className={styles.detailGrid}>{[['problem',d.problem],['role',d.roleLabel],['solution',d.solution],['outcome',d.outcome]].map(([key,title])=><section className={styles.notePanel} key={key}><h2>{title}</h2><p>{project[lang][key]}</p></section>)}</div><a className={styles.secondaryButton} href={route(lang,'projects')}>← {d.back}</a></>}
 {section==='experience'&&<><ExperienceSummary lang={lang}/><Learning lang={lang}/><p className={styles.bodyText}>{d.experienceNote}</p><p className={styles.resume}>{d.resume}</p></>}
 {section==='contact'&&<section className={styles.emptyState}><h2>{d.contactEmpty}</h2><ContactEmail lang={lang}/><p>{d.resume}</p></section>}

 </div>}
 </main><footer className={styles.footer}><div><a href={route(lang)} className={styles.brand}>Tengku Yusoff<span className={styles.brandDot} aria-hidden="true">.</span></a><p>{d.footer}</p></div><div><p>© Tengku Yusoff</p><small>{d.footerStatus}</small></div></footer>
 {origin&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:profile.fullName,alternateName:profile.name,jobTitle:profile.displayTitle,url:origin+route(lang),image:origin+'/social/profile-portrait.webp'}).replace(/</g,'\u003c')}}/>}
 </>;
}
