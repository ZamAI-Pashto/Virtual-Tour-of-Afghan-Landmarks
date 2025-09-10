// Map functionality using Leaflet
(function () {
  let map = null;
  let markersLayer = null;
  let selectedMarker = null;

  // Custom icon for landmarks
  const landmarkIcon = L.divIcon({
    className: 'landmark-marker',
    html: '<div class="marker-icon">🏛️</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  const selectedLandmarkIcon = L.divIcon({
    className: 'landmark-marker selected',
    html: '<div class="marker-icon selected">🏛️</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

  function initMap() {
    if (map) return map;

    // Initialize map centered on Afghanistan
    map = L.map('map', {
      zoomControl: true,
      attributionControl: true
    }).setView([34.5553, 69.2075], 6); // Kabul coordinates as center

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 3
    }).addTo(map);

    // Create markers layer group
    markersLayer = L.layerGroup().addTo(map);

    // Add custom CSS for markers
    addMarkerStyles();

    return map;
  }

  function addMarkerStyles() {
    if (document.getElementById('map-styles')) return;

    const style = document.createElement('style');
    style.id = 'map-styles';
    style.textContent = `
      .landmark-marker {
        background: transparent;
        border: none;
      }
      .marker-icon {
        background: var(--panel);
        border: 2px solid var(--accent);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        width: 32px;
        height: 32px;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }
      .marker-icon:hover {
        transform: scale(1.1);
        border-color: var(--accent-2);
      }
      .marker-icon.selected {
        background: var(--accent);
        border-color: var(--accent-2);
        transform: scale(1.2);
        box-shadow: 0 4px 12px rgba(45, 212, 191, 0.4);
      }
      .leaflet-popup-content-wrapper {
        background: var(--panel);
        color: var(--text);
        border-radius: 8px;
        box-shadow: 0 3px 14px rgba(0,0,0,0.4);
      }
      .leaflet-popup-content {
        margin: 12px 16px;
        line-height: 1.4;
      }
      .leaflet-popup-tip {
        background: var(--panel);
      }
      .popup-title {
        font-weight: 600;
        margin-bottom: 4px;
        color: var(--accent);
      }
      .popup-city {
        color: var(--muted);
        font-size: 0.9em;
        margin-bottom: 8px;
      }
      .popup-actions {
        margin-top: 8px;
      }
      .popup-btn {
        background: var(--accent);
        color: var(--bg);
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.85em;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .popup-btn:hover {
        background: var(--accent-2);
      }
    `;
    document.head.appendChild(style);
  }

  function addLandmarks(landmarks) {
    if (!map || !markersLayer) return;

    // Clear existing markers
    markersLayer.clearLayers();
    
    const currentLocale = window.I18N?.locale || 'en';

    landmarks.forEach(landmark => {
      const marker = L.marker(landmark.coordinates, {
        icon: landmarkIcon
      });

      // Create popup content
      const popupContent = `
        <div class="popup-title">${landmark.name[currentLocale]}</div>
        <div class="popup-city">${landmark.city[currentLocale]}</div>
        <div class="popup-actions">
          <button class="popup-btn" onclick="window.UI.showLandmarkDetail('${landmark.id}')">
            ${window.I18N?.t('view_details') || 'View Details'}
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      // Store landmark data with marker
      marker.landmarkId = landmark.id;
      
      // Add click handler
      marker.on('click', () => {
        selectLandmark(landmark.id);
        if (window.UI && window.UI.showLandmarkDetail) {
          window.UI.showLandmarkDetail(landmark.id);
        }
      });

      markersLayer.addLayer(marker);
    });
  }

  function selectLandmark(landmarkId) {
    if (!markersLayer) return;

    // Reset all markers to default icon
    markersLayer.eachLayer(marker => {
      if (marker.landmarkId) {
        marker.setIcon(landmarkIcon);
      }
    });

    // Highlight selected marker
    selectedMarker = null;
    markersLayer.eachLayer(marker => {
      if (marker.landmarkId === landmarkId) {
        marker.setIcon(selectedLandmarkIcon);
        selectedMarker = marker;
      }
    });
  }

  function flyToLandmark(landmarkId) {
    if (!map || !markersLayer) return;

    markersLayer.eachLayer(marker => {
      if (marker.landmarkId === landmarkId) {
        map.flyTo(marker.getLatLng(), 12, {
          animate: true,
          duration: 1
        });
        // Open popup after animation
        setTimeout(() => {
          marker.openPopup();
        }, 1000);
      }
    });
  }

  function fitAllLandmarks() {
    if (!map || !markersLayer) return;

    const group = new L.featureGroup();
    markersLayer.eachLayer(marker => {
      group.addLayer(marker);
    });

    if (group.getLayers().length > 0) {
      map.fitBounds(group.getBounds(), {
        padding: [20, 20]
      });
    }
  }

  function updateMarkersLanguage() {
    // Refresh landmarks with current language
    if (window.LANDMARKS_DATA) {
      addLandmarks(window.LANDMARKS_DATA.getAll());
    }
  }

  // Public API
  window.MAP = {
    init: initMap,
    addLandmarks,
    selectLandmark,
    flyToLandmark,
    fitAllLandmarks,
    updateMarkersLanguage,
    get instance() { return map; }
  };
})();