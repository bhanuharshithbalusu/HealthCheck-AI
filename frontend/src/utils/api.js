import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 429) {
      error.message = 'Too many requests. Please wait a moment before trying again.';
    } else if (error.response?.status >= 500) {
      error.message = 'Server error. Please try again later.';
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please check your connection and try again.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your internet connection.';
    }
    
    return Promise.reject(error);
  }
);

export const api = {
  // Health check
  healthCheck: () => apiClient.get('/health'),

  // Symptom analysis
  analyzeSymptoms: (symptomData) => apiClient.post('/symptoms/analyze', symptomData),

  // Get common symptoms
  getCommonSymptoms: () => apiClient.get('/symptoms/common'),

  // History management
  getHistory: (limit = 10, offset = 0) => 
    apiClient.get(`/history?limit=${limit}&offset=${offset}`),

  saveQuery: (queryData) => apiClient.post('/history', queryData),
};

export default api;
