const express = require('express');
const router = express.Router();
const serpApiService = require('../services/serpApiService');

// Get trending tech topics
router.get('/', async (req, res) => {
  try {
    const trends = await serpApiService.getTrendingTechTopics();
    res.json({
      success: true,
      data: trends,
      count: trends.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trends'
    });
  }
});

module.exports = router;
