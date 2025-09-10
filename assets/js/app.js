<<<<<<< HEAD
// Main application entry point
(function () {
  // Application state
  const state = {
    initialized: false,
    currentLanguage: 'en'
  };

  // Initialize the application
  function init() {
    if (state.initialized) return;

    console.log('🏛️ Initializing Virtual Tour of Afghan Landmarks...');
    
    try {
      // Initialize map
      if (window.MAP && window.MAP.init) {
        window.MAP.init();
        console.log('✅ Map initialized');
      }

      // Initialize UI
      if (window.UI && window.UI.init) {
        window.UI.init();
        console.log('✅ UI initialized');
      }

      // Load landmarks data
      if (window.UI && window.UI.loadLandmarks) {
        window.UI.loadLandmarks();
        console.log('✅ Landmarks loaded');
      }

      // Setup global event listeners
      setupGlobalEvents();

      // Update placeholder text based on current language
      updateSearchPlaceholder();

      state.initialized = true;
      console.log('🎉 Application initialized successfully!');

    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
      showErrorMessage();
    }
  }

  function setupGlobalEvents() {
    // Listen for language changes from i18n system
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', () => {
        state.currentLanguage = langSelect.value;
        updateSearchPlaceholder();
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', {
          detail: { language: state.currentLanguage }
        }));
      });
    }

    // Handle window resize for map
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.MAP && window.MAP.instance) {
          window.MAP.instance.invalidateSize();
        }
      }, 100);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape key to go back to home
      if (e.key === 'Escape') {
        const detailView = document.getElementById('detail-view');
        if (detailView && !detailView.classList.contains('hidden')) {
          window.UI.showHomeView();
        }
      }

      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      // Router will handle this, but we can add additional logic here if needed
    });
  }

  function updateSearchPlaceholder() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    const placeholders = {
      en: 'Search landmarks...',
      fa: 'جستجوی مکان‌ها...',
      ps: 'د ځایونو لټون...'
    };

    const placeholder = placeholders[state.currentLanguage] || placeholders.en;
    searchInput.setAttribute('placeholder', placeholder);
  }

  function showErrorMessage() {
    const mainElement = document.querySelector('.app-main');
    if (!mainElement) return;

    const errorHTML = `
      <div class="error-container" style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        padding: 2rem;
        color: var(--muted);
      ">
        <h2 style="color: var(--text); margin-bottom: 1rem;">
          ⚠️ Application Error
        </h2>
        <p style="margin-bottom: 1rem;">
          We're sorry, but there was an error loading the application.
        </p>
        <button onclick="location.reload()" style="
          background: var(--accent);
          color: var(--bg);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
        ">
          Reload Page
        </button>
      </div>
    `;

    mainElement.innerHTML = errorHTML;
  }

  // Performance monitoring
  function trackPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`📊 Page loaded in ${Math.round(loadTime)}ms`);

        // Track largest contentful paint
        if ('PerformanceObserver' in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lcp = entries[entries.length - 1];
              console.log(`📊 Largest Contentful Paint: ${Math.round(lcp.startTime)}ms`);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            // Observer not supported in all browsers
          }
        }
      });
    }
  }

  // Check for required dependencies
  function checkDependencies() {
    const required = [
      { name: 'Leaflet', check: () => typeof L !== 'undefined' },
      { name: 'I18N', check: () => typeof window.I18N !== 'undefined' },
      { name: 'Router', check: () => typeof window.Router !== 'undefined' },
      { name: 'LANDMARKS_DATA', check: () => typeof window.LANDMARKS_DATA !== 'undefined' }
    ];

    const missing = required.filter(dep => !dep.check());
    
    if (missing.length > 0) {
      console.error('❌ Missing dependencies:', missing.map(d => d.name));
      return false;
    }

    console.log('✅ All dependencies loaded');
    return true;
  }

  // Accessibility enhancements
  function enhanceAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent);
      color: var(--bg);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID
    const mainContent = document.querySelector('.app-main');
    if (mainContent) {
      mainContent.id = 'main-content';
    }

    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcer);

    window.announceToScreenReader = (message) => {
      announcer.textContent = message;
    };
  }

  // Public API for debugging and testing
  window.APP = {
    init,
    get state() { return { ...state }; },
    get version() { return '1.0.0'; },
    get buildDate() { return new Date().toISOString(); }
  };

  // Auto-initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all modules are loaded
    setTimeout(() => {
      if (checkDependencies()) {
        enhanceAccessibility();
        trackPerformance();
        init();
      } else {
        showErrorMessage();
      }
    }, 100);
  });

  // Handle module loading errors
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (!state.initialized) {
      showErrorMessage();
    }
  });

  console.log('🚀 Virtual Tour of Afghan Landmarks - App module loaded');
})();
=======
(function () {
  async function bootstrap() {
    await Data.load();
    Map.init();
    UI.wireSearch();

    Router.add('/', () => {
      UI.clearDetail();
      const items = Data.all();
      UI.renderList(items);
      Map.renderMarkers(items);
    });

    Router.add('/landmark', ({ params }) => {
      const id = params.get('id');
      if (!id) return Router.navigate('/');
      UI.renderDetail(id);
    });

    Router.add('/404', () => {
      UI.clearDetail();
    });

    // Re-render list/markers on i18n changes
    window.addEventListener('i18n:changed', () => {
      const current = Router.parseHash();
      if (current.path === '/') {
        const items = Data.search(document.getElementById('search')?.value || '', I18N.locale);
        UI.renderList(items);
        Map.renderMarkers(items);
      } else if (current.path === '/landmark') {
        UI.renderDetail(current.params.get('id'));
      }
    });
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
>>>>>>> 55c521f (Add README and implement core functionality for multilingual virtual tour app)
