const app = document.getElementById('admin-app');
const saveBtn = document.getElementById('save-btn');
const statusEl = document.getElementById('save-status');

const state = {
  content: null,
  activeTab: 'business',
  dirty: false,
};

const TABS = [
  { id: 'business', label: 'Επιχείρηση' },
  { id: 'services', label: 'Υπηρεσίες' },
  { id: 'features', label: 'Χαρακτηριστικά' },
  { id: 'testimonials', label: 'Μαρτυρίες' },
  { id: 'faq', label: 'Συχνές Ερωτήσεις' },
  { id: 'json', label: 'JSON' },
];

const templates = {
  service: () => ({
    id: 'service-' + Date.now(),
    icon: '🔧',
    title: { el: '', en: '' },
    description: { el: '', en: '' },
    price: '',
  }),
  feature: () => ({ icon: '⭐', title: { el: '', en: '' }, description: { el: '', en: '' } }),
  testimonial: () => ({
    name: '',
    location: { el: '', en: '' },
    text: { el: '', en: '' },
    rating: 5,
  }),
  faq: () => ({ question: { el: '', en: '' }, answer: { el: '', en: '' } }),
};

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setPath(path, value) {
  const keys = path.split('.');
  let current = state.content;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  state.dirty = true;
  setStatus('Μη αποθηκευμένες αλλαγές');
}

function field(label, path, value, type) {
  const inputType = type || 'text';
  return `<div class="field"><label>${esc(label)}</label>
    <input type="${inputType}" data-bind="${path}" value="${esc(value)}" /></div>`;
}

function biField(basePath, label, obj, type) {
  const inputFor = (loc) => {
    const val = esc(obj?.[loc] ?? '');
    if (type === 'textarea') {
      return `<textarea data-bind="${basePath}.${loc}" rows="3">${val}</textarea>`;
    }
    return `<input type="text" data-bind="${basePath}.${loc}" value="${val}" />`;
  };
  return `<div class="field"><label>${esc(label)}</label>
    <div class="bi-row">
      <div class="bi"><span class="flag">🇬🇷</span>${inputFor('el')}</div>
      <div class="bi"><span class="flag">🇬🇧</span>${inputFor('en')}</div>
    </div></div>`;
}

function removeButton(list, index) {
  return `<button class="btn btn-danger btn-sm" data-action="remove" data-list="${list}" data-index="${index}">Διαγραφή</button>`;
}

function addButton(list, label) {
  return `<button class="btn btn-add" data-action="add" data-list="${list}">+ ${esc(label)}</button>`;
}

function renderBusiness() {
  const b = state.content.business;
  return `<div class="panel"><h2>Στοιχεία Επιχείρησης</h2>
    ${field('Όνομα επιχείρησης', 'business.name', b.name)}
    <div class="grid-2">
      ${field('Τηλέφωνο', 'business.phone', b.phone, 'tel')}
      ${field('Email', 'business.email', b.email, 'email')}
    </div>
    <div class="grid-2">
      ${field('WhatsApp', 'business.whatsapp', b.whatsapp)}
    </div>
    ${biField('business.tagline', 'Tagline', b.tagline)}
    ${biField('business.description', 'Περιγραφή', b.description, 'textarea')}
    ${biField('business.address', 'Περιοχή / Διεύθυνση', b.address)}
    ${biField('business.hours', 'Ώρες λειτουργίας', b.hours, 'textarea')}
  </div>`;
}

function renderServices() {
  const items = state.content.services
    .map(
      (s, i) => `<div class="card">
        <div class="card-head"><h3>${esc(s.icon)} ${esc(s.title.el || 'Υπηρεσία')}</h3>${removeButton('services', i)}</div>
        <div class="grid-2">
          ${field('Emoji', `services.${i}.icon`, s.icon)}
          ${field('Τιμή', `services.${i}.price`, s.price)}
        </div>
        ${biField(`services.${i}.title`, 'Τίτλος', s.title)}
        ${biField(`services.${i}.description`, 'Περιγραφή', s.description, 'textarea')}
      </div>`
    )
    .join('');
  return `<div class="panel"><h2>Υπηρεσίες</h2>${items}${addButton('services', 'Προσθήκη υπηρεσίας')}</div>`;
}

function renderFeatures() {
  const items = state.content.features
    .map(
      (f, i) => `<div class="card">
        <div class="card-head"><h3>${esc(f.icon)} ${esc(f.title.el || 'Χαρακτηριστικό')}</h3>${removeButton('features', i)}</div>
        <div class="grid-2">${field('Emoji', `features.${i}.icon`, f.icon)}</div>
        ${biField(`features.${i}.title`, 'Τίτλος', f.title)}
        ${biField(`features.${i}.description`, 'Περιγραφή', f.description, 'textarea')}
      </div>`
    )
    .join('');
  return `<div class="panel"><h2>Χαρακτηριστικά</h2>${items}${addButton('features', 'Προσθήκη χαρακτηριστικού')}</div>`;
}

function renderTestimonials() {
  const items = state.content.testimonials
    .map(
      (t, i) => `<div class="card">
        <div class="card-head"><h3>${esc(t.name || 'Μαρτυρία')}</h3>${removeButton('testimonials', i)}</div>
        <div class="grid-2">
          ${field('Όνομα', `testimonials.${i}.name`, t.name)}
          <div class="field"><label>Βαθμολογία (1-5)</label>
            <input type="number" min="1" max="5" data-type="number" data-bind="testimonials.${i}.rating" value="${esc(t.rating)}" /></div>
        </div>
        ${biField(`testimonials.${i}.location`, 'Περιοχή', t.location)}
        ${biField(`testimonials.${i}.text`, 'Κείμενο', t.text, 'textarea')}
      </div>`
    )
    .join('');
  return `<div class="panel"><h2>Μαρτυρίες</h2>${items}${addButton('testimonials', 'Προσθήκη μαρτυρίας')}</div>`;
}

function renderFaq() {
  const items = state.content.faq
    .map(
      (f, i) => `<div class="card">
        <div class="card-head"><h3>${esc(f.question.el || 'Ερώτηση')}</h3>${removeButton('faq', i)}</div>
        ${biField(`faq.${i}.question`, 'Ερώτηση', f.question)}
        ${biField(`faq.${i}.answer`, 'Απάντηση', f.answer, 'textarea')}
      </div>`
    )
    .join('');
  return `<div class="panel"><h2>Συχνές Ερωτήσεις</h2>${items}${addButton('faq', 'Προσθήκη ερώτησης')}</div>`;
}

function renderJson() {
  return `<div class="panel"><h2>JSON</h2><pre class="json-preview">${esc(
    JSON.stringify(state.content, null, 2)
  )}</pre></div>`;
}

function renderPanel() {
  switch (state.activeTab) {
    case 'services':
      return renderServices();
    case 'features':
      return renderFeatures();
    case 'testimonials':
      return renderTestimonials();
    case 'faq':
      return renderFaq();
    case 'json':
      return renderJson();
    default:
      return renderBusiness();
  }
}

function render() {
  const tabs = TABS.map(
    (t) =>
      `<button class="tab-btn${t.id === state.activeTab ? ' active' : ''}" data-tab="${t.id}">${esc(
        t.label
      )}</button>`
  ).join('');
  app.innerHTML = `<div class="tabs">${tabs}</div>${renderPanel()}`;
}

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = kind || '';
}

function addItem(list) {
  if (templates[list]) state.content[list].push(templates[list]());
  state.dirty = true;
  render();
}

function removeItem(list, index) {
  state.content[list].splice(index, 1);
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
    setStatus('Αποθηκεύτηκε ✓', 'ok');
  } catch {
    setStatus('Σφάλμα αποθήκευσης', 'error');
  } finally {
    saveBtn.disabled = false;
  }
}

app.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const tab = target.closest('[data-tab]');
  if (tab) {
    state.activeTab = tab.dataset.tab;
    render();
    return;
  }

  const action = target.closest('[data-action]');
  if (action) {
    const list = action.dataset.list;
    if (action.dataset.action === 'add') addItem(list);
    if (action.dataset.action === 'remove') removeItem(list, Number(action.dataset.index));
  }
});

app.addEventListener('input', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
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
    app.innerHTML = '<div class="loading">Σφάλμα φόρτωσης. Ανανεώστε τη σελίδα.</div>';
  }
}

load();
