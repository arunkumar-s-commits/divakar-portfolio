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
  { from: 0.55, to: 0.72, text: 'These days… I decode data & uncover insights.' },
  { from: 0.72, to: 0.905, text: 'AI & Data Science Specialist. Shall we begin?' },
];

export const STATS = [
  { value: 7.7, suffix: '', label: 'B.Tech CGPA' },
  { value: 83, suffix: '%', label: 'HSC Score' },
  { value: 2, suffix: '', label: 'Internships' },
  { value: 2, suffix: '', label: 'Certifications' },
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
        note: 'Completed higher secondary education with 83%, establishing a strong analytical and quantitative foundation.',
        still: '/stills/pull.jpg',
      },
    ],
  },
  {
    label: 'Season 2',
    name: 'The Engineering Arc',
    years: '2023 – 2027',
    episodes: [
      {
        title: 'B.Tech in Artificial Intelligence & Data Science',
        where: 'SNS College of Engineering, Coimbatore, India',
        note: 'CGPA 7.7 · Focused on Python, SQL, Power BI, DBMS, Data Analytics, and solving real-world business problems.',
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
];
