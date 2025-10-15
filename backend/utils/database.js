const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch (error) {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Load history from file
const loadHistory = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is corrupted, return empty array
    return [];
  }
};

// Save history to file
const saveHistory = async (history) => {
  try {
    await ensureDataDir();
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (error) {
    console.error('Error saving history:', error);
    throw error;
  }
};

// Get history with pagination
const getHistoryFromDatabase = async (limit = 10, offset = 0) => {
  try {
    const history = await loadHistory();
    const sortedHistory = history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const paginatedHistory = sortedHistory.slice(offset, offset + limit);
    
    return {
      queries: paginatedHistory,
      total: history.length,
      limit,
      offset
    };
  } catch (error) {
    console.error('Error getting history from database:', error);
    throw error;
  }
};

// Save query to history
const saveQueryToHistory = async (queryData) => {
  try {
    const history = await loadHistory();
    
    // Add new query to beginning of array
    history.unshift({
      ...queryData,
      id: queryData.id || Date.now().toString(),
      timestamp: queryData.timestamp || new Date().toISOString()
    });
    
    // Keep only last 1000 queries to prevent file from growing too large
    if (history.length > 1000) {
      history.splice(1000);
    }
    
    await saveHistory(history);
    return queryData;
  } catch (error) {
    console.error('Error saving query to history:', error);
    throw error;
  }
};

// Alias for backward compatibility
const saveQueryToDatabase = saveQueryToHistory;

module.exports = {
  getHistoryFromDatabase,
  saveQueryToHistory,
  saveQueryToDatabase
};
