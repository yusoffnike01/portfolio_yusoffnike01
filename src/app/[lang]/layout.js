import '../../styles/globals.css';
import { locales } from '../../lib/site.mjs';
import { notFound } from 'next/navigation';
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(lang=>({lang})); }
export default async function Layout({children, params}) {
 const {lang} = await params;
 if (!locales.includes(lang)) notFound();
 return <html lang={lang}><body>{children}</body></html>;
}
