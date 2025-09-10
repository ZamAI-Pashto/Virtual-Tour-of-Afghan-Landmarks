/* Minimal Leaflet-compatible mock for demonstration */
window.L = {
  map: function(id, options) {
    const container = document.getElementById(id);
    if (!container) return null;
    
    container.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
      ">
        <div style="
          text-align: center;
          color: var(--muted);
          font-size: 1.1rem;
        ">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗺️</div>
          <div>Interactive Map</div>
          <div style="font-size: 0.9rem; margin-top: 0.5rem;">Afghanistan Virtual Tour</div>
        </div>
        <div id="map-markers" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
      </div>
    `;
    
    const map = {
      container: container,
      markers: [],
      setView: function(coords, zoom) {
        return this;
      },
      fitBounds: function(bounds, options) {
        return this;
      },
      flyTo: function(coords, zoom, options) {
        return this;
      },
      invalidateSize: function() {
        return this;
      }
    };
    
    return map;
  },
  
  tileLayer: function(url, options) {
    return {
      addTo: function(map) {
        return this;
      }
    };
  },
  
  layerGroup: function() {
    const layers = [];
    return {
      addTo: function(map) {
        return this;
      },
      clearLayers: function() {
        layers.length = 0;
        return this;
      },
      addLayer: function(layer) {
        layers.push(layer);
        return this;
      },
      eachLayer: function(fn) {
        layers.forEach(fn);
        return this;
      }
    };
  },
  
  marker: function(coords, options) {
    const markerId = 'marker_' + Math.random().toString(36).substr(2, 9);
    return {
      landmarkId: null,
      coords: coords,
      getLatLng: function() {
        return { lat: coords[0], lng: coords[1] };
      },
      setIcon: function(icon) {
        return this;
      },
      bindPopup: function(content) {
        this.popupContent = content;
        return this;
      },
      openPopup: function() {
        if (this.popupContent) {
          this.showPopup();
        }
        return this;
      },
      showPopup: function() {
        // Create and show popup
        const existing = document.querySelector('.mock-popup');
        if (existing) existing.remove();
        
        const popup = document.createElement('div');
        popup.className = 'mock-popup';
        popup.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--panel);
          color: var(--text);
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          z-index: 10000;
          max-width: 300px;
          border: 1px solid var(--border);
        `;
        popup.innerHTML = this.popupContent + '<button onclick="this.parentNode.remove()" style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: var(--muted); cursor: pointer; font-size: 1.2rem;">×</button>';
        document.body.appendChild(popup);
        
        setTimeout(() => {
          if (popup.parentNode) popup.parentNode.removeChild(popup);
        }, 5000);
      },
      on: function(event, handler) {
        // Mock event handling
        return this;
      }
    };
  },
  
  divIcon: function(options) {
    return {
      className: options.className,
      html: options.html,
      iconSize: options.iconSize
    };
  },
  
  featureGroup: function() {
    const layers = [];
    return {
      addLayer: function(layer) {
        layers.push(layer);
        return this;
      },
      getLayers: function() {
        return layers;
      },
      getBounds: function() {
        return [[34, 60], [36, 75]]; // Approximate Afghanistan bounds
      }
    };
  }
};