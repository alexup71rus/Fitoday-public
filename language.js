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
  if (current) {
    // Localized URLs always stay readable, including links from cached old pages.
    // Only the neutral entry point detects language. Its automatic jump is not
    // a manual choice and must not overwrite a saved preference.
    if (url.searchParams.get('auto') !== '1') {
      try { localStorage.setItem(key, current[1]); } catch (_) { /* Optional preference. */ }
    }
    return;
  }
  if (!/\/privacy\.html$/.test(url.pathname)) return;
  const browser = (navigator.languages || [navigator.language])
    .map(language => String(language).toLowerCase().split(/[-_]/)[0])
    .find(language => supported.includes(language));
  const preferred = supported.includes(saved) ? saved : (browser || 'en');
  url.pathname = url.pathname.replace(/privacy\.html$/, `privacy-${preferred}.html`);
  url.searchParams.set('auto', '1');
  window.location.replace(url.href);
})();
