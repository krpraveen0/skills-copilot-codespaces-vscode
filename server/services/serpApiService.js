const axios = require('axios');

class SerpApiService {
  constructor() {
    this.apiKey = process.env.SERP_API_KEY;
    this.baseUrl = 'https://serpapi.com/search';
  }

  async getTrendingTechTopics() {
    try {
      if (!this.apiKey) {
        // Return mock data if API key is not configured
        return this.getMockTrends();
      }

      const response = await axios.get(this.baseUrl, {
        params: {
          q: 'trending technology news',
          api_key: this.apiKey,
          engine: 'google',
          num: 10
        }
      });

      return this.parseTrends(response.data);
    } catch (error) {
      console.error('Error fetching trends from SERP API:', error.message);
      return this.getMockTrends();
    }
  }

  parseTrends(data) {
    const trends = [];
    if (data.organic_results) {
      data.organic_results.forEach(result => {
        trends.push({
          title: result.title,
          snippet: result.snippet,
          link: result.link,
          source: result.source || 'Unknown'
        });
      });
    }
    return trends;
  }

  getMockTrends() {
    // Mock data for demonstration when API key is not available
    return [
      {
        title: 'AI and Machine Learning Advancements in 2024',
        snippet: 'Discover the latest breakthroughs in artificial intelligence and machine learning technologies.',
        link: 'https://example.com/ai-ml-2024',
        source: 'Tech News'
      },
      {
        title: 'Cloud Computing: The Future of Infrastructure',
        snippet: 'How cloud computing is transforming business operations and enabling digital transformation.',
        link: 'https://example.com/cloud-computing',
        source: 'Cloud Weekly'
      },
      {
        title: 'Cybersecurity Trends and Best Practices',
        snippet: 'Essential cybersecurity measures every organization should implement in 2024.',
        link: 'https://example.com/cybersecurity',
        source: 'Security Today'
      },
      {
        title: 'Web3 and Blockchain Revolution',
        snippet: 'Understanding the impact of Web3 technologies and blockchain on various industries.',
        link: 'https://example.com/web3-blockchain',
        source: 'Crypto Tech'
      },
      {
        title: 'DevOps and CI/CD Pipeline Optimization',
        snippet: 'Best practices for implementing efficient DevOps workflows and continuous deployment.',
        link: 'https://example.com/devops-cicd',
        source: 'Dev Magazine'
      }
    ];
  }
}

module.exports = new SerpApiService();
