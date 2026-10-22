import '../styles/globals.css';
export const metadata = { title: '404 | Tengku Yusoff', robots: {index:false,follow:true} };
export default function NotFound() { return <html lang="en"><body><main className="not-found"><p>ERROR / 404</p><h1>This page could not be found.</h1><p lang="ms">Halaman tidak ditemui.</p><a href="/en/">Back to home →</a><a href="/ms/" lang="ms">Laman utama BM →</a></main></body></html>; }
