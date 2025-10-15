const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../controllers/symptomController');
const { validateSymptoms } = require('../utils/validation');

// POST /api/symptoms/analyze
router.post('/analyze', validateSymptoms, analyzeSymptoms);

// GET /api/symptoms/common
router.get('/common', (req, res) => {
  const commonSymptoms = [
    'headache', 'fever', 'cough', 'sore throat', 'fatigue', 'nausea',
    'shortness of breath', 'chest pain', 'abdominal pain', 'dizziness',
    'muscle aches', 'runny nose', 'congestion', 'loss of appetite',
    'difficulty swallowing', 'joint pain', 'skin rash', 'vomiting'
  ];
  
  res.json({
    success: true,
    data: commonSymptoms,
    message: 'Common symptoms retrieved successfully'
  });
});

module.exports = router;
