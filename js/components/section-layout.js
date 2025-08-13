// Section Layout Component

class SectionLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupScrollAnimation();
  }
  
  static get observedAttributes() {
    return ['title', 'subtitle', 'id', 'background'];
  }
  
  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }
  
  render() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const id = this.getAttribute('id') || '';
    const background = this.getAttribute('background') || 'default';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
        }
        
        :host([background="alternate"]) .section {
          background-color: var(--card-bg);
        }
        
        :host([background="accent"]) .section {
          background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.05) 0%, rgba(var(--accent-color-rgb), 0.1) 100%);
        }
        
        .section {
          padding: 4rem 0;
          transition: background-color 0.3s ease;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        
        .section-header.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--heading-color);
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-color), var(--accent-hover-color));
          border-radius: 2px;
        }
        
        .section-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .section-content {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease 0.2s;
        }
        
        .section-content.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-nav {
          position: sticky;
          top: 80px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          padding: 1rem;
          margin-bottom: 2rem;
          z-index: 10;
          box-shadow: var(--shadow-sm);
        }
        
        .section-nav-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .section-nav-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .section-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          color: var(--text-color);
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .section-nav-link:hover,
        .section-nav-link.active {
          background-color: var(--accent-color);
          color: var(--btn-text-color);
          border-color: var(--accent-color);
        }
        
        .section-nav-link::before {
          content: '#';
          opacity: 0.7;
        }
        
        .highlights-section {
          margin-top: 3rem;
          padding: 2rem;
          background: var(--card-bg);
          border-radius: var(--border-radius-lg);
          border-left: 4px solid var(--accent-color);
        }
        
        .highlights-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--heading-color);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .highlights-title::before {
          content: '⭐';
          font-size: 1rem;
        }
        
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }
        
        .highlight-item {
          padding: 1rem;
          background: rgba(var(--accent-color-rgb), 0.05);
          border-radius: var(--border-radius);
          border: 1px solid rgba(var(--accent-color-rgb), 0.1);
          position: relative;
        }
        
        .highlight-item::before {
          content: '✓';
          position: absolute;
          top: 1rem;
          left: 1rem;
          color: var(--accent-color);
          font-weight: bold;
        }
        
        .highlight-item-content {
          padding-left: 2rem;
          color: var(--text-color);
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .section {
            padding: 3rem 0;
          }
          
          .section-header {
            margin-bottom: 2rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-subtitle {
            font-size: 1.125rem;
          }
          
          .section-nav {
            top: 70px;
            position: relative;
            margin-bottom: 1.5rem;
          }
          
          .section-nav-links {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .highlights-section {
            margin-top: 2rem;
            padding: 1.5rem;
          }
          
          .highlights-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <section class="section" ${id ? `id="${id}"` : ''}>
        <div class="container">
          ${title ? `
            <header class="section-header">
              <h2 class="section-title">${title}</h2>
              ${subtitle ? `<div class="section-subtitle">${subtitle}</div>` : ''}
            </header>
          ` : ''}
          
          <div class="section-content">
            <slot name="nav"></slot>
            <slot></slot>
            <slot name="highlights"></slot>
          </div>
        </div>
      </section>
    `;
  }
  
  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Observe header and content for animations
    const header = this.shadowRoot.querySelector('.section-header');
    const content = this.shadowRoot.querySelector('.section-content');
    
    if (header) observer.observe(header);
    if (content) observer.observe(content);
  }
  
  // Method to add highlights programmatically
  addHighlights(highlights) {
    if (!highlights || highlights.length === 0) return;
    
    const highlightsSection = document.createElement('div');
    highlightsSection.className = 'highlights-section';
    highlightsSection.slot = 'highlights';
    
    const title = document.createElement('div');
    title.className = 'highlights-title';
    title.textContent = 'Key Highlights';
    
    const grid = document.createElement('div');
    grid.className = 'highlights-grid';
    
    highlights.forEach(highlight => {
      const item = document.createElement('div');
      item.className = 'highlight-item';
      
      const content = document.createElement('div');
      content.className = 'highlight-item-content';
      content.innerHTML = highlight;
      
      item.appendChild(content);
      grid.appendChild(item);
    });
    
    highlightsSection.appendChild(title);
    highlightsSection.appendChild(grid);
    this.appendChild(highlightsSection);
  }
  
  // Method to add navigation
  addNavigation(links) {
    if (!links || links.length === 0) return;
    
    const nav = document.createElement('nav');
    nav.className = 'section-nav';
    nav.slot = 'nav';
    nav.setAttribute('aria-label', 'Section navigation');
    
    const navTitle = document.createElement('div');
    navTitle.className = 'section-nav-title';
    navTitle.textContent = 'Jump to Section';
    
    const navLinks = document.createElement('div');
    navLinks.className = 'section-nav-links';
    
    links.forEach(link => {
      const navLink = document.createElement('a');
      navLink.className = 'section-nav-link';
      navLink.href = link.href;
      navLink.textContent = link.text;
      navLink.addEventListener('click', (e) => {
        // Update active state
        navLinks.querySelectorAll('.section-nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      });
      
      navLinks.appendChild(navLink);
    });
    
    nav.appendChild(navTitle);
    nav.appendChild(navLinks);
    this.appendChild(nav);
  }
}

customElements.define('section-layout', SectionLayout);
