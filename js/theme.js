// Theme management system

import { Utils } from './utils.js';

export class ThemeManager {
  constructor() {
    this.themes = ['default', 'dark', 'ocean'];
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.init();
  }
  
  init() {
    this.applyTheme(this.currentTheme);
    this.setupThemeToggler();
    this.setupMediaQueryListener();
  }
  
  getStoredTheme() {
    return Utils.getLocalStorage('theme');
  }
  
  getPreferredTheme() {
    if (Utils.matchMedia('(prefers-color-scheme: dark)')) {
      return 'dark';
    }
    return 'default';
  }
  
  applyTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Theme "${theme}" not found. Using default.`);
      theme = 'default';
    }
    
    const html = document.documentElement;
    
    // Remove existing theme classes
    this.themes.forEach(t => {
      html.classList.remove(`theme-${t}`);
    });
    
    // Apply new theme
    html.setAttribute('data-theme', theme);
    html.classList.add(`theme-${theme}`);
    
    this.currentTheme = theme;
    Utils.setLocalStorage('theme', theme);
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: theme }
    }));
    
    // Update theme switcher UI
    this.updateThemeSwitcherUI();
    
    // Announce to screen readers
    Utils.announceToScreenReader(`Theme changed to ${theme}`);
  }
  
  nextTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    return this.themes[nextIndex];
  }
  
  switchTheme(theme = null) {
    const targetTheme = theme || this.nextTheme();
    this.applyTheme(targetTheme);
  }
  
  setupThemeToggler() {
    // Create theme switcher if it doesn't exist
    const existingSwitcher = Utils.query('.theme-switcher');
    if (existingSwitcher) return;
    
    const switcher = this.createThemeSwitcher();
    
    // Insert into header if it exists
    const header = Utils.query('site-header');
    if (header) {
      const nav = header.shadowRoot?.querySelector('nav') || header.querySelector('nav');
      if (nav) {
        nav.appendChild(switcher);
      }
    }
  }
  
  createThemeSwitcher() {
    const switcher = Utils.createElement('div', { className: 'theme-switcher' });
    
    const button = Utils.createElement('button', {
      className: 'theme-toggle-btn',
      'aria-label': 'Switch theme',
      title: 'Switch theme'
    });
    
    const icon = Utils.createElement('span', { 
      className: 'theme-icon',
      'aria-hidden': 'true'
    });
    
    button.appendChild(icon);
    switcher.appendChild(button);
    
    button.addEventListener('click', () => {
      this.switchTheme();
    });
    
    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.switchTheme();
      }
    });
    
    this.updateThemeSwitcherIcon(icon);
    
    return switcher;
  }
  
  updateThemeSwitcherUI() {
    const icons = Utils.queryAll('.theme-icon');
    icons.forEach(icon => {
      this.updateThemeSwitcherIcon(icon);
    });
    
    const buttons = Utils.queryAll('.theme-toggle-btn');
    buttons.forEach(button => {
      button.title = `Switch to ${this.getThemeDisplayName(this.nextTheme())} theme`;
      button.setAttribute('aria-label', `Switch to ${this.getThemeDisplayName(this.nextTheme())} theme`);
    });
  }
  
  updateThemeSwitcherIcon(icon) {
    const icons = {
      default: '☀️',
      dark: '🌙',
      ocean: '🌊'
    };
    
    icon.textContent = icons[this.currentTheme] || icons.default;
  }
  
  getThemeDisplayName(theme) {
    const names = {
      default: 'Light',
      dark: 'Dark',
      ocean: 'Ocean'
    };
    return names[theme] || Utils.capitalizeWords(theme);
  }
  
  setupMediaQueryListener() {
    // Listen for system theme changes
    const darkModeQuery = Utils.onMediaChange('(prefers-color-scheme: dark)', (e) => {
      // Only change theme if user hasn't manually set one
      if (!Utils.getLocalStorage('theme')) {
        const preferredTheme = e.matches ? 'dark' : 'default';
        this.applyTheme(preferredTheme);
      }
    });
  }
  
  // Theme-specific utilities
  isDarkTheme() {
    return this.currentTheme === 'dark';
  }
  
  isLightTheme() {
    return this.currentTheme === 'default';
  }
  
  isOceanTheme() {
    return this.currentTheme === 'ocean';
  }
  
  getThemeColor(property) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(property).trim();
  }
  
  // CSS injection for theme switcher styles
  injectThemeSwitcherStyles() {
    const styles = `
      .theme-switcher {
        display: flex;
        align-items: center;
        margin-left: auto;
      }
      
      .theme-toggle-btn {
        background: none;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 0.5rem;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        transition: all 0.3s ease;
      }
      
      .theme-toggle-btn:hover {
        background-color: var(--card-bg);
        border-color: var(--accent-color);
        transform: scale(1.05);
      }
      
      .theme-toggle-btn:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
      }
      
      .theme-icon {
        display: block;
        line-height: 1;
      }
      
      @media (max-width: 768px) {
        .theme-toggle-btn {
          width: 2rem;
          height: 2rem;
          font-size: 1rem;
        }
      }
    `;
    
    if (!Utils.query('#theme-switcher-styles')) {
      const styleSheet = Utils.createElement('style', {
        id: 'theme-switcher-styles',
        innerHTML: styles
      });
      document.head.appendChild(styleSheet);
    }
  }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    window.themeManager.injectThemeSwitcherStyles();
  });
} else {
  window.themeManager = new ThemeManager();
  window.themeManager.injectThemeSwitcherStyles();
}
