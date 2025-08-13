// Utility functions

export class Utils {
  // DOM manipulation utilities
  static createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
      if (key === 'className') {
        element.className = attributes[key];
      } else if (key === 'innerHTML') {
        element.innerHTML = attributes[key];
      } else {
        element.setAttribute(key, attributes[key]);
      }
    });
    
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    
    return element;
  }
  
  static query(selector, context = document) {
    return context.querySelector(selector);
  }
  
  static queryAll(selector, context = document) {
    return context.querySelectorAll(selector);
  }
  
  // Hash routing utilities
  static getHashRoute() {
    return window.location.hash.slice(1) || '';
  }
  
  static setHashRoute(route) {
    window.location.hash = route;
  }
  
  static onHashChange(callback) {
    window.addEventListener('hashchange', callback);
  }
  
  // Local storage utilities
  static getLocalStorage(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return defaultValue;
    }
  }
  
  static setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Error writing to localStorage:', error);
    }
  }
  
  // Text processing utilities
  static truncate(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  }
  
  static slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  static capitalizeWords(text) {
    return text.replace(/\b\w/g, l => l.toUpperCase());
  }
  
  // Array utilities
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  static groupBy(array, keyFn) {
    return array.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  }
  
  // Animation utilities
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  static fadeOut(element, duration = 300) {
    const start = performance.now();
    const startOpacity = parseFloat(getComputedStyle(element).opacity);
    
    function animate(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = startOpacity * (1 - progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Debounce utility
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Throttle utility
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // URL and link utilities
  static isExternalLink(url) {
    try {
      const link = new URL(url, window.location.href);
      return link.hostname !== window.location.hostname;
    } catch (error) {
      return false;
    }
  }
  
  static openExternalLink(url, target = '_blank') {
    const link = document.createElement('a');
    link.href = url;
    link.target = target;
    link.rel = 'noopener noreferrer';
    link.click();
  }
  
  // Accessibility utilities
  static announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  // Scroll utilities
  static scrollToElement(element, options = {}) {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    };
    
    element.scrollIntoView({ ...defaultOptions, ...options });
  }
  
  static getScrollPosition() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
  
  // Media query utilities
  static matchMedia(query) {
    return window.matchMedia(query).matches;
  }
  
  static onMediaChange(query, callback) {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addListener(callback);
    return mediaQuery;
  }
  
  // Loading utilities
  static showLoading(container) {
    const loader = this.createElement('div', {
      className: 'loading-spinner',
      innerHTML: '<div class="spinner"></div><span>Loading...</span>'
    });
    container.appendChild(loader);
    return loader;
  }
  
  static hideLoading(loader) {
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  }
  
  // Form utilities
  static serializeForm(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  }
  
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
