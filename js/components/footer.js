// Site Footer Component

class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: auto;
        }
        
        footer {
          background-color: var(--footer-bg);
          color: var(--footer-text);
          border-top: 1px solid var(--footer-border);
          padding: 2rem 0 1rem;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          text-align: center;
        }
        
        .footer-main {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
          text-align: left;
        }
        
        .footer-section h3 {
          color: var(--heading-color);
          font-size: 1.125rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .footer-section p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin: 1rem 0;
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: var(--card-bg);
          border: 2px solid var(--border-color);
          color: var(--text-color);
          text-decoration: none;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }
        
        .social-links a:hover {
          background-color: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--btn-text-color);
          transform: translateY(-2px);
        }
        
        .quick-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .quick-links li {
          margin-bottom: 0.5rem;
        }
        
        .quick-links a {
          color: var(--text-color);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .quick-links a:hover {
          color: var(--accent-color);
        }
        
        .footer-bottom {
          border-top: 1px solid var(--footer-border);
          padding-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
        }
        
        .footer-bottom p {
          margin: 0.25rem 0;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        
        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.875rem;
        }
        
        .footer-links a:hover {
          color: var(--accent-color);
        }
        
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.5rem;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      </style>
      
      <footer role="contentinfo">
        <div class="footer-content">
          <div class="footer-main">
            <div class="footer-section">
              <h3>Amal Ridene</h3>
              <p>Sustainable development professional and youth leader focused on climate finance, youth empowerment, and stakeholder engagement.</p>
              <div class="social-links">
                <a href="https://linkedin.com/in/amal-ridene" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   aria-label="LinkedIn profile"
                   title="LinkedIn">
                  <span aria-hidden="true">📧</span>
                </a>
                <a href="https://linktr.ee/amalridene" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   aria-label="Linktree profile"
                   title="All Links">
                  <span aria-hidden="true">🔗</span>
                </a>
              </div>
            </div>
            
            <div class="footer-section">
              <h3>Quick Links</h3>
              <ul class="quick-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="work.html">Work</a></li>
                <li><a href="media.html">Media & Articles</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            
            <div class="footer-section">
              <h3>Focus Areas</h3>
              <ul class="quick-links">
                <li><a href="work.html#climate-finance">Climate Finance</a></li>
                <li><a href="work.html#youth-empowerment">Youth Empowerment</a></li>
                <li><a href="work.html#stakeholder-engagement">Stakeholder Engagement</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Amal Ridene. All rights reserved.</p>
            <p>Building a sustainable future through collaboration and youth leadership.</p>
            <div class="footer-links">
              <a href="#" onclick="return false;">Privacy Policy</a>
              <a href="#" onclick="return false;">Terms of Use</a>
              <a href="contact.html">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
