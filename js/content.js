// Content parsing and management

import { Utils } from './utils.js';

export class ContentManager {
  constructor() {
    this.content = null;
    this.contentPath = './content/amal_ridene_portfolio_research_full.md';
  }
  
  async loadContent() {
    if (this.content) {
      return this.content;
    }
    
    try {
      const response = await fetch(this.contentPath);
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }
      
      const markdown = await response.text();
      this.content = this.parseMarkdown(markdown);
      return this.content;
    } catch (error) {
      console.error('Error loading content:', error);
      return this.getDefaultContent();
    }
  }
  
  parseMarkdown(markdown) {
    const content = {
      profileOverview: '',
      climateFinance: { content: '', highlights: [] },
      youthEmpowerment: { content: '', highlights: [] },
      stakeholderEngagement: { content: '', highlights: [] },
      mediaItems: [],
      sources: []
    };
    
    // Split content by main sections
    const sections = markdown.split(/^## |^# /m);
    
    sections.forEach(section => {
      const lines = section.split('\n');
      const title = lines[0].trim();
      const sectionContent = lines.slice(1).join('\n').trim();
      
      if (title.toLowerCase().includes('profile overview')) {
        content.profileOverview = this.cleanContent(sectionContent);
      } else if (title.toLowerCase().includes('climate finance')) {
        content.climateFinance = this.parseTopicSection(sectionContent);
      } else if (title.toLowerCase().includes('youth empowerment')) {
        content.youthEmpowerment = this.parseTopicSection(sectionContent);
      } else if (title.toLowerCase().includes('stakeholder engagement')) {
        content.stakeholderEngagement = this.parseTopicSection(sectionContent);
      } else if (title.toLowerCase().includes('speaking engagements') || 
                 title.toLowerCase().includes('media features')) {
        content.mediaItems = this.parseMediaItems(sectionContent);
      }
    });
    
    // Extract sources from the end of the document
    content.sources = this.parseSources(markdown);
    
    return content;
  }
  
  parseTopicSection(content) {
    const cleanedContent = this.cleanContent(content);
    const highlights = this.extractHighlights(content);
    
    return {
      content: cleanedContent,
      highlights: highlights
    };
  }
  
  parseMediaItems(content) {
    const items = [];
    const lines = content.split('\n');
    let currentItem = null;
    
    lines.forEach(line => {
      line = line.trim();
      if (!line) return;
      
      // Check if this is a new media item (starts with bullet or dash)
      if (line.match(/^[•\-\*]/)) {
        if (currentItem) {
          items.push(currentItem);
        }
        
        // Extract title and description
        const cleanLine = line.replace(/^[•\-\*]\s*/, '');
        const titleMatch = cleanLine.match(/^([^–\-]+)[–\-](.+)/);
        
        if (titleMatch) {
          currentItem = {
            title: titleMatch[1].trim(),
            description: titleMatch[2].trim(),
            url: '',
            tags: this.inferTags(titleMatch[1] + ' ' + titleMatch[2])
          };
        } else {
          currentItem = {
            title: cleanLine,
            description: '',
            url: '',
            tags: this.inferTags(cleanLine)
          };
        }
      } else if (currentItem && line.includes('http')) {
        // Extract URL from line
        const urlMatch = line.match(/https?:\/\/[^\s]+/);
        if (urlMatch) {
          currentItem.url = urlMatch[0];
        }
      } else if (currentItem && line) {
        // Additional description
        currentItem.description += ' ' + line;
      }
    });
    
    if (currentItem) {
      items.push(currentItem);
    }
    
    return items;
  }
  
  parseSources(markdown) {
    const sources = [];
    const lines = markdown.split('\n');
    let inSourcesSection = false;
    
    lines.forEach(line => {
      line = line.trim();
      
      if (line.toLowerCase().includes('sources') || 
          line.match(/^https?:\/\//)) {
        inSourcesSection = true;
      }
      
      if (inSourcesSection && line.match(/^https?:\/\//)) {
        // Extract title from previous line or URL
        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          sources.push({
            label: this.extractDomainName(urlMatch[1]),
            url: urlMatch[1]
          });
        }
      }
    });
    
    return sources;
  }
  
  extractHighlights(content) {
    const highlights = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      line = line.trim();
      // Look for bullet points that represent key highlights
      if (line.match(/^[•\-\*]/) && line.length > 50) {
        const highlight = line.replace(/^[•\-\*]\s*/, '').trim();
        if (highlight.length > 20) {
          highlights.push(highlight);
        }
      }
    });
    
    return highlights.slice(0, 5); // Limit to top 5 highlights
  }
  
  inferTags(text) {
    const tags = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('climate') || lowerText.includes('cop') || 
        lowerText.includes('finance')) {
      tags.push('Climate');
    }
    
    if (lowerText.includes('youth') || lowerText.includes('young')) {
      tags.push('Youth');
    }
    
    if (lowerText.includes('engagement') || lowerText.includes('stakeholder') || 
        lowerText.includes('collaboration')) {
      tags.push('Engagement');
    }
    
    if (lowerText.includes('speaking') || lowerText.includes('keynote') || 
        lowerText.includes('panel')) {
      tags.push('Speaking');
    }
    
    if (lowerText.includes('media') || lowerText.includes('interview') || 
        lowerText.includes('feature')) {
      tags.push('Media');
    }
    
    return tags;
  }
  
  cleanContent(content) {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italic
      .replace(/^[•\-\*]\s*/gm, '')                      // Remove bullet points
      .replace(/\n\n+/g, '</p><p>')                      // Paragraphs
      .replace(/^/, '<p>')                               // Start with paragraph
      .replace(/$/, '</p>')                              // End with paragraph
      .replace(/<p>\s*<\/p>/g, '')                       // Remove empty paragraphs
      .trim();
  }
  
  extractDomainName(url) {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'External Link';
    }
  }
  
  getDefaultContent() {
    return {
      profileOverview: `
        <p>Amal Ridene is a Tunisian sustainable development professional and youth leader active in climate finance, youth empowerment, and stakeholder engagement.</p>
        <p>She is currently the Curator of the World Economic Forum's Global Shapers Tunis Hub and a Chevening Scholar pursuing an MSc in Sustainable Development at the University of Sussex.</p>
      `,
      climateFinance: {
        content: '<p>Leading climate finance initiatives and negotiations at international level.</p>',
        highlights: [
          'Climate Finance negotiations leader at COP26, COP27, and COP28',
          'Finance Youth Fellow with UN Climate Change High-Level Champions Team',
          'Advisory panel member for GFANZ'
        ]
      },
      youthEmpowerment: {
        content: '<p>Empowering young people and elevating youth voices in global forums.</p>',
        highlights: [
          'Curator of Global Shapers Tunis Hub',
          'Chairperson of 2024 World Scout Conference',
          'Board member of Arab Youth4COP Initiative'
        ]
      },
      stakeholderEngagement: {
        content: '<p>Facilitating collaboration between diverse stakeholders for climate action.</p>',
        highlights: [
          'Investor Engagement Officer at AfricInvest',
          'Multi-stakeholder collaboration advocate',
          'Bridge between policy-makers and civil society'
        ]
      },
      mediaItems: [
        {
          title: 'Berlin Energy Transition Dialogue 2024',
          description: 'Young Keynote Speaker at BETD 2024',
          url: '#',
          tags: ['Climate', 'Speaking']
        }
      ],
      sources: [
        {
          label: 'World Economic Forum',
          url: 'https://www.weforum.org/people/amal-ridene/'
        }
      ]
    };
  }
  
  // Content access methods
  async getProfileOverview() {
    const content = await this.loadContent();
    return content.profileOverview;
  }
  
  async getClimateFinanceContent() {
    const content = await this.loadContent();
    return content.climateFinance;
  }
  
  async getYouthEmpowermentContent() {
    const content = await this.loadContent();
    return content.youthEmpowerment;
  }
  
  async getStakeholderEngagementContent() {
    const content = await this.loadContent();
    return content.stakeholderEngagement;
  }
  
  async getMediaItems(tag = null) {
    const content = await this.loadContent();
    if (!tag) return content.mediaItems;
    
    return content.mediaItems.filter(item => 
      item.tags.some(itemTag => itemTag.toLowerCase() === tag.toLowerCase())
    );
  }
  
  async getSources() {
    const content = await this.loadContent();
    return content.sources;
  }
  
  async getDomainSummaries() {
    const content = await this.loadContent();
    
    return [
      {
        title: 'Climate Finance',
        summary: 'Leading climate finance negotiations and mobilizing funding for climate solutions.',
        anchor: '#climate-finance',
        highlights: content.climateFinance.highlights.slice(0, 2)
      },
      {
        title: 'Youth Empowerment',
        summary: 'Empowering young leaders and amplifying youth voices in global decision-making.',
        anchor: '#youth-empowerment',
        highlights: content.youthEmpowerment.highlights.slice(0, 2)
      },
      {
        title: 'Stakeholder Engagement',
        summary: 'Facilitating collaboration across sectors for sustainable development goals.',
        anchor: '#stakeholder-engagement',
        highlights: content.stakeholderEngagement.highlights.slice(0, 2)
      }
    ];
  }
}
