const { getHistoryFromDatabase, saveQueryToDatabase } = require('../utils/database');

const getHistory = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const history = await getHistoryFromDatabase(parseInt(limit), parseInt(offset));
    
    res.json({
      success: true,
      data: history,
      message: 'Query history retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve history',
      message: 'Unable to fetch query history at this time'
    });
  }
};

const saveQuery = async (req, res) => {
  try {
    const queryData = req.body;
    await saveQueryToDatabase(queryData);
    
    res.json({
      success: true,
      message: 'Query saved to history successfully'
    });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save query',
      message: 'Unable to save query to history'
    });
  }
};

module.exports = {
  getHistory,
  saveQuery
};
