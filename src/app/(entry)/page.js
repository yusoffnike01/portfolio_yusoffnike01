import Portfolio from '../../components/ModernPortfolio';
import { pageMetadata } from '../../lib/site.mjs';
export function generateMetadata() { return pageMetadata('en',''); }
export default function Page() { return <Portfolio lang="en"/>; }
