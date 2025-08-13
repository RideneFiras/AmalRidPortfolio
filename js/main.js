// Main application initialization and content loading

import { Utils } from './utils.js';
import { ContentManager } from './content.js';
import './theme.js'; // Auto-initializes theme manager

// Import all components
import './components/header.js';
import './components/footer.js';
import './components/hero.js';
import './components/domain-card.js';
import './components/section-layout.js';
import './components/media-item.js';
import './components/contact-form.js';

class PortfolioApp {
  constructor() {
    this.contentManager = new ContentManager();
    this.currentPage = this.getCurrentPage();
    this.init();
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
  
  async init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeApp());
      } else {
        await this.initializeApp();
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      this.showErrorState();
    }
  }
  
  async initializeApp() {
    // Load content first
    await this.contentManager.loadContent();
    
    // Initialize page-specific functionality
    await this.initializePage();
    
    // Setup global event listeners
    this.setupEventListeners();
    
    // Initialize accessibility features
    this.initializeAccessibility();
    
    console.log(`Portfolio app initialized for page: ${this.currentPage}`);
  }
  
  async initializePage() {
    switch (this.currentPage) {
      case 'home':
        await this.initializeHomePage();
        break;
      case 'about':
        await this.initializeAboutPage();
        break;
      case 'work':
        await this.initializeWorkPage();
        break;
      case 'media':
        await this.initializeMediaPage();
        break;
      case 'contact':
        await this.initializeContactPage();
        break;
    }
  }
  
  async initializeHomePage() {
    try {
      // Load domain summaries for cards
      const domainSummaries = await this.contentManager.getDomainSummaries();
      
      // Populate domain cards
      const domainCardsContainer = Utils.query('.domain-cards');
      if (domainCardsContainer) {
        domainSummaries.forEach((domain, index) => {
          const card = document.createElement('domain-card');
          card.setAttribute('title', domain.title);
          card.setAttribute('summary', domain.summary);
          card.setAttribute('link', `work.html${domain.anchor}`);
          card.setAttribute('icon', this.getDomainIcon(domain.title));
          card.setAttribute('highlights', JSON.stringify(domain.highlights));
          
          // Add animation delay
          card.style.animationDelay = `${index * 0.2}s`;
          
          domainCardsContainer.appendChild(card);
        });
      }
      
      // Load profile overview for hero
      const profileOverview = await this.contentManager.getProfileOverview();
      const heroDescription = Utils.query('site-hero [slot="description"]');
      if (heroDescription && profileOverview) {
        // Extract first paragraph for hero
        const firstParagraph = profileOverview.match(/<p>(.*?)<\/p>/);
        if (firstParagraph) {
          heroDescription.innerHTML = firstParagraph[1];
        }
      }
      
    } catch (error) {
      console.error('Error initializing home page:', error);
    }
  }
  
  async initializeAboutPage() {
    try {
      const profileOverview = await this.contentManager.getProfileOverview();
      
      // Populate about content
      const aboutContent = Utils.query('.about-content');
      if (aboutContent && profileOverview) {
        aboutContent.innerHTML = profileOverview;
      }
      
      // Load key roles/affiliations
      this.populateKeyRoles();
      
    } catch (error) {
      console.error('Error initializing about page:', error);
    }
  }
  
  async initializeWorkPage() {
    try {
      // Load all domain content
      const climateFinance = await this.contentManager.getClimateFinanceContent();
      const youthEmpowerment = await this.contentManager.getYouthEmpowermentContent();
      const stakeholderEngagement = await this.contentManager.getStakeholderEngagementContent();
      
      // Populate sections
      this.populateWorkSection('climate-finance', climateFinance);
      this.populateWorkSection('youth-empowerment', youthEmpowerment);
      this.populateWorkSection('stakeholder-engagement', stakeholderEngagement);
      
      // Setup section navigation
      this.setupWorkNavigation();
      
    } catch (error) {
      console.error('Error initializing work page:', error);
    }
  }
  
  async initializeMediaPage() {
    try {
      const mediaItems = await this.contentManager.getMediaItems();
      
      // Populate media items
      const mediaGrid = Utils.query('.media-grid');
      if (mediaGrid) {
        mediaItems.forEach(item => {
          const mediaElement = document.createElement('media-item');
          mediaElement.setAttribute('title', item.title);
          mediaElement.setAttribute('description', item.description);
          mediaElement.setAttribute('url', item.url);
          mediaElement.setAttribute('tags', item.tags.join(', '));
          
          // Add image placeholder for certain items
          if (this.shouldHaveImagePlaceholder(item)) {
            mediaElement.setAttribute('image-placeholder', 'true');
            mediaElement.setAttribute('image-caption', this.getImageCaption(item));
          }
          
          mediaGrid.appendChild(mediaElement);
        });
      }
      
      // Setup media filters
      this.setupMediaFilters();
      
      // Load sources
      await this.loadSources();
      
    } catch (error) {
      console.error('Error initializing media page:', error);
    }
  }
  
  async initializeContactPage() {
    try {
      // Contact form is already initialized via its web component
      // Add any additional contact page functionality here
      
      // Load social links
      this.populateContactLinks();
      
    } catch (error) {
      console.error('Error initializing contact page:', error);
    }
  }
  
  populateWorkSection(sectionId, content) {
    const section = Utils.query(`#${sectionId}`);
    if (!section || !content) return;
    
    // Find content container
    const contentContainer = section.querySelector('.section-content') || section;
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content.content;
    
    contentContainer.appendChild(contentDiv);
    
    // Add highlights if available
    if (content.highlights && content.highlights.length > 0) {
      const sectionLayout = section.tagName === 'SECTION-LAYOUT' ? section : section.querySelector('section-layout');
      if (sectionLayout && sectionLayout.addHighlights) {
        sectionLayout.addHighlights(content.highlights);
      }
    }
  }
  
  setupWorkNavigation() {
    const sections = ['climate-finance', 'youth-empowerment', 'stakeholder-engagement'];
    const navLinks = sections.map(id => ({
      href: `#${id}`,
      text: Utils.capitalizeWords(id.replace('-', ' '))
    }));
    
    const firstSection = Utils.query('section-layout');
    if (firstSection && firstSection.addNavigation) {
      firstSection.addNavigation(navLinks);
    }
  }
  
  setupMediaFilters() {
    const filterContainer = Utils.query('.media-filters');
    if (!filterContainer) return;
    
    const filters = ['All', 'Climate', 'Youth', 'Engagement', 'Speaking', 'Media'];
    
    filters.forEach(filter => {
      const button = document.createElement('button');
      button.className = 'filter-btn';
      button.textContent = filter;
      button.setAttribute('data-filter', filter.toLowerCase());
      
      if (filter === 'All') {
        button.classList.add('active');
      }
      
      button.addEventListener('click', () => {
        this.applyMediaFilter(filter.toLowerCase());
        
        // Update active state
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });
      
      filterContainer.appendChild(button);
    });
  }
  
  applyMediaFilter(filter) {
    const mediaItems = Utils.queryAll('media-item');
    
    mediaItems.forEach(item => {
      const shouldShow = filter === 'all' || item.matchesFilter(filter);
      item.updateFilterState(shouldShow);
    });
    
    // Update visible count
    const visibleCount = Array.from(mediaItems).filter(item => 
      item.getAttribute('data-filtered') !== 'hidden'
    ).length;
    
    Utils.announceToScreenReader(`Showing ${visibleCount} media items`);
  }
  
  async loadSources() {
    const sources = await this.contentManager.getSources();
    const sourcesContainer = Utils.query('.sources-list');
    
    if (sourcesContainer && sources.length > 0) {
      const sourcesList = document.createElement('ul');
      sourcesList.className = 'sources-grid';
      
      sources.forEach(source => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = source.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = source.label;
        link.className = 'source-link';
        
        listItem.appendChild(link);
        sourcesList.appendChild(listItem);
      });
      
      sourcesContainer.appendChild(sourcesList);
    }
  }
  
  populateKeyRoles() {
    const roles = [
      'Curator, WEF Global Shapers Tunis Hub',
      'Chevening Scholar, University of Sussex',
      'Chairperson, 2024 World Scout Conference',
      'Advisory Panel Member, GFANZ',
      'Board Member, Arab Youth4COP Initiative'
    ];
    
    const rolesContainer = Utils.query('.key-roles');
    if (rolesContainer) {
      const rolesList = document.createElement('ul');
      rolesList.className = 'roles-list';
      
      roles.forEach(role => {
        const listItem = document.createElement('li');
        listItem.textContent = role;
        rolesList.appendChild(listItem);
      });
      
      rolesContainer.appendChild(rolesList);
    }
  }
  
  populateContactLinks() {
    const socialLinks = [
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/amal-ridene',
        icon: '💼'
      },
      {
        name: 'Linktree',
        url: 'https://linktr.ee/amalridene',
        icon: '🔗'
      }
    ];
    
    const linksContainer = Utils.query('.social-links-extended');
    if (linksContainer) {
      socialLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
        linkElement.className = 'social-link-extended';
        linkElement.innerHTML = `
          <span class="social-icon">${link.icon}</span>
          <span class="social-label">${link.name}</span>
        `;
        
        linksContainer.appendChild(linkElement);
      });
    }
  }
  
  getDomainIcon(title) {
    const icons = {
      'Climate Finance': '🌱',
      'Youth Empowerment': '🚀',
      'Stakeholder Engagement': '🤝'
    };
    return icons[title] || '📋';
  }
  
  shouldHaveImagePlaceholder(item) {
    const imageKeywords = ['keynote', 'panel', 'summit', 'conference', 'speaking'];
    return imageKeywords.some(keyword => 
      item.title.toLowerCase().includes(keyword) || 
      item.description.toLowerCase().includes(keyword)
    );
  }
  
  getImageCaption(item) {
    if (item.title.includes('BETD')) {
      return 'Photo placeholder — BETD 2024 keynote (add event image here)';
    }
    if (item.title.includes('RewirEd')) {
      return 'Photo placeholder — RewirEd Summit panel (Amal with UNICEF & WOSM leaders)';
    }
    if (item.title.includes('MENA Climate')) {
      return 'Photo placeholder — MENA Climate Week 2022 (add event photo here)';
    }
    return `Photo placeholder — ${item.title} (add event image here)`;
  }
  
  setupEventListeners() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          Utils.scrollToElement(target, { 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
    
    // Update active navigation on scroll
    this.setupScrollSpy();
    
    // Handle external links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="http"]');
      if (link && Utils.isExternalLink(link.href)) {
        // Add external link icon if not present
        if (!link.classList.contains('external-link')) {
          link.classList.add('external-link');
        }
      }
    });
  }
  
  setupScrollSpy() {
    const sections = Utils.queryAll('[id]');
    const navLinks = Utils.queryAll('a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          // Update navigation active state
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
  }
  
  initializeAccessibility() {
    // Add skip link functionality
    const skipLink = Utils.query('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = Utils.query('main') || Utils.query('.main-content');
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }
    
    // Improve focus management
    document.addEventListener('keydown', (e) => {
      // Escape key to close mobile menu
      if (e.key === 'Escape') {
        const mobileMenu = Utils.query('site-header')?.shadowRoot?.querySelector('.mobile-menu.open');
        if (mobileMenu) {
          mobileMenu.classList.remove('open');
        }
      }
    });
    
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  showErrorState() {
    const errorMessage = Utils.createElement('div', {
      className: 'error-state',
      innerHTML: `
        <h2>Something went wrong</h2>
        <p>We're having trouble loading the content. Please refresh the page or try again later.</p>
        <button onclick="window.location.reload()">Refresh Page</button>
      `
    });
    
    const main = Utils.query('main');
    if (main) {
      main.innerHTML = '';
      main.appendChild(errorMessage);
    }
  }
}

// Initialize the application
const app = new PortfolioApp();

// Export for potential use in other scripts
window.portfolioApp = app;
