import { locales, sections, route, siteOrigin } from '../lib/site.mjs';
export const dynamic = 'force-static';
export default function sitemap() { const origin=siteOrigin(process.env.SITE_URL); return origin ? locales.flatMap(lang=>sections.map(section=>({url:origin+route(lang,section),alternates:{languages:Object.fromEntries(locales.map(l=>[l,origin+route(l,section)]))}}))) : []; }
