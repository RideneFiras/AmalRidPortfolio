// Contact Form Component

import { Utils } from '../utils.js';

class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .contact-form {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .form-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--heading-color);
          margin-bottom: 0.5rem;
        }
        
        .form-subtitle {
          color: var(--text-muted);
          font-size: 1rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group.required label::after {
          content: '*';
          color: #e74c3c;
          margin-left: 0.25rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--heading-color);
          font-size: 0.875rem;
        }
        
        input,
        textarea,
        select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid var(--border-color);
          border-radius: var(--border-radius);
          background-color: var(--input-bg);
          color: var(--text-color);
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.1);
        }
        
        input::placeholder,
        textarea::placeholder {
          color: var(--text-muted);
        }
        
        textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 0.875rem 2rem;
          border: none;
          border-radius: var(--border-radius);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
        }
        
        .btn-primary {
          background-color: var(--accent-color);
          color: var(--btn-text-color);
          box-shadow: 0 2px 8px rgba(var(--accent-color-rgb), 0.3);
        }
        
        .btn-primary:hover:not(:disabled) {
          background-color: var(--accent-hover-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(var(--accent-color-rgb), 0.4);
        }
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-secondary {
          background: transparent;
          border: 2px solid var(--border-color);
          color: var(--text-color);
        }
        
        .btn-secondary:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }
        
        .error {
          border-color: #e74c3c !important;
          box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
        }
        
        .error-message {
          color: #e74c3c;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: none;
        }
        
        .error-message.show {
          display: block;
        }
        
        .success-message {
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 1rem;
          display: none;
        }
        
        .success-message.show {
          display: block;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .form-note {
          background: rgba(var(--accent-color-rgb), 0.05);
          border: 1px solid rgba(var(--accent-color-rgb), 0.2);
          border-radius: var(--border-radius);
          padding: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          color: var(--text-color);
        }
        
        .form-note-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .contact-form {
            padding: 1.5rem;
            margin: 0 1rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .form-actions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .btn {
            justify-content: center;
          }
        }
      </style>
      
      <form class="contact-form" novalidate>
        <div class="form-header">
          <h2 class="form-title">Get In Touch</h2>
          <p class="form-subtitle">I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
        </div>
        
        <div class="form-note">
          <div class="form-note-title">
            <span>💡</span>
            Quick Connect
          </div>
          <p>For immediate connection, you can also reach out via <a href="https://linkedin.com/in/amal-ridene" target="_blank" rel="noopener">LinkedIn</a> or check out all my links on <a href="https://linktr.ee/amalridene" target="_blank" rel="noopener">Linktree</a>.</p>
        </div>
        
        <div class="success-message" role="alert">
          <strong>Message Sent!</strong> Thank you for reaching out. I'll get back to you soon.
        </div>
        
        <div class="form-row">
          <div class="form-group required">
            <label for="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              placeholder="Your first name"
              required
              aria-describedby="firstName-error">
            <div class="error-message" id="firstName-error"></div>
          </div>
          
          <div class="form-group required">
            <label for="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              placeholder="Your last name"
              required
              aria-describedby="lastName-error">
            <div class="error-message" id="lastName-error"></div>
          </div>
        </div>
        
        <div class="form-group required">
          <label for="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="your.email@example.com"
            required
            aria-describedby="email-error">
          <div class="error-message" id="email-error"></div>
        </div>
        
        <div class="form-group">
          <label for="subject">Subject</label>
          <select id="subject" name="subject" aria-describedby="subject-error">
            <option value="">Select a subject</option>
            <option value="collaboration">Collaboration Opportunity</option>
            <option value="speaking">Speaking Engagement</option>
            <option value="interview">Media Interview</option>
            <option value="mentorship">Mentorship Inquiry</option>
            <option value="climate">Climate Finance Discussion</option>
            <option value="youth">Youth Empowerment</option>
            <option value="other">Other</option>
          </select>
          <div class="error-message" id="subject-error"></div>
        </div>
        
        <div class="form-group required">
          <label for="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            placeholder="Tell me about your project, opportunity, or question..."
            required
            aria-describedby="message-error"></textarea>
          <div class="error-message" id="message-error"></div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            <span class="btn-text">Send Message</span>
            <span class="loading-spinner" style="display: none;"></span>
          </button>
          <button type="reset" class="btn btn-secondary">Clear Form</button>
        </div>
      </form>
    `;
  }
  
  setupEventListeners() {
    const form = this.shadowRoot.querySelector('.contact-form');
    const submitBtn = this.shadowRoot.querySelector('button[type="submit"]');
    const resetBtn = this.shadowRoot.querySelector('button[type="reset"]');
    const inputs = this.shadowRoot.querySelectorAll('input, textarea, select');
    
    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
    
    // Form reset
    resetBtn.addEventListener('click', () => {
      this.clearErrors();
      this.hideSuccessMessage();
    });
    
    // Real-time validation
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    let isValid = true;
    let message = '';
    
    // Required field validation
    if (field.required && !value) {
      isValid = false;
      message = 'This field is required.';
    }
    
    // Email validation
    if (name === 'email' && value && !Utils.validateEmail(value)) {
      isValid = false;
      message = 'Please enter a valid email address.';
    }
    
    // Name validation
    if ((name === 'firstName' || name === 'lastName') && value && value.length < 2) {
      isValid = false;
      message = 'Name must be at least 2 characters long.';
    }
    
    // Message validation
    if (name === 'message' && value && value.length < 10) {
      isValid = false;
      message = 'Message must be at least 10 characters long.';
    }
    
    this.showFieldError(field, isValid ? '' : message);
    return isValid;
  }
  
  validateForm() {
    const form = this.shadowRoot.querySelector('.contact-form');
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  showFieldError(field, message) {
    const errorElement = this.shadowRoot.querySelector(`#${field.name}-error`);
    
    if (message) {
      field.classList.add('error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('error');
      errorElement.classList.remove('show');
      field.setAttribute('aria-invalid', 'false');
    }
  }
  
  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = this.shadowRoot.querySelector(`#${field.name}-error`);
    errorElement.classList.remove('show');
    field.setAttribute('aria-invalid', 'false');
  }
  
  clearErrors() {
    const form = this.shadowRoot.querySelector('.contact-form');
    const fields = form.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
      this.clearFieldError(field);
    });
  }
  
  showSuccessMessage() {
    const successMessage = this.shadowRoot.querySelector('.success-message');
    successMessage.classList.add('show');
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Announce to screen readers
    Utils.announceToScreenReader('Message sent successfully!');
  }
  
  hideSuccessMessage() {
    const successMessage = this.shadowRoot.querySelector('.success-message');
    successMessage.classList.remove('show');
  }
  
  setLoadingState(loading) {
    const submitBtn = this.shadowRoot.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    if (loading) {
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      spinner.style.display = 'block';
    } else {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      spinner.style.display = 'none';
    }
  }
  
  async handleSubmit() {
    this.hideSuccessMessage();
    
    if (!this.validateForm()) {
      // Focus on first error field
      const firstError = this.shadowRoot.querySelector('.error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }
    
    this.setLoadingState(true);
    
    // Get form data
    const form = this.shadowRoot.querySelector('.contact-form');
    const formData = Utils.serializeForm(form);
    
    try {
      // Simulate form submission (replace with actual submission logic)
      await this.submitForm(formData);
      
      // Show success message
      this.showSuccessMessage();
      
      // Reset form
      form.reset();
      this.clearErrors();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again or contact me directly via LinkedIn.');
    } finally {
      this.setLoadingState(false);
    }
  }
  
  async submitForm(formData) {
    // This is a placeholder for form submission
    // In a real implementation, you would:
    // 1. Send to a backend API
    // 2. Use a service like Formspree, Netlify Forms, etc.
    // 3. Send via mailto (basic fallback)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', formData);
        resolve();
      }, 1500);
    });
  }
  
  // Public method to pre-fill form
  setFormData(data) {
    Object.keys(data).forEach(key => {
      const field = this.shadowRoot.querySelector(`[name="${key}"]`);
      if (field) {
        field.value = data[key];
      }
    });
  }
}

customElements.define('contact-form', ContactForm);
