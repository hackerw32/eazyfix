const contentEl = document.getElementById('admin-content');
const saveBtn = document.getElementById('save-btn');
const statusEl = document.getElementById('save-status');

const state = { business: null, dirty: false };

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setPath(path, value) {
  const keys = path.split('.');
  let current = state.business;
  for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
  current[keys[keys.length - 1]] = value;
  state.dirty = true;
  setStatus('Μη αποθηκευμένες αλλαγές');
}

function field(label, path, value, type = 'text') {
  return `<div class="field"><label>${esc(label)}</label><input type="${type}" data-bind="${path}" value="${esc(value)}" /></div>`;
}

function bi(label, base, obj, multiline = false) {
  const control = (loc) => {
    const value = esc(obj?.[loc] ?? '');
    return multiline
      ? `<textarea rows="2" data-bind="${base}.${loc}">${value}</textarea>`
      : `<input type="text" data-bind="${base}.${loc}" value="${value}" />`;
  };
  return `<div class="field"><label>${esc(label)}</label>
    <div class="bi-row">
      <div class="bi"><span class="flag">EL</span>${control('el')}</div>
      <div class="bi"><span class="flag">EN</span>${control('en')}</div>
    </div></div>`;
}

function render() {
  const b = state.business;
  contentEl.innerHTML = `
    <div class="panel">
      <h2>Στοιχεία επιχείρησης</h2>
      ${field('Όνομα', 'name', b.name)}
      <div class="grid-2">
        ${field('Τηλέφωνο', 'phone', b.phone)}
        ${field('Email', 'email', b.email, 'email')}
      </div>
      <div class="grid-2">
        ${field('WhatsApp (για τη φόρμα)', 'whatsapp', b.whatsapp)}
      </div>
      ${bi('Tagline', 'tagline', b.tagline)}
      ${bi('Περιγραφή', 'description', b.description, true)}
      ${bi('Περιοχή', 'address', b.address)}
      ${bi('Ώρες λειτουργίας', 'hours', b.hours, true)}
    </div>
  `;
}

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = kind || '';
}

async function save() {
  saveBtn.disabled = true;
  setStatus('Αποθήκευση...');
  try {
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.business),
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

contentEl.addEventListener('input', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
  const path = target.dataset.bind;
  if (!path) return;
  setPath(path, target.value);
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
    state.business = await res.json();
    render();
  } catch {
    contentEl.innerHTML = '<div class="loading">Σφάλμα φόρτωσης. Ανανεώστε τη σελίδα.</div>';
  }
}

load();
