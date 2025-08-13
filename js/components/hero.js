// Hero Section Component

class SiteHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupAnimations();
  }
  
  static get observedAttributes() {
    return ['title', 'subtitle', 'show-image', 'image-alt', 'cta-text', 'cta-link'];
  }
  
  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }
  
  render() {
    const title = this.getAttribute('title') || 'Amal Ridene';
    const subtitle = this.getAttribute('subtitle') || 'Sustainable Development Professional & Youth Leader';
    const showImage = this.hasAttribute('show-image');
    const imageAlt = this.getAttribute('image-alt') || 'Amal Ridene professional photo';
    const ctaText = this.getAttribute('cta-text');
    const ctaLink = this.getAttribute('cta-link');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--hero-bg);
          position: relative;
          overflow: hidden;
        }
        
        :host::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--hero-overlay);
          z-index: 1;
        }
        
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1rem;
          position: relative;
          z-index: 2;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: ${showImage ? '1fr 300px' : '1fr'};
          gap: 3rem;
          align-items: center;
          min-height: 60vh;
        }
        
        .hero-text {
          ${showImage ? '' : 'text-align: center; max-width: 800px; margin: 0 auto;'}
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--heading-color);
          margin-bottom: 1.5rem;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.2s forwards;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--text-color);
          margin-bottom: 2rem;
          line-height: 1.4;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.4s forwards;
        }
        
        .hero-description {
          font-size: 1.125rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.6s forwards;
        }
        
        .hero-cta {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.8s forwards;
        }
        
        .cta-button {
          display: inline-block;
          background-color: var(--accent-color);
          color: var(--btn-text-color);
          padding: 1rem 2rem;
          border-radius: var(--border-radius-lg);
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(var(--accent-color-rgb), 0.3);
        }
        
        .cta-button:hover {
          background-color: var(--accent-hover-color);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(var(--accent-color-rgb), 0.4);
        }
        
        .hero-image {
          text-align: center;
          opacity: 0;
          transform: scale(0.8);
          animation: fadeInScale 1s ease 0.6s forwards;
        }
        
        .hero-image img {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: var(--border-radius-lg);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        
        .hero-image img:hover {
          transform: scale(1.05);
        }
        
        .achievements {
          display: flex;
          justify-content: space-around;
          margin-top: 3rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--border-radius-lg);
          backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 1s forwards;
        }
        
        .achievement {
          text-align: center;
        }
        
        .achievement-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-color);
          display: block;
        }
        
        .achievement-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 0.25rem;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @media (max-width: 768px) {
          .hero-container {
            padding: 3rem 1rem;
          }
          
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
          
          .hero-description {
            font-size: 1rem;
          }
          
          .achievements {
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 2rem;
            padding: 1.5rem;
          }
          
          .achievement {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }
          
          .achievement-number {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.125rem;
          }
          
          .cta-button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }
      </style>
      
      <section class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">${title}</h1>
            <div class="hero-subtitle">${subtitle}</div>
            <div class="hero-description">
              <slot name="description">
                Climate finance expert, youth empowerment leader, and stakeholder engagement specialist working to build a sustainable future through collaboration and innovation.
              </slot>
            </div>
            ${ctaText && ctaLink ? `
              <div class="hero-cta">
                <a href="${ctaLink}" class="cta-button">${ctaText}</a>
              </div>
            ` : ''}
          </div>
          
          ${showImage ? `
            <div class="hero-image">
              <img src="Assets/amal.png" alt="${imageAlt}" class="no-filter">
            </div>
          ` : ''}
        </div>
        
        <div class="achievements">
          <div class="achievement">
            <span class="achievement-number">3</span>
            <span class="achievement-label">COP Conferences</span>
          </div>
          <div class="achievement">
            <span class="achievement-number">10+</span>
            <span class="achievement-label">Board Positions</span>
          </div>
          <div class="achievement">
            <span class="achievement-number">Global</span>
            <span class="achievement-label">Impact</span>
          </div>
        </div>
      </section>
    `;
  }
  
  setupAnimations() {
    // Add intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Observe achievement elements for staggered animation
    const achievements = this.shadowRoot.querySelectorAll('.achievement');
    achievements.forEach((achievement, index) => {
      achievement.style.animationDelay = `${1.2 + (index * 0.2)}s`;
      observer.observe(achievement);
    });
  }
}

customElements.define('site-hero', SiteHero);
