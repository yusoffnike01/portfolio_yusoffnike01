export const locales = ['en', 'ms'];
export const profile = { name: 'Tengku Yusoff', fullName: 'Tengku Yusoff Bin Tengku Ibrahim Shukrillah', jobTitle: 'Full-Stack Developer', displayTitle: 'Full-Stack & Mobile App Developer', experienceYears: 5, freelanceYears: 3, resume: null, contacts: [{type:'email',value:'tengkuyusoff19@gmail.com',href:'mailto:tengkuyusoff19@gmail.com'}] };
export const skills = [
  { name: 'Node.js', group: 'Backend', short: 'JS', status: 'core', icon: '/icons/skills/nodejs.svg' },
  { name: 'React', group: 'Frontend', short: 'R', status: 'core', icon: '/icons/skills/react.svg' },
  { name: 'Next.js', group: 'Full-stack', short: 'Nx', status: 'core', icon: '/icons/skills/nextjs.svg' },
  { name: 'NestJS', group: 'Backend', short: 'Ns', status: 'core', icon: '/icons/skills/nestjs.svg' },
  { name: 'Flutter', group: 'Mobile', short: 'Fl', status: 'core', icon: '/icons/skills/flutter.svg' },
  { name: 'Docker', group: 'Containers', short: 'Dk', status: 'skill', icon: '/icons/skills/docker.svg' },
  { name: 'Docker Swarm', group: 'Orchestration', short: 'Sw', status: 'skill', icon: '/icons/skills/docker.svg' },
  { name: 'Kubernetes (K8s)', group: 'Orchestration', short: 'K8s', status: 'skill', icon: '/icons/skills/kubernetes.svg' },
  { name: 'DevOps', group: 'Infrastructure', short: 'DO', status: 'exploring', icon: '/icons/skills/devops.svg' },
  { name: 'AI Automation', group: 'Automation', short: 'AI', status: 'exploring', icon: '/icons/skills/ai-automation.svg' }
];
export const projects = [
  { slug: 'forecastify-edu', demo: false, repo: 'https://github.com/yusoffnike01/forecastify_edu', image: '/projects/forecastify-edu.jpg', stack: ['React', 'Vite'], kind: 'WEB',
    ms: { title: 'Forecastify Edu', summary: 'Aplikasi React untuk berlatih ramalan jualan daripada data sejarah, dengan carta serta eksport PDF dan Excel.', imageAlt: 'Ilustrasi skrin Forecastify dengan carta contoh. Bukan data jualan sebenar.', problem: 'Bagaimana pelajar boleh mencuba ramalan jualan tanpa alat analitik yang rumit?', role: 'Projek peribadi awam di GitHub. Bukan kerja pelanggan dan tiada deployment produksi yang didakwa.', solution: 'Entri data sejarah, ramalan berasaskan peratusan, carta garis, bar dan kawasan, serta eksport PDF dan Excel. Dibina dengan React dan Vite.', outcome: 'Kod sumber awam. Tiada metrik penggunaan atau dakwaan bilik darjah yang sedang menggunakan sistem ini.' },
    en: { title: 'Forecastify Edu', summary: 'A React app for practising sales forecasting from historical data, with charts plus PDF and Excel export.', imageAlt: 'Illustration of a Forecastify screen with a sample chart. Not live sales data.', problem: 'How can students try sales forecasting without a complicated analytics tool?', role: 'Personal public GitHub project. Not client work, and no production deployment is claimed.', solution: 'Historical data entry, percentage-based forecasts, line, bar and area charts, plus PDF and Excel export. Built with React and Vite.', outcome: 'The source is public. No usage metrics or live classroom deployment are claimed.' } },
  { slug: 'aquatick', demo: false, repo: 'https://github.com/yusoffnike01/aquatick', image: '/projects/aquatick.jpg', stack: ['Flutter', 'Dart'], kind: 'MOBILE',
    ms: { title: 'Aquatick', summary: 'Aplikasi Flutter untuk menjejak air harian, dengan kemajuan luar talian, peringatan dan sejarah 7 hari.', imageAlt: 'Ilustrasi telefon Aquatick dengan gelang kemajuan air. Bukan tangkapan skrin kedai aplikasi.', problem: 'Bagaimana aplikasi mudah alih boleh menjejak matlamat air harian tanpa akaun?', role: 'Projek Flutter peribadi. Bukan aplikasi yang diterbitkan di kedai dan bukan kerja pelanggan.', solution: 'Simpanan setempat, gelang kemajuan, tetapan peringatan dan carta mingguan.', outcome: 'Kod sumber ada di GitHub. Tiada senarai kedai atau angka muat turun yang didakwa.' },
    en: { title: 'Aquatick', summary: 'A Flutter daily water tracker with offline progress, reminders and a 7-day history.', imageAlt: 'Illustration of an Aquatick phone screen with a water progress ring. Not a store screenshot.', problem: 'How can a simple mobile app track a daily water goal without an account?', role: 'Personal Flutter project. Not a published store app and not client work.', solution: 'Local storage, a progress ring, reminder settings and a weekly chart.', outcome: 'The source is on GitHub. No store listing or download numbers are claimed.' } },
  { slug: 'bull-queue', demo: false, repo: 'https://github.com/yusoffnike01/bullsimple', image: '/projects/bull-queue.jpg', stack: ['Node.js', 'Express', 'Bull', 'Redis'], kind: 'API',
    ms: { title: 'Bull Queue Lab', summary: 'Contoh barisan Node.js yang menerima pesanan burger, memprosesnya dengan Bull dan memaparkan status di Bull Board.', imageAlt: 'Ilustrasi papan barisan dengan pesanan burger contoh. Bukan sistem restoran sebenar.', problem: 'Bagaimana kerja latar boleh dibaris, dicuba semula dan diperiksa?', role: 'Latihan backend peribadi. Pesanan burger ialah data contoh, bukan perniagaan makanan.', solution: 'Titik akhir Express menambah kerja ke barisan Bull yang disokong Redis, dengan percubaan semula dan paparan Bull Board.', outcome: 'Sumber awam sahaja. Tiada trafik produksi atau hosting Redis yang didakwa.' },
    en: { title: 'Bull Queue Lab', summary: 'A Node.js queue example that accepts burger orders, processes them with Bull and shows status in Bull Board.', imageAlt: 'Illustration of a queue board with sample burger orders. Not a real restaurant system.', problem: 'How can background jobs be queued, retried and inspected?', role: 'Personal backend exercise. The burger orders are sample data, not a food business.', solution: 'Express endpoints add jobs to a Redis-backed Bull queue, with retries and a Bull Board view.', outcome: 'Public source only. No production traffic or Redis hosting is claimed.' } }
];
export const dictionaries = {
  ms: {
    greeting: 'Halo, saya membina sistem web dan aplikasi mobile dengan JavaScript & Flutter.', sceneAlt: 'Setup MacBook Pro dengan monitor luaran dan kerusi kosong', activate3d: 'Aktifkan 3D', loading3d: 'Memuatkan 3D…', interactive3d: 'Setup 3D interaktif', sceneUnavailable: '3D tidak tersedia. Gambar setup dikekalkan.', rotateScene: 'Putar setup', resetScene: 'Reset sudut', sceneHint: 'Seret untuk putar. Butang putaran juga boleh digunakan dengan papan kekunci.', themeLight: 'Gunakan tema cerah', themeDark: 'Gunakan tema gelap', optionalTerminal: 'Cuba terminal pilihan',
    nav: ['Utama', 'Tentang', 'Projek', 'Pengalaman', 'Hubungi'], skip: 'Langkau ke kandungan', menu: 'Menu', language: 'Tukar bahasa',
    eyebrow: 'FULL-STACK / JAVASCRIPT', hero: 'Full-Stack & Mobile App Developer', heroAccent: 'Sistem & aplikasi berasaskan JavaScript.',
    intro: `Saya Full-Stack Developer dengan ${profile.experienceYears} tahun pengalaman membangunkan sistem dan aplikasi, serta ${profile.freelanceYears} tahun pengalaman freelance. Fokus saya ialah Node.js, React, Next.js dan NestJS. Saya juga membangunkan aplikasi mobile menggunakan Flutter.`,
    role: 'Full-Stack & Mobile App Developer', viewProjects: 'Terokai projek', contact: 'Hubungi', resume: 'Resume akan ditambah',
    rotatingIntro: {label:'Peranan dan minat saya',phrases:['Saya Full-Stack Developer.','Saya membina aplikasi mobile.','Saya sedang meneroka DevOps.','Saya sedang meneroka AI automation.','Saya suka menulis kod.','Saya juga suka badminton.']},
    skills: 'Teknologi & fokus', skillsNote: 'Fokus saya pada pembangunan JavaScript dan Flutter, dengan kemahiran Docker, Docker Swarm dan Kubernetes (K8s). Saya terus meneroka DevOps dan AI automation.', coreLabel: 'Fokus utama', skillLabel: 'Kemahiran', exploringLabel: 'Sedang diterokai',
    featured: 'Projek pilihan', projectsNote: 'Projek awam daripada GitHub. Bukan dakwaan kerja pelanggan, metrik penggunaan atau deployment produksi.', allProjects: 'Semua projek',
    demo: 'GitHub', repoBadge: 'GitHub', repository: 'Repositori', detail: 'Lihat butiran', demoNote: 'Projek awam daripada GitHub. Bukan kerja pelanggan atau sistem yang didakwa sudah digunakan.',
    experienceSummary: `${profile.experienceYears} tahun pengalaman pembangunan full-stack dan ${profile.freelanceYears} tahun pengalaman freelance membina sistem serta aplikasi.`, experienceNote: 'Butiran organisasi, tarikh dan projek sebenar akan ditambah kemudian.', yearsLabel: 'tahun', developmentLabel: 'Pembangunan full-stack', freelanceLabel: 'Freelance sistem & aplikasi', developmentSummary: 'Membangunkan sistem dan aplikasi dengan fokus pada ekosistem JavaScript.', freelanceSummary: 'Pengalaman freelance membina sistem dan aplikasi.',
    contactEmpty: 'Mari berbincang.', contactNote: 'Ada projek, idea atau peluang kerjasama? Hubungi saya melalui e-mel.',
    aboutIntro: 'Full-stack development dengan fokus pada ekosistem JavaScript.', aboutBody: `Saya Tengku Yusoff, seorang Full-Stack Developer dengan ${profile.experienceYears} tahun pengalaman membangunkan sistem dan aplikasi. Saya juga mempunyai ${profile.freelanceYears} tahun pengalaman freelance. Teknologi utama saya ialah Node.js, React, Next.js dan NestJS. Untuk aplikasi mobile, saya menggunakan Flutter.`, learningTitle: 'Yang sedang saya terokai', learningNote: 'Saya sedang meneroka DevOps dan AI automation untuk meluaskan pemahaman tentang operasi aplikasi dan aliran kerja automasi.', approachTitle: 'Cara saya meneroka AI', aiApproach: 'Saya mula berjinak dengan pembangunan berbantu AI (vibe coding), bermula dengan brainstorming dan perancangan berperingkat. Saya mahu mengukuhkan cara menyemak cadangan AI, memahami kod dan menguji hasilnya sebelum digunakan.',

    problem: 'Soalan reka bentuk', roleLabel: 'Status & peranan', solution: 'Pendekatan cadangan', outcome: 'Hasil / batas', back: 'Kembali ke projek',
    nextTitle: 'Mari bina sesuatu yang bermakna.', nextBody: 'Maklumat hubungan dan resume sebenar akan melengkapkan ruang ini.',
    footer: 'Sistem web, aplikasi mobile dan pembelajaran berterusan.', footerStatus: 'Projek awam dipautkan ke GitHub.',
    terminalTitle: 'Terminal interaktif', terminalWelcome: 'Selamat datang. Taip help untuk bermula.', terminalHint: 'Klik arahan atau taip sendiri. Tiada arahan sistem dijalankan.',
    input: 'Arahan terminal', placeholder: 'Taip help…', send: 'Hantar', skipAnimation: 'Langkau animasi', unknown: 'Arahan tidak dikenali. Taip help untuk melihat pilihan.',
    tooLong: 'Input ditolak: maksimum 200 aksara.', noHistory: 'Belum ada arahan terdahulu.', effects: 'Efek visual', matrix: 'Matrix', quiet: 'Matrix tanpa efek',
    status: 'Arahan diproses', output: 'Output terminal', safe: 'SIMULASI SELAMAT', help: {
      help: 'Senarai arahan', whoami: 'Identiti portfolio', about: 'Tentang saya', skills: 'Teknologi & fokus', projects: 'Projek GitHub', experience: 'Status pengalaman',
      resume: 'Status resume', contact: 'Maklumat hubungan', clear: 'Kosongkan output sahaja', history: 'Sejarah sesi', theme: 'Pilihan efek', 'sudo hire-me': 'Pilihan hubungan; bukan sudo sebenar'
    }
  },
  en: {
    greeting: 'Hello, I build web systems and mobile apps with JavaScript & Flutter.', sceneAlt: 'MacBook Pro setup with an external monitor and empty chair', activate3d: 'Activate 3D', loading3d: 'Loading 3D…', interactive3d: 'Interactive MacBook Pro workspace', sceneUnavailable: '3D is unavailable. The workspace image remains available.', rotateScene: 'Rotate setup', resetScene: 'Reset view', sceneHint: 'Drag to orbit. The rotation button can also be used with a keyboard.', themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme', optionalTerminal: 'Try the optional terminal',
    nav: ['Home', 'About', 'Projects', 'Experience', 'Contact'], skip: 'Skip to content', menu: 'Menu', language: 'Change language',
    eyebrow: 'FULL-STACK / JAVASCRIPT', hero: 'Full-Stack & Mobile App Developer', heroAccent: 'JavaScript systems & applications.',
    intro: `I am a Full-Stack Developer with ${profile.experienceYears} years of experience building systems and applications, and ${profile.freelanceYears} years of freelance experience. My focus is Node.js, React, Next.js and NestJS. I also develop mobile applications using Flutter.`,
    role: 'Full-Stack & Mobile App Developer', viewProjects: 'Explore projects', contact: 'Get in touch', resume: 'Resume coming soon',
    rotatingIntro: {label:'My roles and interests',phrases:["I'm a Full-Stack Developer.","I'm a Mobile Developer.","I'm exploring DevOps.","I'm exploring AI automation.",'I love coding.','And I love badminton.']},
    skills: 'Technologies & focus', skillsNote: 'My focus is JavaScript and Flutter development, with skills in Docker, Docker Swarm and Kubernetes (K8s). I continue to explore DevOps and AI automation.', coreLabel: 'Core focus', skillLabel: 'Skill', exploringLabel: 'Currently exploring',
    featured: 'Selected projects', projectsNote: 'Public GitHub projects. Not claims of client work, usage metrics or a production deployment.', allProjects: 'All projects',
    demo: 'GitHub', repoBadge: 'GitHub', repository: 'Repository', detail: 'View details', demoNote: 'Public GitHub projects. Not client work or a system claimed to be in use.',
    experienceSummary: `${profile.experienceYears} years of full-stack development experience and ${profile.freelanceYears} years of freelance experience building systems and applications.`, experienceNote: 'Organization details, dates and actual projects will be added later.', yearsLabel: 'years', developmentLabel: 'Full-stack development', freelanceLabel: 'Freelance systems & apps', developmentSummary: 'Building systems and applications with a focus on the JavaScript ecosystem.', freelanceSummary: 'Freelance experience developing systems and applications.',
    contactEmpty: 'Let’s talk.', contactNote: 'Have a project, an idea or a collaboration in mind? Get in touch by email.',
    aboutIntro: 'Full-stack development with a focus on the JavaScript ecosystem.', aboutBody: `I am Tengku Yusoff, a Full-Stack Developer with ${profile.experienceYears} years of experience building systems and applications. I also have ${profile.freelanceYears} years of freelance experience. My main technologies are Node.js, React, Next.js and NestJS. I use Flutter for mobile applications.`, learningTitle: 'What I am exploring', learningNote: 'I am exploring DevOps and AI automation to expand my understanding of application operations and automated workflows.', approachTitle: 'How I am exploring AI', aiApproach: 'I am getting started with AI-assisted development (vibe coding), beginning with brainstorming and step-by-step planning. I want to strengthen how I review AI suggestions, understand the code and test the results before using them.',

    problem: 'Design question', roleLabel: 'Status & role', solution: 'Proposed approach', outcome: 'Outcome / limits', back: 'Back to projects',
    nextTitle: 'Let’s build something meaningful.', nextBody: 'Verified contact details and a real resume will complete this space.',
    footer: 'Web systems, mobile apps and continuous learning.', footerStatus: 'Public projects link to GitHub.',
    terminalTitle: 'Interactive terminal', terminalWelcome: 'Welcome. Type help to get started.', terminalHint: 'Click a command or type your own. No system commands are executed.',
    input: 'Terminal command', placeholder: 'Type help…', send: 'Run', skipAnimation: 'Skip animation', unknown: 'Unknown command. Type help to see the available commands.',
    tooLong: 'Input rejected: maximum 200 characters.', noHistory: 'No previous commands yet.', effects: 'Visual effects', matrix: 'Matrix', quiet: 'Matrix without effects',
    status: 'Command processed', output: 'Terminal output', safe: 'SAFE SIMULATION', help: {
      help: 'Available commands', whoami: 'Portfolio identity', about: 'About me', skills: 'Technologies & focus', projects: 'GitHub projects', experience: 'Experience status',
      resume: 'Resume status', contact: 'Contact information', clear: 'Clear output only', history: 'Session history', theme: 'Visual effects', 'sudo hire-me': 'Contact options; not real sudo'
    }
  }
};
export const sections = ['', 'about', 'projects', 'experience', 'contact'];
export const paths = [...sections, ...projects.map(p => 'projects/'+p.slug)];
export function route(lang, section = '') { return '/'+lang+'/'+(section ? section+'/' : ''); }
export function getPage(lang, section) {
  if (!locales.includes(lang) || !paths.includes(section)) return null;
  const d = dictionaries[lang];
  const project = projects.find(p => section === 'projects/'+p.slug);
  return project ? { title: project[lang].title, description: project[lang].summary, demo: project.demo, project } : { title: d.nav[sections.indexOf(section)], description: section === 'about' ? d.aboutIntro : section === 'projects' ? d.projectsNote : section === 'experience' ? d.experienceSummary : section === 'contact' ? d.contactNote : d.intro, demo: false };
}
export function siteOrigin(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash ? url.origin : null; } catch { return null; }
}
export function pageMetadata(lang, section, configuredOrigin = process.env.SITE_URL) {
  const page = getPage(lang, section);
  if (!page) return {};
  const origin = siteOrigin(configuredOrigin);
  const title = section ? `${page.title} | ${profile.name}` : `${profile.name} | ${profile.displayTitle}`;
  return {
    title, description: page.description, robots: { index: !!origin && !page.demo, follow: true },
    ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: origin+route(lang, section), languages: Object.fromEntries(locales.map(l => [l, origin+route(l, section)])) } } : {}),
    icons: { icon: '/favicon.svg' },
    openGraph: { title, description: page.description, type: 'website', locale: lang === 'ms' ? 'ms_MY' : 'en_US', alternateLocale: lang === 'ms' ? 'en_US' : 'ms_MY', siteName: 'Tengku Yusoff', ...(origin ? { images: [{ url: origin+'/social/portfolio.png', width: 1200, height: 630, alt: 'Tengku Yusoff — Full-Stack & Mobile App Developer' }], url: origin+route(lang, section) } : {}) },
    twitter: { card: origin ? 'summary_large_image' : 'summary', title, description: page.description, ...(origin ? { images: [origin+'/social/portfolio.png'] } : {}) }
  };
}
