import { notFound } from 'next/navigation';
import Portfolio from '../../../components/ModernPortfolio';
import { paths, getPage, pageMetadata } from '../../../lib/site.mjs';
export const dynamicParams = false;
export function generateStaticParams() { return paths.map(path=>({section:path ? path.split('/') : []})); }
export async function generateMetadata({params}) { const {lang,section=[]}=await params; return pageMetadata(lang,section.join('/')); }
export default async function Page({params}) { const {lang,section=[]}=await params; const path=section.join('/'); if (!getPage(lang,path)) notFound(); return <Portfolio lang={lang} section={path}/>; }
