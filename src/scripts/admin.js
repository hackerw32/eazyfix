const contentEl = document.getElementById('admin-content');
const navEl = document.getElementById('adminNav');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const saveBtn = document.getElementById('save-btn');
const statusEl = document.getElementById('save-status');
const storageFill = document.getElementById('storage-fill');
const storageText = document.getElementById('storage-text');

function formatBytes(bytes) {
  if (!bytes) return '0 MB';
  const mb = bytes / 1048576;
  if (mb < 1024) return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

async function refreshStorage() {
  try {
    const res = await fetch('/api/admin/storage');
    if (!res.ok) return;
    const data = await res.json();
    const pct = Math.min(100, (data.used / data.limit) * 100);
    if (storageFill) storageFill.style.width = `${pct.toFixed(2)}%`;
    if (storageText) storageText.textContent = `${formatBytes(data.used)} / ${formatBytes(data.limit)}`;
  } catch {
    /* ignore */
  }
}

const CATEGORIES = [
  { slug: 'repairs', label: 'Service Ηλεκτρονικών' },
  { slug: 'websites', label: 'Ιστοσελίδες' },
  { slug: 'android-apps', label: 'Εφαρμογές Android' },
  { slug: 'android-games', label: 'Παιχνίδια Android' },
  { slug: 'windows-apps', label: 'Windows & Python' },
];

const state = {
  tab: 'business',
  business: null,
  projects: [],
  editing: null,
  isNew: false,
  filter: 'all',
};

/* ---------- helpers ---------- */

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ICONS = {
  power: '<path d="M12 2v10"/><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash:
    '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

function icon(name, size = 17) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] ?? ''}</svg>`;
}

const GREEK = {
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th', ι: 'i', κ: 'k', λ: 'l',
  μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p', ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'y', φ: 'f',
  χ: 'ch', ψ: 'ps', ω: 'o', ά: 'a', έ: 'e', ή: 'i', ί: 'i', ό: 'o', ύ: 'y', ώ: 'o',
  ϊ: 'i', ϋ: 'y', ΐ: 'i', ΰ: 'y',
};

function slugify(text) {
  return String(text)
    .toLowerCase()
    .split('')
    .map((char) => GREEK[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function setPath(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
  current[keys[keys.length - 1]] = value;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function categoryLabel(slug) {
  return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug;
}

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = kind || '';
}

function markDirty() {
  setStatus('Μη αποθηκευμένες αλλαγές');
}

async function handleResponse(res) {
  if (res.status === 401) {
    window.location.href = '/admin/login';
    throw new Error('unauthorized');
  }
  if (!res.ok) throw new Error('request failed');
  return res;
}

/* ---------- render helpers ---------- */

function field(label, path, value, type = 'text', attrs = '') {
  return `<div class="field"><label>${esc(label)}</label><input type="${type}" data-path="${path}" value="${esc(value)}" ${attrs} /></div>`;
}

function bi(label, base, obj, multiline = false, extra = '') {
  const control = (loc) => {
    const value = esc(obj?.[loc] ?? '');
    return multiline
      ? `<textarea rows="3" data-path="${base}.${loc}" ${extra}>${value}</textarea>`
      : `<input type="text" data-path="${base}.${loc}" value="${value}" />`;
  };
  return `<div class="field"><label>${esc(label)}</label>
    <div class="bi-row">
      <div class="bi"><span class="flag">EL</span>${control('el')}</div>
      <div class="bi"><span class="flag">EN</span>${control('en')}</div>
    </div></div>`;
}

/* ---------- business ---------- */

function renderBusiness() {
  const b = state.business;
  return `<div class="panel">
    <h2>Στοιχεία επιχείρησης</h2>
    <div class="field"><label>Όνομα</label><input type="text" data-bind="name" value="${esc(b.name)}" /></div>
    <div class="grid-2">
      <div class="field"><label>Τηλέφωνο</label><input type="text" data-bind="phone" value="${esc(b.phone)}" /></div>
      <div class="field"><label>Email</label><input type="email" data-bind="email" value="${esc(b.email)}" /></div>
    </div>
    <div class="field"><label>WhatsApp (για τη φόρμα)</label><input type="text" data-bind="whatsapp" value="${esc(b.whatsapp)}" /></div>
    ${biField('business', 'tagline', 'Tagline')}
    ${biField('business', 'description', 'Περιγραφή', true)}
    ${biField('business', 'address', 'Περιοχή')}
    ${biField('business', 'hours', 'Ώρες λειτουργίας', true)}
  </div>`;
}

function biField(group, base, label, multiline = false) {
  const obj = state[group][base];
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

/* ---------- projects list ---------- */

function renderProjectsList() {
  const filtered = state.projects.filter(
    (project) => state.filter === 'all' || project.category === state.filter
  );

  const filters = [{ slug: 'all', label: 'Όλα' }, ...CATEGORIES]
    .map(
      (category) =>
        `<button type="button" data-action="filter" data-cat="${category.slug}" class="${state.filter === category.slug ? 'active' : ''}">${esc(category.label)}</button>`
    )
    .join('');

  const rows = filtered
    .map(
      (project) => `<div class="prow ${project.enabled ? '' : 'prow--off'}">
        <div class="prow-main">
          <strong>${esc(project.name || '(χωρίς όνομα)')}</strong>
          <div class="prow-meta">
            <span class="badge badge--cat">${esc(categoryLabel(project.category))}</span>
            <span class="badge ${project.enabled ? 'badge--on' : 'badge--off'}">${project.enabled ? 'Ενεργό' : 'Ανενεργό'}</span>
            <span>${(project.screenshots || []).length} screenshots</span>
          </div>
        </div>
        <div class="prow-actions">
          <button type="button" class="icon-btn ${project.enabled ? '' : 'icon-btn--on'}" data-action="toggle" data-id="${project.id}" title="${project.enabled ? 'Απενεργοποίηση' : 'Ενεργοποίηση'}" aria-label="${project.enabled ? 'Απενεργοποίηση' : 'Ενεργοποίηση'}">${icon('power')}</button>
          <button type="button" class="icon-btn" data-action="edit" data-id="${project.id}" title="Επεξεργασία" aria-label="Επεξεργασία">${icon('edit')}</button>
          <button type="button" class="icon-btn icon-btn--danger" data-action="delete" data-id="${project.id}" title="Διαγραφή" aria-label="Διαγραφή">${icon('trash')}</button>
        </div>
      </div>`
    )
    .join('');

  return `<div class="toolbar">
      <div class="filters">${filters}</div>
      <button type="button" class="abtn abtn--primary" data-action="new">+ Νέο project</button>
    </div>
    ${rows || '<p class="hint">Δεν υπάρχουν projects σε αυτή την κατηγορία.</p>'}`;
}

/* ---------- project editor ---------- */

function renderEditor() {
  const project = state.editing;
  const categoryOptions = CATEGORIES.map(
    (category) =>
      `<option value="${category.slug}" ${project.category === category.slug ? 'selected' : ''}>${esc(category.label)}</option>`
  ).join('');

  const shots = (project.screenshots || [])
    .map(
      (url, index) => `<div class="shot">
        <img src="${esc(url)}" alt="" />
        <button type="button" class="shot-remove" data-action="remove-shot" data-index="${index}" aria-label="Διαγραφή">×</button>
      </div>`
    )
    .join('');

  return `<div class="panel">
    <div class="editor-head">
      <h2>${state.isNew ? 'Νέο project' : 'Επεξεργασία project'}</h2>
      <div class="editor-actions">
        <button type="button" class="abtn abtn--ghost2" data-action="cancel">Πίσω στη λίστα</button>
      </div>
    </div>

    <div class="grid-2">
      ${field('Όνομα', 'name', project.name)}
      ${field('Slug (URL)', 'slug', project.slug, 'text', 'placeholder="auto"')}
    </div>

    <div class="grid-2">
      <div class="field"><label>Κατηγορία</label><select data-path="category">${categoryOptions}</select></div>
      <div class="field"><label>Κατάσταση</label>
        <label class="switch"><input type="checkbox" data-path="enabled" ${project.enabled ? 'checked' : ''} /> Ενεργό στη σελίδα</label>
      </div>
    </div>

    <div class="grid-2">
      ${field('Σύνδεσμος (URL)', 'url', project.url ?? '', 'text', 'placeholder="https:// ή /"')}
      ${bi('Ετικέτα συνδέσμου', 'linkLabel', project.linkLabel ?? { el: '', en: '' })}
    </div>

    ${field('Tags (χωρισμένα με κόμμα)', 'tags', (project.tags || []).join(', '), 'text', 'data-type="list"')}

    <div class="field"><label>Σύντομη περιγραφή</label>
      <div class="bi-row">
        <div class="bi"><span class="flag">EL</span><textarea rows="3" data-path="description.el">${esc(project.description?.el)}</textarea></div>
        <div class="bi"><span class="flag">EN</span><textarea rows="3" data-path="description.en">${esc(project.description?.en)}</textarea></div>
      </div>
    </div>

    <div class="field"><label>Αναλυτικό κείμενο</label>
      <div class="bi-row">
        <div class="bi"><span class="flag">EL</span><textarea rows="5" data-path="body.el">${esc(project.body?.el)}</textarea></div>
        <div class="bi"><span class="flag">EN</span><textarea rows="5" data-path="body.en">${esc(project.body?.en)}</textarea></div>
      </div>
    </div>

    <div class="field"><label>Βασικά σημεία (ένα ανά γραμμή)</label>
      <div class="bi-row">
        <div class="bi"><span class="flag">EL</span><textarea rows="4" data-path="features.el" data-type="lines">${esc((project.features?.el || []).join('\n'))}</textarea></div>
        <div class="bi"><span class="flag">EN</span><textarea rows="4" data-path="features.en" data-type="lines">${esc((project.features?.en || []).join('\n'))}</textarea></div>
      </div>
    </div>

    <div class="field">
      <label>Screenshots</label>
      ${shots ? `<div class="shots">${shots}</div>` : ''}
      <div class="upload-row">
        <label class="file-btn">Ανέβασμα εικόνων
          <input type="file" accept="image/*" multiple data-action="upload" />
        </label>
        <input type="text" id="shot-url" placeholder="https://..." />
        <button type="button" class="abtn abtn--ghost2" data-action="add-shot">Προσθήκη από URL</button>
      </div>
      <p class="hint">Οι εικόνες εμφανίζονται αριστερά στη σελίδα του project.</p>
    </div>

    <div class="field">
      <label>Αρχείο λήψης (π.χ. APK)</label>
      <div class="upload-row">
        <input type="text" data-path="downloadUrl" value="${esc(project.downloadUrl ?? '')}" placeholder="https://... ή ανέβασε αρχείο" />
        ${project.downloadUrl ? `<a class="abtn abtn--ghost2" href="${esc(project.downloadUrl)}" target="_blank" rel="noopener">Άνοιγμα</a><button type="button" class="abtn abtn--danger abtn--sm" data-action="clear-download">Καθαρισμός</button>` : ''}
      </div>
      <div class="upload-row" style="margin-top:10px">
        <label class="file-btn">Ανέβασμα αρχείου
          <input type="file" data-action="upload-file" />
        </label>
        <span class="hint" style="margin:0">Μέγιστο 24 MB ανά αρχείο</span>
      </div>
      ${project.downloadName ? `<p class="hint">${esc(project.downloadName)}${project.downloadSize ? ` · ${(project.downloadSize / 1048576).toFixed(2)} MB` : ''}</p>` : ''}
    </div>

    ${bi('Ετικέτα λήψης', 'downloadLabel', project.downloadLabel ?? { el: '', en: '' })}
  </div>`;
}

/* ---------- main render ---------- */

function renderNav() {
  navEl.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === state.tab);
  });
}

function render() {
  renderNav();
  if (state.tab === 'projects') {
    if (state.editing) {
      pageTitle.textContent = state.isNew ? 'Νέο project' : 'Επεξεργασία project';
      pageSubtitle.textContent = 'Συμπληρώστε τα στοιχεία, ανεβάστε screenshots και πατήστε Αποθήκευση.';
    } else {
      pageTitle.textContent = 'Projects';
      pageSubtitle.textContent = 'Διαχείριση projects ανά κατηγορία — προσθήκη, επεξεργασία, ενεργοποίηση.';
    }
    contentEl.innerHTML = state.editing ? renderEditor() : renderProjectsList();
  } else {
    pageTitle.textContent = 'Στοιχεία επιχείρησης';
    pageSubtitle.textContent = 'Τηλέφωνο, email, WhatsApp, περιοχή και ωράριο.';
    contentEl.innerHTML = renderBusiness();
  }
}

/* ---------- actions ---------- */

function newProject() {
  state.editing = {
    id: 'p-' + Date.now().toString(36),
    slug: '',
    category: state.filter === 'all' ? 'websites' : state.filter,
    name: '',
    enabled: true,
    description: { el: '', en: '' },
    body: { el: '', en: '' },
    features: { el: [], en: [] },
    tags: [],
    url: '',
    linkLabel: { el: '', en: '' },
    screenshots: [],
  };
  state.isNew = true;
  markDirty();
  render();
}

function editProject(id) {
  const project = state.projects.find((item) => item.id === id);
  if (!project) return;
  state.editing = clone(project);
  state.isNew = false;
  render();
}

function commitEditing() {
  if (!state.editing) return;
  if (!state.editing.slug) state.editing.slug = slugify(state.editing.name) || state.editing.id;
  const index = state.projects.findIndex((item) => item.id === state.editing.id);
  if (index === -1) state.projects.push(state.editing);
  else state.projects[index] = state.editing;
  state.editing = null;
  state.isNew = false;
}

async function saveProjectsOnly() {
  try {
    await handleResponse(
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.projects),
      })
    );
    setStatus('Αποθηκεύτηκε', 'ok');
  } catch {
    setStatus('Σφάλμα αποθήκευσης', 'error');
  }
}

async function saveAll() {
  saveBtn.disabled = true;
  setStatus('Αποθήκευση...');
  try {
    if (state.editing) commitEditing();
    const responses = await Promise.all([
      fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.business),
      }),
      fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.projects),
      }),
    ]);
    responses.forEach((res) => {
      if (res.status === 401) window.location.href = '/admin/login';
    });
    if (responses.some((res) => !res.ok)) throw new Error('save failed');
    setStatus('Αποθηκεύτηκε', 'ok');
    if (state.tab === 'projects') render();
  } catch {
    setStatus('Σφάλμα αποθήκευσης', 'error');
  } finally {
    saveBtn.disabled = false;
  }
}

async function uploadImages(files) {
  if (!files || files.length === 0 || !state.editing) return;
  setStatus('Ανέβασμα...');
  try {
    for (const file of files) {
      const form = new FormData();
      form.append('file', file);
      const res = await handleResponse(await fetch('/api/admin/upload', { method: 'POST', body: form }));
      const data = await res.json();
      if (data.url) state.editing.screenshots.push(data.url);
    }
    setStatus('Η εικόνα ανέβηκε — πατήστε Αποθήκευση', 'ok');
    render();
    refreshStorage();
  } catch {
    setStatus('Σφάλμα ανεβάσματος', 'error');
  }
}

async function uploadDownload(file) {
  if (!file || !state.editing) return;
  setStatus('Ανέβασμα...');
  try {
    const form = new FormData();
    form.append('file', file);
    form.append('kind', 'file');
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    if (res.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (res.status === 413 || data.error === 'too_large') {
      setStatus(`Το αρχείο είναι μεγαλύτερο από ${formatBytes(data.max ?? 25165824)}`, 'error');
      return;
    }
    if (!res.ok || !data.url) throw new Error('upload failed');
    state.editing.downloadUrl = data.url;
    state.editing.downloadName = data.name;
    state.editing.downloadSize = data.size;
    setStatus('Το αρχείο ανέβηκε — πατήστε Αποθήκευση', 'ok');
    render();
    refreshStorage();
  } catch {
    setStatus('Σφάλμα ανεβάσματος', 'error');
  }
}

/* ---------- events ---------- */

navEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-tab]');
  if (!button) return;
  state.tab = button.dataset.tab;
  state.editing = null;
  render();
});

contentEl.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action === 'new') newProject();
  else if (action === 'edit') editProject(target.dataset.id);
  else if (action === 'cancel') {
    state.editing = null;
    render();
  } else if (action === 'filter') {
    state.filter = target.dataset.cat;
    render();
  } else if (action === 'toggle') {
    const project = state.projects.find((item) => item.id === target.dataset.id);
    if (project) {
      project.enabled = !project.enabled;
      saveProjectsOnly();
      render();
    }
  } else if (action === 'delete') {
    const project = state.projects.find((item) => item.id === target.dataset.id);
    if (project && window.confirm(`Διαγραφή του «${project.name}»;`)) {
      state.projects = state.projects.filter((item) => item.id !== target.dataset.id);
      saveProjectsOnly();
      render();
    }
  } else if (action === 'clear-download' && state.editing) {
    state.editing.downloadUrl = '';
    state.editing.downloadName = '';
    state.editing.downloadSize = 0;
    markDirty();
    render();
  } else if (action === 'remove-shot' && state.editing) {
    state.editing.screenshots.splice(Number(target.dataset.index), 1);
    markDirty();
    render();
  } else if (action === 'add-shot' && state.editing) {
    const input = document.getElementById('shot-url');
    const url = input?.value?.trim();
    if (url) {
      state.editing.screenshots.push(url);
      markDirty();
      render();
    }
  }
});

contentEl.addEventListener('input', (event) => {
  const el = event.target;
  if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;

  if (el.dataset.bind && state.business) {
    setPath(state.business, el.dataset.bind, el.value);
    markDirty();
    return;
  }

  if (el.dataset.path && state.editing) {
    let value = el.value;
    if (el.dataset.type === 'list') {
      value = value.split(',').map((part) => part.trim()).filter(Boolean);
    } else if (el.dataset.type === 'lines') {
      value = value.split('\n').map((part) => part.trim()).filter(Boolean);
    }
    setPath(state.editing, el.dataset.path, value);
    if (el.dataset.path === 'name' && !state.editing.slug) {
      state.editing.slug = slugify(el.value);
      const slugInput = contentEl.querySelector('[data-path="slug"]');
      if (slugInput instanceof HTMLInputElement) slugInput.value = state.editing.slug;
    }
    markDirty();
  }
});

contentEl.addEventListener('change', (event) => {
  const el = event.target;

  if (el instanceof HTMLInputElement && el.type === 'file' && el.dataset.action === 'upload') {
    uploadImages(el.files);
    el.value = '';
    return;
  }

  if (el instanceof HTMLInputElement && el.type === 'file' && el.dataset.action === 'upload-file') {
    uploadDownload(el.files?.[0]);
    el.value = '';
    return;
  }

  if (!state.editing) return;

  if (el instanceof HTMLInputElement && el.type === 'checkbox' && el.dataset.path) {
    setPath(state.editing, el.dataset.path, el.checked);
    markDirty();
  } else if (el instanceof HTMLSelectElement && el.dataset.path) {
    setPath(state.editing, el.dataset.path, el.value);
    markDirty();
  }
});

saveBtn.addEventListener('click', saveAll);

window.addEventListener('beforeunload', (event) => {
  if (statusEl.textContent === 'Μη αποθηκευμένες αλλαγές') {
    event.preventDefault();
    event.returnValue = '';
  }
});

/* ---------- load ---------- */

async function load() {
  try {
    const [businessRes, projectsRes] = await Promise.all([
      fetch('/api/admin/content'),
      fetch('/api/admin/projects'),
    ]);
    if (businessRes.status === 401 || projectsRes.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    state.business = await businessRes.json();
    state.projects = await projectsRes.json();
    render();
    refreshStorage();
  } catch {
    contentEl.innerHTML = '<div class="loading">Σφάλμα φόρτωσης. Ανανεώστε τη σελίδα.</div>';
  }
}

load();
