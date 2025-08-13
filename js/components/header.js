// Site Header Component

import { Utils } from '../utils.js';

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.highlightActiveNavItem();
  }
  
  render() {
    const currentPage = this.getCurrentPage();
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: var(--nav-bg);
          box-shadow: 0 2px 4px var(--nav-shadow);
        }
        
        nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--heading-color);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .logo:hover {
          color: var(--accent-color);
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2rem;
        }
        
        .nav-links a {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-links a:hover {
          color: var(--accent-color);
          background-color: var(--card-bg);
        }
        
        .nav-links a.active {
          color: var(--accent-color);
          background-color: var(--card-bg);
        }
        
        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 2px;
          background-color: var(--accent-color);
          border-radius: 1px;
        }
        
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-color);
          padding: 0.5rem;
        }
        
        .nav-toggle:hover {
          color: var(--accent-color);
        }
        
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: var(--nav-bg);
          box-shadow: 0 4px 12px var(--nav-shadow);
          padding: 1rem;
        }
        
        .mobile-menu.open {
          display: block;
        }
        
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.5rem;
        }
        
        .mobile-nav-links a {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          padding: 1rem;
          border-radius: var(--border-radius);
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .mobile-nav-links a:hover,
        .mobile-nav-links a.active {
          color: var(--accent-color);
          background-color: var(--card-bg);
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .theme-switcher {
          display: flex;
          align-items: center;
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
        
        @media (max-width: 768px) {
          nav {
            padding: 0.75rem 1rem;
          }
          
          .nav-links {
            display: none;
          }
          
          .nav-toggle {
            display: block;
          }
          
          .theme-toggle-btn {
            width: 2rem;
            height: 2rem;
            font-size: 1rem;
            padding: 0.25rem;
          }
          
          .logo {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 480px) {
          nav {
            gap: 1rem;
          }
        }
      </style>
      
      <nav role="navigation" aria-label="Main navigation">
        <a href="index.html" class="logo" aria-label="Amal Ridene - Home">
          <span>Amal Ridene</span>
        </a>
        
        <ul class="nav-links" role="menubar">
          <li role="none">
            <a href="index.html" role="menuitem" ${currentPage === 'home' ? 'class="active"' : ''}>Home</a>
          </li>
          <li role="none">
            <a href="about.html" role="menuitem" ${currentPage === 'about' ? 'class="active"' : ''}>About</a>
          </li>
          <li role="none">
            <a href="work.html" role="menuitem" ${currentPage === 'work' ? 'class="active"' : ''}>Work</a>
          </li>
          <li role="none">
            <a href="media.html" role="menuitem" ${currentPage === 'media' ? 'class="active"' : ''}>Media</a>
          </li>
          <li role="none">
            <a href="contact.html" role="menuitem" ${currentPage === 'contact' ? 'class="active"' : ''}>Contact</a>
          </li>
        </ul>
        
        <div class="header-actions">
          <div class="theme-switcher">
            <button class="theme-toggle-btn" aria-label="Switch theme" title="Switch theme">
              <span class="theme-icon" aria-hidden="true">☀️</span>
            </button>
          </div>
          
          <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <span aria-hidden="true">☰</span>
          </button>
        </div>
        
        <div class="mobile-menu" role="menu" aria-hidden="true">
          <ul class="mobile-nav-links">
            <li><a href="index.html" role="menuitem" ${currentPage === 'home' ? 'class="active"' : ''}>Home</a></li>
            <li><a href="about.html" role="menuitem" ${currentPage === 'about' ? 'class="active"' : ''}>About</a></li>
            <li><a href="work.html" role="menuitem" ${currentPage === 'work' ? 'class="active"' : ''}>Work</a></li>
            <li><a href="media.html" role="menuitem" ${currentPage === 'media' ? 'class="active"' : ''}>Media</a></li>
            <li><a href="contact.html" role="menuitem" ${currentPage === 'contact' ? 'class="active"' : ''}>Contact</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
  
  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    if (!filename || filename === 'index.html') return 'home';
    if (filename === 'about.html') return 'about';
    if (filename === 'work.html') return 'work';
    if (filename === 'media.html') return 'media';
    if (filename === 'contact.html') return 'contact';
    
    return 'home';
  }
  
  setupEventListeners() {
    const navToggle = this.shadowRoot.querySelector('.nav-toggle');
    const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
    const themeToggle = this.shadowRoot.querySelector('.theme-toggle-btn');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      } else {
        mobileMenu.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
      if (window.themeManager) {
        window.themeManager.switchTheme();
      }
    });
    
    // Update theme icon when theme changes
    window.addEventListener('themechange', (e) => {
      this.updateThemeIcon(e.detail.theme);
    });
    
    // Close mobile menu on navigation
    const mobileLinks = this.shadowRoot.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }
  
  updateThemeIcon(theme) {
    const icon = this.shadowRoot.querySelector('.theme-icon');
    const button = this.shadowRoot.querySelector('.theme-toggle-btn');
    
    const icons = {
      default: '☀️',
      dark: '🌙',
      ocean: '🌊'
    };
    
    const nextTheme = this.getNextTheme(theme);
    const themeNames = {
      default: 'Light',
      dark: 'Dark',  
      ocean: 'Ocean'
    };
    
    icon.textContent = icons[theme] || icons.default;
    button.title = `Switch to ${themeNames[nextTheme]} theme`;
    button.setAttribute('aria-label', `Switch to ${themeNames[nextTheme]} theme`);
  }
  
  getNextTheme(currentTheme) {
    const themes = ['default', 'dark', 'ocean'];
    const currentIndex = themes.indexOf(currentTheme);
    return themes[(currentIndex + 1) % themes.length];
  }
  
  highlightActiveNavItem() {
    // This will be called when the component is connected
    // Active state is already set in render() method
  }
}

customElements.define('site-header', SiteHeader);
