// Media Item Component

class MediaItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }
  
  static get observedAttributes() {
    return ['title', 'description', 'url', 'tags', 'image-placeholder', 'image-caption'];
  }
  
  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }
  
  render() {
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';
    const url = this.getAttribute('url') || '';
    const tagsString = this.getAttribute('tags') || '';
    const imagePlaceholder = this.getAttribute('image-placeholder') === 'true';
    const imageCaption = this.getAttribute('image-caption') || '';
    
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .media-card {
          background: var(--media-item-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .media-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--media-item-hover-shadow);
          border-color: var(--accent-color);
        }
        
        .media-image {
          position: relative;
          overflow: hidden;
        }
        
        .image-placeholder {
          width: 100%;
          height: 200px;
          background: var(--placeholder-bg);
          border-bottom: 2px dashed var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 0.875rem;
          text-align: center;
          position: relative;
        }
        
        .placeholder-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .placeholder-text {
          max-width: 200px;
          line-height: 1.4;
        }
        
        .image-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem;
          font-size: 0.75rem;
          text-align: center;
        }
        
        .media-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .media-header {
          margin-bottom: 1rem;
        }
        
        .media-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--heading-color);
          margin-bottom: 0.5rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .media-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        
        .media-tag {
          background: rgba(var(--accent-color-rgb), 0.1);
          color: var(--accent-color);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.25px;
        }
        
        .media-description {
          color: var(--text-color);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .media-actions {
          margin-top: auto;
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
        }
        
        .media-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-color);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          border: 1px solid transparent;
        }
        
        .media-link:hover {
          background-color: var(--accent-color);
          color: var(--btn-text-color);
          border-color: var(--accent-color);
          transform: translateX(3px);
        }
        
        .media-link::after {
          content: '↗';
          transition: transform 0.3s ease;
        }
        
        .media-link:hover::after {
          transform: scale(1.2);
        }
        
        .media-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .meta-icon {
          width: 16px;
          height: 16px;
          opacity: 0.7;
        }
        
        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--accent-color);
          color: var(--btn-text-color);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          z-index: 2;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }
        
        .media-card:hover .featured-badge {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Filter states */
        :host([data-filtered="hidden"]) {
          display: none;
        }
        
        :host([data-filtered="show"]) {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .media-content {
            padding: 1rem;
          }
          
          .media-title {
            font-size: 1.125rem;
          }
          
          .media-actions {
            flex-direction: column;
            gap: 0.75rem;
            align-items: stretch;
          }
          
          .media-link {
            justify-content: center;
          }
          
          .image-placeholder {
            height: 150px;
          }
        }
      </style>
      
      <article class="media-card">
        ${tags.some(tag => tag.toLowerCase() === 'featured') ? '<div class="featured-badge">Featured</div>' : ''}
        
        ${imagePlaceholder ? `
          <div class="media-image">
            <div class="image-placeholder">
              <div>
                <div class="placeholder-icon">🖼️</div>
                <div class="placeholder-text">${imageCaption || 'Event photo placeholder'}</div>
              </div>
            </div>
            ${imageCaption ? `<div class="image-caption">${imageCaption}</div>` : ''}
          </div>
        ` : ''}
        
        <div class="media-content">
          <header class="media-header">
            <h3 class="media-title">${title}</h3>
            ${tags.length > 0 ? `
              <div class="media-tags">
                ${tags.map(tag => `<span class="media-tag">${tag}</span>`).join('')}
              </div>
            ` : ''}
          </header>
          
          <div class="media-description">${description}</div>
          
          <footer class="media-actions">
            ${url ? `
              <a href="${url}" 
                 class="media-link external-link" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 aria-label="Read more about ${title} (opens in new tab)">
                Learn More
              </a>
            ` : `
              <span class="media-meta">
                <span class="meta-icon">📅</span>
                Coming Soon
              </span>
            `}
            
            <div class="media-meta">
              <span class="meta-icon">🔗</span>
              ${url ? 'External Link' : 'Internal Content'}
            </div>
          </footer>
        </div>
      </article>
    `;
  }
  
  setupEventListeners() {
    const card = this.shadowRoot.querySelector('.media-card');
    const link = this.shadowRoot.querySelector('.media-link');
    
    // Analytics tracking
    if (link) {
      link.addEventListener('click', () => {
        const title = this.getAttribute('title');
        const url = this.getAttribute('url');
        console.log(`Media item clicked: ${title} -> ${url}`);
        
        // Could integrate with analytics service here
        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'media',
            event_label: title,
            value: url
          });
        }
      });
    }
    
    // Keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (link) {
          link.click();
        }
      }
    });
    
    // Add tabindex for keyboard navigation
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Initial state for animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(card);
  }
  
  // Method to update filter state
  updateFilterState(show) {
    this.setAttribute('data-filtered', show ? 'show' : 'hidden');
  }
  
  // Method to check if item matches filter
  matchesFilter(filter) {
    if (!filter || filter === 'all') return true;
    
    const tags = this.getAttribute('tags') || '';
    return tags.toLowerCase().includes(filter.toLowerCase());
  }
}

customElements.define('media-item', MediaItem);
