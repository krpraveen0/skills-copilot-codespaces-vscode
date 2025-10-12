const express = require('express');
const router = express.Router();
const serpApiService = require('../services/serpApiService');
const contentGenerator = require('../services/contentGenerator');

// Generate content based on trends
router.get('/generate', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    const trends = await serpApiService.getTrendingTechTopics();
    const posts = contentGenerator.generateMultiplePosts(trends, count);
    
    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate content'
    });
  }
});

// Generate single post from specific trend
router.post('/generate-single', async (req, res) => {
  try {
    const { trend } = req.body;
    if (!trend) {
      return res.status(400).json({
        success: false,
        error: 'Trend data is required'
      });
    }

    const post = contentGenerator.generateBlogPost(trend);
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate content'
    });
  }
});

module.exports = router;
