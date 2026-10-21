import Navigation from './Navigation';
import Terminal from './Terminal';
import SkillIcon from './SkillIcon';
import { dictionaries, profile, skills, projects, route, getPage, siteOrigin } from '../lib/site.mjs';
import styles from './Portfolio.module.css';
export function SkillList({lang}) {
 const d = dictionaries[lang];
 return <section className={styles.skillsSection} aria-labelledby="skills-title"><div className={styles.sectionTop}><div><p className={styles.eyebrow}>01 / STACK</p><h2 id="skills-title">{d.skills}</h2></div><p className={styles.sectionNote}>{d.skillsNote}</p></div><div className={styles.skillsGrid}>{skills.map(s=><div key={s.name} className={styles.skill}><SkillIcon skill={s}/><div><strong>{s.name}</strong><span>{s.status === 'exploring' ? d.exploringLabel : s.status === 'skill' ? d.skillLabel : d.coreLabel}</span></div></div>)}</div></section>;
}
export function ExperienceSummary({lang}) {
 const d = dictionaries[lang];
 return <div className={styles.detailGrid} data-testid="experience-summary"><section className={styles.notePanel}><p className={styles.eyebrow}>FULL-STACK</p><h2>{d.developmentLabel}</h2><p><strong>{profile.experienceYears} {d.yearsLabel}</strong></p><p>{d.developmentSummary}</p></section><section className={styles.notePanel}><p className={styles.eyebrow}>FREELANCE</p><h2>{d.freelanceLabel}</h2><p><strong>{profile.freelanceYears} {d.yearsLabel}</strong></p><p>{d.freelanceSummary}</p></section></div>;
}
export function ProjectCards({lang}) {
 const d = dictionaries[lang];
 return <div className={styles.projectsGrid}>{projects.map((p,i)=><article className={styles.projectCard} key={p.slug}><div className={styles.projectVisual} aria-hidden="true"><div className={styles.projectLine}><span>~/projects/{p.slug}</span><span>0{i+1}</span></div>{i===0 ? <div className={styles.apiVisual}><div><span>GET</span> /api/v1/resources</div><div className={styles.codeLine}>router → service → database</div><div className={styles.codeMuted}>&#123; status: <em>"concept"</em> &#125;</div></div> : i===1 ? <div className={styles.dashboardVisual}><div/><section><span/><span/><span/><b/><b/><b/></section></div> : <div className={styles.flowVisual}><span>INPUT</span><i>→</i><span>AI</span><i>→</i><span>OUTPUT</span></div>}</div><div className={styles.projectBody}><span className={styles.demoBadge}>{d.demo}</span><h2>{p[lang].title}</h2><p>{p[lang].summary}</p><div className={styles.tags}>{p.stack.map(t=><span key={t}>{t}</span>)}</div><a className={styles.projectLink} href={route(lang,'projects/'+p.slug)}>{d.detail}<span aria-hidden="true">↗</span><span className="sr-only"> — {p[lang].title}</span></a></div></article>)}</div>;
}
export default function Portfolio({lang='ms', section=''}) {
 const d = dictionaries[lang]; const page = getPage(lang,section); const origin = siteOrigin(process.env.SITE_URL);
 const project = page.project;
 return <><a className="skip-link" href="#main-content">{d.skip}</a><Navigation lang={lang} section={section}/><main id="main-content" className={styles.main}>
 {!section ? <>
   <section className={styles.hero}><div className={styles.heroIntro}><p className={styles.eyebrow}><span className={styles.statusDot} aria-hidden="true"/>{d.eyebrow}</p><h1>Tengku{' '}<br/>Yusoff<span className={styles.cursor} aria-hidden="true">_</span></h1><p className={styles.heroHeadline}>{d.hero}<br/><span>{d.heroAccent}</span></p><p className={styles.heroText} data-testid="portfolio-intro">{d.intro}</p><div className={styles.actions}><a className={styles.primaryButton} href={route(lang,'projects')}>{d.viewProjects}<span aria-hidden="true">↗</span></a><a className={styles.secondaryButton} href={route(lang,'contact')}>{d.contact}<span aria-hidden="true">→</span></a></div><p className={styles.resume}><span aria-hidden="true">↓</span> {d.resume}</p></div><div className={styles.heroTerminal}><div className={styles.terminalCaption}><span>INTERACTIVE WORKSPACE</span><span aria-hidden="true">[01]</span></div><Terminal lang={lang}/><p className={styles.caption}><span aria-hidden="true">↳ </span>{lang==='ms' ? 'Cara lain untuk mengenali saya.' : 'Another way to get to know me.'}</p></div></section>
   <SkillList lang={lang}/>
   <section className={styles.section}><div className={styles.sectionTop}><div><p className={styles.eyebrow}>02 / PROJECTS</p><h2>{d.featured}</h2></div><a className={styles.textLink} href={route(lang,'projects')}>{d.allProjects} <span aria-hidden="true">↗</span></a></div><p className={styles.sectionDescription}>{d.projectsNote}</p><ProjectCards lang={lang}/></section>
   <section className={styles.twoColumns}><div className={styles.notePanel}><p className={styles.eyebrow}>03 / EXPERIENCE</p><h2>{d.nav[3]}</h2><p>{d.experienceSummary}</p><p className={styles.muted}>{d.experienceNote}</p><a className={styles.textLink} href={route(lang,'experience')}>{d.nav[3]} ↗</a></div></section>
   <section className={styles.contactPanel}><p className={styles.eyebrow}>05 / CONTACT</p><h2>{d.nextTitle}</h2><p>{d.nextBody}</p><a className={styles.secondaryButton} href={route(lang,'contact')}>{d.contact} <span aria-hidden="true">↗</span></a></section>
 </> : <>
   <div className={styles.breadcrumb}><a href={route(lang)}>{d.nav[0]}</a><span aria-hidden="true">/</span><span>{page.title}</span></div>
   <section className={styles.pageIntro}><p className={styles.eyebrow}>{project ? 'PROJECT / '+project.kind : 'PORTFOLIO / '+section.toUpperCase()}</p><h1>{page.title}<span className={styles.headingDot} aria-hidden="true"/></h1><p>{page.description}</p></section>
   {section==='about' && <><div className={styles.aboutBlock}><div className={styles.monogram} aria-hidden="true">TY<span>_</span></div><div><p className={styles.eyebrow}>WHOAMI</p><h2>{profile.fullName}</h2><p>{d.aboutBody}</p><p className={styles.muted}>{d.role}</p></div></div><ExperienceSummary lang={lang}/><section className={styles.section}><div className={styles.twoColumns}><section className={styles.notePanel}><h2>{d.learningTitle}</h2><p>{d.learningNote}</p></section><section className={styles.notePanel}><h2>{d.approachTitle}</h2><p>{d.aiApproach}</p></section></div></section><SkillList lang={lang}/></>}
   {section==='projects' && <><p className={styles.notice}>{d.demoNote}</p><ProjectCards lang={lang}/></>}
   {project && <><p className={styles.notice}>{d.demo} — {d.demoNote}</p><div className={styles.tags}>{project.stack.map(t=><span key={t}>{t}</span>)}</div><div className={styles.detailGrid}>{[['problem',d.problem],['role',d.roleLabel],['solution',d.solution],['outcome',d.outcome]].map(([key,title])=><section className={styles.notePanel} key={key}><h2>{title}</h2><p>{project[lang][key]}</p></section>)}</div><a className={styles.secondaryButton} href={route(lang,'projects')}>← {d.back}</a></>}
   {section==='experience' && <><ExperienceSummary lang={lang}/><section className={styles.notePanel}><h2>{d.learningTitle}</h2><p>{d.learningNote}</p><p className={styles.muted}>{d.experienceNote}</p><p className={styles.muted}>{d.resume}</p></section><div className={styles.section}/></>}
   {section==='contact' && <div className={styles.emptyState}><span className={styles.emptyIcon} aria-hidden="true">@_</span><h2>{d.contactEmpty}</h2><p>{d.contactNote}</p><p className={styles.muted}>{d.resume}</p></div>}

 </>}
 </main><footer className={styles.footer}><div><a className={styles.brand} href={route(lang)}>TY<span className={styles.brandDot}>_</span></a><p>{d.footer}</p></div><div><p>© Tengku Yusoff</p><small>{d.footerStatus}</small></div></footer>
 {origin && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:profile.fullName,alternateName:profile.name,url:origin+route(lang)}).replace(/</g,'\u003c')}}/>}
 </>;
}
