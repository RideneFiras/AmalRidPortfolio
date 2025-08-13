# Amal Ridene Portfolio Website

A professional portfolio website for Amal Ridene built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Mobile-first approach with full responsive layout
- **Theming**: Three built-in themes (Default, Dark, Ocean) with theme switching
- **Web Components**: Modular architecture using vanilla Web Components
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Content-Driven**: All content sourced from structured Markdown research

## Structure

```
/
├── Assets/
│   └── amal.png                 # Amal's profile photo
├── content/
│   └── amal_ridene_portfolio_research_full.md
├── css/
│   ├── base.css                 # Base styles and typography
│   ├── theme-default.css        # Default theme
│   ├── theme-dark.css           # Dark theme
│   └── theme-ocean.css          # Ocean theme
├── js/
│   ├── main.js                  # Application initialization
│   ├── theme.js                 # Theme management
│   ├── content.js               # Content parsing and management
│   ├── utils.js                 # Utility functions
│   └── components/              # Web Components
│       ├── header.js
│       ├── footer.js
│       ├── hero.js
│       ├── domain-card.js
│       ├── section-layout.js
│       ├── media-item.js
│       └── contact-form.js
├── index.html                   # Home page
├── about.html                   # About page
├── work.html                    # Work/domains page
├── media.html                   # Media & articles
└── contact.html                 # Contact page
```

## Running Locally

### Option 1: Simple File Opening
Open any HTML file directly in your browser. All files are linked with relative paths.

### Option 2: Local Server (Recommended)
For best results, serve the files through a local HTTP server to avoid CORS issues with content loading:

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if installed):
```bash
# Install a simple server
npm install -g http-server

# Run the server
http-server
```

#### Using VS Code Live Server:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then visit `http://localhost:8000` in your browser.

## Themes

The website supports three themes:
- **Default**: Light theme with green accents
- **Dark**: Dark mode with high contrast
- **Ocean**: Blue-themed variant

Theme preferences are automatically saved and restored on subsequent visits.

## Content

All content is sourced from the structured research document and includes:
- Profile overview and biography
- Three main domains: Climate Finance, Youth Empowerment, Stakeholder Engagement
- Notable speaking engagements and media features
- Contact information and social links
- Proper citations and source links

## Browser Support

Modern browsers supporting:
- ES6 Modules
- Web Components (Custom Elements)
- CSS Custom Properties
- CSS Grid and Flexbox

## License

Content and design for Amal Ridene. Code structure available for reference.
