export interface Project {
  name: string;
  description: { el: string; en: string };
  tags: string[];
  url?: string;
  linkLabel?: { el: string; en: string };
}

export interface Category {
  slug: string;
  icon: string;
  title: { el: string; en: string };
  short: { el: string; en: string };
  description: { el: string; en: string };
  highlights: { el: string[]; en: string[] };
  tech: string[];
  projects: Project[];
  extraLink?: { href: string; label: { el: string; en: string } };
}

export const categories: Category[] = [
  {
    slug: 'repairs',
    icon: 'wrench',
    title: { el: 'Service Ηλεκτρονικών', en: 'Electronics Repair' },
    short: {
      el: 'Επισκευές υπολογιστών, λάπτοπ και κινητών, με επίσκεψη στον χώρο σας.',
      en: 'Computer, laptop and phone repairs, on-site at your place.',
    },
    description: {
      el: 'Αναλαμβάνω επισκευές σε υπολογιστές, λάπτοπ, κινητά και tablets. Έρχομαι σε σπίτι ή επιχείρηση, κάνω δωρεάν διάγνωση και σας δίνω τιμή πριν ξεκινήσω. Ιδανικό για όσους δεν μπορούν να μετακινήσουν τη συσκευή τους ή θέλουν γρήγορη εξυπηρέτηση.',
      en: 'I repair computers, laptops, phones and tablets. I come to your home or business, diagnose for free and give you a price before starting. Ideal if you cannot move your device or need fast service.',
    },
    highlights: {
      el: ['Επίσκεψη σε σπίτι ή επιχείρηση', 'Δωρεάν διάγνωση βλάβης', 'Εγγύηση 30 ημερών', 'Γρήγορη παράδοση 24–48 ωρών'],
      en: ['Home or business visit', 'Free fault diagnosis', '30-day warranty', 'Fast 24–48h turnaround'],
    },
    tech: ['Hardware', 'Windows', 'Δίκτυα', 'Ανάκτηση δεδομένων'],
    projects: [
      {
        name: 'Επισκευή υπολογιστών',
        description: { el: 'Διάγνωση και επισκευή desktop & all-in-one, αντικατάσταση εξαρτημάτων.', en: 'Diagnosis and repair of desktops and all-in-ones, component replacement.' },
        tags: ['από 30€'],
      },
      {
        name: 'Επισκευή λάπτοπ',
        description: { el: 'Οθόνη, πληκτρολόγιο, μπαταρία, μητρική, αναβάθμιση δίσκου & RAM.', en: 'Screen, keyboard, battery, motherboard, storage & RAM upgrades.' },
        tags: ['από 40€'],
      },
      {
        name: 'Επισκευή κινητών & tablets',
        description: { el: 'Αλλαγή οθόνης, μπαταρίας και θύρας φόρτισης.', en: 'Screen, battery and charging port replacement.' },
        tags: ['από 25€'],
      },
      {
        name: 'Καθαρισμός ιών & malware',
        description: { el: 'Αφαίρεση ιών και ανεπιθύμητου λογισμικού, ενίσχυση ασφάλειας.', en: 'Virus and malware removal, system hardening.' },
        tags: ['από 35€'],
      },
      {
        name: 'Ανάκτηση δεδομένων',
        description: { el: 'Ανάκτηση αρχείων από HDD, SSD, USB και κάρτες μνήμης.', en: 'File recovery from HDDs, SSDs, USB drives and memory cards.' },
        tags: ['από 50€'],
      },
      {
        name: 'Συντήρηση & αναβάθμιση',
        description: { el: 'Καθαρισμός, αναβάθμιση RAM/SSD και βελτιστοποίηση επιδόσεων.', en: 'Cleaning, RAM/SSD upgrades and performance tuning.' },
        tags: ['από 20€'],
      },
    ],
  },
  {
    slug: 'websites',
    icon: 'code',
    title: { el: 'Κατασκευή Ιστοσελίδων', en: 'Website Development' },
    short: {
      el: 'Σύγχρονες, γρήγορες ιστοσελίδες για επιχειρήσεις — από σελίδα παρουσίασης μέχρι e-shop.',
      en: 'Modern, fast websites for businesses — from presentation pages to online stores.',
    },
    description: {
      el: 'Σχεδιάζω και κατασκευάζω ιστοσελίδες στα μέτρα κάθε επιχείρησης: επαγγελματική εμφάνιση, responsive σε κινητά, γρήγορη φόρτωση και βελτιστοποίηση για Google. Αναλαμβάνω τα πάντα — hosting, domain, email και υποστήριξη μετά την παράδοση.',
      en: 'I design and build websites tailored to each business: professional look, mobile responsive, fast loading and SEO-ready. I handle everything — hosting, domain, email and post-launch support.',
    },
    highlights: {
      el: ['Σχεδιασμός στα μέτρα σας', 'Τέλεια εμφάνιση σε κάθε οθόνη', 'SEO & ταχύτητα', 'e-Shop & online κρατήσεις', 'Hosting, domain & email', 'Υποστήριξη μετά την παράδοση'],
      en: ['Custom design', 'Perfect on every screen', 'SEO & speed', 'e-Shop & online bookings', 'Hosting, domain & email', 'Post-launch support'],
    },
    tech: ['Astro', 'Vue', 'TypeScript', 'Cloudflare', 'Supabase', 'Firebase'],
    projects: [
      {
        name: 'ViviNails',
        description: { el: 'Studio περιποίησης νυχιών με online ραντεβού, υπηρεσίες και gallery.', en: 'Nail studio with online booking, services and gallery.' },
        tags: ['Astro', 'Cloudflare'],
        url: 'https://www.vivinails.workers.dev/',
      },
      {
        name: 'Ρίτα Σαμοθράκη — Μεσιτικό Γραφείο',
        description: { el: 'Αγγελίες ακινήτων με φίλτρα, κατηγορίες και 6 γλώσσες.', en: 'Real estate listings with filters, categories and 6 languages.' },
        tags: ['Astro', 'Supabase', 'i18n'],
        url: 'https://realestate-samothraki.gr/',
      },
      {
        name: 'Online Menu',
        description: { el: 'Ψηφιακό μενού καφετέριας με κατηγορίες και live ενημέρωση.', en: 'Digital café menu with categories and live updates.' },
        tags: ['Web app', 'Firebase'],
        url: 'https://online-menu-de5ed.web.app/',
      },
      {
        name: 'AutoMotoLog — Landing',
        description: { el: 'Σελίδα παρουσίασης Android εφαρμογής με EL/EN και Google Play.', en: 'Android app landing page with EL/EN and Google Play.' },
        tags: ['Landing', 'i18n'],
        url: 'https://automotolog.github.io/',
      },
      {
        name: 'EazyFix',
        description: { el: 'Η δική μας σελίδα: portfolio, πρότυπα ιστοσελίδων και admin panel.', en: 'This very site: portfolio, website templates and admin panel.' },
        tags: ['Astro', 'Cloudflare', 'D1'],
        url: '/',
      },
      {
        name: 'Διαχείριση εκκρεμών πωλήσεων',
        description: { el: 'Dashboard μεσιτικού γραφείου για εκκρεμείς πωλήσεις.', en: 'Real estate dashboard for pending sales.' },
        tags: ['Dashboard', 'Web'],
        url: 'https://github.com/hackerw32/ekremis-poliseis',
      },
    ],
    extraLink: { href: '/templates', label: { el: 'Δείτε έτοιμα πρότυπα με live demo', en: 'Browse ready templates with live demo' } },
  },
  {
    slug: 'android-apps',
    icon: 'smartphone',
    title: { el: 'Εφαρμογές Android', en: 'Android Apps' },
    short: {
      el: 'Native εφαρμογές Android με Kotlin — από tracking εφαρμογές μέχρι εργαλεία παραγωγικότητας.',
      en: 'Native Android apps in Kotlin — from trackers to productivity tools.',
    },
    description: {
      el: 'Αναπτύσσω native εφαρμογές Android με Kotlin και Jetpack Compose. Καθαρό UI, offline λειτουργία, ειδοποιήσεις και δημοσίευση στο Google Play. Κάποιες από τις εφαρμογές μου είναι διαθέσιμες δημόσια στο Play Store.',
      en: 'I build native Android apps with Kotlin and Jetpack Compose. Clean UI, offline support, notifications and Google Play publishing. Some of my apps are publicly available on the Play Store.',
    },
    highlights: {
      el: ['Native Kotlin & Jetpack Compose', 'Δημοσίευση στο Google Play', 'Offline λειτουργία & συγχρονισμός', 'Material Design UI'],
      en: ['Native Kotlin & Jetpack Compose', 'Google Play publishing', 'Offline mode & sync', 'Material Design UI'],
    },
    tech: ['Kotlin', 'Jetpack Compose', 'Room', 'Firebase'],
    projects: [
      {
        name: 'AutoMotoLog',
        description: { el: 'Tracker συντήρησης οχήματος: service, ΚΤΕΟ, ασφάλεια, κόστη και υποστήριξη EV.', en: 'Vehicle maintenance tracker: service, MOT, insurance, costs and EV support.' },
        tags: ['Kotlin', 'Google Play'],
        url: 'https://play.google.com/store/apps/details?id=com.automotolog.app',
        linkLabel: { el: 'Google Play', en: 'Google Play' },
      },
      {
        name: 'RetroCam 36',
        description: { el: '“Slow photography”: 36 λήψεις ανά φιλμ, χωρίς preview, με χειροκίνητο φιλμ.', en: '“Slow photography”: 36 exposures per roll, no preview, manual film feel.' },
        tags: ['Kotlin', 'Camera'],
      },
      {
        name: 'DeepNotes',
        description: { el: 'Έξυπνο notepad που οργανώνει σημειώσεις και θυμάται πράγματα για εσάς.', en: 'Smart notepad that organizes notes and remembers facts for you.' },
        tags: ['Kotlin', 'AI'],
      },
      {
        name: 'Delivery Organizer',
        description: { el: 'Οργάνωση παραγγελιών και διανομών για μικρές επιχειρήσεις.', en: 'Order and delivery organization for small businesses.' },
        tags: ['Kotlin'],
      },
      {
        name: 'Agendix',
        description: { el: 'Εφαρμογή ατζέντας και καθημερινού προγραμματισμού.', en: 'Agenda and daily planning app.' },
        tags: ['Kotlin'],
      },
    ],
  },
  {
    slug: 'android-games',
    icon: 'gamepad',
    title: { el: 'Παιχνίδια Android', en: 'Android Games' },
    short: {
      el: '2D παιχνίδια Android — puzzle, action, roguelike, tower defense και idle.',
      en: '2D Android games — puzzle, action, roguelike, tower defense and idle.',
    },
    description: {
      el: 'Σχεδιάζω και προγραμματίζω ολόκληρα παιχνίδια για Android σε Kotlin, με custom γραφικά και ήχο. Από puzzle και idle μέχρι action και roguelike, με procedurally generated levels. Έχω επίσης φτιάξει web παιχνίδια και μια μηχανή δημιουργίας παιχνιδιών με AI.',
      en: 'I design and code complete Android games in Kotlin, with custom graphics and sound. From puzzle and idle to action and roguelike, with procedurally generated levels. I have also built web games and an AI game-creation engine.',
    },
    highlights: {
      el: ['Ολοκληρωμένα παιχνίδια σε Kotlin', 'Custom γραφικά & ήχος', 'Procedural levels', 'Idle, puzzle, action, roguelike'],
      en: ['Complete games in Kotlin', 'Custom graphics & sound', 'Procedural levels', 'Idle, puzzle, action, roguelike'],
    },
    tech: ['Kotlin', 'Canvas', 'Jetpack Compose', 'Game design'],
    projects: [
      {
        name: 'ChromaFall',
        description: { el: 'Πολύχρωμο puzzle πτώσης blocks με chains και combos.', en: 'Colorful falling-block puzzle with chains and combos.' },
        tags: ['Puzzle', 'Android'],
      },
      {
        name: 'Vector Buster',
        description: { el: 'Idle neon tower-defense, 100% code-generated graphics.', en: 'Idle neon tower-defense, fully code-generated graphics.' },
        tags: ['Tower defense', 'Android'],
      },
      {
        name: 'Atelioto',
        description: { el: 'Endless roguelike dungeon crawler με procedural πίστες.', en: 'Endless roguelike dungeon crawler with procedural levels.' },
        tags: ['Roguelike', 'Android'],
      },
      {
        name: 'MOBA Master',
        description: { el: 'Top-down idle MOBA manager για Android.', en: 'Top-down idle MOBA manager for Android.' },
        tags: ['Idle', 'Android'],
      },
      {
        name: 'God of Nose: Sneeze and Thunder',
        description: { el: '2D action παιχνίδι με Jetpack Compose.', en: '2D action game built with Jetpack Compose.' },
        tags: ['Action', 'Android'],
      },
      {
        name: 'Nemesis Strike',
        description: { el: 'Action παιχνίδι για Android.', en: 'Action game for Android.' },
        tags: ['Action', 'Android'],
      },
      {
        name: 'Tilted Defence',
        description: { el: 'Tower defense παιχνίδι για Android.', en: 'Tower defense game for Android.' },
        tags: ['Tower defense', 'Android'],
      },
      {
        name: 'O tee mou',
        description: { el: 'AI παιχνίδι αγορών με αποτελέσματα από AI μοντέλα.', en: 'AI shopping game with results from AI models.' },
        tags: ['Web game', 'AI'],
        url: 'https://chook-games.github.io/oteemou/',
      },
      {
        name: 'Lingo Greek',
        description: { el: 'Διαδικτυακό παιχνίδι λέξεων στα ελληνικά, single & multiplayer.', en: 'Greek word game for the web, single & multiplayer.' },
        tags: ['Web game', 'Puzzle'],
        url: 'https://chook-games.github.io/lingo-greek/',
      },
      {
        name: 'Χάος RPG',
        description: { el: 'RPG εμπνευσμένο από το Torn City, με Vue 3 + Pinia.', en: 'RPG inspired by Torn City, built with Vue 3 + Pinia.' },
        tags: ['Web game', 'RPG'],
        url: 'https://xaos-rpg.github.io/live/',
      },
      {
        name: 'Empire Forge, Die Trying, Change Spotter',
        description: { el: 'Σειρά web παιχνιδιών στο στούντιο Chook Games.', en: 'A series of web games from the Chook Games studio.' },
        tags: ['Web games'],
        url: 'https://github.com/chook-games?tab=repositories',
        linkLabel: { el: 'Όλα τα παιχνίδια', en: 'All games' },
      },
    ],
  },
  {
    slug: 'windows-apps',
    icon: 'monitor',
    title: { el: 'Εφαρμογές Windows & Python', en: 'Windows & Python Apps' },
    short: {
      el: 'Εργαλεία για Windows και Python scripts που λύνουν καθημερινά προβλήματα.',
      en: 'Windows tools and Python scripts that solve everyday problems.',
    },
    description: {
      el: 'Φτιάχνω εφαρμογές και εργαλεία για Windows με Python: backup, επεξεργασία βίντεο και εικόνας, μετατροπή αρχείων, αυτοματοποιήσεις και εργαλεία AI. Επίσης κατασκευάζω μικρά hardware projects με ESP32 και Raspberry Pi Pico.',
      en: 'I build Windows apps and Python tools: backup, video and image processing, file conversion, automation and AI tools. I also build small hardware projects with ESP32 and Raspberry Pi Pico.',
    },
    highlights: {
      el: ['Python εργαλεία & αυτοματισμοί', 'Backup & διαχείριση αρχείων', 'Επεξεργασία βίντεο/εικόνας/PDF', 'AI εργαλεία & τοπικά μοντέλα'],
      en: ['Python tools & automation', 'Backup & file management', 'Video/image/PDF processing', 'AI tools & local models'],
    },
    tech: ['Python', 'Windows', 'AI/LLM', 'ESP32', 'Raspberry Pi'],
    projects: [
      {
        name: 'Smart Backup',
        description: { el: 'Έξυπνο εργαλείο δημιουργίας αντιγράφων ασφαλείας.', en: 'Smart backup tool.' },
        tags: ['Backup'],
        url: 'https://github.com/hackerw32/smart-backup',
      },
      {
        name: 'Slideshow Video Generator',
        description: { el: 'Δημιουργία βίντεο slideshow από εικόνες.', en: 'Create slideshow videos from images.' },
        tags: ['Video'],
        url: 'https://github.com/hackerw32/slideshow-video-genarator',
      },
      {
        name: 'Easy Video & Audio Editor',
        description: { el: 'Απλός editor για γρήγορη κοπή και επεξεργασία.', en: 'Simple editor for quick cutting and editing.' },
        tags: ['Video', 'Audio'],
        url: 'https://github.com/hackerw32/easy-video-audio-editor',
      },
      {
        name: 'PDF Tools',
        description: { el: 'Συμπίεση, επεξεργασία σελίδων και εικόνες σε PDF.', en: 'Compress, edit pages and images to PDF.' },
        tags: ['PDF'],
        url: 'https://github.com/hackerw32/pdf-tools',
      },
      {
        name: 'Image Tools',
        description: { el: 'Συλλογή εργαλείων επεξεργασίας εικόνας.', en: 'A collection of image editing tools.' },
        tags: ['Images'],
        url: 'https://github.com/hackerw32/image-tools',
      },
      {
        name: 'Greenscreen Photo Remover',
        description: { el: 'Αφαίρεση φόντου / greenscreen από φωτογραφίες.', en: 'Remove greenscreen / background from photos.' },
        tags: ['AI', 'Images'],
        url: 'https://github.com/hackerw32/greenscreen-photo-remover',
      },
      {
        name: 'Transcriber',
        description: { el: 'Μετατροπή ομιλίας σε κείμενο.', en: 'Speech to text transcription.' },
        tags: ['AI', 'Audio'],
        url: 'https://github.com/hackerw32/transcriber',
      },
      {
        name: 'Local AI Launcher',
        description: { el: 'Εύκολος launcher για τοπικά μοντέλα Ollama με CLI εργαλείο.', en: 'Easy launcher for local Ollama models with a CLI tool.' },
        tags: ['AI', 'LLM'],
        url: 'https://github.com/hackerw32/Local-Ai-launcher',
      },
      {
        name: 'Brochure Creator',
        description: { el: 'Δημιουργία φυλλαδίων και διαφημιστικών.', en: 'Create brochures and promotional material.' },
        tags: ['Design'],
        url: 'https://github.com/hackerw32/brochure-creator',
      },
      {
        name: 'Inventory Helper',
        description: { el: 'Εργαλείο διαχείρισης αποθέματος.', en: 'Inventory management tool.' },
        tags: ['Business'],
        url: 'https://github.com/hackerw32/Inventory-helper',
      },
      {
        name: 'ESP32 PC Hardware Monitor',
        description: { el: 'Φυσικό dashboard με ESP32-S3 και OLED για στατιστικά PC.', en: 'Physical dashboard with ESP32-S3 and OLED for PC stats.' },
        tags: ['Hardware', 'ESP32'],
        url: 'https://github.com/hackerw32/ESP32-PC-Hardware-Monitor',
      },
      {
        name: 'Raspberry Pi Pico Battery BMS',
        description: { el: 'Project μπαταρίας/BMS με Raspberry Pi Pico.', en: 'Battery/BMS project with Raspberry Pi Pico.' },
        tags: ['Hardware'],
        url: 'https://github.com/hackerw32/raspberry-pi-pico-battery-bms-',
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
