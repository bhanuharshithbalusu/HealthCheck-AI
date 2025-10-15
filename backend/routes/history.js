const express = require('express');
const router = express.Router();
const { getHistory, saveQuery } = require('../controllers/historyController');

// GET /api/history
router.get('/', getHistory);

// POST /api/history
router.post('/', saveQuery);

module.exports = router;
