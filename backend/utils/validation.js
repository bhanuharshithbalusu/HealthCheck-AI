const validateSymptoms = (req, res, next) => {
  const { symptoms } = req.body;
  
  // Check if symptoms are provided
  if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid input',
      message: 'Symptoms description is required and must be a non-empty string'
    });
  }
  
  // Check symptoms length
  if (symptoms.length > 1000) {
    return res.status(400).json({
      success: false,
      error: 'Input too long',
      message: 'Symptoms description must be less than 1000 characters'
    });
  }
  
  // Basic content validation
  const sanitizedSymptoms = symptoms.trim();
  if (sanitizedSymptoms.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Input too short',
      message: 'Please provide a more detailed description of your symptoms'
    });
  }
  
  // Update request body with sanitized input
  req.body.symptoms = sanitizedSymptoms;
  
  next();
};

const validateHistoryQuery = (req, res, next) => {
  const { limit, offset } = req.query;
  
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid limit',
      message: 'Limit must be a number between 1 and 100'
    });
  }
  
  if (offset && (isNaN(offset) || parseInt(offset) < 0)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid offset',
      message: 'Offset must be a non-negative number'
    });
  }
  
  next();
};

module.exports = {
  validateSymptoms,
  validateHistoryQuery
};
