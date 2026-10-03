export const site = {
  business: {
    name: 'EazyFix',
    tagline: {
      el: 'Λογισμικό, ιστοσελίδες & επισκευές',
      en: 'Software, websites & repairs',
    },
    description: {
      el: 'Επισκευές ηλεκτρονικών, κατασκευή ιστοσελίδων, εφαρμογές Android και παιχνίδια, εργαλεία για Windows. Ό,τι χρειάζεται τεχνολογία, σε έναν άνθρωπο.',
      en: 'Electronics repair, website development, Android apps and games, Windows tools. Everything tech, from one person.',
    },
    phone: '6971234567',
    email: 'info@eazyfix.gr',
    whatsapp: '6971234567',
    address: { el: 'Σαλαμίνα, Αττική', en: 'Salamina, Greece' },
    hours: {
      el: 'Δευτέρα – Παρασκευή: 09:00 – 18:00 · Σάββατο: 10:00 – 14:00',
      en: 'Monday – Friday: 09:00 – 18:00 · Saturday: 10:00 – 14:00',
    },
  },
  hero: {
    badge: { el: 'Freelance developer & τεχνικός', en: 'Freelance developer & technician' },
    title: { el: 'Φτιάχνω πράγματα που δουλεύουν.', en: 'I build things that work.' },
    titleAccent: { el: 'Από υπολογιστές, μέχρι παιχνίδια.', en: 'From computers to games.' },
    subtitle: {
      el: 'Είμαι ο άνθρωπος πίσω από το EazyFix. Επισκευάζω υπολογιστές, κατασκευάζω ιστοσελίδες, εφαρμογές Android και παιχνίδια, καθώς και εργαλεία για Windows.',
      en: 'I am the person behind EazyFix. I repair computers, build websites, Android apps and games, and Windows tools.',
    },
    primaryCta: { el: 'Δείτε τις δουλειές μου', en: 'See my work' },
    secondaryCta: { el: 'Επικοινωνία', en: 'Contact' },
    stats: [
      { value: '5', label: { el: 'τομείς', en: 'fields' } },
      { value: '30+', label: { el: 'projects', en: 'projects' } },
      { value: '3', label: { el: 'πλατφόρμες', en: 'platforms' } },
    ],
  },
  about: {
    title: { el: 'Ποιος είμαι', en: 'Who I am' },
    lead: {
      el: 'Πολυπράγμων developer & τεχνικός, με έδρα τη Σαλαμίνα.',
      en: 'A hands-on developer & technician based in Salamina, Greece.',
    },
    text: {
      el: 'Ξεκίνησα από τις επισκευές υπολογιστών και σιγά-σιγά επεκτάθηκα στην ανάπτυξη λογισμικού. Σήμερα σχεδιάζω και κατασκευάζω ιστοσελίδες, εφαρμογές Android και παιχνίδια, καθώς και εργαλεία για Windows και Python. Μου αρέσει να λύνω πραγματικά προβλήματα με απλές, γρήγορες λύσεις — και να παραδίδω δουλειές που λειτουργούν σωστά.',
      en: 'I started with computer repairs and gradually expanded into software development. Today I design and build websites, Android apps and games, as well as Windows and Python tools. I enjoy solving real problems with simple, fast solutions — and delivering work that actually works.',
    },
    skills: [
      'HTML / CSS / JavaScript',
      'TypeScript',
      'Astro',
      'Vue',
      'Kotlin / Android',
      'Python',
      'Cloudflare',
      'Supabase',
      'Firebase',
      'Game development',
      'ESP32 / Hardware',
      'AI tools',
    ],
  },
  contact: {
    title: { el: 'Ας συνεργαστούμε', en: "Let's work together" },
    subtitle: {
      el: 'Χρειάζεστε επισκευή, ιστοσελίδα ή εφαρμογή; Στείλτε μου και θα σας απαντήσω σύντομα.',
      en: 'Need a repair, a website or an app? Send me a message and I will get back to you shortly.',
    },
  },
  social: [
    { label: 'GitHub', url: 'https://github.com/hackerw32' },
    { label: 'Chook Games', url: 'https://github.com/chook-games' },
  ],
};

export type Business = typeof site.business;
