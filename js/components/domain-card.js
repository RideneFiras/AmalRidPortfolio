// Domain Card Component

class DomainCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }
  
  static get observedAttributes() {
    return ['title', 'summary', 'link', 'icon', 'highlights'];
  }
  
  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }
  
  render() {
    const title = this.getAttribute('title') || '';
    const summary = this.getAttribute('summary') || '';
    const link = this.getAttribute('link') || '#';
    const icon = this.getAttribute('icon') || '📋';
    const highlightsData = this.getAttribute('highlights');
    
    let highlights = [];
    if (highlightsData) {
      try {
        highlights = JSON.parse(highlightsData);
      } catch (e) {
        highlights = [];
      }
    }
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .card {
          background: var(--domain-card-bg);
          border: 2px solid var(--domain-card-border);
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: var(--media-item-hover-shadow);
          border-color: var(--accent-color);
        }
        
        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-color), var(--accent-hover-color));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .card:hover::before {
          opacity: 1;
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .card-icon {
          font-size: 2.5rem;
          line-height: 1;
        }
        
        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--heading-color);
          margin: 0;
          flex: 1;
        }
        
        .card-summary {
          color: var(--text-color);
          margin-bottom: 1.5rem;
          line-height: 1.6;
          flex: 1;
        }
        
        .highlights {
          margin-bottom: 2rem;
        }
        
        .highlights-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }
        
        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .highlights-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-color);
          line-height: 1.4;
        }
        
        .highlights-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: bold;
        }
        
        .card-actions {
          margin-top: auto;
        }
        
        .learn-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 2px solid var(--accent-color);
          color: var(--accent-color);
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .learn-more-btn:hover {
          background-color: var(--accent-color);
          color: var(--btn-text-color);
          transform: translateX(5px);
        }
        
        .learn-more-btn::after {
          content: '→';
          transition: transform 0.3s ease;
        }
        
        .learn-more-btn:hover::after {
          transform: translateX(3px);
        }
        
        .card-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--accent-color);
          color: var(--btn-text-color);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }
        
        .card:hover .card-badge {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (max-width: 768px) {
          .card {
            padding: 1.5rem;
          }
          
          .card-header {
            margin-bottom: 1rem;
          }
          
          .card-icon {
            font-size: 2rem;
          }
          
          .card-title {
            font-size: 1.25rem;
          }
          
          .highlights {
            margin-bottom: 1.5rem;
          }
        }
      </style>
      
      <article class="card">
        <div class="card-badge">Featured</div>
        
        <header class="card-header">
          <div class="card-icon" aria-hidden="true">${icon}</div>
          <h3 class="card-title">${title}</h3>
        </header>
        
        <div class="card-summary">
          ${summary}
        </div>
        
        ${highlights.length > 0 ? `
          <div class="highlights">
            <div class="highlights-title">Key Highlights</div>
            <ul class="highlights-list">
              ${highlights.map(highlight => `
                <li>${highlight}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        <div class="card-actions">
          <a href="${link}" class="learn-more-btn" aria-label="Learn more about ${title}">
            Learn More
          </a>
        </div>
      </article>
    `;
  }
  
  setupEventListeners() {
    const card = this.shadowRoot.querySelector('.card');
    const button = this.shadowRoot.querySelector('.learn-more-btn');
    
    // Add keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
    
    // Add click tracking
    button.addEventListener('click', (e) => {
      // Analytics or tracking code could go here
      const title = this.getAttribute('title');
      console.log(`Domain card clicked: ${title}`);
    });
    
    // Add intersection observer for scroll animations
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
}

customElements.define('domain-card', DomainCard);
