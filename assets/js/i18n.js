(function () {
  const DEFAULT_LOCALE = 'en';
  const RTL_LOCALES = new Set(['fa', 'ps']);

  const state = {
    locale: localStorage.getItem('locale') || DEFAULT_LOCALE,
    dict: {},
  };

  function setDir(locale) {
    const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.lang = locale;
  }

  async function loadLocale(locale) {
    try {
      const res = await fetch(`./locales/${locale}.json`);
      if (!res.ok) throw new Error('Locale load failed');
      state.dict = await res.json();
      state.locale = locale;
      localStorage.setItem('locale', locale);
      setDir(locale);
      applyTranslations();
      // Notify listeners that locale changed
      window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { locale } }));
    } catch (e) {
      console.error('i18n load error:', e);
      if (locale !== DEFAULT_LOCALE) {
        return loadLocale(DEFAULT_LOCALE);
      }
    }
  }

  function t(key, fallback = '') {
    return state.dict[key] ?? fallback ?? key;
  }

  function applyTranslations() {
    // Elements with data-i18n="key"
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key, el.textContent);
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key, el.getAttribute('placeholder')));
    });
    // Titles and aria-labels
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', t(key, el.getAttribute('title')));
    });
  }

  window.I18N = {
    loadLocale,
    t,
    apply: () => applyTranslations(),
    get locale() { return state.locale; },
    get isRTL() { return RTL_LOCALES.has(state.locale); },
  };

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Wire language selector if present
    const select = document.getElementById('lang-select');
    if (select) {
      select.value = state.locale;
      select.addEventListener('change', () => loadLocale(select.value));
    }
    setDir(state.locale);
    loadLocale(state.locale);
  });
})();
