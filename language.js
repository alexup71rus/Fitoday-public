(() => {
  const supported = ['ru', 'en', 'zh'];
  const key = 'fitoday.language';
  const url = new URL(window.location.href);
  const explicit = url.searchParams.get('lang');
  let saved;
  try { saved = localStorage.getItem(key); } catch (_) { /* Storage may be blocked. */ }
  if (supported.includes(explicit)) {
    saved = explicit;
    try { localStorage.setItem(key, explicit); } catch (_) { /* URL keeps this choice. */ }
  }
  const current = /\/privacy-(ru|en|zh)\.html$/.exec(url.pathname);
  if (!current) return; // Support pages keep their existing opening behavior.
  const browser = (navigator.languages || [navigator.language])
    .map(language => String(language).toLowerCase().split(/[-_]/)[0])
    .find(language => supported.includes(language));
  const preferred = supported.includes(saved) ? saved : (browser || 'en');
  if (preferred !== current[1]) {
    url.pathname = url.pathname.replace(/privacy-(ru|en|zh)\.html$/, `privacy-${preferred}.html`);
    window.location.replace(url.href);
  }
})();
