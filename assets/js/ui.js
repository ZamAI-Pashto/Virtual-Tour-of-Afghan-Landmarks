<<<<<<< HEAD
// UI interaction logic
(function () {
  let currentLandmarks = [];
  let filteredLandmarks = [];

  function initUI() {
    setupSearch();
    setupLanguageChange();
    renderLandmarkList();
    setupRouteHandlers();
  }

  function setupSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    let debounceTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        filterLandmarks(e.target.value);
      }, 300);
    });

    // Clear search on escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.target.value = '';
        filterLandmarks('');
      }
    });
  }

  function setupLanguageChange() {
    // Listen for language changes to update UI
    document.addEventListener('languageChanged', () => {
      renderLandmarkList();
      updateLandmarkDetail();
      if (window.MAP && window.MAP.updateMarkersLanguage) {
        window.MAP.updateMarkersLanguage();
      }
    });
  }

  function setupRouteHandlers() {
    // Handle routing
    window.Router.add('/', () => {
      showHomeView();
    });

    window.Router.add('/landmark', ({ params }) => {
      const id = params.get('id');
      if (id) {
        showLandmarkDetail(id);
        if (window.MAP && window.MAP.flyToLandmark) {
          window.MAP.flyToLandmark(id);
        }
      }
    });

    window.Router.add('/404', () => {
      showHomeView();
    });
  }

  function filterLandmarks(query) {
    const currentLocale = window.I18N?.locale || 'en';
    
    if (!query.trim()) {
      filteredLandmarks = [...currentLandmarks];
    } else {
      filteredLandmarks = window.LANDMARKS_DATA.search(query, currentLocale);
    }
    
    renderLandmarkList();
    
    // Update map markers
    if (window.MAP && window.MAP.addLandmarks) {
      window.MAP.addLandmarks(filteredLandmarks);
    }
  }

  function renderLandmarkList() {
    const list = document.getElementById('landmark-list');
    if (!list) return;

    const currentLocale = window.I18N?.locale || 'en';
    const landmarks = filteredLandmarks.length > 0 ? filteredLandmarks : currentLandmarks;

    list.innerHTML = '';

    if (landmarks.length === 0) {
      list.innerHTML = `
        <li class="no-results">
          <p>${window.I18N?.t('no_landmarks_found') || 'No landmarks found'}</p>
        </li>
      `;
      return;
    }

    landmarks.forEach(landmark => {
      const listItem = document.createElement('li');
      listItem.className = 'landmark-item';
      listItem.setAttribute('data-landmark-id', landmark.id);
      
      listItem.innerHTML = `
        <img src="${landmark.image}" alt="${landmark.name[currentLocale]}" loading="lazy">
        <div class="meta">
          <div class="title">${landmark.name[currentLocale]}</div>
          <div class="city">${landmark.city[currentLocale]}</div>
        </div>
      `;

      listItem.addEventListener('click', () => {
        showLandmarkDetail(landmark.id);
        window.Router.navigate(`/landmark?id=${landmark.id}`);
      });

      list.appendChild(listItem);
    });
  }

  function showLandmarkDetail(landmarkId) {
    const landmark = window.LANDMARKS_DATA.getById(landmarkId);
    if (!landmark) return;

    const detailView = document.getElementById('detail-view');
    if (!detailView) return;

    const currentLocale = window.I18N?.locale || 'en';
    
    detailView.innerHTML = `
      <div class="detail-content">
        <h2 class="title">${landmark.name[currentLocale]}</h2>
        <p class="city">${landmark.city[currentLocale]}</p>
        <div class="category-badge">${getCategoryName(landmark.category, currentLocale)}</div>
        <img src="${landmark.image}" alt="${landmark.name[currentLocale]}" class="detail-image">
        <p class="desc">${landmark.description[currentLocale]}</p>
        <div class="actions">
          <button class="btn primary" onclick="window.UI.flyToLandmark('${landmark.id}')">
            ${window.I18N?.t('show_on_map') || 'Show on Map'}
          </button>
          <button class="btn" onclick="window.UI.shareLocation('${landmark.id}')">
            ${window.I18N?.t('share') || 'Share'}
          </button>
          <button class="btn" onclick="window.UI.showHomeView()">
            ${window.I18N?.t('back_to_list') || 'Back to List'}
          </button>
        </div>
      </div>
    `;

    detailView.classList.remove('hidden');
    
    // Highlight landmark in list
    highlightLandmarkInList(landmarkId);
    
    // Select marker on map
    if (window.MAP && window.MAP.selectLandmark) {
      window.MAP.selectLandmark(landmarkId);
    }

    // Add detail styles if not already added
    addDetailStyles();
  }

  function addDetailStyles() {
    if (document.getElementById('detail-styles')) return;

    const style = document.createElement('style');
    style.id = 'detail-styles';
    style.textContent = `
      .detail-content {
        max-width: 100%;
      }
      .detail-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
        margin: 1rem 0;
      }
      .category-badge {
        display: inline-block;
        background: var(--accent);
        color: var(--bg);
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
      }
      .no-results {
        text-align: center;
        padding: 2rem;
        color: var(--muted);
      }
      .landmark-item.active {
        border-color: var(--accent);
        background: rgba(45, 212, 191, 0.1);
      }
    `;
    document.head.appendChild(style);
  }

  function getCategoryName(category, locale) {
    const categories = {
      historical: {
        en: 'Historical',
        fa: 'تاریخی',
        ps: 'تاریخي'
      },
      nature: {
        en: 'Nature',
        fa: 'طبیعت',
        ps: 'طبیعت'
      },
      religious: {
        en: 'Religious',
        fa: 'مذهبی',
        ps: 'دیني'
      }
    };
    
    return categories[category]?.[locale] || category;
  }

  function highlightLandmarkInList(landmarkId) {
    // Remove previous highlight
    document.querySelectorAll('.landmark-item').forEach(item => {
      item.classList.remove('active');
    });

    // Add highlight to selected item
    const selectedItem = document.querySelector(`[data-landmark-id="${landmarkId}"]`);
    if (selectedItem) {
      selectedItem.classList.add('active');
      selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function showHomeView() {
    const detailView = document.getElementById('detail-view');
    if (detailView) {
      detailView.classList.add('hidden');
    }

    // Clear landmark selection
    document.querySelectorAll('.landmark-item').forEach(item => {
      item.classList.remove('active');
    });

    // Reset map view
    if (window.MAP && window.MAP.fitAllLandmarks) {
      window.MAP.fitAllLandmarks();
    }

    // Clear route
    window.Router.navigate('/');
  }

  function flyToLandmark(landmarkId) {
    if (window.MAP && window.MAP.flyToLandmark) {
      window.MAP.flyToLandmark(landmarkId);
    }
  }

  function shareLocation(landmarkId) {
    const landmark = window.LANDMARKS_DATA.getById(landmarkId);
    if (!landmark) return;

    const currentLocale = window.I18N?.locale || 'en';
    const url = `${location.origin}${location.pathname}#/landmark?id=${landmarkId}`;
    const text = `${landmark.name[currentLocale]} - ${landmark.city[currentLocale]}`;

    if (navigator.share) {
      navigator.share({
        title: 'Virtual Tour of Afghan Landmarks',
        text: text,
        url: url
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        // Show notification
        showNotification(window.I18N?.t('link_copied') || 'Link copied to clipboard!');
      }).catch(() => {
        // Fallback: show URL in alert
        prompt(window.I18N?.t('copy_link') || 'Copy this link:', url);
      });
    }
  }

  function showNotification(message) {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent);
      color: var(--bg);
      padding: 12px 16px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  function updateLandmarkDetail() {
    // Re-render detail view if currently showing a landmark
    const detailView = document.getElementById('detail-view');
    if (detailView && !detailView.classList.contains('hidden')) {
      const { params } = window.Router.parseHash();
      const landmarkId = params.get('id');
      if (landmarkId) {
        showLandmarkDetail(landmarkId);
      }
    }
  }

  function loadLandmarks() {
    if (window.LANDMARKS_DATA) {
      currentLandmarks = window.LANDMARKS_DATA.getAll();
      filteredLandmarks = [...currentLandmarks];
      renderLandmarkList();
      
      // Add landmarks to map
      if (window.MAP && window.MAP.addLandmarks) {
        window.MAP.addLandmarks(currentLandmarks);
      }
    }
  }

  // Add notification animations
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(notificationStyles);

  // Public API
  window.UI = {
    init: initUI,
    showLandmarkDetail,
    showHomeView,
    flyToLandmark,
    shareLocation,
    loadLandmarks
  };
})();
=======
(function () {
  const listEl = () => document.getElementById('landmark-list');
  const detailEl = () => document.getElementById('detail-view');

  function landmarkTitle(l, locale) {
    return l.title?.[locale] || l.title?.en || '';
  }
  function landmarkCity(l, locale) {
    return l.city?.[locale] || l.city?.en || '';
  }
  function landmarkDesc(l, locale) {
    return l.description?.[locale] || l.description?.en || '';
  }

  function renderList(landmarks) {
    const ul = listEl();
    if (!ul) return;
    const locale = I18N.locale;
    ul.innerHTML = '';
    for (const l of landmarks) {
      const li = document.createElement('li');
      li.className = 'landmark-item';
      li.tabIndex = 0;
      li.setAttribute('role', 'button');
      li.setAttribute('aria-label', landmarkTitle(l, locale));
      li.innerHTML = `
        <img src="${l.image}" alt="${landmarkTitle(l, locale)}" />
        <div class="meta">
          <span class="title">${landmarkTitle(l, locale)}</span>
          <span class="city">${landmarkCity(l, locale)}</span>
        </div>
      `;
      li.addEventListener('click', () => Router.navigate(`/landmark?id=${l.id}`));
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter') Router.navigate(`/landmark?id=${l.id}`); });
      ul.appendChild(li);
    }
  }

  function renderDetail(id) {
    const l = Data.getById(id);
    const el = detailEl();
    if (!l || !el) return;
    const locale = I18N.locale;
    el.classList.remove('hidden');
    el.innerHTML = `
      <h2 class="title">${landmarkTitle(l, locale)}</h2>
      <div class="city">${landmarkCity(l, locale)}</div>
      <p class="desc">${landmarkDesc(l, locale)}</p>
      <div class="actions">
        <button class="btn primary" id="btn-focus-map" data-i18n="action.focusOnMap">Focus on map</button>
        <a class="btn" href="#/" data-i18n="action.back">Back</a>
      </div>
    `;
    // Re-apply i18n for the new DOM without refetching
    I18N.apply();
    // Focus map on this landmark
    Map.focus(l);
  }

  function clearDetail() {
    const el = detailEl();
    if (el) el.classList.add('hidden');
  }

  function wireSearch() {
    const input = document.getElementById('search');
    if (!input) return;
    input.addEventListener('input', () => {
      const results = Data.search(input.value, I18N.locale);
      renderList(results);
      Map.renderMarkers(results);
    });
  }

  window.UI = { renderList, renderDetail, clearDetail, wireSearch };
})();
>>>>>>> 55c521f (Add README and implement core functionality for multilingual virtual tour app)
