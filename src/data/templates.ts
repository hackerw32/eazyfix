export interface TemplateItem {
  name: string;
  desc: string;
  price?: string;
}

export interface TemplateTestimonial {
  name: string;
  text: string;
  rating: number;
}

export interface Template {
  slug: string;
  industry: { el: string; en: string };
  brand: string;
  tagline: string;
  accentIcon: string;
  theme: { primary: string; dark: string; soft: string; accent?: string };
  summary: { el: string; en: string };
  highlights: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroSecondary: string;
  aboutTitle: string;
  aboutText: string;
  aboutPoints: string[];
  offeringTitle: string;
  offering: TemplateItem[];
  gallery: string[];
  testimonials: TemplateTestimonial[];
  contact: { address: string; phone: string; email: string; hours: string };
}

export const templates: Template[] = [
  {
    slug: 'restaurant',
    industry: { el: 'Εστιατόριο', en: 'Restaurant' },
    brand: 'Ελιά',
    tagline: 'Μεσογειακή κουζίνα στον Πειραιά',
    accentIcon: 'utensils',
    theme: { primary: '#c2410c', dark: '#1c1917', soft: '#fff7ed', accent: '#15803d' },
    summary: {
      el: 'Σελίδα εστιατορίου με μενού, κρατήσεις και χάρτη.',
      en: 'Restaurant site with menu, reservations and map.',
    },
    highlights: ['Μενού με τιμές', 'Φόρμα κράτησης', 'Χάρτης & ωράριο'],
    heroTitle: 'Γεύσεις της Μεσογείου, φτιαγμένες με μεράκι',
    heroSubtitle:
      'Φρέσκα υλικά, τοπικές συνταγές και ένα ζεστό περιβάλλον στην καρδιά της πόλης. Κλείστε το τραπέζι σας σήμερα.',
    heroCta: 'Κράτηση τραπεζιού',
    heroSecondary: 'Δείτε το μενού',
    aboutTitle: 'Το εστιατόριό μας',
    aboutText:
      'Από το 2012 σερβίρουμε αγαπημένες μεσογειακές γεύσεις σε ένα φιλόξενο χώρο. Στόχος μας είναι κάθε γεύμα να είναι μια μικρή γιορτή.',
    aboutPoints: ['Φρέσκα τοπικά προϊόντα', 'Άνετος εσωτερικός χώρος', 'Βραδινό με θέα', 'Take away & delivery'],
    offeringTitle: 'Επιλεγμένα πιάτα',
    offering: [
      { name: 'Χωριάτικη σαλάτα', desc: 'Ντομάτα, αγγούρι, φέτα, ελιές, ρίγανη', price: '€7,50' },
      { name: 'Μουσακάς', desc: 'Παραδοσιακός, με μελιτζάνα και μπεσαμέλ', price: '€11,00' },
      { name: 'Ψητό ψάρι ημέρας', desc: 'Φρέσκο ψάρι της ημέρας, λεμόνι & ελαιόλαδο', price: '€16,00' },
      { name: 'Σουτζουκάκια', desc: 'Σμυρνέικα, με σάλτσα ντομάτας και πιλάφι', price: '€12,50' },
      { name: 'Παϊδάκια αρνίσια', desc: 'Σχάρας, με πατάτες και ρίγανη', price: '€14,00' },
      { name: 'Σπιτικό γλυκό', desc: 'Γλυκό ημέρας, ρωτήστε τον σερβιτόρο', price: '€6,00' },
    ],
    gallery: ['Η σάλα', 'Η κουζίνα', 'Εξωτερικός χώρος', 'Επιλεγμένα πιάτα'],
    testimonials: [
      { name: 'Δημήτρης Κ.', text: 'Εξαιρετικό φαγητό και πολύ καλή εξυπηρέτηση. Θα ξανάρθουμε σίγουρα.', rating: 5 },
      { name: 'Ελένη Μ.', text: 'Ο μουσακάς ήταν καταπληκτικός. Όμορφος χώρος και φιλικό προσωπικό.', rating: 5 },
    ],
    contact: {
      address: 'Ακτή Μιαούλη 12, Πειραιάς',
      phone: '210 1234567',
      email: 'info@elia-restaurant.gr',
      hours: 'Τρίτη – Κυριακή: 13:00 – 00:00',
    },
  },
  {
    slug: 'cafe',
    industry: { el: 'Καφετέρια', en: 'Café' },
    brand: 'Karma Coffee',
    tagline: 'Specialty coffee & brunch',
    accentIcon: 'sparkles',
    theme: { primary: '#78350f', dark: '#1a120b', soft: '#fdf6ec', accent: '#d97706' },
    summary: {
      el: 'Καφετέρια με μενού, brunch και online παραγγελίες.',
      en: 'Café site with menu, brunch and online orders.',
    },
    highlights: ['Μενού ροφημάτων', 'Πρόγραμμα brunch', 'Online παραγγελίες'],
    heroTitle: 'Ο καλύτερος καφές της γειτονιάς',
    heroSubtitle:
      'Επιλεγμένοι κόκκοι, γλυκά του πάγκου και ένα brunch που αξίζει. Ένας χώρος για δουλειά, παρέα ή μια στιγμή ησυχίας.',
    heroCta: 'Παραγγείλετε online',
    heroSecondary: 'Δείτε τον κατάλογο',
    aboutTitle: 'Η ιστορία μας',
    aboutText:
      'Ξεκινήσαμε ως μικρό coffee bar και γίναμε το στέκι της γειτονιάς. Ψήνουμε καθημερινά και φτιάχνουμε τα πάντα στο χέρι.',
    aboutPoints: ['Ιδιόκτητο ψήσιμο καφέ', 'Χειροποίητα γλυκά', 'Φιλικό Wi-Fi', 'Φιλικά προς pets'],
    offeringTitle: 'Αγαπημένα',
    offering: [
      { name: 'Espresso', desc: 'Single origin, 30ml', price: '€2,20' },
      { name: 'Cappuccino', desc: 'Διπλό, με πλούσιο αφρό', price: '€3,40' },
      { name: 'Freddo Espresso', desc: 'Παγωμένο, με επιλογή γάλακτος', price: '€3,60' },
      { name: 'Brunch πιάτο', desc: 'Αυγά, μπέικον, τοστ, σαλάτα', price: '€9,50' },
      { name: 'Cheesecake', desc: 'Σπιτικό, με φρούτα εποχής', price: '€6,00' },
    ],
    gallery: ['Ο χώρος', 'Ο πάγκος', 'Brunch', 'Late night'],
    testimonials: [
      { name: 'Σοφία Α.', text: 'Ο καλύτερος freddo και το πιο άνετο spot για δουλειά.', rating: 5 },
      { name: 'Νίκος Π.', text: 'Καταπληκτικό brunch και πολύ ευγενικό προσωπικό.', rating: 5 },
    ],
    contact: {
      address: 'Λεωφ. Δημοκρατίας 34, Πειραιάς',
      phone: '210 7654321',
      email: 'hello@karmacoffee.gr',
      hours: 'Καθημερινά: 07:00 – 23:00',
    },
  },
  {
    slug: 'gym',
    industry: { el: 'Γυμναστήριο', en: 'Gym' },
    brand: 'Iron House',
    tagline: 'Train hard, live strong',
    accentIcon: 'dumbbell',
    theme: { primary: '#65a30d', dark: '#0a0a0a', soft: '#f7fee7', accent: '#eab308' },
    summary: {
      el: 'Γυμναστήριο με προγράμματα, προπονητές και εγγραφή.',
      en: 'Gym site with programs, trainers and sign-up.',
    },
    highlights: ['Προγράμματα & τιμές', 'Personal training', 'Φόρμα εγγραφής'],
    heroTitle: 'Δύναμη, υγεία, αποτέλεσμα',
    heroSubtitle:
      'Σύγχρονος εξοπλισμός, έμπειροι προπονητές και πλάνα για κάθε στόχο. Τα πρώτα σου μαθήματα είναι δωρεάν.',
    heroCta: 'Δωρεάν δοκιμή',
    heroSecondary: 'Δείτε τα προγράμματα',
    aboutTitle: 'Γιατί το Iron House',
    aboutText:
      'Δεν είμαστε απλά ένα γυμναστήριο. Χτίζουμε συνήθειες με πρόγραμμα, καθοδήγηση και κοινότητα. Χωρίς κριτική, μόνο πρόοδο.',
    aboutPoints: ['Ultra HD εξοπλισμός', 'Έμπειροι trainers', 'Ομαδικά μαθήματα', 'Σάουνα & αποδυτήρια'],
    offeringTitle: 'Προγράμματα',
    offering: [
      { name: 'Μηνιαίο all-access', desc: 'Πλήρης πρόσβαση σε όλους τους χώρους', price: '€35/μήνα' },
      { name: 'Personal training', desc: 'Πακέτο 8 συνεδριών με trainer', price: '€160' },
      { name: 'Ομαδικά μαθήματα', desc: 'HIIT, yoga, pilates, spinning', price: 'Από €8' },
      { name: 'Φοιτητικό', desc: 'Ειδική τιμή με φοιτητική ταυτότητα', price: '€25/μήνα' },
    ],
    gallery: ['Ο χώρος των βαρών', 'Cardio zone', 'Group classes', 'Personal training'],
    testimonials: [
      { name: 'Κώστας Β.', text: 'Σε 4 μήνες είδα πραγματική διαφορά. Οι προπονητές είναι πάντα δίπλα σου.', rating: 5 },
      { name: 'Αγγελική Ρ.', text: 'Καθαρός χώρος, ωραία ατμόσφαιρα και μουσική που σε ανεβάζει.', rating: 5 },
    ],
    contact: {
      address: 'Ελ. Βενιζέλου 88, Πειραιάς',
      phone: '210 5551234',
      email: 'join@ironhouse.gr',
      hours: 'Δευτέρα – Κυριακή: 06:00 – 23:00',
    },
  },
  {
    slug: 'salon',
    industry: { el: 'Κομμωτήριο', en: 'Hair Salon' },
    brand: 'Luxe Hair Studio',
    tagline: 'Beauty & hair design',
    accentIcon: 'scissors',
    theme: { primary: '#be185d', dark: '#1f1023', soft: '#fdf2f8', accent: '#a16207' },
    summary: {
      el: 'Κομμωτήριο με υπηρεσίες, τιμές και ραντεβού.',
      en: 'Hair salon site with services, prices and booking.',
    },
    highlights: ['Υπηρεσίες & τιμές', 'Online ραντεβού', 'Gallery έργων'],
    heroTitle: 'Αναδείξτε την ομορφιά σας',
    heroSubtitle:
      'Κούρεμα, βαφή και περιποίηση από έμπειρες stylists. Κλείστε ραντεβού online και απολαύστε μια εμπειρία περιποίησης.',
    heroCta: 'Κλείστε ραντεβού',
    heroSecondary: 'Δείτε τις υπηρεσίες',
    aboutTitle: 'Το στούντιό μας',
    aboutText:
      'Στο Luxe Hair Studio συνδυάζουμε τεχνική, τάσεις και προσωπική φροντίδα. Χρησιμοποιούμε επαγγελματικά προϊόντα που σέβονται τα μαλλιά.',
    aboutPoints: ['Έμπειρες stylists', 'Premium προϊόντα', 'Χαλαρωτικό περιβάλλον', 'Easy booking'],
    offeringTitle: 'Υπηρεσίες',
    offering: [
      { name: 'Κούρεμα & styling', desc: 'Γυναικείο ή ανδρικό, με λούσιμο', price: '€25' },
      { name: 'Βαφή', desc: 'Ολική βαφή, με φροντίδα', price: 'από €45' },
      { name: 'Balayage / Highlights', desc: 'Φωτεινές ανταύγειες', price: 'από €70' },
      { name: 'Keratin treatment', desc: 'Λείανση & λάμψη', price: 'από €90' },
      { name: 'Μανικιούρ – Pedikιούρ', desc: 'Ημιμόνιμο ή κλασικό', price: 'από €18' },
    ],
    gallery: ['Κουρέματα', 'Χρώματα', 'Νύχια', 'Ο χώρος'],
    testimonials: [
      { name: 'Ιωάννα Λ.', text: 'Το καλύτερο balayage που έχω κάνει ποτέ. Προσεγμένη δουλειά.', rating: 5 },
      { name: 'Χριστίνα Σ.', text: 'Ζεστό περιβάλλον και άψογο αποτέλεσμα. Το προτείνω!', rating: 5 },
    ],
    contact: {
      address: 'Σωτήρος 5, Πειραιάς',
      phone: '210 4445566',
      email: 'book@luxehair.gr',
      hours: 'Τρίτη – Σάββατο: 10:00 – 20:00',
    },
  },
  {
    slug: 'dentist',
    industry: { el: 'Οδοντιατρείο', en: 'Dental Clinic' },
    brand: 'Smile Dental',
    tagline: 'Υγεία & ομορφιά του χαμόγελου',
    accentIcon: 'tooth',
    theme: { primary: '#0d9488', dark: '#062b28', soft: '#f0fdfa', accent: '#0284c7' },
    summary: {
      el: 'Οδοντιατρείο με υπηρεσίες, γιατρούς και online ραντεβού.',
      en: 'Dental clinic site with services, doctors and booking.',
    },
    highlights: ['Υπηρεσίες', 'Online ραντεβού', 'Ασφαλιστικά ταμεία'],
    heroTitle: 'Ένα χαμόγελο που θα λατρέψετε',
    heroSubtitle:
      'Σύγχρονη οδοντιατρική φροντίδα σε ένα ήρεμο, αποστειρωμένο περιβάλλον. Κλείστε το ραντεβού σας online, χωρίς αναμονή.',
    heroCta: 'Κλείστε ραντεβού',
    heroSecondary: 'Οι υπηρεσίες μας',
    aboutTitle: 'Το ιατρείο μας',
    aboutText:
      'Στόχος μας είναι μια ευχάριστη εμπειρία χωρίς άγχος. Χρησιμοποιούμε σύγχρονα μηχανήματα και ήπιες τεχνικές για όλες τις ηλικίες.',
    aboutPoints: ['Σύγχρονος εξοπλισμός', 'Αποστείρωση', 'Ήπιες τεχνικές', 'Νυχτερινά ραντεβού'],
    offeringTitle: 'Υπηρεσίες',
    offering: [
      { name: 'Καθαρισμός & έλεγχος', desc: 'Προληπτική φροντίδα', price: '€50' },
      { name: 'Σφραγίσματα', desc: 'Αισθητικά, χωρίς πόνο', price: 'από €40' },
      { name: 'Λεύκανση', desc: 'Με λέιζερ, ασφαλές', price: 'από €180' },
      { name: 'Εμφυτεύματα', desc: 'Λύση για χαμένα δόντια', price: 'κατόπιν αξιολόγησης' },
      { name: 'Ορθοδοντική', desc: 'Διαφανείς νάρθηκες', price: 'κατόπιν αξιολόγησης' },
    ],
    gallery: ['Ιατρείο', 'Τεχνολογία', 'Αίθουσα', 'Χαμόγελα'],
    testimonials: [
      { name: 'Παναγιώτης Χ.', text: 'Πρώτη φορά χωρίς άγχος σε οδοντίατρο. Εξαιρετικός επαγγελματίας.', rating: 5 },
      { name: 'Ναταλία Τ.', text: 'Καθαρός χώρος, ευγενικό προσωπικό και άριστο αποτέλεσμα στη λεύκανση.', rating: 5 },
    ],
    contact: {
      address: 'Βασ. Γεωργίου 20, Πειραιάς',
      phone: '210 3332211',
      email: 'info@smiledental.gr',
      hours: 'Δευτέρα – Παρασκευή: 09:00 – 20:00',
    },
  },
  {
    slug: 'law',
    industry: { el: 'Δικηγορικό γραφείο', en: 'Law Firm' },
    brand: 'Παπαδόπουλος & Συνεργάτες',
    tagline: 'Νομική εκπροσώπηση με συνέπεια',
    accentIcon: 'scale',
    theme: { primary: '#1e3a8a', dark: '#0b1729', soft: '#eff6ff', accent: '#b45309' },
    summary: {
      el: 'Δικηγορικό γραφείο με τομείς πρακτικής και φόρμα επικοινωνίας.',
      en: 'Law firm site with practice areas and contact form.',
    },
    highlights: ['Τομείς πρακτικής', 'Φόρμα συμβουλίου', 'Επαγγελματικό προφίλ'],
    heroTitle: 'Σας συμβουλεύουμε, σας εκπροσωπούμε',
    heroSubtitle:
      'Εξειδικευμένη νομική υποστήριξη σε ιδιώτες και επιχειρήσεις. Αναλαμβάνουμε την υπόθεσή σας με υπευθυνότητα και διακριτικότητα.',
    heroCta: 'Ζητήστε συνάντηση',
    heroSecondary: 'Τομείς δραστηριότητας',
    aboutTitle: 'Το γραφείο',
    aboutText:
      'Το γραφείο μας προσφέρει ολοκληρωμένες νομικές υπηρεσίες με προσωπική προσέγγιση. Κάθε υπόθεση αντιμετωπίζεται με σοβαρότητα και συνέπεια.',
    aboutPoints: ['Εξειδίκευση ανά τομέα', 'Διαφανείς αμοιβές', 'Προσωπική επικοινωνία', 'Δικαστική εκπροσώπηση'],
    offeringTitle: 'Τομείς πρακτικής',
    offering: [
      { name: 'Αστικό δίκαιο', desc: 'Συμβάσεις, απαιτήσεις, αποζημιώσεις' },
      { name: 'Εργατικό δίκαιο', desc: 'Εργατικά, απολύσεις, αποζημιώσεις' },
      { name: 'Εταιρικό δίκαιο', desc: 'Σύσταση, μετασχηματισμοί, συμβάσεις' },
      { name: 'Ακίνητα', desc: 'Μεταβιβάσεις, μισθώσεις, ελέγχοι τίτλων' },
      { name: 'Οικογενειακό δίκαιο', desc: 'Διαζύγια, διατροφές, επιμέλεια' },
    ],
    gallery: ['Γραφείο', 'Συναντήσεις', 'Βιβλιοθήκη', 'Δικαστήριο'],
    testimonials: [
      { name: 'Επιχείρηση Α.Ε.', text: 'Άρτια ενημέρωση και ουσιαστική υποστήριξη σε πολύπλοκη υπόθεση.', rating: 5 },
      { name: 'Μιχάλης Γ.', text: 'Επαγγελματισμός, συνέπεια και ανθρώπινη προσέγγιση.', rating: 5 },
    ],
    contact: {
      address: 'Ακτή Κονδύλη 7, Πειραιάς',
      phone: '210 2223344',
      email: 'contact@lawoffice.gr',
      hours: 'Δευτέρα – Παρασκευή: 09:00 – 17:00',
    },
  },
];

export function getTemplate(slug: string): Template | undefined {
  return templates.find((template) => template.slug === slug);
}
