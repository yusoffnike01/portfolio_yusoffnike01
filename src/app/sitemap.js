import { locales, sections, projects, route, siteOrigin } from '../lib/site.mjs';
export const dynamic = 'force-static';
const entries=[...sections,...projects.filter(project=>!project.demo).map(project=>'projects/'+project.slug)];
export default function sitemap() { const origin=siteOrigin(process.env.SITE_URL); return origin ? locales.flatMap(lang=>entries.map(section=>({url:origin+route(lang,section),alternates:{languages:Object.fromEntries(locales.map(l=>[l,origin+route(l,section)]))}}))) : []; }
