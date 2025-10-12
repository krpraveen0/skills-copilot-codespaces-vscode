class ContentGenerator {
  generateBlogPost(trend) {
    const { title, snippet, source } = trend;
    
    // Generate a structured blog post based on the trend
    const blogPost = {
      title: this.generateTitle(title),
      introduction: this.generateIntroduction(snippet, title),
      mainContent: this.generateMainContent(title, snippet),
      conclusion: this.generateConclusion(title),
      tags: this.generateTags(title),
      createdAt: new Date().toISOString(),
      source: source
    };

    return blogPost;
  }

  generateTitle(originalTitle) {
    // Keep the original title or enhance it
    const titleVariations = [
      originalTitle,
      `Deep Dive: ${originalTitle}`,
      `Understanding ${originalTitle}`,
      `Guide to ${originalTitle}`
    ];
    return titleVariations[0];
  }

  generateIntroduction(snippet, title) {
    return `In today's rapidly evolving tech landscape, ${title.toLowerCase()} has emerged as a crucial topic. ${snippet} This article explores the key aspects and implications of this development.`;
  }

  generateMainContent(title, snippet) {
    const sections = [
      {
        heading: 'Overview',
        content: `${snippet} This technology is reshaping how we approach modern challenges and opportunities in the digital space.`
      },
      {
        heading: 'Key Benefits',
        content: 'Organizations adopting these technologies are seeing significant improvements in efficiency, scalability, and innovation. The potential for growth and transformation is substantial.'
      },
      {
        heading: 'Implementation Strategies',
        content: 'To successfully leverage these advancements, teams should focus on continuous learning, iterative development, and staying updated with the latest industry practices.'
      },
      {
        heading: 'Future Outlook',
        content: 'The trajectory of this technology suggests continued growth and evolution. Early adopters are positioning themselves for long-term success in an increasingly competitive landscape.'
      }
    ];

    return sections;
  }

  generateConclusion(title) {
    return `${title} represents a significant opportunity for innovation and growth. By staying informed and adapting to these changes, organizations and individuals can maintain a competitive edge in the tech industry.`;
  }

  generateTags(title) {
    const commonTags = ['technology', 'innovation', 'tech-news'];
    const titleWords = title.toLowerCase().split(' ');
    const relevantWords = titleWords.filter(word => 
      word.length > 4 && !['about', 'their', 'there', 'where'].includes(word)
    );
    return [...commonTags, ...relevantWords.slice(0, 3)];
  }

  generateMultiplePosts(trends, count = 5) {
    return trends.slice(0, count).map(trend => this.generateBlogPost(trend));
  }
}

module.exports = new ContentGenerator();
