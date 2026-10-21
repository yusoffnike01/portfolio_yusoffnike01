import { siteOrigin } from '../lib/site.mjs';
export const dynamic = 'force-static';
export default function robots() { const origin=siteOrigin(process.env.SITE_URL); return { rules: { userAgent: '*', allow: '/' }, ...(origin ? {sitemap:origin+'/sitemap.xml'} : {}) }; }
