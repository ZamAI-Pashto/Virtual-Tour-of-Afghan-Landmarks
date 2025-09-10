# 🏛️ Virtual Tour of Afghan Landmarks

A comprehensive virtual tour application showcasing Afghanistan's rich cultural heritage through an interactive web experience. Built with modern web technologies and featuring multilingual support for English, Persian (فارسی), and Pashto (پښتو).

## ✨ Features

### 🗺️ Interactive Map
- **Map Integration**: Interactive map showing all landmarks with custom markers
- **Map Navigation**: Click landmarks to view details and fly to locations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🌍 Multilingual Support
- **English**: Full English language support
- **Persian (فارسی)**: Complete Persian translation with RTL layout
- **Pashto (پښتو)**: Full Pashto translation with RTL layout
- **Dynamic Switching**: Switch languages instantly without page reload

### 🏛️ Rich Landmark Database
- **8 Major Landmarks**: Carefully curated selection of Afghanistan's most significant sites
- **Detailed Information**: Comprehensive descriptions in all three languages
- **Categorization**: Organized by type (Historical, Nature, Religious)
- **High-Quality Content**: Authentic and educational information

### 🔍 Advanced Search
- **Real-time Search**: Instant filtering as you type
- **Multilingual Search**: Search in any supported language
- **Smart Filtering**: Search by name, location, category, or description

### 🎨 Modern UI/UX
- **Dark Theme**: Beautiful dark theme optimized for viewing
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Smooth Animations**: Polished transitions and interactions

## 🏛️ Featured Landmarks

### 🏞️ Natural Wonders
- **Band-e-Amir National Park** - Six stunning blue lakes in the Hindu Kush mountains
- **Panjshir Valley** - The "Valley of Five Lions" with dramatic mountain scenery

### 🏰 Historical Sites
- **Minaret of Jam** - 65-meter UNESCO World Heritage brick tower from 12th century
- **Herat Citadel** - Ancient fortress serving as military base for over 2,500 years
- **Bala Hissar Fortress** - Historic fortress overlooking Kabul for 1,500+ years
- **Darul Aman Palace** - European-style palace built in 1920s by King Amanullah Khan

### 🕌 Religious Sites
- **Blue Mosque of Mazar-i-Sharif** - Stunning blue-tiled mosque and spiritual center
- **Babur Gardens** - Historic Mughal gardens in Kabul with emperor's tomb

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZamAI-Pashto/Virtual-Tour-of-Afghan-Landmarks.git
   cd Virtual-Tour-of-Afghan-Landmarks
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Modular ES6+ JavaScript with no framework dependencies
- **Responsive Design**: Mobile-first approach with CSS Grid

### Mapping
- **Leaflet.js**: Interactive maps with custom markers and popups
- **OpenStreetMap**: Free and open-source map tiles

### Internationalization
- **Custom i18n System**: Lightweight internationalization with RTL support
- **JSON Translations**: Structured translation files for easy maintenance
- **Dynamic Language Switching**: Real-time language changes

### Architecture
- **Static Web App**: No build process required, runs directly in browser
- **Modular JavaScript**: Clean separation of concerns with ES6 modules
- **Client-side Routing**: Hash-based routing for single-page app experience

## 📁 Project Structure

```
Virtual-Tour-of-Afghan-Landmarks/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css         # Main stylesheet with dark theme
│   └── js/
│       ├── app.js            # Main application orchestration
│       ├── data.js           # Landmark data and utilities
│       ├── i18n.js           # Internationalization system
│       ├── map.js            # Map functionality with Leaflet
│       ├── router.js         # Client-side routing
│       ├── ui.js             # UI interactions and state management
│       └── leaflet-mock.js   # Mock Leaflet for demonstration
├── locales/
│   ├── en.json               # English translations
│   ├── fa.json               # Persian translations
│   └── ps.json               # Pashto translations
└── README.md                 # This file
```

## 🎯 Key Features Explained

### Internationalization (i18n)
The application supports three languages with complete translations:
- **English**: Base language with full feature set
- **Persian (فارسی)**: Right-to-left layout with Persian script
- **Pashto (پښتو)**: Right-to-left layout with Pashto script

### Search Functionality
- **Real-time filtering**: Results update as you type
- **Multi-field search**: Searches names, locations, categories, and descriptions
- **Language-aware**: Works in all supported languages

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Adaptive layout**: Sidebar becomes overlay on smaller screens
- **Touch-friendly**: Large touch targets for mobile interaction

### Accessibility
- **Keyboard navigation**: Full keyboard support
- **Screen readers**: ARIA labels and semantic HTML
- **High contrast**: Dark theme with sufficient color contrast
- **Skip links**: Navigation shortcuts for screen readers

## 🚀 Usage

### Navigation
- **Browse landmarks**: Scroll through the landmark list on the left
- **View details**: Click any landmark to see detailed information
- **Map interaction**: Click map markers to view landmark details
- **Search**: Use the search box to filter landmarks
- **Language switching**: Use the language dropdown to switch languages

### Keyboard Shortcuts
- **Escape**: Return to home view from detail view
- **Ctrl/Cmd + K**: Focus search input

### Sharing
- **Share landmarks**: Use the share button to copy landmark URLs
- **Direct links**: Share specific landmark URLs with others

## 🌟 Educational Value

This virtual tour serves as an educational resource about Afghanistan's cultural heritage:

- **Historical Context**: Learn about different periods of Afghan history
- **Cultural Significance**: Understand the importance of each landmark
- **Geographical Knowledge**: Explore Afghanistan's diverse landscapes
- **Multilingual Learning**: Practice reading in different scripts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Areas for contribution:

- Additional landmarks and descriptions
- Translation improvements
- New language support
- Enhanced map features
- Accessibility improvements

## 📄 License

This project is created for educational purposes. Map data © OpenStreetMap contributors.

## 🙏 Acknowledgments

- **OpenStreetMap**: For providing free map data
- **Leaflet.js**: For the excellent mapping library
- **Afghan Cultural Heritage**: For the rich history and landmarks featured
- **Community Contributors**: For translations and cultural insights

---

**Made with ❤️ to showcase Afghanistan's beautiful cultural heritage**