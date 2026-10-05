export interface Template {
  slug: string;
  number: number;
  name: { el: string; en: string };
  category: { el: string; en: string };
  short: { el: string; en: string };
  style: string;
  built: boolean;
}

export const templates: Template[] = [
  {
    slug: 'mesitiko',
    number: 1,
    name: { el: 'Μεσιτικό Γραφείο', en: 'Real Estate Agency' },
    category: { el: 'Ακίνητα', en: 'Real Estate' },
    short: { el: 'Μόνο αγγελίες ακινήτων.', en: 'Property listings only.' },
    style: 'minimal-listing',
    built: false,
  },
  {
    slug: 'techniko-mesitiko',
    number: 2,
    name: { el: 'Τεχνικό-Μεσιτικό Γραφείο', en: 'Technical & Real Estate Office' },
    category: { el: 'Ακίνητα & Τεχνικά', en: 'Real Estate & Technical' },
    short: { el: 'Αγγελίες, τοπογραφικά, ΚΥΔ/τακτοποιήσεις.', en: 'Listings, surveys, permits.' },
    style: 'corporate-technical',
    built: false,
  },
  {
    slug: 'dikigoriko',
    number: 3,
    name: { el: 'Δικηγορικό Γραφείο', en: 'Law Office' },
    category: { el: 'Νομικές Υπηρεσίες', en: 'Legal' },
    short: { el: 'Τομείς πρακτικής & επικοινωνία.', en: 'Practice areas & contact.' },
    style: 'formal-editorial',
    built: true,
  },
  {
    slug: 'odontiatreio',
    number: 4,
    name: { el: 'Οδοντιατρείο', en: 'Dental Clinic' },
    category: { el: 'Υγεία', en: 'Health' },
    short: { el: 'Υπηρεσίες & online ραντεβού.', en: 'Services & online booking.' },
    style: 'clean-medical',
    built: false,
  },
  {
    slug: 'kallopismos',
    number: 5,
    name: { el: 'Στούντιο Καλλοπισμού', en: 'Beauty Studio' },
    category: { el: 'Ομορφιά', en: 'Beauty' },
    short: { el: 'Νύχια ή κομμωτήριο, με ραντεβού.', en: 'Nails or hair salon, with booking.' },
    style: 'elegant-beauty',
    built: false,
  },
  {
    slug: 'rouxa',
    number: 6,
    name: { el: 'Κατάστημα Ρούχων', en: 'Clothing Store' },
    category: { el: 'Λιανική', en: 'Retail' },
    short: { el: 'Συλλογές & e-shop ρούχων.', en: 'Collections & clothing e-shop.' },
    style: 'fashion-grid',
    built: false,
  },
  {
    slug: 'keri',
    number: 7,
    name: { el: 'Χειροποίητα Κεριά & Κατασκευές', en: 'Handmade Candles & Crafts' },
    category: { el: 'Χειροποίητα', en: 'Handmade' },
    short: { el: 'Χειροποίητα προϊόντα & παραγγελίες.', en: 'Handmade products & orders.' },
    style: 'warm-artisanal',
    built: true,
  },
  {
    slug: 'enoikiasi-autokiniton',
    number: 8,
    name: { el: 'Ενοικιάσεις Αυτοκινήτων', en: 'Car Rentals' },
    category: { el: 'Αυτοκίνητα', en: 'Automotive' },
    short: { el: 'Στόλος, τιμές & online κρατήσεις.', en: 'Fleet, pricing & online booking.' },
    style: 'bold-booking',
    built: true,
  },
  {
    slug: 'estiatorio',
    number: 9,
    name: { el: 'Εστιατόριο', en: 'Restaurant' },
    category: { el: 'Εστίαση', en: 'Food' },
    short: { el: 'Μενού & online παραγγελίες.', en: 'Menu & online orders.' },
    style: 'appetite-ordering',
    built: false,
  },
];

export function getTemplate(slug: string): Template | undefined {
  return templates.find((template) => template.slug === slug);
}
