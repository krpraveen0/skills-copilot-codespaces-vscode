const express = require('express');
const router = express.Router();
const postingService = require('../services/postingService');

// Get available platforms
router.get('/platforms', (req, res) => {
  try {
    const platforms = postingService.getAvailablePlatforms();
    res.json({
      success: true,
      data: platforms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platforms'
    });
  }
});

// Post to multiple platforms
router.post('/publish', async (req, res) => {
  try {
    const { content, platforms } = req.body;
    
    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Content and platforms are required'
      });
    }

    const results = await postingService.postToMultiplePlatforms(content, platforms);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to post content'
    });
  }
});

module.exports = router;
