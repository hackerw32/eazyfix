const navEl = document.getElementById('adminNav');
const contentEl = document.getElementById('admin-content');
const titleEl = document.getElementById('adminTitle');
const subtitleEl = document.getElementById('adminSubtitle');
const saveBtn = document.getElementById('save-btn');
const statusEl = document.getElementById('save-status');

const state = { content: null, active: 'business', dirty: false };

const SIDEBAR_ICONS = {
  briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  sparkles:
    '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  image:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  quote:
    '<path d="M10 11H6a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1zm9 0h-4a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1z"/><path d="M6 11c0 5 1 7-2 9M15 11c0 5 1 7-2 9"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
};

const SECTIONS = [
  { id: 'business', label: 'Επιχείρηση', icon: 'briefcase', title: 'Στοιχεία επιχείρησης' },
  { id: 'hero', label: 'Hero', icon: 'sparkles', title: 'Ενότητα Hero', subtitle: 'Ο τίτλος, το μήνυμα και τα στατιστικά της αρχικής.' },
  { id: 'services', label: 'Υπηρεσίες', icon: 'wrench', title: 'Υπηρεσίες επισκευής' },
  { id: 'webdev', label: 'Ιστοσελίδες', icon: 'code', title: 'Ενότητα Web Development' },
  { id: 'process', label: 'Διαδικασία', icon: 'gauge', title: 'Βήματα διαδικασίας' },
  { id: 'portfolio', label: 'Portfolio', icon: 'image', title: 'Κείμενα Portfolio', subtitle: 'Τα demo των ιστοσελίδων ρυθμίζονται στον κώδικα.' },
  { id: 'features', label: 'Γιατί εμάς', icon: 'shield', title: 'Χαρακτηριστικά' },
  { id: 'testimonials', label: 'Μαρτυρίες', icon: 'quote', title: 'Μαρτυρίες πελατών' },
  { id: 'faq', label: 'FAQ', icon: 'shield', title: 'Συχνές ερωτήσεις' },
  { id: 'contact', label: 'Επικοινωνία', icon: 'mail', title: 'Ενότητα επικοινωνίας' },
];

const ICON_NAMES = [
  'monitor', 'laptop', 'smartphone', 'shield', 'shield-check', 'hard-drive', 'cpu', 'home',
  'calendar', 'zap', 'layout', 'devices', 'search', 'rocket', 'shopping-cart', 'server',
  'phone', 'mail', 'map-pin', 'clock', 'check', 'check-circle', 'arrow-right', 'code', 'pen',
  'wrench', 'star', 'quote', 'globe', 'life-buoy', 'sparkles', 'briefcase', 'building',
  'utensils', 'dumbbell', 'scissors', 'tooth', 'scale', 'bed', 'hammer', 'user', 'gauge',
];

const templates = {
  stat: () => ({ value: '', label: { el: '', en: '' } }),
  service: () => ({ id: 'service-' + Date.now(), icon: 'wrench', title: { el: '', en: '' }, description: { el: '', en: '' }, price: '' }),
  webFeature: () => ({ icon: 'sparkles', title: { el: '', en: '' }, description: { el: '', en: '' } }),
  step: () => ({ title: { el: '', en: '' }, description: { el: '', en: '' } }),
  feature: () => ({ icon: 'check', title: { el: '', en: '' }, description: { el: '', en: '' } }),
  testimonial: () => ({ name: '', location: { el: '', en: '' }, text: { el: '', en: '' }, rating: 5 }),
  faq: () => ({ question: { el: '', en: '' }, answer: { el: '', en: '' } }),
};

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function svg(name, size = 18) {
  const path = SIDEBAR_ICONS[name] ?? SIDEBAR_ICONS.sparkles;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function setPath(path, value) {
  const keys = path.split('.');
  let current = state.content;
  for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
  current[keys[keys.length - 1]] = value;
  state.dirty = true;
  setStatus('Μη αποθηκευμένες αλλαγές');
}

function field(label, path, value, type = 'text') {
  return `<div class="field"><label>${esc(label)}</label><input type="${type}" data-bind="${path}" value="${esc(value)}" /></div>`;
}

function area(label, path, value, rows = 3) {
  return `<div class="field"><label>${esc(label)}</label><textarea rows="${rows}" data-bind="${path}">${esc(value)}</textarea></div>`;
}

function bi(label, base, obj, multiline = false) {
  const control = (loc) => {
    const value = esc(obj?.[loc] ?? '');
    return multiline
      ? `<textarea rows="3" data-bind="${base}.${loc}">${value}</textarea>`
      : `<input type="text" data-bind="${base}.${loc}" value="${value}" />`;
  };
  return `<div class="field"><label>${esc(label)}</label>
    <div class="bi-row">
      <div class="bi"><span class="flag">EL</span>${control('el')}</div>
      <div class="bi"><span class="flag">EN</span>${control('en')}</div>
    </div></div>`;
}

function iconField(label, path, value) {
  const options = ICON_NAMES.map(
    (name) => `<option value="${name}"${name === value ? ' selected' : ''}>${name}</option>`
  ).join('');
  return `<div class="field"><label>${esc(label)}</label><select data-bind="${path}">${options}</select></div>`;
}

function removeBtn(list, index) {
  return `<button class="abtn abtn--danger" data-action="remove" data-list="${list}" data-index="${index}">Διαγραφή</button>`;
}

function addBtn(list, label) {
  return `<button class="abtn abtn--add" data-action="add" data-list="${list}">+ ${esc(label)}</button>`;
}

function renderBusiness() {
  const b = state.content.business;
  return `<div class="panel"><h2>Στοιχεία επιχείρησης</h2>
    ${field('Όνομα', 'business.name', b.name)}
    <div class="grid-2">
      ${field('Τηλέφωνο', 'business.phone', b.phone)}
      ${field('Email', 'business.email', b.email, 'email')}
    </div>
    <div class="grid-2">
      ${field('WhatsApp (για τη φόρμα)', 'business.whatsapp', b.whatsapp)}
    </div>
    ${bi('Tagline', 'business.tagline', b.tagline)}
    ${bi('Περιγραφή', 'business.description', b.description, true)}
    ${bi('Περιοχή', 'business.address', b.address)}
    ${bi('Ώρες λειτουργίας', 'business.hours', b.hours, true)}
  </div>`;
}

function renderHero() {
  const h = state.content.hero;
  const stats = h.stats
    .map(
      (stat, i) => `<div class="item-card">
        <div class="item-card-head"><strong>Στατιστικό ${i + 1}</strong>${removeBtn('stats', i)}</div>
        ${field('Τιμή', `hero.stats.${i}.value`, stat.value)}
        ${bi('Ετικέτα', `hero.stats.${i}.label`, stat.label)}
      </div>`
    )
    .join('');
  return `<div class="panel"><h2>Hero</h2>
    ${bi('Badge', 'hero.badge', h.badge)}
    ${bi('Τίτλος (γραμμή 1)', 'hero.title', h.title)}
    ${bi('Τίτλος (γραμμή 2, τονισμένη)', 'hero.titleAccent', h.titleAccent)}
    ${bi('Υπότιτλος', 'hero.subtitle', h.subtitle, true)}
    <div class="grid-2">
      ${bi('Κουμπί 1', 'hero.primaryCta', h.primaryCta)}
      ${bi('Κουμπί 2', 'hero.secondaryCta', h.secondaryCta)}
    </div>
  </div>
  <div class="panel"><div class="list-head"><h2>Στατιστικά</h2></div>${stats}${addBtn('stats', 'Προσθήκη στατιστικού')}</div>`;
}

function renderServices() {
  const items = state.content.services
    .map(
      (service, i) => `<div class="item-card">
        <div class="item-card-head"><strong>${esc(service.title.el || 'Υπηρεσία')}</strong>${removeBtn('services', i)}</div>
        <div class="grid-2">
          ${iconField('Εικονίδιο', `services.${i}.icon`, service.icon)}
          ${field('Τιμή', `services.${i}.price`, service.price)}
        </div>
        ${bi('Τίτλος', `services.${i}.title`, service.title)}
        ${bi('Περιγραφή', `services.${i}.description`, service.description, true)}
      </div>`
    )
    .join('');
  return `<div class="panel"><div class="list-head"><h2>Υπηρεσίες</h2></div>${items}${addBtn('services', 'Προσθήκη υπηρεσίας')}</div>`;
}

function renderWebdev() {
  const w = state.content.webdev;
  const features = w.features
    .map(
      (feature, i) => `<div class="item-card">
        <div class="item-card-head"><strong>${esc(feature.title.el || 'Χαρακτηριστικό')}</strong>${removeBtn('webFeatures', i)}</div>
        ${iconField('Εικονίδιο', `webdev.features.${i}.icon`, feature.icon)}
        ${bi('Τίτλος', `webdev.features.${i}.title`, feature.title)}
        ${bi('Περιγραφή', `webdev.features.${i}.description`, feature.description, true)}
      </div>`
    )
    .join('');
  return `<div class="panel"><h2>Web Development</h2>
    ${bi('Badge', 'webdev.badge', w.badge)}
    ${bi('Τίτλος', 'webdev.title', w.title)}
    ${bi('Υπότιτλος', 'webdev.subtitle', w.subtitle, true)}
    ${bi('Κείμενο κουμπιού', 'webdev.ctaText', w.ctaText)}
  </div>
  <div class="panel"><div class="list-head"><h2>Χαρακτηριστικά</h2></div>${features}${addBtn('webFeatures', 'Προσθήκη χαρακτηριστικού')}</div>`;
}

function renderProcess() {
  const p = state.content.process;
  const steps = p.steps
    .map(
      (step, i) => `<div class="item-card">
        <div class="item-card-head"><strong>Βήμα ${i + 1}: ${esc(step.title.el || '')}</strong>${removeBtn('steps', i)}</div>
        ${bi('Τίτλος', `process.steps.${i}.title`, step.title)}
        ${bi('Περιγραφή', `process.steps.${i}.description`, step.description, true)}
      </div>`
    )
    .join('');
  return `<div class="panel"><h2>Διαδικασία</h2>
    ${bi('Badge', 'process.badge', p.badge)}
    ${bi('Τίτλος', 'process.title', p.title)}
  </div>
  <div class="panel"><div class="list-head"><h2>Βήματα</h2></div>${steps}${addBtn('steps', 'Προσθήκη βήματος')}</div>`;
}

function renderPortfolio() {
  const p = state.content.portfolio;
  return `<div class="panel"><h2>Portfolio</h2>
    ${bi('Badge', 'portfolio.badge', p.badge)}
    ${bi('Τίτλος', 'portfolio.title', p.title)}
    ${bi('Υπότιτλος', 'portfolio.subtitle', p.subtitle, true)}
  </div>`;
}

function renderFeatures() {
  const features = state.content.features
    .map(
      (feature, i) => `<div class="item-card">
        <div class="item-card-head"><strong>${esc(feature.title.el || 'Χαρακτηριστικό')}</strong>${removeBtn('features', i)}</div>
        ${iconField('Εικονίδιο', `features.${i}.icon`, feature.icon)}
        ${bi('Τίτλος', `features.${i}.title`, feature.title)}
        ${bi('Περιγραφή', `features.${i}.description`, feature.description, true)}
      </div>`
    )
    .join('');
  return `<div class="panel"><div class="list-head"><h2>Χαρακτηριστικά</h2></div>${features}${addBtn('features', 'Προσθήκη χαρακτηριστικού')}</div>`;
}

function renderTestimonials() {
  const items = state.content.testimonials
    .map(
      (testimonial, i) => `<div class="item-card">
        <div class="item-card-head"><strong>${esc(testimonial.name || 'Μαρτυρία')}</strong>${removeBtn('testimonials', i)}</div>
        <div class="grid-2">
          ${field('Όνομα', `testimonials.${i}.name`, testimonial.name)}
          <div class="field"><label>Βαθμολογία (1-5)</label><input type="number" min="1" max="5" data-type="number" data-bind="testimonials.${i}.rating" value="${esc(testimonial.rating)}" /></div>
        </div>
        ${bi('Περιοχή', `testimonials.${i}.location`, testimonial.location)}
        ${bi('Κείμενο', `testimonials.${i}.text`, testimonial.text, true)}
      </div>`
    )
    .join('');
  return `<div class="panel"><div class="list-head"><h2>Μαρτυρίες</h2></div>${items}${addBtn('testimonials', 'Προσθήκη μαρτυρίας')}</div>`;
}

function renderFaq() {
  const items = state.content.faq
    .map(
      (faq, i) => `<div class="item-card">
        <div class="item-card-head"><strong>${esc(faq.question.el || 'Ερώτηση')}</strong>${removeBtn('faq', i)}</div>
        ${bi('Ερώτηση', `faq.${i}.question`, faq.question)}
        ${bi('Απάντηση', `faq.${i}.answer`, faq.answer, true)}
      </div>`
    )
    .join('');
  return `<div class="panel"><div class="list-head"><h2>Συχνές ερωτήσεις</h2></div>${items}${addBtn('faq', 'Προσθήκη ερώτησης')}</div>`;
}

function renderContact() {
  const c = state.content.contact;
  return `<div class="panel"><h2>Επικοινωνία</h2>
    ${bi('Τίτλος', 'contact.title', c.title)}
    ${bi('Υπότιτλος', 'contact.subtitle', c.subtitle, true)}
  </div>`;
}

function renderSection() {
  switch (state.active) {
    case 'hero':
      return renderHero();
    case 'services':
      return renderServices();
    case 'webdev':
      return renderWebdev();
    case 'process':
      return renderProcess();
    case 'portfolio':
      return renderPortfolio();
    case 'features':
      return renderFeatures();
    case 'testimonials':
      return renderTestimonials();
    case 'faq':
      return renderFaq();
    case 'contact':
      return renderContact();
    default:
      return renderBusiness();
  }
}

function renderNav() {
  navEl.innerHTML = SECTIONS.map(
    (section) =>
      `<button data-section="${section.id}" class="${section.id === state.active ? 'active' : ''}">${svg(section.icon)}<span>${esc(section.label)}</span></button>`
  ).join('');
}

function render() {
  const section = SECTIONS.find((item) => item.id === state.active) ?? SECTIONS[0];
  titleEl.textContent = section.title;
  subtitleEl.textContent = section.subtitle ?? 'Επεξεργαστείτε και πατήστε Αποθήκευση.';
  renderNav();
  contentEl.innerHTML = renderSection();
}

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = kind || '';
}

function addItem(list) {
  const map = { stats: 'stat', services: 'service', webFeatures: 'webFeature', steps: 'step', features: 'feature', testimonials: 'testimonial', faq: 'faq' };
  const parent = { stats: 'hero.stats', webFeatures: 'webdev.features', steps: 'process.steps' }[list];
  const target = parent ? parent.split('.').reduce((obj, key) => obj[key], state.content) : state.content[list];
  target.push(templates[map[list]]());
  state.dirty = true;
  render();
}

function removeItem(list, index) {
  const parent = { stats: 'hero.stats', webFeatures: 'webdev.features', steps: 'process.steps' }[list];
  const target = parent ? parent.split('.').reduce((obj, key) => obj[key], state.content) : state.content[list];
  target.splice(index, 1);
  state.dirty = true;
  render();
}

async function save() {
  saveBtn.disabled = true;
  setStatus('Αποθήκευση...');
  try {
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.content),
    });
    if (res.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    if (!res.ok) throw new Error('save failed');
    state.dirty = false;
    setStatus('Αποθηκεύτηκε', 'ok');
  } catch {
    setStatus('Σφάλμα αποθήκευσης', 'error');
  } finally {
    saveBtn.disabled = false;
  }
}

navEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-section]');
  if (button) {
    state.active = button.dataset.section;
    render();
  }
});

contentEl.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (action) {
    if (action.dataset.action === 'add') addItem(action.dataset.list);
    if (action.dataset.action === 'remove') removeItem(action.dataset.list, Number(action.dataset.index));
  }
});

contentEl.addEventListener('input', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
  const path = target.dataset.bind;
  if (!path) return;
  const value = target.dataset.type === 'number' ? Number(target.value) : target.value;
  setPath(path, value);
});

saveBtn.addEventListener('click', save);

window.addEventListener('beforeunload', (event) => {
  if (state.dirty) {
    event.preventDefault();
    event.returnValue = '';
  }
});

async function load() {
  try {
    const res = await fetch('/api/admin/content');
    if (res.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    state.content = await res.json();
    render();
  } catch {
    contentEl.innerHTML = '<div class="loading">Σφάλμα φόρτωσης. Ανανεώστε τη σελίδα.</div>';
  }
}

load();
