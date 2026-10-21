import Portfolio from '../../components/ModernPortfolio';
import { pageMetadata } from '../../lib/site.mjs';
export function generateMetadata() { return pageMetadata('ms',''); }
export default function Page() { return <Portfolio lang="ms"/>; }
