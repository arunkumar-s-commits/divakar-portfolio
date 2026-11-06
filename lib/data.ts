export const PROFILE = {
  name: 'Hatake Kakashi',
  realName: 'Dhivakar B',
  first: 'DHIVAKAR',
  last: 'B',
  title: 'KAKASHI',
  subtitle: 'UNMASKED',
  role: 'AI & Data Science Specialist',
  summary:
    'Motivated B.Tech Artificial Intelligence and Data Science student with strong skills in SQL, Python, Power BI, Excel, and data analysis. Seeking an entry-level opportunity to apply my technical and analytical skills to solve business problems, deliver data-driven insights, and contribute effectively to client-focused projects while continuously developing my professional and technical expertise.',
  email: 'dhivakarsharma520@gmail.com',
  github: 'https://github.com/dhivakar-520',
  linkedin: 'https://linkedin.com/in/dhivakarad',
  resume: '/resume.pdf',
  phone: '+91 9080138774',
  location: 'Aruppukottai, Tamil Nadu, India',
};

export type ProfileId = 'recruiter' | 'developer' | 'hackathon' | 'browsing';
export const VIEWERS: { id: ProfileId; name: string; color: string; icon: 'eye' | 'kunai' | 'leaf' | 'shuriken'; line: string }[] = [
  { id: 'recruiter', name: 'Recruiter', color: '#e50914', icon: 'eye', line: 'Looking for your next AI & Data Analytics hire? You picked the right show.' },
  { id: 'developer', name: 'Data / Dev Squad', color: '#2f6fed', icon: 'kunai', line: 'Fellow developer — explore dashboards, data models and IoT code on GitHub.' },
  { id: 'hackathon', name: 'Innovation Team', color: '#f5b301', icon: 'shuriken', line: 'Need an analytical thinker who delivers data-driven solutions? Let’s connect.' },
  { id: 'browsing', name: 'Just Browsing', color: '#1db954', icon: 'leaf', line: 'Grab some popcorn. The data story unmasks in a few scrolls.' },
];

// Subtitles shown while the hero "plays" (keyed by hero scroll progress)
export const SUBTITLES: { from: number; to: number; text: string; sfx?: boolean }[] = [
  { from: 0.05, to: 0.22, text: 'Everyone keeps asking what’s under the mask.' },
  { from: 0.22, to: 0.38, text: 'Fine. Just this once.' },
  { from: 0.38, to: 0.55, text: 'No more missions. No more shadows.' },
  { from: 0.55, to: 0.72, text: 'These days… I decode data & architect intelligence.' },
  { from: 0.72, to: 0.905, text: 'AI & Data Science Specialist. Shall we begin?' },
];

export const STATS = [
  { value: 7.7, suffix: '', label: 'B.Tech CGPA' },
  { value: 83, suffix: '%', label: 'HSC Score' },
  { value: 2, suffix: '', label: 'Internships' },
  { value: 2, suffix: '', label: 'Certifications' },
];

// Shinobi Dossier (Konohagakure Ninja Registration Card)
export const NINJA_DOSSIER = {
  regNumber: '#02025-DB',
  rank: 'Special Jōnin (特別上忍)',
  division: 'Data Analytics & AI Intelligence Corps',
  village: 'Hidden Leaf Village (SNS Academy)',
  codename: 'Copy Ninja of Data',
  signatureJutsu: '千鳥 · Data Chidori (Lightning Analytics)',
  natures: [
    { name: 'Lightning (Raiton)', kanji: '雷', desc: 'High-speed Python automation & SQL query execution', color: '#54a0ff' },
    { name: 'Water (Suiton)', kanji: '水', desc: 'Fluid Power BI & Tableau visual storytelling', color: '#00d2d3' },
    { name: 'Earth (Doton)', kanji: '土', desc: 'Immutable DBMS schemas & relational data structures', color: '#ff9f43' },
    { name: 'Wind (Fūton)', kanji: '風', desc: 'Microsoft Fabric cloud lakehouse pipelines', color: '#10ac84' },
  ],
  radar: [
    { stat: 'Ninjutsu (Algorithms & Coding)', score: 94, max: 100 },
    { stat: 'Genjutsu (Visualization & UI/UX)', score: 96, max: 100 },
    { stat: 'Intelligence (EDA & Statistical Thinking)', score: 98, max: 100 },
    { stat: 'Taijutsu (Speed & Execution)', score: 91, max: 100 },
    { stat: 'Chakra Control (Cloud & Fabric ETL)', score: 93, max: 100 },
    { stat: 'Tactical Adaptability (Problem Solving)', score: 95, max: 100 },
  ],
};

// 1,000 Jutsu Codex (Data & AI Special Techniques)
export const JUTSU_LIST = [
  {
    id: 'sharingan-eda',
    name: 'Sharingan: Pattern Insight',
    kanji: '写輪眼 · 洞察',
    rank: 'S-Rank',
    chakra: 'Visual Dōjutsu',
    icon: '👁️',
    summary: 'Instantly identifies hidden correlations, feature distributions, and anomalous variance across millions of data points before training begins.',
    tech: ['Python', 'EDA', 'Feature Engineering', 'Statistical Modeling'],
    seal: 'Tiger → Hare → Dragon',
  },
  {
    id: 'chidori-sql',
    name: 'Chidori: Lightning Query',
    kanji: '千鳥 · 雷速クエリ',
    rank: 'A-Rank',
    chakra: 'Lightning (Raiton)',
    icon: '⚡',
    summary: 'A concentrated surge of high-performance SQL optimization that pierces through nested tables and complex relational schemas in single-digit milliseconds.',
    tech: ['SQL', 'DBMS Fundamentals', 'Index Optimization', 'Window Functions'],
    seal: 'Ox → Rabbit → Monkey',
  },
  {
    id: 'kamui-fabric',
    name: 'Kamui: Dimensional Cloud Lakehouse',
    kanji: '神威 · 次元転送',
    rank: 'S-Rank',
    chakra: 'Space-Time',
    icon: '🌀',
    summary: 'Teleports raw enterprise telemetry into structured Microsoft Fabric lakehouses, unifying disparate sources with zero data loss.',
    tech: ['Microsoft Fabric (DP-600)', 'Lakehouse ETL', 'Cloud Architecture'],
    seal: 'Dragon → Ram → Tiger',
  },
  {
    id: 'rasengan-powerbi',
    name: 'Rasengan: Visual Vortex',
    kanji: '螺旋丸 · 視覚的渦',
    rank: 'A-Rank',
    chakra: 'Shape Manipulation',
    icon: '🔮',
    summary: 'Compacts dense multi-dimensional business matrices into high-impact Power BI and Tableau dashboards for effortless executive decision making.',
    tech: ['Power BI', 'Tableau', 'DAX Measures', 'KPI Dashboards'],
    seal: 'Concentration of Pure Chakra',
  },
  {
    id: 'doton-dbms',
    name: 'Earth Style: Mud Wall Architecture',
    kanji: '土遁 · 土流壁',
    rank: 'B-Rank',
    chakra: 'Earth (Doton)',
    icon: '🧱',
    summary: 'Erects an unbreakable barrier of relational data integrity with strict primary/foreign constraints, ACID compliance, and schema security.',
    tech: ['Relational DBMS', 'Normalization', 'Data Integrity', 'Schema Design'],
    seal: 'Tiger → Snake → Boar',
  },
  {
    id: 'kage-bunshin-iot',
    name: 'Shadow Clone: IoT Surveillance Network',
    kanji: '影分身 · 遠隔監視',
    rank: 'A-Rank',
    chakra: 'Multi-Tasking',
    icon: '📡',
    summary: 'Deploys autonomous sensor clones across physical locations to monitor environmental fill-levels and stream real-time operational alerts.',
    tech: ['IoT Systems', 'Ultrasonic Sensors', 'Real-time Alerts', 'Hardware Ops'],
    seal: 'Cross Seal (Ten)',
  },
];

export const TOP10 = [
  { name: 'Python', genre: 'Language', hue: 48 },
  { name: 'SQL', genre: 'Database', hue: 205 },
  { name: 'Power BI', genre: 'Analytics', hue: 45 },
  { name: 'Data Analysis (EDA)', genre: 'Core', hue: 195 },
  { name: 'Tableau', genre: 'Analytics', hue: 215 },
  { name: 'Microsoft Fabric', genre: 'Cloud', hue: 270 },
  { name: 'Oracle APEX', genre: 'Cloud', hue: 12 },
  { name: 'Excel', genre: 'Analytics', hue: 140 },
  { name: 'IoT Systems', genre: 'Hardware', hue: 120 },
  { name: 'HTML & CSS', genre: 'Frontend', hue: 30 },
];

export const SKILL_GENRES = [
  { name: 'Programming', items: ['Python', 'SQL', 'HTML', 'CSS'] },
  { name: 'Analytics & BI', items: ['Power BI', 'Tableau', 'Excel', 'Data Analysis (EDA)', 'Actionable Insights', 'Dashboard Design'] },
  { name: 'Databases', items: ['SQL', 'DBMS Fundamentals', 'Relational Schemas', 'Query Analysis'] },
  { name: 'Cloud & AI', items: ['Microsoft Fabric (DP-600)', 'Oracle APEX Cloud', 'AI Tools', 'Predictive Modeling'] },
  { name: 'IoT & Systems', items: ['IoT Systems', 'Ultrasonic Sensors', 'Real-time Alerts', 'Hardware Interfacing'] },
  { name: 'Soft Skills', items: ['Analytical Thinking', 'Problem-Solving', 'Communication', 'Teamwork', 'Time Management', 'Adaptability'] },
];

export const EPISODES = [
  {
    id: 'agri-buddy',
    ep: 1,
    name: 'Agri Buddy — Web Development',
    tagline: 'Surfacing market price data for direct farmer selling decisions.',
    still: '/stills/masked.jpg',
    tint: '#e50914',
    rank: 'S-Rank',
    match: 98,
    url: 'https://github.com/dhivakar-520',
    desc: 'Built a farmer-facing web application that surfaces market price data to support informed selling decisions, helping users act on information directly rather than through intermediaries — directly analogous to translating data into client-facing action.',
    genres: ['Web Development', 'AgriTech', 'Data Analytics'],
    tech: ['Python', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Market APIs', 'Data Analysis', 'Responsive Design'],
  },
  {
    id: 'garbage-monitoring',
    ep: 2,
    name: 'Garbage Monitoring System — IoT',
    tagline: 'Ultrasonic sensor intelligence for smart waste collection.',
    still: '/stills/face.jpg',
    tint: '#2f6fed',
    rank: 'S-Rank',
    match: 96,
    url: 'https://github.com/dhivakar-520',
    desc: 'Built an IoT system using ultrasonic sensors to collect fill-level data from garbage bins and trigger real-time alerts to authorities, improving collection efficiency through data-driven operations.',
    genres: ['IoT', 'Smart Systems', 'Automation'],
    tech: ['IoT Architecture', 'Ultrasonic Sensors', 'Embedded Systems', 'Alert Automation', 'Data-driven Operations', 'Hardware Interfacing'],
  },
  {
    id: 'civiceye',
    ep: 3,
    name: 'CivicEye — Web & Mobile App',
    tagline: 'AI-based civic issue reporting with GPS & media intelligence.',
    still: '/stills/kunai.jpg',
    tint: '#f5b301',
    rank: 'S-Rank',
    match: 97,
    url: 'https://github.com/dhivakar-520',
    desc: 'Developed a mobile & web app for civic issue reporting with GPS tagging, media upload, real-time status tracking, and AI-based categorization, improving how issue data flows between citizens and authorities.',
    genres: ['Mobile & Web', 'AI Categorization', 'CivicTech'],
    tech: ['Mobile & Web App', 'AI Categorization', 'GPS Tagging', 'Media Upload', 'Real-time Tracking', 'SQL Database', 'REST APIs'],
  },
  {
    id: 'bi-telemetry',
    ep: 4,
    name: 'Real-Time BI Telemetry Radar',
    tagline: 'Interactive Power BI & Tableau dashboards transforming enterprise data.',
    still: '/stills/pull.jpg',
    tint: '#10ac84',
    rank: 'A-Rank',
    match: 95,
    url: 'https://github.com/dhivakar-520',
    desc: 'Engineered high-density analytical dashboards during industry internship at Osiz Technologies, evaluating business KPIs, trend anomalies, and translating raw SQL data feeds into actionable executive roadmaps.',
    genres: ['Business Intelligence', 'Data Modeling', 'KPI Analytics'],
    tech: ['Power BI', 'Tableau', 'SQL Server', 'Data Modeling', 'DAX Measures', 'Executive Reporting'],
  },
  {
    id: 'apex-cloud',
    ep: 5,
    name: 'Oracle APEX Cloud Enterprise System',
    tagline: 'Rapid cloud deployment with secure relational database architecture.',
    still: '/stills/vest.jpg',
    tint: '#ee5253',
    rank: 'A-Rank',
    match: 94,
    url: 'https://github.com/dhivakar-520',
    desc: 'Architected enterprise cloud modules leveraging Oracle APEX Cloud Developer credentials, optimizing complex schema interactions, stored routines, and responsive role-based access portals.',
    genres: ['Cloud Architecture', 'Oracle APEX', 'Enterprise DB'],
    tech: ['Oracle APEX', 'PL/SQL', 'Cloud Security', 'Relational Schemas', 'Role-Based Access'],
  },
];

export const AWARDS = [
  { laurel: 'MICROSOFT CERTIFIED', title: 'Fabric Analytics Engineer', sub: 'Associate (DP-600)' },
  { laurel: 'ORACLE CERTIFIED', title: 'APEX Cloud Developer', sub: 'Certified Professional' },
  { laurel: 'INDUSTRY EXPERIENCE', title: 'Data Analytics & Web Dev', sub: 'Osiz Technologies · Kevell Guru' },
];

export const CERTS = [
  { by: 'Microsoft', title: 'Fabric Analytics Engineer Associate (DP-600)', hue: 215 },
  { by: 'Oracle', title: 'APEX Cloud Developer Certified Professional', hue: 0 },
  { by: 'Osiz Technologies', title: 'Data Analytics Internship (Power BI & Tableau)', hue: 140 },
  { by: 'Kevell Guru', title: 'Web Development Internship', hue: 45 },
  { by: 'SNS College of Engineering', title: 'B.Tech AI & Data Science (CGPA 7.7)', hue: 195 },
  { by: 'SBK Boys Higher Secondary', title: 'Higher Secondary Certificate (83%)', hue: 50 },
];

export const SEASONS = [
  {
    label: 'Season 1',
    name: 'The Foundation Arc',
    years: '2022 – 2023',
    episodes: [
      {
        title: 'Higher Secondary Certificate (HSC) — 83%',
        where: 'SBK Boys Higher Secondary School, Aruppukottai, Tamil Nadu',
        note: 'Completed higher secondary education with 83%, establishing a strong analytical and quantitative foundation in mathematics and sciences.',
        still: '/stills/pull.jpg',
      },
    ],
  },
  {
    label: 'Season 2',
    name: 'The Academy Arc',
    years: '2023 – 2027',
    episodes: [
      {
        title: 'B.Tech in Artificial Intelligence & Data Science',
        where: 'SNS College of Engineering, Coimbatore, India',
        note: 'CGPA 7.7 · Focused on Python, SQL, Power BI, DBMS, Data Analytics, and solving real-world business problems through predictive intelligence.',
        still: '/stills/vest.jpg',
      },
    ],
  },
  {
    label: 'Season 3',
    name: 'The Industry Arc',
    years: '2024 – 2025',
    episodes: [
      {
        title: 'Web Development Internship',
        where: 'Kevell Guru | Madurai (2024–2025)',
        note: 'Gained practical experience building responsive web applications, strengthening the ability to understand and explain platform features clearly.',
        still: '/stills/hand.jpg',
      },
      {
        title: 'Data Analytics Internship',
        where: 'Osiz Technologies Pvt. Ltd. | Madurai (2025)',
        note: 'Gained hands-on experience in SQL, Power BI, and Tableau by analyzing datasets, creating interactive dashboards, and generating data-driven insights using real-time business data.',
        still: '/stills/face.jpg',
      },
    ],
  },
  {
    label: 'Season 4',
    name: 'The Mastery & Cloud Arc',
    years: '2025 – Present',
    episodes: [
      {
        title: 'Microsoft Certified: Fabric Analytics Engineer (DP-600)',
        where: 'Microsoft Worldwide Credentialing',
        note: 'Demonstrated mastery in end-to-end lakehouse architecture, data ingestion, dimensional modeling, and enterprise data analytics.',
        still: '/stills/masked.jpg',
      },
      {
        title: 'Oracle APEX Cloud Developer Certified Professional',
        where: 'Oracle Cloud Infrastructure',
        note: 'Certified in architecting and deploying rapid cloud-native enterprise database applications with modern SQL and cloud security.',
        still: '/stills/kunai.jpg',
      },
    ],
  },
];

// The Shinobi Code (Anime Developer Philosophy)
export const SHINOBI_CREED = [
  {
    kanji: '真実',
    title: 'The Truth in Raw Data',
    quote: 'In the ninja world, those who break the rules are scum, that is true — but those who abandon data-driven truths are worse than scum.',
    author: 'Dhivakar B (Copy Ninja Philosophy)',
    meaning: 'Never force data to fit preconceived biases. Let the numbers dictate the strategy.',
  },
  {
    kanji: '千術',
    title: 'The Master of 1,000 Tools',
    quote: 'A true shinobi does not boast of knowing a thousand weapons; they pick up whatever tool the mission demands — SQL, Python, Power BI, Fabric — and master it effortlessly.',
    author: 'The Copy Ninja Way',
    meaning: 'Language and stack agnostic. Rapidly adapting to whatever framework solves the problem.',
  },
  {
    kanji: '仲間',
    title: 'Protecting the Pipeline',
    quote: 'When production models drift or telemetry runs cold, a shinobi engineer steps forward into the storm and recalibrates the path without hesitation.',
    author: 'Leaf Village Shinobi Rule #25',
    meaning: 'Accountability, resilience, and reliability in real-time mission-critical systems.',
  },
  {
    kanji: '裏裏',
    title: 'Look Beneath the Beneath',
    quote: 'Surface metrics deceive the amateur. The real battle is won in the residuals, the edge cases, and the anomalies that hide in plain sight.',
    author: 'Kakashi Hatake (Teaching Team 7)',
    meaning: 'Rigorous exploratory analysis and deeper intuition behind statistical anomalies.',
  },
];
